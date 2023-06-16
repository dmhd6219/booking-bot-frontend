import React, {Component} from 'react';
import {Form, Input, Switch, Typography} from "antd";
import styled from "styled-components";

const StyledTitle = styled(Typography.Title)`
  color: var(--tg-theme-text-color);
`;
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
                <StyledTitle level={3}>MainButton</StyledTitle>
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