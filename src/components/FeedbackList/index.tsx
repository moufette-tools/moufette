import React from 'react'
import { List } from 'antd';
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
            >
               <List.Item.Meta />
               {feedback.text}
            </List.Item>
         )}
      />
   )
}

export default FeedbackList