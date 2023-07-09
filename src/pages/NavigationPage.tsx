import React from "react";
import { Link } from "react-router-dom";
import { Button, Typography } from "antd";
import styled from "styled-components";

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
  return (
    <div>
      <CenteredSpace>
        <CenteredTitle>Navigation</CenteredTitle>
        <BlockLink to="/">
          <BlockButton type="default" block>
            Book a room
          </BlockButton>
        </BlockLink>
        <BlockLink to="/rules">
          <BlockButton type="default" block>
            All bookings
          </BlockButton>
        </BlockLink>
        <BlockLink to="/rules">
          <BlockButton type="default" block>
            My bookings
          </BlockButton>
        </BlockLink>
        <BlockLink to="/rules">
          <BlockButton type="default" block>
            Map
          </BlockButton>
        </BlockLink>

        <BlockLink to="/rules">
          <BlockButton type="default" block>
            Rules
          </BlockButton>
        </BlockLink>
      </CenteredSpace>
    </div>
  );
};

export default NavigationPage;