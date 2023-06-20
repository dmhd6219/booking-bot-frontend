import React from 'react'
import {Select, TimePicker, Typography} from "antd";
import {WidthSelect} from "../WidthSelect";
import {disabledDateTime} from "../TimeDisabler";

function ByEndTime() {
    return (
        <div id={"sort-by-end-time"}>
            <Typography.Title>Select Date</Typography.Title>
            <WidthSelect onChange={value => console.log(value)} size={"large"}>
                <Select.Option value="20.06.2022">20.06.2022</Select.Option>
                <Select.Option value="21.06.2022">21.06.2022</Select.Option>
                <Select.Option value="22.06.2022">22.06.2022</Select.Option>
            </WidthSelect>

            <Typography.Title>Select Time of End</Typography.Title>
            <TimePicker onChange={(value) => console.log(value)} inputReadOnly={true}
                        disabledTime={disabledDateTime} format={"HH:mm"} minuteStep={5} size={"large"}/>

            <Typography.Title>Select Time of Booking</Typography.Title>
            <WidthSelect onChange={value => console.log(value)} options={[
                {value: '30', label: '30 Minutes'},
                {value: '60', label: '1 Hour'},
                {value: '90', label: '1.5 Hours'},
                {value: '120', label: '2 Hours'},
                {value: '150', label: '2.5 Hours'},
                {value: '180', label: '3 Hours'},
            ]} size={"large"}/>

            <Typography.Title>Select Room</Typography.Title>
            <WidthSelect onChange={value => console.log(value)} options={[
                {value: '304', label: '304'},
            ]} size={"large"}/>

        </div>
    )
}

export default ByEndTime
