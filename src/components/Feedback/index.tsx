import React, { useState } from 'react'
import { Popover, Button, Form, Input, message } from 'antd'
import styled from 'styled-components'
import { MessageOutlined } from '@ant-design/icons';
import { useQuery, useMutation } from '@apollo/client';


import { FEEDBACK_MUTATION } from '../../apollo/mutations';

const Floating = styled.div`
  position: fixed;
  right: 10px;
  margin: 10px;
  bottom: 10px;
`;

const Feedback = () => {
   const [form] = Form.useForm();
   const [canSend, setCanSend] = useState(false)
   const [loading, setLoading] = useState(false)


   const [feedback] = useMutation(FEEDBACK_MUTATION);

   const sendFeedback = () => {
      form.validateFields().then(values => {
         setLoading(true)
         form.resetFields()
         feedback({
            variables: {
               message: values.message
            },
         }).then(({ data }) => {
            message.success('Thank you for your feedback. You Rock!', 5);
            setLoading(false)
         }).catch(e => {
            setLoading(false)
            console.log(e)
         })
      }).catch(console.log)
   }

   return (
      <Floating>
         <Popover
            placement="topRight"
            title="Feedback"
            trigger="click"
            content={
               <Form form={form} layout="vertical" hideRequiredMark>
                  <Form.Item name="message">
                     <Input.TextArea
                        onChange={e => setCanSend(!!e.target.value)}
                        rows={6}
                        placeholder="What do you like, what you don't. Is there anything missing you think should be added?"
                     />
                  </Form.Item>
                  <Form.Item>
                     <Button disabled={!canSend} loading={loading} htmlType="submit" onClick={sendFeedback} type="primary">
                        Send
                     </Button>
                  </Form.Item>
               </Form>
            }
         >
            <Button type="primary" shape="circle" icon={<MessageOutlined />} size="large" />
         </Popover>
      </Floating>
   )
}

export default Feedback