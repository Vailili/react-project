import React,{ Component } from 'react';
import { getItem } from '../../utils/storage';
import data from '../../utils/store';
import { Spin, message, Layout } from 'antd';
import { reqValidataUser } from '../../api';
import { Link } from 'react-router-dom';
import logoImg from '../../assets/images/logo.png';
import './index.less';
import LeftNav from '../../components/left-nav';
const { Header, Content, Footer, Sider } = Layout;
export default class Admin extends Component {
  state = {
    flag: true,//用于触发render，更新组件
    collapsed: false,//控制导航栏开关
    isDisplay: true//控制h1标签隐藏
  };
  //判断是否登陆过函数
  checkUserLogin = () =>{
    if(!data.user._id){//判断内存是否有数据
      const user = getItem();
      if(!user){//内存没有，判断本地是否有数据
        this.props.history.replace('/login');//都没有，路由跳转到登录界面
        message.error('请先登录后访问',2);
        return true;
      }
      //向后台验证数据合法性
      reqValidataUser(user._id)//本地有数据，判断正确
        .then(()=>{
          data.user = user;//赋值给内存
          this.setState({//调用render，重新渲染组件
            flag: false
          });
        })
        .catch(()=>{
          message.error('请先登录',2);
          this.props.history.replace('/login');//数据不合法，路由跳转到登录界面
        });
      return true;
    }else{
      return false;
    }
  };
  //展开菜单
  onCollapse = collapsed => {
    this.setState({
      collapsed,
      isDisplay: collapsed ? 'none' : 'block'
    });
  };
  render() {
    const isLoading = this.checkUserLogin();
    if(isLoading) return <Spin tip="loading...." size="large" className="admin-loading"/>;
    const { collapsed, isDisplay } = this.state;
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <Link to="/home" className="admin-logo">
            <img src={logoImg} alt="logo"/>
            <h1 style={{display:isDisplay}}>硅谷后台</h1>
          </Link>
          <LeftNav/>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>Bill is a cat.</div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    );
  }
}