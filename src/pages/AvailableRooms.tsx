import React, {useEffect, useState} from 'react'
import {List, Typography} from "antd";
import {BackButton} from "@vkruglikov/react-telegram-web-app";
import {useNavigate} from "react-router-dom";
import {isTelegramWindow, lang, tg} from "../utils/TelegramWebApp";
import styled from "styled-components";
import {LOCALE} from "../utils/Utils";
import {AvailableRoomOption, getAvailableRoomOptions} from "../utils/BookingApi";

const CenteredTitle = styled(Typography.Title)`
  text-align: center;
`

export default function AvailableRooms() {
    const navigate = useNavigate();
    const [buttonState,] = useState<{ show: boolean }>({show: true});

    const [rooms, setRooms] = useState<AvailableRoomOption[]>([]);
    const [loadingRooms, setLoadingRooms] = useState<boolean>(true);

    useEffect(() => {
        if (isTelegramWindow) {
            tg.expand();
        }

        getAvailableRoomOptions().then((r: AvailableRoomOption[]) => {
            setRooms(r);
            setLoadingRooms(false);
        });
    }, []);

    return (
        <div>
            {buttonState.show &&
                <BackButton onClick={() => {
                    navigate("/")
                }}/>
            }

            <CenteredTitle>{LOCALE[lang].Rooms.Title}</CenteredTitle>

            <List
                bordered
                dataSource={rooms}
                renderItem={(item) => (
                    <List.Item>
                        <List.Item.Meta
                            title={item.title}
                            description={item.capacity}
                        />
                    </List.Item>
                )}
                loading={loadingRooms}
            />
        </div>

    )
}

