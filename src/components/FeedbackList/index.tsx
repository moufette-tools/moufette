import React, { useState } from 'react'
import { List, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons'
import { useQuery } from '@apollo/client';
import styled from 'styled-components'

import { FEEDBACKS } from '../../apollo/queries'


const Viewer = styled.div<any>`
   display: flex;
   position: fixed;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
   background-color: #00000099;
`

const Close = styled.div`
   position: absolute;
   right: 20px;
   top: 20px;
   font-size: 40px;
   cursor: pointer;
   color: white;
`


const FeedbackList = () => {

   const [viewer, setViewer] = useState(null)

   const { loading, error, data } = useQuery(FEEDBACKS, {})


   if (loading) return <div>loading...</div>

   return (
      <>
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
                        onClick={() => setViewer(feedback.image)}
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
         {
            !!viewer &&
            <Viewer>
               <Close onClick={() => setViewer(null)}>X</Close>
               <img style={{ maxHeight: '80%', maxWidth: '80%', width: 'auto', alignSelf: 'center', margin: 'auto' }} src={viewer || ''} />
            </Viewer>
         }
      </>
   )
}

export default FeedbackList