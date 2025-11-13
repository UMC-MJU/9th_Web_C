import type {
    RequestSignupDto,
    ResponseSignupDto,
    RequestSigninDto,
    ResponseSigninDto,
    ResponseMyInfoDto,
} from "../types/auth";
import { axiosInstance } from "./axios";
import type { CommonResponse } from "../types/common";

// 회원가입 API 호출
export const postSignup = async (
    body: RequestSignupDto,
): Promise<ResponseSignupDto> => {
    const { data } = await axiosInstance.post("/v1/auth/signup", body);
    return data;
};

// 로그인 API 호출
export const postSignin = async (
    body: RequestSigninDto,
): Promise<ResponseSigninDto> => {
    const { data } = await axiosInstance.post("/v1/auth/signin", body);
    return data;
};

// 내 정보 조회 API 호출
export const getMyInfo = async (): Promise<ResponseMyInfoDto> => {
    const { data } = await axiosInstance.get("/v1/auth/me");
    return data;
};

// 로그아웃 API 호출
export const postLogout = async () => {
    const { data } = await axiosInstance.post("/v1/auth/signout");
    return data;
};

// 한글 주석: Refresh Token을 사용하여 새 액세스 토큰을 발급받는 API
export const postRefresh = async (
    refreshToken: string,
): Promise<CommonResponse<{ accessToken: string; refreshToken?: string }>> => {
    const { data } = await axiosInstance.post("/v1/auth/refresh", { refreshToken });
    return data;
};