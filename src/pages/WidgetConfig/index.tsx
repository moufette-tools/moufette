import React, { useEffect } from 'react'
import { Form, Input, Button, Select } from 'antd';
import { useMutation, useQuery } from '@apollo/client';

import { UPDATE_WIDGET } from './mutation'
import { WIDGET } from './query'

const { Option } = Select;
const layout = {
   labelCol: {
      span: 4,
   },
   wrapperCol: {
      span: 20,
   },
};
const tailLayout = {
   wrapperCol: {
      offset: 4,
      span: 20,
   },
};

const WidgetConfig = () => {
   const [form] = Form.useForm();

   const [updateWidget] = useMutation(UPDATE_WIDGET)
   const { loading, error, data } = useQuery(WIDGET, {})

   useEffect(() => {
      if (data) {
         form.setFieldsValue(data.widget)
      }
   }, [loading])


   const onFinish = (values: any) => {
      updateWidget({ variables: { config: values } })
   }

   return (
      <Form {...layout} form={form} onFinish={onFinish}>

         <Form.Item
            name="appName"
            label="App Name"
            rules={[
               {
                  required: true,
               },
            ]}
         >
            <Input />
         </Form.Item>

         <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
               Save
             </Button>
         </Form.Item>
      </Form>
   );
};

export default WidgetConfig