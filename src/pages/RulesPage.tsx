import React, {useEffect, useState} from 'react'
import {Card, Typography} from "antd";
import styled from "styled-components";
import {Link, useNavigate} from "react-router-dom";
import {isTelegramWindow, lang, tg} from "../utils/TelegramWebApp";
import {BackButton} from "@vkruglikov/react-telegram-web-app";
import {LOCALE} from "../utils/Utils";

const CenteredSpace = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
`

const CenteredTitle = styled(Typography.Title)`
  text-align: center;
`

const CardWithPadding = styled(Card)`
  margin-top: 5px;
  margin-bottom: 5px;
`
export default function RulesPage() {
    const navigate = useNavigate();
    const [buttonState,] = useState<{ show: boolean }>({show: true});

    useEffect(() => {
        console.log("opened 1st time");
        if (isTelegramWindow) {
            tg.expand();
        }
    }, []);

    return (
        <div>
            {buttonState.show &&
                <BackButton onClick={() => {
                    navigate("/")
                }}/>
            }

            <CenteredTitle>{LOCALE[lang].Rules.Title}</CenteredTitle>
            <CenteredSpace>
                <CardWithPadding title={LOCALE[lang].Rules.FirstRule.Title} style={{width: 300}}>
                    <p>{LOCALE[lang].Rules.FirstRule.FirstParagraph}</p>
                    <p>{LOCALE[lang].Rules.FirstRule.SecondParagraph}</p>
                </CardWithPadding>
                <CardWithPadding title={LOCALE[lang].Rules.SecondRule.Title} extra={<Link to="#">{LOCALE[lang].Rules.SecondRule.Button}</Link>}
                                 style={{width: 300}}>
                    <p>{LOCALE[lang].Rules.SecondRule.FirstParagraph}</p>
                    <p>{LOCALE[lang].Rules.SecondRule.SecondParagraph}"</p>
                </CardWithPadding>
                <CardWithPadding title={LOCALE[lang].Rules.ThirdRule.Title} style={{width: 300}}>
                    <p>{LOCALE[lang].Rules.ThirdRule.FirstParagraph}</p>
                    <p>{LOCALE[lang].Rules.ThirdRule.SecondParagraph}</p>
                </CardWithPadding>
                <CardWithPadding title={LOCALE[lang].Rules.FourthRule.Title} style={{width: 300}}>
                    <p>{LOCALE[lang].Rules.FourthRule.FirstParagraph}</p>
                    <p>{LOCALE[lang].Rules.FourthRule.SecondParagraph}</p>
                </CardWithPadding>
            </CenteredSpace>
        </div>
    )
}

