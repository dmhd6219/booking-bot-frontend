import {Button, Form, Typography, Select} from 'antd';
import {useState} from 'react';
import {useHapticFeedback} from '@vkruglikov/react-telegram-web-app';

const HapticFeedbackDemo = () => {
    const notificationOccurred = useHapticFeedback()[2];
    const [style, setStyle] = useState('light');
    const [type, setType] = useState('error');

    return (
        <>
            <Typography.Title level={3}>useHapticFeedback</Typography.Title>
            <Form
                name="basic"
                layout="horizontal"
                autoComplete="off"
            >
                <Form.Item label="style">
                    <Select value={style} onChange={value => setStyle(value)}>
                        <Select.Option value="light">light</Select.Option>
                        <Select.Option value="medium">medium</Select.Option>
                        <Select.Option value="heavy">heavy</Select.Option>
                        <Select.Option value="rigid">rigid</Select.Option>
                        <Select.Option value="soft">soft</Select.Option>
                    </Select>
                </Form.Item>


                <Form.Item label="type">
                    <Select value={type} onChange={value => setType(value)}>
                        <Select.Option value="error">error</Select.Option>
                        <Select.Option value="success">success</Select.Option>
                        <Select.Option value="warning">warning</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item>
                    <Button block type="primary" onClick={() => notificationOccurred(type)}>
                        notificationOccurred
                    </Button>
                </Form.Item>

            </Form>
        </>
    );
};
export default HapticFeedbackDemo;