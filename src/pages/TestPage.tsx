import React from 'react'
import {Button} from "antd";
import {sendNotification} from "../utils/Notifications";

export default function TestPage() {

    return (
        <div>
            <Button onClick={() => sendNotification()}></Button>
        </div>
    )
}
