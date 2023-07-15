import './index.css';
import './components/antd-elements.css';

import {Logo} from "./components/Logo";

import styled from "styled-components";
import {ConfigProvider, theme} from 'antd';
import {useThemeParams} from "@vkruglikov/react-telegram-web-app";
import Pages from "./pages/Pages";
import React, {useEffect, useState} from "react";
import {BrowserRouter, Link} from "react-router-dom";
import {isTelegramWindow, lang, tg} from "./utils/TelegramWebApp";
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
  height: 30vh;
  transform: scale(0.5, 0.5);
`;

const Centered = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`

function App(): JSX.Element {
    const [colorScheme, themeParams] = useThemeParams();


    const locale: Locale = lang === "ru" ? ruRU : enUS;

    const [active, setActive] = useState(true);

    useEffect( () => {
        getUsersEmailByTgId(tg.initDataUnsafe.user.id.toString()).then(r => {
            if (r === undefined){
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
                <Centered>
                    <p>{LOCALE[lang].App.TelegramWebAppError} <Link to="t.me/https://t.me/InnoBooking_bot">Telegram</Link></p>
                    <img src="https://media.tenor.com/-aMDPDf-wY4AAAAd/floppa.gif" alt="Just useless photo for fun"/>
                </Centered>
            }

            {!active &&
                <Centered>
                    <p>{LOCALE[lang].App.TelegramUserError}</p>
                    <img src="https://media.tenor.com/-aMDPDf-wY4AAAAd/floppa.gif" alt="Just useless photo for fun"/>
                </Centered>
            }
        </div>
    );
}


export default App;
