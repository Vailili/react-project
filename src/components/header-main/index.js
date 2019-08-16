import React,{ Component } from 'react';
import data from '../../utils/store';
import { withRouter } from  'react-router-dom';
import { Button, Modal, message } from 'antd';
import { removeItem } from '../../utils/storage';
import './index.less';
import { menuList } from '../../config';
import { reqWeather } from '../../api';
import dayjs from 'dayjs';

const { confirm } = Modal;
class HeaderMain extends Component {
  constructor(){
    super();
    this.state = {
      systemTime: this.getTime(),
      title: '',
      weather: '晴',
      dayPictureUrl: 'http://api.map.baidu.com/images/weather/day/qing.png'
    };
  }
  cityName = '厦门';
  //退出登录
  logout = () => {
    confirm({
      title: '你是否要退出登录?',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        removeItem();//清除本地数据
        data.user = {};//清除内存数据
        this.props.history.replace('/login');
        message.success('退出登录成功');
      }
    });
  };
  //获取当前界面title
  static getDerivedStateFromProps(nextProps, prevState) {
    const { pathname } = nextProps.location;
    if (pathname === '/') {
      return {
        title: '首页'
      }
    }
    for (let i = 0; i < menuList.length; i++) {
      const menu = menuList[i];
      if (menu.children) {
        const children = menu.children;
        for (let j = 0; j < children.length; j++) {
          const childrenMenu = children[j];
          if (childrenMenu.key === pathname) {
            return {
              title: childrenMenu.title
            }
          }
        }
      } else {
        if (menu.key === pathname) {
          return {
            title: menu.title
          }
        }
      }
    }
  }
  //获取系统时间及天气情况
  getTime = () => dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');
  componentDidMount() {
    this.timer = setInterval(()=>{
      this.setState({
        systemTime: this.getTime()
      });
    },1000);
    reqWeather(this.cityName)
      .then((res)=>{
        this.setState(res);//更新状态
        message.success('天气更新成功',2);
      })
      .catch((err)=>{
        message.error('err',2);
      })
  }
  componentWillUnmount() {
    clearInterval(this.timer);//卸载组件时，清除计时器
  }
  render() {
    const { title, systemTime, dayPictureUrl, weather } = this.state;
    return <div className="header-content">
      <div className="header-content-top">
        <span>欢迎&nbsp;&nbsp;{data.user.username}</span>
        <Button type="link" onClick={this.logout}>退出</Button>
      </div>
      <div className="header-content-bottom">
        <h3 className="header-bottom-left">{title}</h3>
        <div className="header-bottom-right">
          <span>{ systemTime }</span>
          <img src={ dayPictureUrl } alt="weather"/>
          <span>{ weather }</span>
        </div>
      </div>
    </div>
  }
}
export default withRouter(HeaderMain);