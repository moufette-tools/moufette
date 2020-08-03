import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Select, Divider, Switch, Row, Col, Radio, message } from 'antd';
import { useMutation, useQuery } from '@apollo/client';
import BrowserFrame from "react-browser-frame";
import { TwitterPicker } from 'react-color';

import Widget from 'moufette-widget/src/App'

import { useQueryProperty, useUpdateWidget, useQueryProperties } from '../../hooks/property'

const layout = {
   labelCol: {
      span: 8,
   },
   wrapperCol: {
      span: 16,
   },

};
const tailLayout = {
   wrapperCol: {
      offset: 8,
      span: 12,
   },
};

const WidgetConfig = ({ currentUser }: any) => {
   const [form] = Form.useForm();

   const [dirty, setDirty] = useState(false)
   const [config, setConfig] = useState(null)
   const [updateWidget] = useUpdateWidget()
   const { loading, error, data } = useQueryProperty()

   useEffect(() => {
      if (data) {
         // console.log({ data })
         setConfig({ ...data?.property?.widgetConfig, location: { position: 'absolute' } })
         form.setFieldsValue({ ...data?.property?.widgetConfig })
      }
   }, [loading])

   const onFinish = (values: any) => {
      // console.log(values)
      updateWidget({
         variables: {
            config: values
         }
      }).then(() => {
         message.success('Your awesome widget is ready!');
         setDirty(false)
      })
   }

   return (
      <Row style={{ height: '100%' }}>
         <Col span={12}>
            <Form {...layout} labelAlign="left" form={form} onFinish={onFinish}
               onValuesChange={(v, vv) => {
                  setDirty(true)
                  setConfig(vv as any)
               }}>
               <Form.Item
                  name="header"
                  label="Header"
                  rules={[
                     {
                        required: true,
                     },
                  ]}
               >
                  <Input />
               </Form.Item>

               <Divider orientation="left">
                  Style
               </Divider>

               <Form.Item
                  name={["theme", "colors", "primary"]}
                  label="Primary Color"
                  getValueFromEvent={e => e.hex}
                  valuePropName="color"
                  rules={[
                     {
                        required: true,
                     },
                  ]}
               >
                  {/* <Input /> */}
                  <TwitterPicker triangle="hide" />
               </Form.Item>

               <Form.Item
                  name={["mode", "style"]}
                  label="Mode"
                  valuePropName="value"
                  rules={[
                     {
                        required: true,
                     },
                  ]}
               >
                  <Radio.Group>
                     <Radio.Button value="fab">Floating</Radio.Button>
                     <Radio.Button value="tab">Tab</Radio.Button>
                  </Radio.Group>
               </Form.Item>

               <Form.Item
                  noStyle
                  shouldUpdate={(prevValues, currentValues) => prevValues.mode?.style !== currentValues.mode?.style}
               >
                  {({ getFieldValue }) => {
                     return getFieldValue('mode')?.style === 'tab' ? (
                        <Form.Item
                           name={["mode", "text"]}
                           label="Text"
                           rules={[
                              {
                                 required: true,
                              },
                           ]}
                        >
                           <Input />
                        </Form.Item>
                     ) : null;
                  }}
               </Form.Item>

               <Divider orientation="left">
                  Tabs
               </Divider>

               <Form.Item valuePropName="checked" name={["tabs", "feedback"]} label="Feedback">
                  <Switch />
               </Form.Item>
               <Form.Item valuePropName="checked" name={["tabs", "features"]} label="Features">
                  <Switch />
               </Form.Item>

               <Divider />

               <Form.Item {...tailLayout}>
                  <Button disabled={!dirty} type="primary" htmlType="submit">
                     Save
                  </Button>
               </Form.Item>
            </Form>
         </Col>
         <Col offset={1} span={11} style={{ display: 'flex' }}>
            <BrowserFrame url="https://yourAwsomeWebsite.com">
               {
                  !!config &&
                  <Widget config={config} />
               }
            </BrowserFrame>
         </Col>
      </Row>

   );
};

export default WidgetConfig