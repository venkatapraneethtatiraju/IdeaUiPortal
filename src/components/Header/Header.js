import React from 'react';
import './Header.scss';
import XebiaLogo from '../../images/Logo.svg';
import BellIcon from '../../images/bell.svg';
import {Avatar, Badge} from 'antd';
import DefaultIcon from '../../images/default-avatar.png';
import { Link} from "react-router-dom";

const Header = (props) => (
    <div className="app-header">
      <div className="left-nav-content">
        <div onClick={props.logoTabHandler}>
          <img src={XebiaLogo} alt="logo" className="header-logos" />
        </div>
        {props.tabsData && props.tabsData.leftTabs && Object.keys(props.tabsData.leftTabs).map(tab => (
          <Link to={tab}>
             <div className={props.tabsData.leftTabs[tab].isActive ? "nav-list-items active": "nav-list-items"} onClick={() => props.clickActionHandler(tab)} key={props.tabsData.leftTabs[tab].title}>
              <img src={props.tabsData.leftTabs[tab].icon} alt="logo" className="nav-logos" />
              <span>{props.tabsData.leftTabs[tab].title}</span>
            </div>
          </Link>
        ))}
      </div>
      <div className="right-nav-content">
        <div>
          <Badge count={1}>
            <img src={BellIcon} alt="logo" className="nav-logos" />
          </Badge>
          <Avatar shape="circle" src={DefaultIcon}/>
        </div>
      </div>
    </div>
);

export default Header;
