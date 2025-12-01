import { useEffect, useState, type ChangeEvent } from "react";

interface UseFormProps<T> {
  initialValue: T; //email: '', password: ''
  //email, password 유효성 검사 함수
  validate: (values: T) => Record<keyof T, string>;
}

export function useForm<T>({initialValue, validate}: UseFormProps<T>) {
  const [values, setValues] = useState(initialValue);
  const [touched, setTouched] = useState<Record<string, boolean>>();
  const [errors, setErrors] = useState<Record<string,string>>();

  //사용자의 입력값이 변경될 때마다 실행되는 함수
  const handleChange = (name: keyof T, text: string) => {
    setValues({
      ...values, //불변성
      [name]: text,
    });
  }

  const handleBlur = (name: keyof T) => {
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  //email, password 속성 가져오기
  const getInputProps = (name: keyof T) => {
    const value = values[name];

    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => 
      handleChange(name, e.target.value);

    const onBlur = () => handleBlur(name);

    return {value, onChange, onBlur}
  };

  //vaules가 변경될 때마다 에러 검증 로직이 실행됨.
  useEffect(() => {
    const newErrors = validate(values);
    setErrors(newErrors); //오류메세지 업데이트
  }, [validate, values]);

  return { values, errors, touched, getInputProps }
}