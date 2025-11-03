import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import useForm from "../hooks/useForm";
import { UserSigninInformation, validateSignin } from "../utils/validate";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";

const LoginPage = () => {
  const { login, accessToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      navigate("/");
    }
  }, [navigate, accessToken]);

  const [isVisible, setIsVisible] = useState(false); // 비번 보이기 상태
  const { values, errors, touched, getInputProps } =
    useForm<UserSigninInformation>({
      initialValue: {
        email: "",
        password: "",
      },
      validate: validateSignin,
    });

  const handleSubmit = async () => {
    await login(values);
  };

  // 오류가 하나라도 있거나, 입력값이 비어 있으면 버튼을 비활성화
  const isDisabled =
    Object.values(errors || {}).some((error) => error.length > 0) || //오류가 있으면 true
    Object.values(values).some((value) => value === ""); //오류가 없으면 true
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <div className="flex flex-col gap-3">
        <input
          {...getInputProps("email")}
          name="email"
          className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm ${
            errors?.email && touched?.email
              ? "border-red-500 bg-red-200"
              : "border-gray-300"
          }`}
          type="email"
          placeholder="이메일"
        />
        {errors?.email && touched?.email && (
          <div className="text-red-500 text-sm">{errors.email}</div>
        )}
        {/* 눈이랑 비번칸 */}
        <div className="relative w-full">
          <input
            {...getInputProps("password")}
            name="password"
            className={`border border-[#ccc] w-[300px] p-[10px] pr-10 focus:border-[#807bff] rounded-sm ${
              errors?.password && touched?.password
                ? "border-red-500 bg-red-200"
                : "border-gray-300"
            }`}
            type={isVisible ? "text" : "password"}
            placeholder="비밀번호"
          />
          <button
            type="button"
            onClick={() => setIsVisible((prev) => !prev)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500"
          >
            {isVisible ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {errors?.password && touched?.password && (
          <div className="text-red-500 text-sm">{errors.password}</div>
        )}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isDisabled}
          className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700
          transition-colors cursor-pointer disabled:bg-gray-300"
        >
          로그인
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
