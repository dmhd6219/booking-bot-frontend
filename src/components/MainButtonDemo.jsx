import React, {Component, useState} from 'react';
import {Form, Input, Switch, Typography} from "antd";

function MainButtonDemo() {

    const [progress, setProgress] = useState(false);

    const handleChange = (event) => {
        setProgress(event);
    };

    return (
        <div>
            <Typography.Title level={3}>MainButton</Typography.Title>
            <Form
                labelCol={{span: 6}}
                name="basic"
                layout="horizontal"
                autoComplete="off"
            >
                <Form.Item label="Text" name="text">
                    <Input disabled/>
                </Form.Item>

                <Form.Item name="progress" label="progress" valuePropName="checked">
                    <Switch onChange={handleChange}/>
                </Form.Item>

                {progress && <p>Sus text</p>}

            </Form>
        </div>
    );
}

export default MainButtonDemo;