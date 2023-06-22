import React, {useState} from 'react'
import {Button, CascadePicker} from "antd-mobile";
import {tg} from "../tg";

function CascadePickerDemo() {
    const [visible, setVisible] = useState(false)

    const [options,] = useState([
        {
            label: '01',
            value: '01',
            children: [
                {
                    label: '00',
                    value: '00',
                },
                {
                    label: '30',
                    value: '30',
                }
            ],
        },
        {
            label: '20',
            value: '20',
            children: [
                {
                    label: '00',
                    value: '00',
                },
                {
                    label: '30',
                    value: '30',
                }
            ],
        },
    ])

    return (
        <>
            <Button
                onClick={() => {
                    setVisible(true);
                    console.log(tg);
                }}
                color="primary"
            >
                WHAT
            </Button>
            <CascadePicker
                title='Picker'
                options={options}
                visible={visible}
                onClose={() => {
                    setVisible(false)
                }}
                onSelect={() => {console.log("Select")}}
                onConfirm={() => {console.log("Confirm")}}
            />
        </>
    )
}

export default CascadePickerDemo
