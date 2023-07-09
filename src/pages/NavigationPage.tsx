import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import {Button, Typography} from "antd";
import styled from "styled-components";
import {tg} from "../utils/TelegramWebApp";
import {LOCALE} from "../utils/Utils";

const CenteredSpace = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
`;

const CenteredTitle = styled(Typography.Title)`
  text-align: center;
`;

const BlockButton = styled(Button)`
  margin-top: 2vh;
  height: 7vh;
  // background-color: #207ae4;
`;

const BlockLink = styled(Link)`
  display: block;
  width: 100%;
`;

const NavigationPage = () => {
    const lang : "en" | "ru" = tg.initDataUnsafe.user.language_code === "ru" ? "ru" : "en";

    useEffect(() => {
        tg.BackButton.hide();
    }, []);

    return (
        <div>
            <CenteredSpace>
                <CenteredTitle>{LOCALE[lang].Navigation.Title}</CenteredTitle>
                <BlockLink to="/book">
                    <BlockButton type="default" block>
                        {LOCALE[lang].Navigation.Book}
                    </BlockButton>
                </BlockLink>
                <BlockLink to="/rooms">
                    <BlockButton type="default" block disabled>
                        {LOCALE[lang].Navigation.All}
                    </BlockButton>
                </BlockLink>
                <BlockLink to="/my">
                    <BlockButton type="default" block>
                        {LOCALE[lang].Navigation.My}
                    </BlockButton>
                </BlockLink>
                <BlockLink to="/rules">
                    <BlockButton type="default" block>
                        {LOCALE[lang].Navigation.Rules}
                    </BlockButton>
                </BlockLink>
            </CenteredSpace>
        </div>
    );
};

export default NavigationPage;
