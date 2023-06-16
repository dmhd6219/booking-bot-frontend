import React, {Component} from 'react';
import {Form, Input, Switch, Typography} from "antd";
import styled from "styled-components";

const TgColorConstants = styled.div`
  background: var(--tg-theme-bg-color);
  color: var(--tg-theme-text-color) !important;
`
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
            <TgColorConstants>
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
            </TgColorConstants>
        );
    }
}

export default MainButtonDemo;