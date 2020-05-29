import React, { useEffect } from 'react'
import { Form, Input, Button, Checkbox, message } from 'antd';

import { useResetPassword } from '../../hooks/user'

const layout = {
   labelCol: { span: 4 },
   wrapperCol: { span: 4 },
};
const tailLayout = {
   wrapperCol: { offset: 4, span: 8 },
};

const Setup = ({ currentUser }: any) => {

   const [resetPassword] = useResetPassword()

   const onFinish = ({ password }: any) => {
      resetPassword({ variables: { password } })
         .then(() => {
            message.success('Updated!');
         })
         .catch(console.log)
   };

   const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
   };
   return (
      <Form
         {...layout}
         name="basic"
         initialValues={{ remember: true }}
         onFinish={onFinish}
         onFinishFailed={onFinishFailed}
      >
         <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
         >
            <Input.Password />
         </Form.Item>

         <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
               Update
            </Button>
         </Form.Item>
      </Form>
   )
}

export default Setup