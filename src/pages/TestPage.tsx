import React from 'react'
import {Card, Typography} from "antd";
import styled from "styled-components";
import {getUsers, setNewUser} from "../Firebase";

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
export default function TestPage() {
    return (
        <div>
            <CenteredTitle>TEST</CenteredTitle>
            <CenteredSpace>
                <CardWithPadding title="Get Users" style={{width: 300}}>
                    <button onClick={() => console.log(getUsers().then((r) => {
                        console.log(r)
                    }))}>Press to get all users
                    </button>
                </CardWithPadding>

                <CardWithPadding title="Get Users" style={{width: 300}}>
                    <button onClick={() => setNewUser()}>Press to set a new User</button>
                </CardWithPadding>
            </CenteredSpace>
        </div>
    )
}

