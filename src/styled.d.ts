import "styled-components";
import { Theme } from "./style/theme";


declare module "styled-components" { // styled-components 라이브러리 타입 정의를 추가로 바꾸겠다
  export interface DefaultTheme extends Theme{};
}
