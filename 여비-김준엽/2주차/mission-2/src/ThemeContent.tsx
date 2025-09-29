import clsx from "clsx";
import {THEME, useTheme} from "./ThemeProvider";

export default function ThemeContent(){
    const {theme} = useTheme();
    
    const isLightMode = theme === THEME.LIGHT;
    return(
    <div 
        className ={clsx(
            'p-4 h-dvh w-full',
            isLightMode ? 'bg-white' : 'bg-gray-800 '
        )}
    >
        <h1 className={clsx(
            'text-wxl font-bold',
            isLightMode ? 'text-black' : 'text-white'
        )}>
            Theme Content
        </h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut unde, at repellat quisquam molestias ducimus 
            eum totam minima minus expedita iste iure, quo non cumque! Facere nihil est sapiente neque.</p>
    </div>
    );
}