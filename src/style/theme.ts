
// 타입 정의
export type ThemeName = "light" | "dark";
type ColorKey = "primary" | "background";

export interface Theme {
    name : ThemeName;
    color: {
        [key in ColorKey]: string;
        // Record<ColorKey, string>;
    };
}

export const light : Theme= {
    name : 'light',
    color: {
        primary: "brown",
        background: "lightgrey",
    },
};

export const dark : Theme = {
    name : "dark",
    color: {
        primary: "coral",
        background: "midnightblue",
    }
};

export const getTheme = (themeName : ThemeName)=>{
    switch(themeName) {
        case "light":
            return light;
        case "dark":
            return dark;
    }

};