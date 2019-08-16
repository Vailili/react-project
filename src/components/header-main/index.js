import React,{ Component } from 'react';
import data from '../../utils/store';
import { withRouter } from  'react-router-dom';
import { Button, Modal, message } from 'antd';
import { removeItem } from '../../utils/storage';
import './index.less';

const { confirm } = Modal;
class HeaderMain extends Component {
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
  render() {
    return <div className="header-content">
      <div className="header-content-top">
        <span>欢迎&nbsp;&nbsp;{data.user.username}</span>
        <Button type="link" onClick={this.logout}>退出</Button>
      </div>
      <div className="header-content-bottom">
        <h3 className="header-bottom-left">管理11</h3>
        <div className="header-bottom-right">
          <span>111111</span>
          <img src="http://api.map.baidu.com/images/weather/day/qing.png" alt="weather"/>
          <span>晴转多云</span>
        </div>
      </div>
    </div>
  }
}
export default withRouter(HeaderMain);