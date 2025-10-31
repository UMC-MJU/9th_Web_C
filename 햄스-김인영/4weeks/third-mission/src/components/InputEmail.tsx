import { useState } from "react";
import type { InputProps } from "../types/input"

export const InputEmail = ({ register, errors, setState }: InputProps) => {
  /*에러 메세지를 통해 버튼 비활성화 구현을 시도해보니
  첫 렌더링(에러 메세지x)은 버튼이 활성화 되는 문제 발생
  -> touched로 보완
  */
  const [touched, setTouched] = useState(false);

  return (
    <>
      <input
        {...register('email')}
        name="email"
        className={`border border-gray-400 rounded-lg focus:outline-none p-2 w-full text-sm text-gray-500 bg-white
          ${errors?.email ? "border-red-400 bg-red-200" : "border-gray-400"}`}
        type={"email"}
        placeholder="email"
        onChange={(e) => {
          setTouched(true); 
          register("email").onChange(e);
        }}
      />
      {errors?.email && (
        <div className="text-red-400 text-[13px]">{errors.email.message}</div>
      )}
      <button
        className="bg-blue-300 rounded-lg focus:outline-none p-3 w-full text-sm text-white font-semibold
        disabled:bg-gray-400 disabled:cursor-not-allowed"
        type="button"
        disabled={!touched || !!errors.email}
        onClick={() => setState("password")}
      >
        다음
      </button>
    </>
  )
}