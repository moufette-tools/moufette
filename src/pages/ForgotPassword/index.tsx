import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, Input, Button, Checkbox, Row, Col } from 'antd';
import { useQuery, useMutation } from '@apollo/client';
import {
   useHistory,
   useLocation
} from "react-router-dom";

import styled from 'styled-components/macro'
import { useForgotPassword } from '../../hooks/user'


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

   const [forgotPassword] = useForgotPassword()
   const [isSent, setIsSent] = useState(false)

   const onFinish = ({ email }: any) => {
      forgotPassword({
         variables: { email },
      }).then(() => {
         setIsSent(true)
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

            {
               isSent && <Form.Item {...tailLayout}>
                  Check you inbox
               </Form.Item>
            }

            <Form.Item {...tailLayout}>
               <Button type="primary" htmlType="submit">
                  Send
               </Button>
            </Form.Item>

            <Form.Item {...tailLayout}>
               <Link to="/login">Login</Link>
            </Form.Item>
         </Form>

      </Row>
   );
};

export default Demo