import { createContext, ReactNode, useState } from "react";
import { getTheme, ThemeName } from "../style/theme";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "../style/global";

interface State {
    themeName : ThemeName;
    toggleTheme: () => void;
}

export const state = {
    themeName: "light" as ThemeName,
    toggleTheme: ()=> {},
}

export const ThemeContext = createContext<State>(state);


export const BookStoreThemeProvider = ({children}:
    {children : ReactNode})=>{

        const [themeName, setThemeName] = useState<ThemeName>("light");
        
        const toggleTheme = ()=> {
            setThemeName(themeName === 'light' ? 'dark' : 'light');
        }

        return(
            <ThemeContext.Provider value={{themeName, toggleTheme}}>
                <ThemeProvider theme={getTheme(themeName)}> {/* 스위치 상태에 맞는 테마 객체 갖고옴 */}
                    <GlobalStyle themeName={themeName}/>
                    {children}
                </ThemeProvider>
            </ThemeContext.Provider>
        )
    }
