import React from 'react';
import './Header.scss';
import { ReactComponent as XebiaLogo } from '../../images/Logo.svg';
import { ReactComponent as BellIcon } from '../../images/bell.svg';
import { Avatar, Badge } from 'antd';
import DefaultIcon from '../../images/default-avatar.png';
import { Link } from "react-router-dom";

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
      <div className="right-inner-nav">
        <Badge count={1}>
          <BellIcon className="nav-logos" />
        </Badge>
        <Avatar shape="circle" src={DefaultIcon} />
      </div>
    </div>
  </div>
);

export default Header;
