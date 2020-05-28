import React, {PureComponent} from 'react';
// import PropTypes from 'prop-types';
import Header from "../Header/Header";
import './HomePage.scss';
import SubHeader from '../SubHeader/SubHeader';
import ClockIcon from '../../images/clock.svg';
import ThinkIcon from '../../images/think.svg';
import Dashboard from '../Dashboard/Dashboard';
import MyIdeas from '../MyIdeas/MyIdeas';
import {Row, Col, Alert} from 'antd';
import {Route, Switch, Redirect } from 'react-router-dom';
import PopUpModel from '../PopUpModel/PopUpModel'
import Login from '../login/Login';
import { getToken } from '../Auth/Auth';
import AlertBox from '../Alert/Alert.js'

export default class HomePage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      myIdeaData:{},
      isSubmitted:false,
      subHeaderTitle: 'Dashboard',
      name:'Add an Idea',
      btnColor: '#e4500e',
      showModal: false,
      saveandSubmit: "Save & Submit",
      showAlert : false,
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
      },
      ideaSubject : '',
      ideaType : '',
      ideaCategoryValue : '',
      ideaDetails : '',
      status : 0
    };
    this.saveandSubmitHandler = this.saveandSubmitHandler.bind(this)
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
      showModal: !prevstate.showModal,
      
    }))
    setTimeout(() => {
      this.setState({showAlert : false})
      }, 4000);
  }

  saveandSubmitHandler (ideaSubject,ideaType,ideaCategoryValue,ideaDetails,ideaStatusId) {
    console.log("parent")
  
    // Simple POST request with a JSON body using fetch
    console.log(ideaStatusId)
    let requestParam = {
      title : ideaSubject,
      ideaDescription : ideaDetails,
      categoryId : ideaType,
      subCategoryId : ideaCategoryValue,
      ideaStatusId : ideaStatusId
    }
    this.createIdeaPostRequest(requestParam);
   // this.clickActionHandler()
  }
  createIdeaPostRequest(requestParam) {
    let token = getToken();
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json','Authorization' : `Bearer ${token}`},
        body: JSON.stringify(requestParam)
    };

    console.log("requestOptions", requestOptions)
    fetch('https://cors-anywhere.herokuapp.com/http://iportal.herokuapp.com/innovation-portal/api/v1/ideas', requestOptions)
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data.code);
          this.setState({myIdeaData:data,status : data.code, showAlert : true})
         this.buttonActionHandler();
        })
        .catch((error) => {
          console.error('Error:', error);
          this.setState({status : error.code})
        });  
  }




  render() {
    const alertName = "Idea Submitted Successfully!";
    return (
      <div className="home-page">
        <Header 
        logoTabHandler = {this.logoTabHandler}
        clickActionHandler = {this.clickActionHandler}
        tabsData = {this.state.headerTabs}
        ></Header>

          { this.state.showAlert ?
          <AlertBox alertName={alertName} /> : null
          }

        <Row  justify="center" className="sub-header-wrapper">
          <Col xs={20} sm={20} md={20} lg={20} xl={20}>
            <SubHeader 
            subHeaderTitle={this.state.subHeaderTitle} 
            buttonClickHandler = {this.buttonActionHandler}
            name = {this.state.name}
            btnColor={this.state.btnColor}
            showModal={this.state.showModal}
            inputRef={(input) => this.textInput = input} 
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
          <Route path="/login" component={Login} /> 
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/myIdeas" >
          <MyIdeas myIdeaData={this.state.myIdeaData} />
          </Route>
        </Switch>
      </div>
    );
  }
}
