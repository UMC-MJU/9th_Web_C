import {z} from 'zod'; 
import {useForm} from 'react-hook-form';
import type {SubmitHandler} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import { postSignup } from '../apis/auth';

const schema = z.object({
  email: z.string().email({ message: "올바른 이메일 형식이 아닙니다." }),
  password: z
    .string()
    .min(8, { message: "비밀번호는 8자 이상이어야 합니다." })
    .max(20, { message: "비밀번호는 20자 이하여야 합니다." }),
  passwordCheck: z
  .string()
  .min(8, { 
    message: "비밀번호 확인은 8자 이상이어야 합니다.",
  })
  .max(20, { 
    message: "비밀번호 확인은 20자 이하여야 합니다.",
  }),
  name : z
  .string()
  .min(1, { message: "이름을 입력해주세요." }),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordCheck"]
  });

type FormFields = z.infer<typeof schema>;

const SignupPage = () => {
  const {
    register, 
    handleSubmit, 
    formState: {errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordCheck: "",
    },
    resolver: zodResolver(schema),
    mode:"onBlur",
  });
  
  
  
  

  const onSubmit : SubmitHandler<FormFields> = async(data) => {
    const {passwordCheck: _passwordCheck, ...rest} = data;

    const response = await postSignup(rest);

    console.log(response);
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-screen">
        <div className="flex flex-col gap-4 w-80">
          {/* 이메일 입력 필드 */}
          <input
            {...register("email")}
            
            className={`w-full p-4 bg-white border border-gray-200 rounded-lg text-gray-700 placeholder-gray-500 focus:outline-none focus:border-gray-300 ${
              errors?.email ? "border-red-500 bg-red-50" : ""
            }`}
            type="email"
            placeholder="이메일"
          />  
          {errors?.email && (
            <div className={'text-red-500 text-sm'}>{errors.email.message}</div>
          )}

          <input
            {...register("passwordCheck")}    
            className={`w-full p-4 bg-white border border-gray-200 rounded-lg text-gray-700 placeholder-gray-500 focus:outline-none focus:border-gray-300 ${
              errors?.passwordCheck ? "border-red-500 bg-red-50" : ""
            }`}
            type={"password"}
            placeholder={"비밀번호 확인"}
          />
          {errors?.passwordCheck && (
            <div className={'text-red-500 text-sm'}>
              {errors.passwordCheck.message}
              </div>
          )}
          <input
            {...register("name")}
            className={`w-full p-4 bg-white border border-gray-200 rounded-lg text-gray-700 placeholder-gray-500 focus:outline-none focus:border-gray-300 ${
              errors?.name ? "border-red-500 bg-red-50" : ""
            }`}
            type={"text"}
            placeholder={"이름"}
          />
          {errors?.name && (
            <div className={'text-red-500 text-sm'}>
              {errors.name.message}
              </div>
          )}
          <button
            disabled={isSubmitting}
            type = "button"
            onClick={handleSubmit(onSubmit)}
            className="w-full p-4 bg-gray-300 text-white font-medium rounded-lg border border-gray-200 hover:bg-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            회원가입
          </button>
        </div>
      </div>
  );
};



export default SignupPage;