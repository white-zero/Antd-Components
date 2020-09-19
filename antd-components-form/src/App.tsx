import React, { useEffect, } from 'react';
import { Form, Icon, Input, Button } from 'antd'
import 'antd/dist/antd.css'
import './App.css';
import { WrappedFormUtils } from 'antd/lib/form/Form';


interface Props {
  form: WrappedFormUtils
}
const App: React.FC<Props> = (props) => {
  const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = props.form;
  // Only show error after a field is touched.`
  const usernameError = isFieldTouched('username') && getFieldError('username');
  const passwordError = isFieldTouched('password') && getFieldError('password');
  useEffect(() => {
    props.form.validateFields()
  },[])
  const handleSubmit = (e:any) => {
    e.preventDefault(); //不会导致重复提交
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  const hasErrors = (fieldsError:any) => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }
  return (
    <Form layout="inline" >
        <Form.Item validateStatus={usernameError ? 'error' : ''} help={usernameError || ''}>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />,
          )}
        </Form.Item>
        <Form.Item validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}>
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
          <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())} onClick={handleSubmit}>
            Log in
          </Button>
        </Form.Item>
      </Form>

  );
}

export default Form.create()(App)
