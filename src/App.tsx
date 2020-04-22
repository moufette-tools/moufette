import React, { useState } from 'react'
import { Layout, Menu, Dropdown, Row } from 'antd';
import {
  SettingOutlined,
  MessageOutlined,
  HomeOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons';
import styled from 'styled-components'
import { useQuery, useMutation } from '@apollo/client';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import Feedbacks from './pages/Feedbacks'
import Login from './pages/Login'
import Setup from './pages/Setup'
import UserDropdown from './components/UserDropdown'

import { USER } from './apollo/queries'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


function PrivateRoute({ children, ...rest }: any) {
  const { loading, error, data } = useQuery(USER, {})
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (loading) return <div>loading...</div>
        return data?.currentUser ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
      }
      }
    />
  );
}

function PublicRoute({ children, ...rest }: any) {
  const { loading, error, data } = useQuery(USER, {})
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (loading) return <div>loading...</div>
        return data?.currentUser ? (
          <Redirect
            to={{
              pathname: "/",
            }}
          />
        ) : (
            children
          )
      }
      }
    />
  );
}

const BasicExample = () => {

  const [collapsed, setCollapsed] = useState(false)
  const { loading, error, data } = useQuery(USER, {})

  const onCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed);
  };


  return (
    <Router>

      <Switch>

        <PublicRoute path="/login">
          <Login />
        </PublicRoute>

        <PrivateRoute>

          <Layout style={{ minHeight: '100vh' }}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
              <div className="logo">
                {collapsed ? <span style={{ fontSize: 'x-large' }}>🦨</span> : 'Moufette v0.1'}
              </div>
              <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                <Menu.Item key="1">
                  <Link to="/">
                    <HomeOutlined />
                    <span>Home</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="2">
                  <Link to="/feedbacks">
                    <MessageOutlined />
                    <span>Feedbacks</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="3">
                  <Link to="/setup">
                    <SettingOutlined />
                    <span>Setup</span>
                  </Link>
                </Menu.Item>
              </Menu>
            </Sider>
            <Layout className="site-layout">
              <Header className="site-layout-background" style={{ padding: 0 }}>
                <Row justify="space-between" align="middle">
                  {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    className: 'trigger',
                    onClick: () => onCollapse(!collapsed),
                  } as any)}

                  <span style={{ paddingRight: 24 }}>
                    <UserDropdown currentUser={data?.currentUser} />
                  </span>


                </Row>
              </Header>
              <Content
                className="site-layout-background"
                style={{
                  margin: '24px 16px',
                  padding: 24,
                  minHeight: 280,
                }}
              >
                <Route exact path="/">
                  <Home />
                </Route>

                <Route path="/feedbacks">
                  <Feedbacks />
                </Route>

                <Route path="/setup">
                  <Setup currentUser={data?.currentUser} />
                </Route>
              </Content>
            </Layout>
          </Layout>

        </PrivateRoute>
      </Switch>
    </Router>
  );
}


function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}



export default BasicExample