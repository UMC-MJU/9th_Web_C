export type UserSigninInformation = {
  email: string;
  password: string;
};

export type UserSignupInformation = {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
};

function validateUser(values : UserSigninInformation) {
  const errors: { email: string; password: string } = { 
    email: "", 
    password: "" 
  };
  
  if (
    !/^[0-9a-zA-Z]([_.-]?[0-9a-zA-Z])*@[0-9a-zA-Z]([_.-]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i.test(
    values.email,
    )
  ) {
  errors.email = "올바른 이메일 형식이 아닙니다!";
  }

// 비밀번호 8자 28자 사이
  if (!(values.password.length >= 8 && values.password.length < 20)) {
    errors.password = "비밀번호는 8~20자 사이로 입력해주세요.";
  }
  return errors;
}

function validateSignupUser(values : UserSignupInformation) {
  const errors: { email: string; password: string; confirmPassword: string; name: string } = { 
    email: "", 
    password: "",
    confirmPassword: "",
    name: ""
  };
  
  // 이름 검증
  if (values.name.length < 1) {
    errors.name = "이름은 2자 이상 입력해주세요.";
  }
  
  // 이메일 검증
  if (
    !/^[0-9a-zA-Z]([_.-]?[0-9a-zA-Z])*@[0-9a-zA-Z]([_.-]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i.test(
    values.email,
    )
  ) {
  errors.email = "올바른 이메일 형식이 아닙니다!";
  }

  // 비밀번호 8자 28자 사이
  if (!(values.password.length >= 8 && values.password.length <= 20)) {
    errors.password = "비밀번호는 8~20자 사이로 입력해주세요.";
  }
  
  // 비밀번호 확인 검증
  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "비밀번호가 일치하지 않습니다.";
  }
  
  return errors;
}

//로그인 유효성 검사
function validateSignin( values: UserSigninInformation) {
  return validateUser(values);
}

//회원가입 유효성 검사
function validateSignup( values: UserSignupInformation) {
  return validateSignupUser(values);
}

export { validateSignin, validateSignup };
