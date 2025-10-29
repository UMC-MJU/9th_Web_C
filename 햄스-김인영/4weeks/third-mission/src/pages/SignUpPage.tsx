import {z} from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import { InputEmail } from "../components/InputEmail";
import { InputPassword } from "../components/InputPassword";
import { InputName } from "../components/InputName";
import { useState } from "react";

/*유효성 검사 스키마*/
const schema = z.object({
  email: z.string().email({ message: "올바른 이메일 형식이 아닙니다.  "}),
  password: z.string()
  .min(8, {
    message: "비밀번호는 8자 이상이어야 합니다.",
  }).max(20, {
    message: "비밀번호는 20자 이하이어야 합니다."
  }),
  passwordCheck: z.string()
  .min(8, {
    message: "비밀번호는 8자 이상이어야 합니다.",
  }).max(20, {
    message: "비밀번호는 20자 이하이어야 합니다."
  }),
  name: z.string().min(1,{message: "이름을 입력해 주세요."}),
}).refine((data) => data.password === data.passwordCheck, {
  message: "비밀번호가 일치하지 않습니다.",
  path: ["passwordCheck"],
});

/*스키마로부터 자동으로 typescript 타입 유추*/
export type FormFields = z.infer<typeof  schema>;

const SignUpPage = () => {
  const [state, setState] = useState<string>("email");

  /*useForm의 method 구조분해할당*/
  const {register, 
    handleSubmit, 
    formState: {errors, isSubmitting, isValid},
  } = useForm<FormFields>({
    defaultValues: {
      email: "",
      name: "",
      password: "",
      passwordCheck: "",
    },
    resolver: zodResolver(schema),
    mode: "onChange",
  })

  const onSubmit:SubmitHandler<FormFields> = (data) => {
    const{passwordCheck, ...rest} = data;
    console.log(rest);
  }

  return (
    <div className="flex justify-center items-center grow bg-gray-50">
      <div className="flex flex-col w-70 gap-3">
        <h2 className="text-2xl font-semibold text-center text-gray-600">
          회원가입
        </h2>
        <div className="flex items-center justify-center w-full my-4">
          <div className="grow border-t border-gray-400"></div>
          <span className="mx-3 text-gray-400 text-sm font-medium">OR</span>
          <div className="grow border-t border-gray-400"></div>
        </div>
        {state === "email" && <InputEmail
          register={register}
          errors={errors}
          setState={setState}
        />
        }
        {state === "password" &&
          <InputPassword
            register={register}
            errors={errors}
            setState={setState}
          />
        }
        {state === "name" &&
          <InputName
            register={register}
            errors={errors}
            setState={setState}
            isValid={isValid}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
          />
        }
      </div>
    </div>
  )
}

export default SignUpPage