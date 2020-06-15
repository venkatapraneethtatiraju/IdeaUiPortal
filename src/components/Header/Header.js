import React from 'react';
import './Header.scss';
import { ReactComponent as XebiaLogo } from '../../images/Logo.svg';
import { ReactComponent as BellIcon } from '../../images/bell.svg';
import { Avatar, Badge } from 'antd';
import DefaultIcon from '../../images/default-avatar.png';
import { Link } from "react-router-dom";
import {Icon, Menu, Dropdown, Button, message, Tooltip } from 'antd';
import {logout, login} from '../Auth/Auth'
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from '../login/Login'

const menu = ()=>(
  <Menu onClick={e=>handleMenuClick(e)} >
    <Menu.Item key="1">Edit</Menu.Item>
    
    <Menu.Item  key="2">Logout</Menu.Item>
  </Menu>
);

const handleMenuClick = async (e)=> {
  console.log('click', e.key);
  if(e.key == 2){

    logoutPerform();
  }
}

 const logoutPerform = async ()=>
 {

  // await logout();
   //return <Login/>
 }

const Header = (props) => (
  <div className="app-header">
    <div className="left-nav-content">
      <div onClick={props.logoTabHandler}>
        <XebiaLogo className="header-logos" />
      </div>
      {props.tabsData && props.tabsData.leftTabs && Object.keys(props.tabsData.leftTabs).map(tab => (
        <Link to={tab}>
          <div className={props.tabsData.leftTabs[tab].isActive ? "nav-list-items active" : "nav-list-items"} onClick={() => props.clickActionHandler(tab)} key={props.tabsData.leftTabs[tab].title}>
            {props.tabsData.leftTabs[tab].icon}
            <span className="header-nav-titles">{props.tabsData.leftTabs[tab].title}</span>
          </div>
        </Link>
      ))}
    </div>
    <div className="right-nav-content">
      <div  className="right-inner-nav">
        <Badge count={1}>
          <BellIcon className="nav-logos" />
        </Badge>
       
        <Dropdown overlay={menu}>
          <Avatar  shape="circle" src={DefaultIcon} />
        </Dropdown>
      
      </div>
    </div>
  </div>
);

export default Header;
