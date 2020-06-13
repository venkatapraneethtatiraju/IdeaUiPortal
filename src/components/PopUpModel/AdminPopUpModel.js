import React, { Component } from "react";
import { Modal, Row, Col, Tag, Select, Input, Switch } from "antd";
import StatusTag from "../StatusTag/StatusTag";
import {
  ACTIVE,
  DEACTIVATED,
  ROLE_MANAGER,
  ROLE_EMPLOYEE,
  ROLE_ADMIN,
  SUCCESS,
  NON_TECHNICAL,
  TECHNICAL,
} from "../../Config/Constants";
import GenericButton from "../Button/Button";
import { putChangeUserRole } from "../../services/AppService";

export class AdminPopUpModel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      ideaDetailsListView: [],
      userRole: this.props.adminRecentData.role,
      userEmpBGColor: "#b1b1b1",
      userMgrBGColor: "#b1b1b1",
      userAdmBGColor: "#b1b1b1",
      userStatus: false,
      userID: "",
      tabClicked: false,
      categories: '',
      techBGColor : "#b1b1b1",
      nonTechBGColor : "#b1b1b1"

    };
  }

  handleCancel = () => {
    this.setState({ visible: false });
  };

  onUserTypeClicked = (event) => {
    this.setState({ tabClicked: true });
    switch (event.target.textContent) {
      case "Employee":
        this.setState({
          userRole: ROLE_EMPLOYEE,
          userEmpBGColor: "#f7941d",
          userMgrBGColor: "#b1b1b1",
          userAdmBGColor: "#b1b1b1",
        });
        break;
      case "Manager":
        this.setState({
          userRole: ROLE_MANAGER,
          userMgrBGColor: "#f7941d",
          userEmpBGColor: "#b1b1b1",
          userAdmBGColor: "#b1b1b1",
        });
        break;
      case "Admin":
        this.setState({
          userRole: ROLE_ADMIN,
          userAdmBGColor: "#f7941d",
          userMgrBGColor: "#b1b1b1",
          userEmpBGColor: "#b1b1b1",
        });
        break;
        case "Technical":
        this.setState({
          categories: TECHNICAL,
          techBGColor: "#f7941d",
          nonTechBGColor: "#b1b1b1",
        });
        break;
        case "Non Technical":
          this.setState({
          categories: NON_TECHNICAL,
          nonTechBGColor: "#f7941d",
          techBGColor: "#b1b1b1",
          });
          break;
    }
  };
  onUserDeactivate = () => {
    this.setState((prevstate) => ({
      ...prevstate,
      userStatus: !prevstate.userStatus,
    }));
  };
  onSaveClicked = () => {
    let userRole = "";
    if (this.state.userRole === "Employee") {
      userRole = ROLE_EMPLOYEE;
    } else if (this.state.userRole === "Manager") {
      userRole = ROLE_MANAGER;
    } else if (this.state.userRole === "Admin") {
      userRole = ROLE_ADMIN;
    } else {
      userRole = this.state.userRole;
    }
    putChangeUserRole(this.state.userID, userRole, this.state.userStatus)
      .then((response) => {
        this.props.refreshUserList();
      })
      .catch((error) => {});
  };
  componentDidMount() {
    if (this.props.isViewIdea) {
      this.setState({ userID: this.props.adminRecentData.key });
    }
  }

  render() {
    const {
      key,
      location,
      role,
      status,
      userName,
      categories,
      type
    } = this.props.adminRecentData;
    let userRole = role;
    let statusChecked = false;
    // let userEmpBGColor ='#b1b1b1'; let userMgrBGColor ='#b1b1b1'; let userAdmBGColor ='#b1b1b1';
    let userEmpBGColor = this.state.userEmpBGColor;
    let userMgrBGColor = this.state.userMgrBGColor;
    let userAdmBGColor = this.state.userAdmBGColor;
    if (!this.state.tabClicked) {
      switch (userRole) {
        case "Employee":
          userEmpBGColor = "#f7941d";
          break;
        case "Manager":
          userMgrBGColor = "#f7941d";
          break;
        case "Admin":
          userAdmBGColor = "#f7941d";
          break;
      }
    }
    let currentManagement  = this.props.selectedTab;
    let catTab = false;
    if(currentManagement ==='Categories'){
      catTab = true;
    }
    else {
      catTab = false;
    }
    let techBGColor = this.state.techBGColor;
    let nonTechBGColor = this.state.nonTechBGColor;
    if(!this.state.tabClicked && type === 'Technical'){
      techBGColor = '#f7941d';
      nonTechBGColor = '#b1b1b1'
    }
    else if(!this.state.tabClicked && type === 'Non-Technical') {
      nonTechBGColor = '#f7941d'
      techBGColor = '#b1b1b1';
    }


    if (status === "Active") {
      statusChecked = false;
    } else {
      statusChecked = true;
    }

    return (
      <>
        <Modal
          title={
            <Row className="popup-header-title" gutter={2}>
              <Col className="label-div" style={{ maxWidth: "55%" }}>
                <label className="header-label">Edit {!catTab ? `"${userName}"`: `"${categories}"`}</label>
              </Col>
              <Col>
                <StatusTag
                  ideaStatus={ACTIVE}
                  statusWidth="85px"
                  statusCursor="default"
                />
              </Col>
              <Col style={{ display: "none" }}>
                <StatusTag
                  ideaStatus={DEACTIVATED}
                  statusWidth="85px"
                  statusCursor="default"
                />
              </Col>
              <Col className="right-display">
                <GenericButton
                  buttonName="Save"
                  btnColor="rgb(177, 177, 177)"
                  buttonClickHandler={this.onSaveClicked}
                ></GenericButton>
              </Col>
            </Row>
          }
          onCancel={this.props.onCancel}
          onOk={this.props.onOk}
          visible={this.state.visible}
          width={550}
          footer={null}
        >
         {!catTab ?
          <Col className="admin-content-main">
            <Row>
              <label className="timeline-header">User Name</label>
              <p className="admin-p">{userName}</p>
            </Row>
            <Row>
              <label className="timeline-header">Xebia Location</label>
              <p className="admin-p">{location}</p>
            </Row>
            <Row gutter={8} className="tag-div">
              <Col style={{ padding: "5px 4px" }}>
                <label style={{ marginRight: "20px" }}>User Role</label>
              </Col>
              <Tag
                className="type-tag"
                name="employee"
                onClick={this.onUserTypeClicked}
                style={{ backgroundColor: userEmpBGColor }}
              >
                Employee
              </Tag>
              <Tag
                className="type-tag"
                name="manager"
                onClick={this.onUserTypeClicked}
                style={{ backgroundColor: userMgrBGColor }}
              >
                Manager
              </Tag>
              <Tag
                className="type-tag"
                name="admin"
                onClick={this.onUserTypeClicked}
                style={{ backgroundColor: userAdmBGColor }}
              >
                Admin
              </Tag>
            </Row>
            <Row gutter={8} style={{ marginTop: "16px" }} className="tag-div">
              <Col style={{ padding: "5px 4px" }}>
                <label style={{ marginRight: "20px" }}>Deactivate User</label>
              </Col>
              <Col className="switch-div">
                <Switch
                  size="small"
                  defaultChecked={statusChecked}
                  onChange={this.onUserDeactivate}
                />
              </Col>
            </Row>
            
                        
          </Col>:
           <Col className="admin-content-main">
             <Row style={{ marginTop: '16px' }}>
                            <label style={{ marginBottom: '4px' }} className="timeline-header">Category</label>
                            <Input type="text"
                                name="ideaCategory"
                                ref="ideaCategory"
                                value={categories} readonly/>
                        </Row>
                        <Row style={{ marginTop: '16px' }} gutter={8} className="tag-div">
                            <Col style={{ padding: '5px 4px' }}><label style={{ marginRight: '20px' }}>Category Type</label></Col>
                            <Tag className="type-tag" name="technical" 
                              style={{backgroundColor : techBGColor}} onClick={this.onUserTypeClicked}>Technical</Tag>
                            <Tag className="type-tag" name="nontechnical" 
                               style={{backgroundColor : nonTechBGColor}} onClick={this.onUserTypeClicked}>Non Technical</Tag>
                        </Row>
                        <Row gutter={8} style={{ marginTop: '16px' }} className="tag-div">
                            <Col style={{ padding: '5px 4px' }}><label style={{ marginRight: '20px' }}>Deactivate Category</label></Col>
                            <Col className="switch-div"><Switch defaultChecked="true" size="small" /></Col>
                        </Row> 
             </Col>}
        </Modal>
      </>
    );
  }
}

export default AdminPopUpModel;
