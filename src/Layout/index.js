import { UserOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout, Menu } from "antd";
import { useState } from "react";
import { getItem } from "../Utils/helpers";
const { Header, Content, Footer, Sider } = Layout;

const items = [getItem("Candidates", "1", <UserOutlined />)];
const HomeLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className="layout">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <p className="logo-text">Assesment</p>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout className="site-layout">
        <Header className="header" />
        <Content className="content">
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item>Candidates</Breadcrumb.Item>
          </Breadcrumb>
          <div className="sub-content">{children}</div>
        </Content>
        <Footer className="text-center">Samwell React Assesment</Footer>
      </Layout>
    </Layout>
  );
};
export default HomeLayout;
