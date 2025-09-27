import { createContext, useContext, useState, type JSX, type PropsWithChildren } from "react";

export enum THEME {
  LIGHT = "LIGHT",
  DARK = "DARK"
}

type TTheme = THEME.LIGHT | THEME.DARK;

interface ThemeContextInterface {
  theme: THEME.LIGHT | THEME.DARK;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextInterface | undefined>(undefined);

export const ThemeProvider = ({ children }: PropsWithChildren): JSX.Element => {
  const [theme, setTheme] = useState<TTheme>(THEME.LIGHT);
  const toggleTheme = (): void => {
    setTheme((prevTheme): THEME =>
      prevTheme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT
    )
  }

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = (): ThemeContextInterface => {
  const context = useContext(ThemeContext);

  if(!context){
    throw new Error('useTheme must be used within a useThemeProvider.');
  }
  return context;
}