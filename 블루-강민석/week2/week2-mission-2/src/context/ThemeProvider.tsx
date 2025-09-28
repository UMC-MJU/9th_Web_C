import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";

// 1. as const를 사용하여 읽기 전용 객체로 만듭니다.
export const THEME = {
  LIGHT: "light",
  DARK: "dark",
} as const;

// 2. THEME 객체의 값('light' | 'dark')을 기반으로 새로운 타입을 추론합니다.
type TTheme = (typeof THEME)[keyof typeof THEME];

// 3. 새로 만든 Theme 타입을 인터페이스에 적용합니다.
interface IThemeContextState {
  theme: TTheme; // 'light' | 'dark' 타입으로 적용됩니다.
  toggleTheme: () => void;
}

// Context 생성 부분은 동일합니다.
export const ThemeContext = createContext<IThemeContextState | undefined>(
  undefined
);

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useState<TTheme>(THEME.LIGHT);
  const toggleTheme = (): void => {
    setTheme(
      (prevTheme): TTheme =>
        prevTheme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context; 
};
