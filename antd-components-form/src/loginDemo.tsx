import { Form, Icon, Input, Button, Checkbox, Card, Row } from 'antd';
import React, { useEffect, } from 'react';  
import { WrappedFormUtils } from 'antd/lib/form/Form';
import './loginDemoCss.css'


interface Props {
    form: WrappedFormUtils
  }
const NormalLoginForm: React.FC<Props>=(props)=>{
    const { getFieldDecorator } = props.form;
    const handleSubmit = (e:any) =>{
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
              console.log('Received values of form: ', values);
            }
          });
    }
    return(
        <Form onSubmit={handleSubmit} className="login-form" >
        <Form.Item
                  labelCol={{ span: 7 }}>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)}
          <a className="login-form-forgot" href=""style={{marginLeft:50}}>
            Forgot password
          </a>
          <Button type="primary" htmlType="submit" className="login-form-button" size="large">
            Log in
          </Button>
          Or <a href="">register now!</a>
        </Form.Item>
      </Form>
    )
}
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);


export default  WrappedNormalLoginForm;