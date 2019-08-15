import React,{ Component } from 'react';
import { Form, Icon, Input, Button, message } from 'antd';
import { reqLogin } from '../../api';
import data from '../../utils/store';
import { setItem } from "../../utils/storage";
import './index.less';
import logoImg from '../../assets/images/logo.png';
const Item = Form.Item;
class Login extends Component {
  //登录判断函数
  login = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err,values) => {
      if(!err){
        const { username,password } = values;
        reqLogin(username,password)
          .then((response)=>{
            message.success("登录成功",2);
            data.user = response;//存储到内存
            setItem(response);//存储到本地中
            this.props.history.replace('/');//更新路径，刷新组件
          })
          .catch((error)=>{
            message.error(error,2);
            this.props.form.resetFields(['password']);
          })
      }
    });
  };
  //校验规则函数
  validator = (rule, value, callback) => {//输入框校验规则
    const name = rule.field === 'username' ? '用户名' : '密码';
    const passwordReg = /^\w+$/;
    if( !value ){
      callback('输入的内容不能为空')
    }else if( value.length<4 ){
      callback(`${name}长度不能少于4位`)
    }else if( value.length>8 ){
      callback(`${name}长度不能大于8位`)
    }else if( !passwordReg.test(value) ){
      callback(`${name}只能包含英文、数字、下划线`);
    }
    callback();//满足则调用
  };
  render() {
    const { getFieldDecorator } = this.props.form;//经过 getFieldDecorator 包装的控件，表单控件会自动添加 value（或 valuePropName 指定的其他属性） onChange（或 trigger 指定的其他属性），数据同步将被 Form 接管
    return <div className="login">
      <header className="login-header">
        <img src={logoImg} alt="logo"/>
        <h1>React项目: 后台管理系统</h1>
      </header>
      <section className="login-form">
        <h2>用户登录</h2>
        <form onSubmit={this.login}>
          <Item>
            {
              getFieldDecorator('username',{//标识符
                rules:[
                  { validator: this.validator }
                ]
              })(
                <Input prefix={<Icon type="user" />} placeholder="用户名"/>//高阶组件返回一个带有校验功能的组件
              )}
          </Item>
          <Item>
            {
              getFieldDecorator('password',{
                rules:[
                  { validator: this.validator }
                ]
              })(
                <Input type="password" prefix={<Icon type="lock"/>} placeholder="密码"/>
              )}
          </Item>
          <Item>
            <Button type="primary" htmlType="submit" className="login-btn">登录</Button>
          </Item>
        </form>
      </section>
    </div>
  }
}
export default Form.create()(Login);//高阶组件 经Form.create()包装过的组件会自带 this.props.form 属性