import React,{ Component } from 'react';
import { Menu, Icon } from 'antd';
import { menuList } from '../../config';
import { Link, withRouter } from 'react-router-dom';
const { SubMenu } = Menu;
const Item = Menu.Item;
class LeftNav extends Component {
  creatItem = (menu) => {
    return <Item key={menu.key}>
      <Link to={menu.key}>
        <Icon type={menu.icon} />
        <span>{menu.title}</span>
      </Link>
    </Item>
  };
  createMenu = (path) => {
    return menuList.map((menu)=>{
      if(menu.children){
        return <SubMenu key={menu.key} title={<span><Icon type={menu.icon}/><span>{menu.title}</span></span>}>
          {
            menu.children.map((item)=>{
              if(path === item.key){//如果当前点开的是二级菜单，将其一级菜单设置为默认展开
                this.defaultOpen = menu.key;
              }
              return this.creatItem(item);//创建二级标签
            })
          }
        </SubMenu>
      }
      return this.creatItem(menu);//创建一级菜单
    });
  };
  render(){
    const path = this.props.location.pathname;
    const menus = this.createMenu(path);
    return <Menu theme="dark" defaultSelectedKeys={[path]} defaultOpenKeys={[this.defaultOpen]} mode="inline">
      { menus }
    </Menu>
  }
}
export default withRouter(LeftNav);