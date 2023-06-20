import {Space, TimePicker, Typography} from 'antd';
const range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
        result.push(i);
    }
    return result;
};

const disabledDateTime = () => ({
    // disabledHours: () => range(0, 24).splice(4, 20),
    disabledHours : () => range(7, 19),
    disabledMinutes: () => [1, 2, 3, 4, 5],
});

const TimePickerTest = () => {
    return (
        <Space>
            <Typography.Title level={3}>Pick some time</Typography.Title>
            <TimePicker onChange={(value) => console.log(value)} inputReadOnly={true} disabledTime={disabledDateTime} format={"HH:mm"} minuteStep={5}/>
        </Space>
    );
};

export default TimePickerTest;