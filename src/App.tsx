import './index.css';
import './components/antd-elements.css';

import {Logo} from "./components/Logo";
import Pages from "./pages/Pages";

import React from "react";
import {BrowserRouter} from "react-router-dom";
import styled from "styled-components";
import {ConfigProvider, theme} from 'antd';
import {useThemeParams} from "@vkruglikov/react-telegram-web-app";
import locale from 'antd/locale/en_US';
import {isDebug, isTelegramWindow} from "./utils/TelegramWebApp";

const Wrapper = styled.div`
  padding: 20px;
`;

const BigHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100vw;
  height: 50vh;
  transform: scale(0.5, 0.5);
`;

function App(): JSX.Element {
    const [colorScheme, themeParams] = useThemeParams();

    if (!isTelegramWindow && !isDebug) {
        return <p>Open Telegram Web App!!!</p>
    }

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
                <Logo lang="en" fill={colorScheme === "dark" ? "white" : "black"}/>
            </BigHeader>
            <Wrapper>
                <BrowserRouter>
                    <Pages/>
                </BrowserRouter>
            </Wrapper>
        </ConfigProvider>
    );
}


export default App;
