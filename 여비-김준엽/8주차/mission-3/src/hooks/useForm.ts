import { ChangeEvent, useEffect, useState } from "react";

interface UseFormProps<T> {
  initialValue: T;
  validate: (values: T) => Record<keyof T, string>;
}

function useForm<T>({ initialValue, validate }: UseFormProps<T>) {
  const [values, setValues] = useState(initialValue);
  // 터치된 필드 추적 (초기값은 빈 객체)
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  // 에러 메시지 저장 (초기값은 빈 객체)
  const [errors, setErrors] = useState<Record<string, string>>({});

  // 사용자가 입력값을 바꿀 때 실행되는 함수이다.
  const handleChange = (name: keyof T, text: string) => {
    setValues({
      ...values, //불변성 유지(기존값을 유지)
      [name]: text,
    });
  };

  // 필드에서 포커스가 벗어날 때 실행되는 함수
  const handleBlur = (name: keyof T) => {
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  // 이메일 인풋, 패스워드 인풋, 속성들을 가져오는 것
  const getInputProps = (name: keyof T) => {
    // value가 undefined일 경우 빈 문자열로 처리
    const value = values[name] ?? "";
    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      handleChange(name, e.target.value);

    const onBlur = () => handleBlur(name);

    return { value, onChange, onBlur };
  };

  // values가 변경될 때 마다 에러 검증 로직이 실행됨.
  useEffect(() => {
    const newErrors = validate(values);
    setErrors(newErrors); // 오류 메시지 업뎃
  }, [validate, values]);

  return { values, errors, touched, getInputProps };
}

export default useForm;
