import React, {PureComponent} from 'react';
// import PropTypes from 'prop-types';
import Header from "../Header/Header";
import './HomePage.scss';
import SubHeader from '../SubHeader/SubHeader';
import ClockIcon from '../../images/clock.svg';
import ThinkIcon from '../../images/think.svg';
import Dashboard from '../Dashboard/Dashboard';
import MyIdeas from '../MyIdeas/MyIdeas';
import {Row, Col} from 'antd';
import {Route, Switch, Redirect } from 'react-router-dom';
import PopUpModel from '../PopUpModel/PopUpModel'

export default class HomePage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      subHeaderTitle: 'Dashboard',
      name:'Add an Idea',
      btnColor: '#e4500e',
      showModal: false,
      saveandSubmit: "Save & Submit",
      headerTabs: {
        leftTabs: {
          dashboard: {
            title: 'Dashboard',
            isActive: true, 
            icon: ClockIcon
          },
          myIdeas: {
            title: 'My Ideas',
            isActive: false,
            icon: ThinkIcon
          }
        }
      }
    };
  }

  setTabActive = (key) => {
    const toggledHeaderTabs = {...this.state.headerTabs.leftTabs};
    Object.keys(toggledHeaderTabs).map(tab => toggledHeaderTabs[tab].isActive = (tab === key) )
    return toggledHeaderTabs;
  }

  clickActionHandler = (event) => {
    this.setState(prevState => ({
      ...prevState,
      subHeaderTitle: prevState.headerTabs.leftTabs[event].title,
      headerTabs: {
        leftTabs: this.setTabActive(event)
      }
    }))
  }

  logoTabHandler= () => {

  }

  buttonActionHandler = (event) => {
    this.setState(prevstate => ({
      ...prevstate,
      showModal: !prevstate.showModal
    }))
  }

  saveandSubmitHandler = (event) => {

  }


  render() {
    
    return (
      <div className="home-page">
        <Header 
        logoTabHandler = {this.logoTabHandler}
        clickActionHandler = {this.clickActionHandler}
        tabsData = {this.state.headerTabs}
        ></Header>
        <Row  justify="center" className="sub-header-wrapper">
          <Col xs={20} sm={20} md={20} lg={20} xl={20}>
            <SubHeader 
            subHeaderTitle={this.state.subHeaderTitle} 
            buttonClickHandler = {this.buttonActionHandler}
            name = {this.state.name}
            btnColor={this.state.btnColor}
            showModal={this.state.showModal}
            >
            </SubHeader>
          </Col>
        </Row>
        {this.state.showModal && 
          <PopUpModel modelText="testing" 
          onOk={this.buttonActionHandler}
          onCancel={this.buttonActionHandler}
          saveandSubmitHandler={this.saveandSubmitHandler}
          saveandSubmit={this.state.saveandSubmit}
          btnColor={this.state.btnColor}
          />
        }
        <Switch>
          <Redirect exact from="/" to="/dashboard" />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/myIdeas" component={MyIdeas} />
        </Switch>
      </div>
    );
  }
}
