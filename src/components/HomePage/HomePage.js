import React, { PureComponent } from 'react';
import Header from "../Header/Header";
import './HomePage.scss';
import SubHeader from '../SubHeader/SubHeader';
import { ReactComponent as ClockIcon } from '../../images/clock.svg';
import { ReactComponent as RecentIcon } from '../../images/miscellaneous.svg';
import { ReactComponent as ProfileIcon } from '../../images/social-media.svg';
import { ReactComponent as ThinkIcon } from '../../images/think.svg';
import Dashboard from '../Dashboard/Dashboard';
import MyIdeas from '../MyIdeas/MyIdeas';
import AllRecentRequest from '../AllRecentRequest/AllRecentRequest'
import { Row, Col } from 'antd';
import { Route, Switch, Redirect } from 'react-router-dom';
import PopUpModel from '../PopUpModel/PopUpModel'
import AlertBox from '../Alert/Alert.js';
import AllIdea from '../AllIdea/AllIdea';
import { grey } from '@material-ui/core/colors';
import AdminPopUpModel from '../PopUpModel/AdminPopUpModel';
import { createNewIdea } from '../../services/AppService';
import { IDEA_ADDED_MESSAGE } from '../../Config/Constants';
import {setUserType,getUserRole} from '../Auth/Auth';
import { useTheme } from '@material-ui/core';
import Login from '../login/Login';

export default class HomePage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      userType:'',
      subHeaderTextTitle: 'Users',
      userClickColor: "gray",
      categoriesClickColor: "gray",
      myIdeaData: {},
      isSubmitted: false,
      subHeaderTitle: 'Dashboard',
      buttonName: 'Add an Idea',
      btnColor: '#e4500e',
      showModal: false,
      saveandSubmit: "Save & Submit",
      showAlert: false,
      headerTabs: {
        leftTabs: {
          // dashboard: {
          //   title: 'Dashboard',
          //   isActive: true,
          //   icon: <ClockIcon className="header-icon" />
          // },
          // management: {
          //   title: 'Management',
          //   isActive: false,
          //   icon: <ProfileIcon className="header-icon" />
          // },
          // request: {
          //   title: 'Request',
          //   isActive: false,
          //   icon: <RecentIcon className="header-icon" />
          // },
          // myIdeas: {
          //   title: 'My Ideas',
          //   isActive: false,
          //   icon: <ThinkIcon className="header-icon" />
          // }

        }
      },
      ideaSubject: '',
      ideaType: '',
      ideaCategoryValue: '',
      ideaDetails: '',
      status: 0,
    };
    this.saveandSubmitHandler = this.saveandSubmitHandler.bind(this)
  }

  setTabActive = (key) => {
    const toggledHeaderTabs = { ...this.state.headerTabs.leftTabs };
    Object.keys(toggledHeaderTabs).map(tab => toggledHeaderTabs[tab].isActive = (tab === key))
    return toggledHeaderTabs;
  }

  clickActionHandler = async (event) => {
   
    this.updateHeaders();

    if (event === "management") {
      this.usersClicked();
      await this.setState({ buttonName: "Add Category", title: "management", userClickColor: 'black', categoriesClickColor: 'grey' });

    }
    else {
      await this.setState({ buttonName: "Add an Idea", userClickColor: 'gray', categoriesClickColor: 'grey' });
    }
    await this.setState(prevState => ({
      ...prevState,
      title: event,
      subHeaderTitle: prevState.headerTabs.leftTabs[event].title,
      headerTabs: {
        leftTabs: this.setTabActive(event)
      }
    }))
  }

  logoTabHandler = () => {

  }

  buttonActionHandler = (event) => {
    this.setState(prevstate => ({
      ...prevstate,
      showModal: !prevstate.showModal,
    }))
    setTimeout(() => {
      this.setState({ showAlert: false })
    }, 4000);
    this.categoriesClicked();
  }

  saveandSubmitHandler(ideaSubject, ideaType, ideaCategoryValue, ideaDetails, ideaStatusId, businessImpact) {
    let requestParam = {
      title: ideaSubject,
      ideaDescription: ideaDetails,
      categoryId: ideaType,
      subCategoryId: ideaCategoryValue,
      ideaStatusId: ideaStatusId,
      businessImpact: businessImpact,
    }
    this.createIdea(requestParam);
  }

  createIdea(requestParam) {
    createNewIdea(requestParam)
      .then(data => {
        this.setState({ myIdeaData: data, status: data.code, showAlert: true })
        this.buttonActionHandler();
      })
      .catch((error) => {
        console.error('Error:', error);
        this.setState({ status: error.code })
      });
  }

  // user clicked inside the Management tab
  async usersClicked(event) {
    await this.setState({ subHeaderTextTitle: 'Users', userClickColor: "black", categoriesClickColor: "gray" })
    console.log(this.state.isUserSelected, "monster")
  }

  // categories clicked inside the Management tab
  async categoriesClicked(event) {
    await this.setState({ subHeaderTextTitle: 'Categories', isCategoriesSelected: true, isUserSelected: false, userClickColor: "gray", categoriesClickColor: "black" })
  }

  // component Did mount

  componentDidMount()
  {
    
      this.updateHeaders()
    //this.updateHeaders();
  }

  updateHeaders()
  {
      const userType= getUserRole();
      let leftObjects={};
      this.setState({userType:userType});
      if(userType ==="Employee"){

        leftObjects = {
          dashboard: {
            title: 'Dashboard',
            isActive: true,
            icon: <ClockIcon className="header-icon" />
          },
          myIdeas: {
            title: 'My Ideas',
            isActive: false,
            icon: <ThinkIcon className="header-icon" />
          }
        }
      }
      else if(userType ==="Manager"){

        leftObjects =
        {  
          dashboard: {
          title: 'Dashboard',
          isActive: true,
          icon: <ClockIcon className="header-icon" />
        },
        request: {
          title: 'Request',
          isActive: false,
          icon: <RecentIcon className="header-icon" />
        },
        myIdeas: {
          title: 'My Ideas',
          isActive: false,
          icon: <ThinkIcon className="header-icon" />
        }
       }
      }
      else {
        leftObjects = {
          dashboard: {
            title: 'Dashboard',
            isActive: true,
            icon: <ClockIcon className="header-icon" />
          },
          management: {
            title: 'Management',
            isActive: false,
            icon: <ProfileIcon className="header-icon" />
          },
          request: {
            title: 'Request',
            isActive: false,
            icon: <RecentIcon className="header-icon" />
          },
          myIdeas: {
            title: 'My Ideas',
            isActive: false,
            icon: <ThinkIcon className="header-icon" />
          }
        }
      }

     this.setState(prevState => ({
      ...prevState,
      userType:userType,
      headerTabs: {
        leftTabs: leftObjects
      }
    }))
  }

  componentDidUpdate(prevState,nextState)
  {
     
  }

  render() {
    return (
      <div className="home-page">
        <Header
          logoTabHandler={this.logoTabHandler}
          clickActionHandler={this.clickActionHandler}
          tabsData={this.state.headerTabs}
        ></Header>
        {this.state.showAlert ?
          <AlertBox alertName={IDEA_ADDED_MESSAGE} /> : null
        }
        <Row justify="center" className="sub-header-wrapper">
          <Col xs={20} sm={20} md={20} lg={20} xl={20}>
            <SubHeader value={this.state}
              subHeaderTitle={this.state.subHeaderTitle}
              buttonClickHandler={this.buttonActionHandler}
              buttonName={this.state.buttonName}
              btnColor={this.state.btnColor}
              showModal={this.state.showModal}
              inputRef={(input) => this.textInput = input}
              userClicked={(event) => this.usersClicked(event)}
              categoriesClicked={(event) => this.categoriesClicked(event)}
            >
            </SubHeader>
          </Col>
        </Row>
        {this.state.showModal && this.state.title !== 'management' ?
          <PopUpModel modelText="testing"
            onOk={this.buttonActionHandler}
            onCancel={this.buttonActionHandler}
            saveandSubmitHandler={this.saveandSubmitHandler}
            saveandSubmit={this.state.saveandSubmit}
            btnColor={this.state.btnColor}
            isAddEditIdea="true"
            isViewIdea="false"
          /> : null
        }
        {this.state.showModal && this.state.title === 'management' ?
          <AdminPopUpModel
            onOk={this.buttonActionHandler}
            onCancel={this.buttonActionHandler}
            isAddEditIdea="false"
            isViewIdea="true"
            adminRecentData=""
            selectedTab="Categories"
            buttonName={this.state.buttonName}
          /> : null}


          <Switch>
          <Redirect exact from="/" to="/dashboard" />
          <Route  path="/dashboard"  >
            <Dashboard onClick={(event) => this.clickActionHandler(event)} />
          </Route>
          <Route  path="/myIdeas" >
            <MyIdeas myIdeaData={this.state.myIdeaData} />
          </Route>
          <Route  path="/allIdeas" component={AllIdea} />
          <Route  path="/request">
            <AllRecentRequest title={this.state.title} value={this.state} />
          </Route>
          <Route  path="/management">
            <AllRecentRequest title={this.state.title} value={this.state} />
          </Route>
         
        </Switch>
      </div>
    );
  }
}
