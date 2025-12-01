import type { InputProps } from "../types/input"

export const InputName = ({register, errors, isValid, handleSubmit, onSubmit}: InputProps) => {

  return (
    <>
    <input
          {...register("name")}
          name="name"
          className={`border border-gray-400 rounded-lg focus:outline-none p-2 w-full text-sm text-gray-500 bg-white
          ${errors?.name ? "border-red-400 bg-red-200" : "border-gray-400"}`}
          type={"name"}
          placeholder="name"
        />
        {errors?.name && (
          <div className="text-red-400 text-[13px]">{errors.name.message}</div>
        )}
        <button
          className="bg-blue-300 rounded-lg focus:outline-none p-3 w-full text-sm text-white font-semibold
        disabled:bg-gray-400 disabled:cursor-not-allowed"
          type="submit"
          disabled={!isValid}
          onClick={() => {
            if (handleSubmit && onSubmit) 
              {handleSubmit(onSubmit)();
              }
            }}
        >
          회원가입 완료
        </button>
    </>
  )
}
