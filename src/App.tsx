import './index.css';
import './components/antd-elements.css';

import {Logo} from "./components/Logo";

import styled from "styled-components";
import {ConfigProvider, theme} from 'antd';
import {useThemeParams} from "@vkruglikov/react-telegram-web-app";
import Pages from "./pages/Pages";
import React, {useEffect, useState} from "react";
import {BrowserRouter} from "react-router-dom";
import {isTelegramWindow, tg} from "./utils/TelegramWebApp";
import {LOCALE} from "./utils/Utils";
import enUS from 'antd/locale/en_US';
import ruRU from 'antd/locale/ru_RU';
import {Locale} from "antd/es/locale";
import {getUsersEmailByTgId} from "./utils/Firebase";


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

    const lang: "en" | "ru" = tg.initDataUnsafe.user.language_code === "ru" ? "ru" : "en";

    const locale: Locale = lang === "ru" ? ruRU : enUS;

    const [active, setActive] = useState(true);

    useEffect( () => {
        getUsersEmailByTgId(tg.initDataUnsafe.user).then(r => {
            if (r === undefined){
                console.log(tg.initDataUnsafe.user);
                comsole.log("---")
                console.log(tg.initDataUnsafe);
                setActive(false);
            }
        });
    }, [])

    return (
        <div>
            {isTelegramWindow && active && <ConfigProvider
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
                    <Logo lang={tg.initDataUnsafe.user.language_code}
                          fill={colorScheme === "dark" ? "white" : "black"}/>
                </BigHeader>
                <Wrapper>
                    <BrowserRouter>
                        <Pages/>
                    </BrowserRouter>
                </Wrapper>
            </ConfigProvider>}

            {!isTelegramWindow &&
                <p>{LOCALE[lang].App.TelegramWebAppError} <a href="t.me/https://t.me/web_app_react_test_bot"
                                                             target="_blank">Telegram</a></p>}

            {!active &&
                <p>{LOCALE[lang].App.TelegramUserError}</p>}
        </div>
    );
}


export default App;
