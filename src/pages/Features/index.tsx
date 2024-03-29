import React from 'react';
import { List, Form, Button, Skeleton, Input, Divider } from 'antd';
import { useQuery, useMutation, } from '@apollo/client';

import { useQueryFeatures, useUpdateFeature } from '../../hooks/feature'

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

function App() {

   const { loading, error, data = { features: [] } } = useQueryFeatures()

   const [form] = Form.useForm();

   const [updateFeature] = useUpdateFeature()

   const onFinish = (values: any) => {
      updateFeature({ variables: { feature: values } }).catch(console.log)
   }

   return (
      <>
         <Form {...layout} form={form} onFinish={onFinish}>
            <Form.Item
               name="title"
               label="Feature Name"
               rules={[
                  {
                     required: true,
                  },
               ]}
            >
               <Input />
            </Form.Item>

            <Form.Item
               name="notes"
               label="Description"
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
                  Add
    </Button>
            </Form.Item>
         </Form>
         <Divider orientation="left">Features</Divider>
         <List
            className="demo-loadmore-list"
            loading={loading}
            itemLayout="horizontal"
            // loadMore={loadMore}
            dataSource={data.features}
            renderItem={(item: any) => (
               <List.Item
                  actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}
               >
                  <Skeleton avatar title={false} loading={false} active>
                     <List.Item.Meta
                        title={item.title}
                        description={item.notes}
                     />
                     <div>{item.score}</div>
                  </Skeleton>
               </List.Item>
            )}
         />
      </>
   );
}

export default App;