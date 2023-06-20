import styled from "styled-components";
import './index.css';
import {ConfigProvider, theme} from 'antd';
import {useThemeParams} from "@vkruglikov/react-telegram-web-app";

import locale from 'antd/locale/ru_RU';
import DateChoose from "./components/DateChoose";

import logo from './logo.png';

const Wrapper = styled.div`
  background: var(--tg-theme-bg-color);
  color: var(--tg-theme-text-color) !important;
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
  font-size: calc(10px + 2vmin);
  color: white;

  height: 50vh;
  width: 100vw;

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
            <img src={logo} className="App-logo" alt="logo" />
        </BigHeader>
        <Wrapper>

            <DateChoose/>
        </Wrapper>

        </ConfigProvider>
    )
}

export default App;
