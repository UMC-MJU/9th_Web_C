import type { UserSigninInformation } from "../utils/validate"
import { validateSignin } from "../utils/validate"
import { useForm } from "../hooks/useForm"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import logo from '../assets/google-logo.svg'

export const LoginPage = () => {
  const {login} = useContext(AuthContext);
  const navigate = useNavigate();

  const { values, errors, touched, getInputProps } = useForm<UserSigninInformation>({
    initialValue: {
      email: "",
      password: "",
    },
    validate: validateSignin,
  }
  )


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // 새로고침 방지
    try {
      await login(values);
      console.log("로그인 성공:", values);
      alert("로그인 성공!");
      navigate("/");
    } catch (error) {
      console.error("로그인 실패:", error);
    }
  };

  const handleGoggleLogin = () => {
    window.location.href = import.meta.env.VITE_SERVER_API_URL + "/v1/auth/google/login";
  }

  //오류가 있거나 입력값이 없으면 버튼 비활성화
  const isDisabled = Object.values(errors || {}).some((error) => error.length > 0) ||
    Object.values(values).some((value) => value === "");

  return (
    <div className="flex justify-center items-center grow bg-gray-50">
      <form className="flex flex-col w-70 gap-3">
        <h2 className="text-2xl font-semibold text-center text-gray-600">
          로그인
        </h2>
        <button
          className="border-1 border-gray-500 rounded-lg focus:outline-none p-3 w-full text-sm text-gray-500 font-semibold mt-[15px]"
          type="button"
          onClick={handleGoggleLogin}
        >
          <div className="flex justify-center items-center gap-[10px]">
            <img src={logo} className="w-[20px]"/>
            <span>
              구글 로그인
            </span>
          </div>
        </button>
        <div className="flex items-center justify-center w-full my-4">
          <div className="grow border-t border-gray-400"></div>
          <span className="mx-3 text-gray-400 text-sm font-medium">OR</span>
          <div className="grow border-t border-gray-400"></div>
        </div>
        <input
          {...getInputProps("email")}
          name="email"
          className={`border border-gray-400 rounded-lg focus:outline-none p-2 w-full text-sm text-gray-500 bg-white
          ${errors?.email && touched?.email ? "border-red-400 bg-red-200" : "border-gray-400"}`}
          type="email"
          placeholder="email"
        />
        {errors?.email && touched?.email && (
          <div className="text-red-400 text-[13px]">{errors.email}</div>
        )}
        <input
          {...getInputProps("password")}
          name="password"
          className={`border border-gray-400 rounded-lg focus:outline-none p-2 w-full text-sm text-gray-500 bg-white
          ${errors?.password && touched?.password ? "border-red-400 bg-red-200" : "border-gray-400"}`}
          type="password"
          placeholder="password"
        />
        {errors?.password && touched?.password && (
          <div className="text-red-400 text-[13px]">{errors.password}</div>
        )}
        <button
          className="bg-blue-300 rounded-lg focus:outline-none p-3 w-full text-sm text-white font-semibold
        disabled:bg-gray-400 disabled:cursor-not-allowed"
          type="submit"
          disabled={isDisabled}
          onClick={handleSubmit}
        >
          로그인
        </button>
      </form>
    </div>
  )
}
