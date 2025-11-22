import axios from "axios";
import { LOCAL_STORAGE_KEY } from "./../constants/key";

// 기본 axios 인스턴스 생성
export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_API_URL,
});

// 토큰 재발급 중 여부를 나타내는 플래그
let isRefreshing = false;
// 재발급 완료 후 재시도할 요청들을 담아두는 큐
let refreshSubscribers: Array<(token: string) => void> = [];

// 큐에 구독자 추가
const subscribeTokenRefresh = (cb: (token: string) => void) => {
    refreshSubscribers.push(cb);
};

// 새 액세스 토큰을 모든 구독자에게 전달
const onRrefreshed = (token: string) => {
    refreshSubscribers.forEach((cb) => cb(token));
    refreshSubscribers = [];
};

// 로컬 스토리지에서 토큰 읽기
const getAccessToken = () => window.localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);
const getRefreshToken = () => window.localStorage.getItem(LOCAL_STORAGE_KEY.refreshToken);

// 로컬 스토리지에 토큰 저장
const setAccessToken = (token: string) => window.localStorage.setItem(LOCAL_STORAGE_KEY.accessToken, token);
const setRefreshToken = (token: string) => window.localStorage.setItem(LOCAL_STORAGE_KEY.refreshToken, token);

// 토큰 제거(로그아웃 처리)
const clearTokensAndRedirect = () => {
    // 한글 주석: 인증 실패 시 토큰 초기화 및 로그인 페이지로 이동
    window.localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken);
    window.localStorage.removeItem(LOCAL_STORAGE_KEY.refreshToken);
    window.location.href = "/login";
};

// 요청 인터셉터: 최신 액세스 토큰을 항상 헤더에 첨부
axiosInstance.interceptors.request.use((config) => {
    // 한글 주석: 매 요청마다 로컬에서 최신 액세스 토큰을 읽어 Authorization 헤더 설정
    const token = getAccessToken();
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// 응답 인터셉터: 401 발생 시 Refresh Token으로 재발급 시도
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // 한글 주석: 401이 아니거나, 이미 재시도한 요청이면 그대로 에러 반환
        if (error.response?.status !== 401 || originalRequest?._retry) {
            return Promise.reject(error);
        }

        // 한글 주석: 같은 요청이 무한 재시도되지 않도록 플래그 지정
        originalRequest._retry = true;

        const refreshToken = getRefreshToken();
        if (!refreshToken) {
            clearTokensAndRedirect();
            return Promise.reject(error);
        }

        // 한글 주석: 이미 재발급 중이면 새 토큰 수신 후 재시도만 등록
        if (isRefreshing) {
            return new Promise((resolve, reject) => {
                subscribeTokenRefresh((token: string) => {
                    if (!originalRequest.headers) originalRequest.headers = {};
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    resolve(axiosInstance(originalRequest));
                });
            });
        }

        // 한글 주석: 재발급 시도 시작
        isRefreshing = true;
        try {
            // 한글 주석: 재발급은 기본 axios로 수행(인스턴스 인터셉터 영향 방지)
            const base = axios.create({ baseURL: import.meta.env.VITE_SERVER_API_URL });
            const { data } = await base.post("/v1/auth/refresh", {
                refreshToken,
            });

            const newAccessToken: string = data?.data?.accessToken;
            const newRefreshToken: string | undefined = data?.data?.refreshToken;

            if (!newAccessToken) {
                throw new Error("토큰 재발급 실패");
            }

            // 한글 주석: 새 토큰 저장
            setAccessToken(newAccessToken);
            if (newRefreshToken) setRefreshToken(newRefreshToken);

            // 한글 주석: 대기 중인 요청들 재시도
            onRrefreshed(newAccessToken);

            // 한글 주석: 현재 실패한 요청도 재시도
            if (!originalRequest.headers) originalRequest.headers = {};
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return axiosInstance(originalRequest);
        } catch (e) {
            // 한글 주석: 재발급 실패 시 로그아웃 처리
            clearTokensAndRedirect();
            return Promise.reject(e);
        } finally {
            isRefreshing = false;
        }
    }
);