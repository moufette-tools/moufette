import React, { useEffect } from 'react'
import { Layout, Menu, Dropdown, Row } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { useQuery, useMutation } from '@apollo/client';
import {
   useHistory,
   Link
} from "react-router-dom";

import { actions } from "../../reducers"

const UserDropdown = ({ properties }: any) => {
   const { loading, error, data } = properties
   const { property } = useSelector((state: any) => state.global);
   const dispatch = useDispatch()

   useEffect(() => {
      if (data?.properties?.length) {
         dispatch(actions.setProperty(data?.properties[0]))
      }
   }, [data?.properties])
   // const [logout] = useMutation(LOGOUT);
   // let history = useHistory();

   if (loading) return loading
   if (error) return error

   if (!data?.properties?.length) return (
      <Link to="/properties">
         <span>Please add a property</span>
      </Link>
   )

   const menu = (
      <Menu>
         {
            data?.properties.map((p: any) => (
               <Menu.Item key={p._id} onClick={() => {
                  dispatch(actions.setProperty(p))
               }}>
                  <span>{p.name}</span>
               </Menu.Item>
            ))
         }
      </Menu>
   );

   return (
      <Dropdown overlay={menu} trigger={['click']}>
         <span>
            {property?.name}
         </span>
      </Dropdown>
   )
}

export default UserDropdown