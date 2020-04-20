import React from 'react'
import { Layout, Menu, Dropdown, Row } from 'antd';
import { useQuery, useMutation } from '@apollo/client';
import {
   useHistory,
} from "react-router-dom";

import { LOGOUT } from '../../apollo/mutations'

const UserDropdown = ({ currentUser }: any) => {

   const [logout] = useMutation(LOGOUT);
   let history = useHistory();

   if (!currentUser) return null

   const menu = (
      <Menu>
         <Menu.Item key="0" onClick={() => {
            logout().then(() => {
               history.replace('/login');
            }).catch(console.log)
         }}
         >
            <a href="">Logout</a>
         </Menu.Item>
      </Menu>
   );

   return (
      <Dropdown overlay={menu} trigger={['click']}>
         <span>
            {currentUser.email}
         </span>
      </Dropdown>
   )
}

export default UserDropdown