import React from 'react'
import { Form, Input, Button, Checkbox, Row, Col } from 'antd';
import { useQuery, useMutation } from '@apollo/client';
import {
   useHistory,
   useLocation
} from "react-router-dom";

import styled from 'styled-components/macro'

import { LOGIN } from './mutation'
import { USER } from '../../apollo/queries'

const layout = {
   labelCol: { span: 8 },
   wrapperCol: { span: 16 },
};

const tailLayout = {
   wrapperCol: {
      offset: 8,
      span: 16,
   },
};

const Demo = () => {

   const [login] = useMutation(LOGIN);
   let history = useHistory();
   let location = useLocation();

   const onFinish = (values: any) => {
      console.log('Success:', values);
      login({
         variables: values,
         update(cache, { data: { login } }) {
            cache.writeQuery({
               query: USER,
               data: { currentUser: login.user },
            });
         }
      }).then(() => {
         let { from } = location.state || { from: { pathname: "/" } } as any;
         history.replace(from);
      }).catch(console.log)
   };

   const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
   };

   return (
      <Row justify="center" align="middle" css={`height: 100%`}>
         <Form
            {...layout}
            name="basic"
            initialValues={{
               remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
         >
            <Form.Item
               label="Email"
               name="email"
               rules={[
                  {
                     required: true,
                     message: 'Please input your email!',
                  },
               ]}
            >
               <Input />
            </Form.Item>

            <Form.Item
               label="Password"
               name="password"
               rules={[
                  {
                     required: true,
                     message: 'Please input your password!',
                  },
               ]}
            >
               <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
               <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item {...tailLayout}>
               <Button type="primary" htmlType="submit">
                  Submit
        </Button>
            </Form.Item>
         </Form>
      </Row>
   );
};

export default Demo