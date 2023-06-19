import {Space, TimePicker, Typography} from 'antd';


const TimePickerTest = () => {
    return (
        <Space>
            <Typography.Title level={3}>Pick some time</Typography.Title>
            <TimePicker onChange={(value) => console.log(value)} inputReadOnly={true}/>
        </Space>
    );
};

export default TimePickerTest;