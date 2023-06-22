import React, {useState} from 'react'
import {Button, CascadePicker} from "antd-mobile";
import {tg} from "../tg";

function CascadePickerDemo() {
    const [visible, setVisible] = useState(false)

    const [options,] = useState([
        {
            label: '00',
            value: '00',
            children: [
                {
                    label: '00',
                    value: '00',
                },
                {
                    label: '15',
                    value: '15',
                },
                {
                    label: '30',
                    value: '30',
                },
                {
                    label: '45',
                    value: '45',
                },
            ],
        },
        {
            label: '01',
            value: '01',
            children: [
                {
                    label: '00',
                    value: '00',
                },
                {
                    label: '15',
                    value: '15',
                },
                {
                    label: '30',
                    value: '30',
                },
                {
                    label: '45',
                    value: '45',
                },
            ],
        },
        {
            label: '02',
            value: '02',
            children: [
                {
                    label: '00',
                    value: '00',
                },
                {
                    label: '15',
                    value: '15',
                },
                {
                    label: '30',
                    value: '30',
                },
                {
                    label: '45',
                    value: '45',
                },
            ],
        },
        {
            label: '03',
            value: '03',
            children: [
                {
                    label: '00',
                    value: '00',
                },
                {
                    label: '15',
                    value: '15',
                },
                {
                    label: '30',
                    value: '30',
                },
                {
                    label: '45',
                    value: '45',
                },
            ],
        },
        {
            label: '04',
            value: '04',
            children: [
                {
                    label: '00',
                    value: '00',
                },
                {
                    label: '15',
                    value: '15',
                },
                {
                    label: '30',
                    value: '30',
                },
                {
                    label: '45',
                    value: '45',
                },
            ],
        },
        {
            label: '05',
            value: '05',
            children: [
                {
                    label: '00',
                    value: '00',
                },
                {
                    label: '15',
                    value: '15',
                },
                {
                    label: '30',
                    value: '30',
                },
                {
                    label: '45',
                    value: '45',
                },
            ],
        },
        {
            label: '06',
            value: '06',
            children: [
                {
                    label: '00',
                    value: '00',
                },
                {
                    label: '15',
                    value: '15',
                },
                {
                    label: '30',
                    value: '30',
                },
                {
                    label: '45',
                    value: '45',
                },
            ],
        },
        {
            label: '19',
            value: '19',
            children: [
                {
                    label: '00',
                    value: '00',
                },
                {
                    label: '15',
                    value: '15',
                },
                {
                    label: '30',
                    value: '30',
                },
                {
                    label: '45',
                    value: '45',
                },
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
                    label: '15',
                    value: '15',
                },
                {
                    label: '30',
                    value: '30',
                },
                {
                    label: '45',
                    value: '45',
                },
            ],
        },
        {
            label: '21',
            value: '21',
            children: [
                {
                    label: '00',
                    value: '00',
                },
                {
                    label: '15',
                    value: '15',
                },
                {
                    label: '30',
                    value: '30',
                },
                {
                    label: '45',
                    value: '45',
                },
            ],
        },
        {
            label: '22',
            value: '22',
            children: [
                {
                    label: '00',
                    value: '00',
                },
                {
                    label: '15',
                    value: '15',
                },
                {
                    label: '30',
                    value: '30',
                },
                {
                    label: '45',
                    value: '45',
                },
            ],
        },
        {
            label: '23',
            value: '23',
            children: [
                {
                    label: '00',
                    value: '00',
                },
                {
                    label: '15',
                    value: '15',
                },
                {
                    label: '30',
                    value: '30',
                },
                {
                    label: '45',
                    value: '45',
                },
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
                Choose Time
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
