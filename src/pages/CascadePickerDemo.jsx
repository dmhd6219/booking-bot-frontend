import React, {useState} from 'react'
import {Button, CascadePicker} from "antd-mobile";

function CascadePickerDemo() {
    const [visible, setVisible] = useState(false)

    const [options,] = useState([
        {
            label: 'A',
            value: 'A',
            children: [
                {
                    label: 'A1',
                    value: 'A1',
                },
                {
                    label: 'A2',
                    value: 'A2',
                }
            ],
        },
        {
            label: 'B',
            value: 'B',
            children: [
                {
                    label: 'B1',
                    value: 'B1',
                },
                {
                    label: 'B2',
                    value: 'B2',
                }
            ],
        },
    ])

    return (
        <>
            <Button
                onClick={() => {
                    setVisible(true)
                }}
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
