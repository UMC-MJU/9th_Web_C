import useForm from '../hooks/useForm';
import type { UserSignupInformation } from "../utils/validate";
import { validateSignup } from "../utils/validate";

// 회원가입 페이지 컴포넌트
const SignupPage = () => {
  // 폼 상태 관리 (useForm 훅 사용)
  const {values, errors, touched, getInputProps} = 
    useForm<UserSignupInformation>({
      initialValue: {
        email: "",
        password: "",
        confirmPassword: "",
        name: "",
      },
      validate: validateSignup,
  });

  // 폼 제출 핸들러
  const handleSubmit = () => {
    console.log("회원가입 폼 제출됨:", values);
  };

  //오류가 하나라도 있거나, 입력값이 비어있으면 버튼을 비활성화
  const isDisabled =
    Object.values(errors || {}).some((error) => String(error).length > 0) ||  //오류가 있으면 true
    Object.values(values).some((value) => String(value).length === 0); //입력값이 비어있으면 true

  return (
    <div className="relative h-full bg-white">
      {/* 배경 그라데이션 효과 */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-gray-100"></div>
      
      {/* 회원가입 폼 컨테이너 */}
      <div className="relative flex flex-col items-center justify-center h-full">
        <div className="flex flex-col gap-4 w-80">
          {/* 이름 입력 필드 */}
          <input
            {...getInputProps("name")}
            name="name"
            className={`w-full p-4 bg-white border border-gray-200 rounded-none text-gray-700 placeholder-gray-500 focus:outline-none focus:border-gray-300 ${
              errors?.name && touched?.name ? "border-red-500 bg-red-50" : ""
            }`}
            type="text"
            placeholder="이름"
          />
          {/* 이름 에러 메시지 */}
          {errors?.name && touched?.name && (
            <div className="text-red-500 text-sm -mt-2">{errors.name}</div>
          )}

          {/* 이메일 입력 필드 */}
          <input
            {...getInputProps("email")}
            name="email"
            className={`w-full p-4 bg-white border border-gray-200 rounded-none text-gray-700 placeholder-gray-500 focus:outline-none focus:border-gray-300 ${
              errors?.email && touched?.email ? "border-red-500 bg-red-50" : ""
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
            className={`w-full p-4 bg-white border border-gray-200 rounded-none text-gray-700 placeholder-gray-500 focus:outline-none focus:border-gray-300 ${
              errors?.password && touched?.password ? "border-red-500 bg-red-50" : ""
            }`}
            type="password"
            placeholder="비밀번호"
          />
          {/* 비밀번호 에러 메시지 */}
          {errors?.password && touched?.password && (
            <div className="text-red-500 text-sm -mt-2">{errors.password}</div>
          )}

          {/* 비밀번호 확인 입력 필드 */}
          <input
            {...getInputProps("confirmPassword")}
            name="confirmPassword"
            className={`w-full p-4 bg-white border border-gray-200 rounded-none text-gray-700 placeholder-gray-500 focus:outline-none focus:border-gray-300 ${
              errors?.confirmPassword && touched?.confirmPassword ? "border-red-500 bg-red-50" : ""
            }`}
            type="password"
            placeholder="비밀번호 확인"
          />
          {/* 비밀번호 확인 에러 메시지 */}
          {errors?.confirmPassword && touched?.confirmPassword && (
            <div className="text-red-500 text-sm -mt-2">{errors.confirmPassword}</div>
          )}

          {/* 회원가입 버튼 */}
          <button
            onClick={handleSubmit}
            disabled={isDisabled}
            className="w-full p-4 bg-gray-300 text-white font-medium rounded-none border border-gray-200 hover:bg-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
