import styled from "styled-components";
import './index.css';
import {ConfigProvider, theme} from 'antd';
import {useThemeParams} from "@vkruglikov/react-telegram-web-app";

import locale from 'antd/locale/ru_RU';
import DateChoose from "./pages/DateChoose";

import {Logo} from "./components/Logo";
import {BrowserRouter} from "react-router-dom";


const Wrapper = styled.div`
  
  border-radius: 10px;
  margin: 5px 0;
  padding: 20px;
  box-sizing: border-box;
`


const BigHeader = styled.div`
  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  width: 100vw;
  height:50vh;
  transform: scale(0.5, 0.5);
`


function App() {

    const [colorScheme, themeParams] = useThemeParams();

    return (

        <ConfigProvider
            theme={
                themeParams.text_color
                    ? {
                        algorithm:
                            colorScheme === 'dark'
                                ? theme.darkAlgorithm
                                : theme.defaultAlgorithm,
                        token: {
                            colorText: themeParams.text_color,
                            colorPrimary: themeParams.button_color,
                            colorBgBase: themeParams.bg_color,
                        },
                    }
                    : undefined
            }

            locale={locale}
        >

        <BigHeader>
            {
                colorScheme === "dark" && <Logo fill={"white"}/>
            }

            {colorScheme !== "dark" && <Logo fill={"black"}/>}
        </BigHeader>

        <Wrapper>

            <BrowserRouter>
                <DateChoose/>
            </BrowserRouter>
        </Wrapper>

        </ConfigProvider>
    )
}

export default App;
