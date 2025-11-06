import { useState } from "react";
import type { InputProps } from "../types/input"

export const InputPassword = ({register, errors, setState}: InputProps) => {
  const [touched, setTouched] = useState(false);
  const [checkTouched, setCheckTouched] = useState(false);

  return (
    <>
      <input
        {...register("password")}
        name="password"
        className={`border border-gray-400 rounded-lg focus:outline-none p-2 w-full text-sm text-gray-500 bg-white
          ${errors?.password ? "border-red-400 bg-red-200" : "border-gray-400"}`}
        type={"password"}
        placeholder="password"
        onChange={(e) => {
          setTouched(true);
          register("password").onChange(e);
        }}
      />
      {errors?.password && (
        <div className="text-red-400 text-[13px]">{errors.password.message}</div>
      )}
      <input
        {...register("passwordCheck")}
        name="passwordCheck"
        className={`border border-gray-400 rounded-lg focus:outline-none p-2 w-full text-sm text-gray-500 bg-white
          ${errors?.password ? "border-red-400 bg-red-200" : "border-gray-400"}`}
        type={"password"}
        placeholder="password-check"
        onChange={(e) => {
          setCheckTouched(true);
          register("password").onChange(e);
        }}
      />
      {errors?.passwordCheck && (
        <div className="text-red-400 text-[13px]">{errors.passwordCheck.message}</div>
      )}
      <button
          className="bg-blue-300 rounded-lg focus:outline-none p-3 w-full text-sm text-white font-semibold
        disabled:bg-gray-400 disabled:cursor-not-allowed"
          type="button"
          disabled={!touched || !checkTouched || !!errors.password || !!errors.passwordCheck}
          onClick={() => setState("name")}
        >
          다음
        </button>
      </>
  )
}
