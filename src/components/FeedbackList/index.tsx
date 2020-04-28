import React from 'react'
import { List, Avatar } from 'antd';
import { UserOutlined} from '@ant-design/icons'
import { useQuery } from '@apollo/client';

import { FEEDBACKS } from '../../apollo/queries'

const FeedbackList = () => {

   const { loading, error, data } = useQuery(FEEDBACKS, {})

   if (loading) return <div>loading...</div>

   return (
      <List
         itemLayout="vertical"
         size="large"
         dataSource={data.feedbacks}
         renderItem={(feedback: any) => (
            <List.Item
               key={feedback._id}
               extra={
                  feedback.image &&
                  <img
                     style={{ border: '1px dotted gray', maxHeight: 200, width: 'auto', maxWidth: 200 }}
                     alt="screenshot"
                     src={feedback.image}
                  />
               }
            >

               <List.Item.Meta
                  // avatar={<Avatar src={''} size="large" />}
                  title={<span><UserOutlined /> {feedback.person.uuid}</span>}
                  description={new Date(feedback.createdAt).toISOString()}
               />
               {feedback.text}
            </List.Item>
         )}
      />
   )
}

export default FeedbackList