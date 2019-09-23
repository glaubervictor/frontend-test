import React, { Component } from "react";
import { Router, Link } from "react-router-dom";
import { Layout, Menu, Icon } from "antd";

import "./index.css";
import history from "../../helpers/history";

import Routes from "../../routes";

const { Header, Sider, Content } = Layout;

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: false
    };
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    return (
      <Router history={history}>
        <Layout>
          <Sider breakpoint="lg" collapsedWidth="0">
            <div className="logo">
              <img src={require("../../assets/images/starwars.png")} />
            </div>
            <Menu theme="dark" mode="inline">
              <Menu.Item key="1">
                <Link to="/people" className="nav-text">
                  <Icon type="user" />
                  Pessoas
                </Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout style={{ height: "100vh"}}>
            <Header style={{ background: "#fff", padding: 0 }}></Header>
            <Content style={{ margin: "24px 16px 0", height: "100%" }}>
              <div style={{ padding: 24, background: "#fff" }}>
                <Routes />
              </div>
            </Content>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default Main;
