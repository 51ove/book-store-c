import { getTheme } from "@/style/theme";
import { useEffect, useState } from "react"

export const useMediaQuery = () => {
    // 지금 화면이 ~px 이하인지 
    // .matches -> 결과값
    const [isMobile, setIsMobile] = useState(window.matchMedia(
        getTheme("light").mediaQuery.mobile).matches);

    useEffect(() => {
        const isMobileQuery = window.matchMedia(
        getTheme("light").mediaQuery.mobile)

        setIsMobile(isMobileQuery.matches);
    },[]);

    return{ isMobile }
}