import styled from "styled-components";
import './index.css'
import MainButtonDemo from "./components/MainButtonDemo";
import {ConfigProvider, theme} from 'antd';
import {useThemeParams} from "@vkruglikov/react-telegram-web-app";
import ShowPopupDemo from "./components/ShowPopupDemo";
import TimePickerTest from "./components/TimePickerTest";

import locale from 'antd/locale/ru_RU';

const Wrapper = styled.div`
  background: var(--tg-theme-bg-color);
  color: var(--tg-theme-text-color) !important;
  border-radius: 10px;
  margin: 5px 0;
  padding: 20px;
  box-sizing: border-box;
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
        <Wrapper>
            <MainButtonDemo/>

            <ShowPopupDemo />

            <TimePickerTest/>
        </Wrapper>

        </ConfigProvider>
    )
}

export default App;
