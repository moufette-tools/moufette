import React from 'react';
import { List, Form, Button, Skeleton, Input, Divider } from 'antd';

import { useQueryProperties, useUpdateProperty } from '../../hooks/property'

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

   const { loading, error, data = { properties: [] } } = useQueryProperties()

   const [form] = Form.useForm();

   const [updateProperty] = useUpdateProperty()

   const onFinish = (values: any) => {
      updateProperty({ variables: { property: values } }).catch(console.log)
   }

   return (
      <>
         <Form {...layout} form={form} onFinish={onFinish}>
            <Form.Item
               name="name"
               label="Property Name"
               rules={[
                  {
                     required: true,
                  },
               ]}
            >
               <Input />
            </Form.Item>

            <Form.Item
               name="url"
               label="URL"
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
         <Divider orientation="left">Properties</Divider>
         <List
            className="demo-loadmore-list"
            loading={loading}
            itemLayout="horizontal"
            // loadMore={loadMore}
            dataSource={data.properties}
            renderItem={(item: any) => (
               <List.Item
                  actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}
               >
                  <Skeleton avatar title={false} loading={false} active>
                     <List.Item.Meta
                        title={item.name}
                        description={item.url}
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