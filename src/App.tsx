import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import { BookStoreThemeProvider } from "./context/themeContext";

function App() {

  // // 현재 테마 스위치 상태
  // const [themeName, setThemeName] = useState<ThemeName>('light');
  
  return (
    <>
      <BookStoreThemeProvider> {/* 먼저 렌더링 됨. 이 안에서 Context 값을 만든 뒤 자식 컴포넌트들이 그 값을 사용 */}
        <Layout children={<Home/>}/>
      </BookStoreThemeProvider>
    </>
  );
}

export default App;
