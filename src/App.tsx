import './index.css';
import './components/antd-elements.css';

import {Logo} from "./components/Logo";

import styled from "styled-components";
import {ConfigProvider, theme} from 'antd';
import {useThemeParams} from "@vkruglikov/react-telegram-web-app";
import locale from 'antd/locale/en_US';
import Pages from "./pages/Pages";
import React from "react";
import {BrowserRouter} from "react-router-dom";
import {isTelegramWindow} from "./utils/TelegramWebApp";

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
    return (
        <div>
            {isTelegramWindow && <ConfigProvider
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
            </ConfigProvider>}

            {!isTelegramWindow &&
                <p>Please, open in <a href="t.me/https://t.me/web_app_react_test_bot" target="_blank">Telegram</a></p>}
        </div>
    );
}


export default App;
