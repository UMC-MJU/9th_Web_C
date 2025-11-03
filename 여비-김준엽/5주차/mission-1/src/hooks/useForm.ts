import { useState, useEffect } from 'react';
import type { ChangeEvent } from 'react';

// 폼 상태 타입 정의
interface UseFormProps<T> {
  initialValue: T;
  validate: (values: T) => Record<keyof T, string>;
}

// 커스텀 useForm 훅
function useForm<T>({ initialValue, validate }: UseFormProps<T>) {
  // 폼 값들 상태
  const [values, setValues] = useState<T>(initialValue);
  // 에러 메시지 상태
  const [errors, setErrors] = useState<Record<keyof T, string>>();
  // 터치 상태 (필드에 포커스가 있었는지)
  const [touched, setTouched] = useState<Record<keyof T, boolean>>();

  // 사용자가 입력값을 바꿀 때 실행되는 함수다.
  const handleChange = (name: keyof T, value: string) => {
    setValues( {
      ...values,
      [name]: value,
    });
  };

  // 블러 이벤트 핸들러 (포커스가 벗어날 때)
  const handleBlur = (name: keyof T) => {
    setTouched({
      ...touched,
      [name]: true,
    } as Record<keyof T, boolean>);
  };

  // 이메일 인풋, 패스워드 인풋, 속성들을 좀 가져오는것
  const getInputProps = (name: keyof T) => {
    const value: T[keyof T] = values[name];
    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => 
      handleChange(name, e.target.value);
    
    const onBlur = () => handleBlur(name);
    
    return { value, onChange, onBlur };
  };

  // values가 변경될 때 마다 에러 검증 로직이 실행됨.
  // { email: "" }
  useEffect(() => {
    const newErrors = validate(values);
    setErrors(newErrors as Record<keyof T, string>); // 오류 메시지 업댓
  }, [validate, values]);

  return { values, errors, touched, getInputProps };
}

export default useForm;

