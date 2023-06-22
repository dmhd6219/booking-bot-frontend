import styled from "styled-components";
import './index.css';
import {ConfigProvider, theme} from 'antd';
import {useThemeParams} from "@vkruglikov/react-telegram-web-app";

import locale from 'antd/locale/en_US';
import DateChooseOld from "./pages/DateChooseOld";

import {Logo} from "./components/Logo";
import {BrowserRouter} from "react-router-dom";


const Wrapper = styled.div`

  padding: 20px;

`


const BigHeader = styled.div`

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100vw;
  height: 50vh;
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
                <Logo lang={"en"} fill={colorScheme === "dark" ? "white" : "black"}/>
            </BigHeader>

            <Wrapper>

                <BrowserRouter>
                    <DateChooseOld/>
                </BrowserRouter>

            </Wrapper>

        </ConfigProvider>
    )
}

export default App;