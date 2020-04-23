import React from 'react'
import { Form, Input, Button, Checkbox, Row, Col } from 'antd';
import { useQuery, useMutation } from '@apollo/client';
import {
   useHistory,
   useLocation
} from "react-router-dom";

import styled from 'styled-components/macro'

import { SIGNUP } from './mutation'
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

   const [signup] = useMutation(SIGNUP);
   let history = useHistory();
   let location = useLocation();

   const onFinish = (values: any) => {
      console.log('Success:', values);
      signup({
         variables: values,
         update(cache, { data: { signup } }) {
            cache.writeQuery({
               query: USER,
               data: { currentUser: signup.user },
            });
         }
      }).then(() => {
         history.replace({ pathname: "/" });
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
               label="First Name"
               name="firstName"
               rules={[
                  {
                     required: true,
                     message: 'Please input your first name!',
                  },
               ]}
            >
               <Input />
            </Form.Item>
            <Form.Item
               label="Last Name"
               name="lastName"
               rules={[
                  {
                     required: true,
                     message: 'Please input your last name!',
                  },
               ]}
            >
               <Input />
            </Form.Item>
            <Form.Item
               label="Company"
               name="companyName"
               rules={[
                  {
                     required: true,
                     message: 'Please input your company name!',
                  },
               ]}
            >
               <Input />
            </Form.Item>
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