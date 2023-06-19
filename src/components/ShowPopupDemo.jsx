import { Button, Form, Input, Typography } from 'antd';
import { useState } from 'react';
import {
    useShowPopup,
} from '@vkruglikov/react-telegram-web-app';

const ShowPopupDemo = () => {
    const showPopup = useShowPopup();
    const [popupState, setPopupState] = useState({title: 'title', message: 'message',});
    const onFinish = (values) => {
        setPopupState(values);
        showPopup({
            ...values,
            buttons: [
                {
                    text: 'fine',
                    type: 'ok',
                },
                // {
                //     type: 'close',
                // },
                {
                    type: 'destructive',
                    text: 'cancel',
                },
            ],
        }).catch(e => {
            showPopup({
                title: 'error',
                message: e,
            });
        });
    };

    return (
        <>
            <Typography.Title level={3}>useShowPopup</Typography.Title>
            <Form
                labelCol={{ span: 6 }}
                name="basic"
                layout="horizontal"
                initialValues={popupState}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item label="title" name="title">
                    <Input />
                </Form.Item>

                <Form.Item label="message" name="message">
                    <Input />
                </Form.Item>

                <Form.Item>
                    <Button block type="primary" htmlType="submit">
                        Show popup
                    </Button>
                </Form.Item>

            </Form>
        </>
    );
};
export default ShowPopupDemo;