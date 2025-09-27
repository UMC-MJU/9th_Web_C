import { THEME, useTheme } from '../context/ThemeCotext'
import clsx from 'clsx';

export const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  const isLightMode = theme === THEME.LIGHT; 
  
  return (
    <button 
    onClick={toggleTheme}
    className={clsx('absolute top-4 right-4 !px-3 !py-1 text-sm rounded-lg',{
      'bg-gray-500 text-white': !isLightMode,
      'bg-white text-black': isLightMode,
    })}>
      {isLightMode ? "LIGHT" : "DARK"}
    </button>
  )
}
