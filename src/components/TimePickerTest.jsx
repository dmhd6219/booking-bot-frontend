import {DatePicker, Select, Space, TimePicker, Typography} from 'antd';
import { useState } from 'react';
const { Option } = Select;

const PickerWithType = ({ type, onChange }) => {
    if (type === 'time') return <TimePicker onChange={onChange} />;
    if (type === 'date') return <DatePicker onChange={onChange} />;
    return <DatePicker picker={type} onChange={onChange} />;
};


const TimePickerTest = () => {
    const [type, setType] = useState('time');
    return (
        <Space>
            <Typography.Title level={3}>Pick some time</Typography.Title>
            <TimePicker onChange={(value) => console.log(value)} inputReadOnly={true}/>
        </Space>
    );
};

export default TimePickerTest;