import React, { useEffect, useState } from 'react'
import { List, Typography } from 'antd'
import {
   useLocation,
   useHistory
} from "react-router-dom";

import { useConnectSlack } from '../../hooks/integrations'

const data = [
   { name: "Slack" }
];

function useQueryURL() {
   return new URLSearchParams(useLocation().search);
}

const Integrations = ({ currentUser }: any) => {
   console.log({ currentUser })
   const [slackLoadnig, setSlackLoading] = useState(false)
   const [connectSlack] = useConnectSlack()
   let query = useQueryURL();
   let history = useHistory();

   useEffect(() => {
      const code = query.get('code')

      if (code) {
         setSlackLoading(true)
         connectSlack({ variables: { code } }).then(() => {
            setSlackLoading(false)
            history.replace(history.location.pathname)
         }).catch(() => {
            setSlackLoading(false)
            history.replace(history.location.pathname)
         })
         // connect slack
      }
   }, [])


   const renderSlackButton = () => {
      if (currentUser?.team?.integrations?.slack) {
         return (<div>connected</div>)
      }
      if (slackLoadnig) {
         return (
            <div>loading</div>
         )
      } else {
         return (
            <a href={`https://slack.com/oauth/v2/authorize?scope=chat:write&client_id=${process.env.REACT_APP_SLACK_CLIENT_ID}&redirect_uri=${window.location.origin}/integrations`}>
               <img
                  alt="Add to Slack"
                  height="40" width="139"
                  src="https://platform.slack-edge.com/img/add_to_slack.png"
                  srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x"
               />
            </a>
         )
      }

   }

   return (
      <List
         header={<div>Integrations</div>}
         dataSource={data}
         renderItem={item => (
            <List.Item
               actions={[
                  renderSlackButton()
               ]}
            >
               {item.name}
            </List.Item>
         )}
      />
   )
}

export default Integrations