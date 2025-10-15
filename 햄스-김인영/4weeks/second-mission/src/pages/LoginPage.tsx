import { useState } from "react"
import type { loginForm } from "../types/forms";

export const LoginPage = () => {
  const [formContents, setFormContents] = useState<loginForm>({
    email: "",
    password: "",
  });

  return (
    <div className="flex justify-center items-center flex-grow bg-gray-50">
      <div className="flex flex-col w-70 gap-4">
        <h2 className="text-2xl font-semibold text-center text-gray-600 mb-3">
          로그인
        </h2>
        <input
        name="email"
        className="border border-gray-500 rounded-lg focus:outline-none p-2 w-full text-sm text-gray-500 bg-white"
        type="email"
        placeholder="이메일을 입력해 주세요."
        />
        <input
        name="password"
        className="border border-gray-500 rounded-lg focus:outline-none p-2 w-full text-sm text-gray-500 bg-white"
        type="password"
        placeholder="비밀번호를 입력해 주세요."
        />
        <button
        className="bg-blue-300 rounded-lg focus:outline-none p-3 w-full text-sm text-white font-semibold"
        type="submit"
        >
          로그인
        </button>
      </div>
    </div>
  )
}
