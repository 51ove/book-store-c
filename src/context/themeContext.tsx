import { createContext, ReactNode, useEffect, useState } from "react";
import { getTheme, ThemeName } from "../style/theme";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "../style/global";

const DEFAULT_THEME_NAME = "light";
const THEME_LOCALSTORAGE_KEY = "book_store_theme";

interface State {
    themeName : ThemeName;
    toggleTheme: () => void;
}

export const state = {
    themeName: "light" as ThemeName,
    toggleTheme: ()=> {},
}

// ThemeContext
export const ThemeContext = createContext<State>(state);


export const BookStoreThemeProvider = ({children}:
    {children : ReactNode})=>{

        const [themeName, setThemeName] = useState<ThemeName>("light");
        
        const toggleTheme = ()=> {
            setThemeName(themeName === 'light' ? 'dark' : 'light');
            // 로컬 스토리지에 저장
            localStorage.setItem(THEME_LOCALSTORAGE_KEY,themeName === 'light' ? 'dark' : 'light');
        };

        // 처음 실행 시에
        useEffect(()=>{
            const savedThemeName = localStorage.getItem(THEME_LOCALSTORAGE_KEY) as ThemeName;
            
            setThemeName(savedThemeName || DEFAULT_THEME_NAME);
        }, []);

        return(
            <ThemeContext.Provider value={{themeName, toggleTheme}}>
                <ThemeProvider theme={getTheme(themeName)}> {/* 스위치 상태에 맞는 테마 객체 갖고옴 */}
                    <GlobalStyle themeName={themeName}/>
                    {children}
                </ThemeProvider>
            </ThemeContext.Provider>
        );
    };

