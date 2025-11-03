import useForm from '../hooks/useForm';
import type { UserSigninInformation } from "../utils/validate";
import { validateSignin } from "../utils/validate";

import { useAuth } from '../context/AuthContext.tsx';
import { useNavigate } from 'react-router-dom';

// 로그인 페이지 컴포넌트
const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const {values, errors, touched, getInputProps} = 
    useForm<UserSigninInformation>({
      initialValue: {
        email: "",
        password: "",
      },
      validate: validateSignin,
  });

  // 폼 제출 핸들러
  // - 클릭 이벤트의 객체가 전달되지 않도록 매개변수 없이 현재 폼 값 사용
  const handleSubmit = async () => {
    await login({ email: values.email, password: values.password });
    navigate("/my");
  };

  //오류가 하나라도 있거나, 입력값이 비어있으면 버튼을 비활성화
  const isDisabled =
    Object.values(errors || {}).some((error) => String(error).length > 0) ||  //오류가 있으면 true
    Object.values(values).some((value) => String(value).length === 0); //입력값이 비어있으면 true

  return (
    <div className="flex flex-col items-center justify-center h-screen">
        <div className="flex flex-col gap-3">
          {/* 이메일 입력 필드 */}
          <input
            {...getInputProps("email")}
            name="email"
            className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm ${
              errors?.email && touched?.email ? "border-red-500 bg-red-200" : "border-gray-300"
            }`}
            type="email"
            placeholder="이메일"
          />
          {/* 이메일 에러 메시지 */}
          {errors?.email && touched?.email && (
            <div className="text-red-500 text-sm -mt-2">{errors.email}</div>
          )}

          {/* 비밀번호 입력 필드 */}
          <input
            {...getInputProps("password")}
            name="password"
            className={`w-full p-4 bg-white border border-gray-200 rounded-lg text-gray-700 placeholder-gray-500 focus:outline-none focus:border-gray-300 ${
              errors?.password && touched?.password ? "border-red-500 bg-red-50" : ""
            }`}
            type="password"
            placeholder="비밀번호"
          />
          {/* 비밀번호 에러 메시지 */}
          {errors?.password && touched?.password && (
            <div className="text-red-500 text-sm -mt-2">{errors.password}</div>
          )}

          {/* 로그인 버튼 - 연한 회색 */}
          <button
            onClick={handleSubmit}
            disabled={isDisabled}
            className="w-full p-4 bg-gray-300 text-white font-medium rounded-lg border border-gray-200 hover:bg-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            로그인
          </button>
        </div>
      </div>
  );
};

export default LoginPage;

