import React,{ Component } from 'react';
import { getItem } from '../../utils/storage';
import data from '../../utils/store';
import { Spin, message, Layout } from 'antd';
import { reqValidataUser } from '../../api';
import { Link } from 'react-router-dom';
import logoImg from '../../assets/images/logo.png';
import './index.less';
import LeftNav from '../../components/left-nav';
import HeaderMain from '../../components/header-main';
import { Redirect, Switch, Route } from  'react-router-dom';
import Home from '../home';
import Category from '../category';
import Product from '../product';
import User from '../user';
import Role from '../role';
import Bar from '../bar';
import Line from '../line';
import Pie from '../pie';
import FooterMain from '../../components/footer-main';
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
          <LeftNav/>{/*左边导航*/}
        </Sider>
        <Layout>
          <Header style={{ marginBottom: 40, padding: 0 }} >{/*头部*/}
            <HeaderMain/>
          </Header>
          <Content style={{ margin: '0 16px' }}>{/*内容区*/}
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              <Switch>
                <Route path="/home" component={Home}/>
                <Route path="/category" component={Category}/>
                <Route path="/product" component={Product}/>
                <Route path="/user" component={User}/>
                <Route path="/role" component={Role}/>
                <Route path="/charts/bar" component={Bar}/>
                <Route path="/charts/line" component={Line}/>
                <Route path="/charts/pie" component={Pie}/>
                <Redirect to="/home"/>
              </Switch>
            </div>
          </Content>
          <FooterMain>推荐使用谷歌浏览器，可以获得更佳页面操作体验</FooterMain>
        </Layout>
      </Layout>
    );
  }
}