import React from 'react';

import { Layout } from 'antd';
import Header from './header/Header';
import Footer from './footer/Footer';
import Content from './content/Content';
import Nav from './nav/Nav';

export default (props: any) => {
  return (
    <Layout style={{ height: '100vh' }}>
      <Layout.Sider>
        <Nav></Nav>
      </Layout.Sider>
      <Layout>
        <Layout.Header style={{ padding: '0 16px', background: '#fff' }}>
          <Header></Header>
        </Layout.Header>
        <Layout.Content style={{ margin: '16px' }}>
          <div style={{ height: '100%', overflow: 'auto' }}>
            <Content></Content>
          </div>
        </Layout.Content>
        <Layout.Footer style={{ textAlign: 'center' }}><Footer></Footer></Layout.Footer>
      </Layout>
    </Layout>
  )
};
