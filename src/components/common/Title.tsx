import styled from "styled-components"
import { ColorKey, HeadingSize } from "../../style/theme";

interface Props {
    children : React.ReactNode;
    size: HeadingSize;
    color?: ColorKey;
}

export const Title = ({children, size, color}: Props) => {
    return (
    <TitleStyle size={size} color={color}>
        {children}
    </TitleStyle>
    );
}

// children은 React의 기본 props라서 따로 정의 안 해도 항상 존재
const TitleStyle = styled.h1<Omit<Props, "children">>`
    font-size: ${({theme, size})=> theme.heading[size].fontSize};
    color: ${({theme, color})=> color ? 
    theme.color[color] : theme.color.primary};
`;

export default Title;