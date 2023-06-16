import React, {useState, useEffect, Component} from 'react';
import { MainButton, BackButton } from '@vkruglikov/react-telegram-web-app';
import {Form, Input, Switch, Typography} from "antd";

class MainButtonDemo extends Component{
    state = {
        progress: false,
    };

    handleChange = (event) => {
        this.setState({
            progress: event,
        });
    };

    render(){
        return (
            <div>
                <Typography.Title level={3}>MainButton</Typography.Title>
                <Form
                    labelCol={{ span: 6 }}
                    name="basic"
                    layout="horizontal"
                    autoComplete="off"
                >
                    <Form.Item label="Text" name="text">
                        <Input disabled />
                    </Form.Item>

                    <Form.Item name="progress" label="progress" valuePropName="checked">
                        <Switch onChange={this.handleChange}/>
                    </Form.Item>

                </Form>
            </div>
        );
    }
}

export default MainButtonDemo;