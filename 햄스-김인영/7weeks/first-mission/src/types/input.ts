import type { UseFormRegister, FieldErrors, UseFormHandleSubmit, SubmitHandler } from "react-hook-form";
import type { FormFields } from "../pages/SignUpPage";

export type InputProps = {
  register: UseFormRegister<FormFields>;
  errors: FieldErrors<FormFields>;
  setState: React.Dispatch<React.SetStateAction<string>>; /*useState의 setter 타입!*/
  isValid?: boolean;
  handleSubmit?: UseFormHandleSubmit<FormFields>;
  onSubmit?: SubmitHandler<FormFields>;
};
