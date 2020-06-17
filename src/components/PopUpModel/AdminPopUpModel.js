import React, { Component } from "react";
import { Modal, Row, Col, Tag, Input, Switch,Select } from "antd";
import StatusTag from "../StatusTag/StatusTag";
import {
  ACTIVE,
  DEACTIVATED,
  ROLE_MANAGER,
  ROLE_EMPLOYEE,
  ROLE_ADMIN,
  NON_TECHNICAL,
  TECHNICAL,
  EMPLOYEE,
  ADMIN,
  MANAGER,
} from "../../Config/Constants";
import GenericButton from "../Button/Button";
import { putChangeUserRole, putCategories, postCategories, getActiveCategories } from "../../services/AppService";

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
      userStatus: this.props.adminRecentData.enabled,
      userID: "",
      tabClicked: false,
      categories: '',
      techBGColor: "#b1b1b1",
      nonTechBGColor: "#b1b1b1",
      categoriesValue: this.props.adminRecentData.categories,
      categoryStatus: this.props.adminRecentData.active,
      ideaActiveCategories : [],
      showCategories : false,
      selectedCatValue :'',
    };
  }

  handleCancel = () => {
    this.setState({ visible: false });
  };

  onUserTypeClicked = (event) => {
    this.setState({ tabClicked: true, showCategories : false });
    switch (event.target.textContent) {
      case "Employee":
        this.setState({
          userRole: EMPLOYEE,
          userEmpBGColor: "#f7941d",
          userMgrBGColor: "#b1b1b1",
          userAdmBGColor: "#b1b1b1",
        });
        break;
      case "Manager":
        this.setState({
          userRole: MANAGER,
          userMgrBGColor: "#f7941d",
          userEmpBGColor: "#b1b1b1",
          userAdmBGColor: "#b1b1b1",
          showCategories : true,
        });
        this.getCategories();
        break;
      case "Admin":
        this.setState({
          userRole: ADMIN,
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
      default:
        break;
    }
  };

  onUserDeactivate = () => {
    this.setState((prevstate) => ({
      ...prevstate,
      userStatus: !prevstate.userStatus,
    }));
  };

  onCategoryDeactivate = () => {
    this.setState((prevstate) => ({
      ...prevstate,
      categoryStatus: !prevstate.categoryStatus,
    }));
  };

  onSaveClicked = (key, catTab, addCategory) => {
    let categoryId = 1;
    if (this.state.categories === TECHNICAL) {
      categoryId = 1
    }
    else if (this.state.categories === NON_TECHNICAL) {
      categoryId = 2
    }
    let requestParam = {
      subCategoryName: this.state.categoriesValue,
      categoryId: categoryId,
    }
    if (catTab && addCategory !== "Add Category") {
      requestParam.isActive = this.state.categoryStatus;
      this.editCategorie(key, requestParam);
    }
    else if (addCategory === "Add Category") {
      this.addCategorie(requestParam);
    }
    else {
      let userRole = "";
      let subCategoryId = "";
      if (this.state.userRole === EMPLOYEE) {
        userRole = ROLE_EMPLOYEE;
      } else if (this.state.userRole === MANAGER) {
        userRole = ROLE_MANAGER;
        subCategoryId = this.state.selectedCatValue;
      } else if (this.state.userRole === ADMIN) {
        userRole = ROLE_ADMIN;
      } else {
        userRole = this.state.userRole;
      }
      putChangeUserRole(this.state.userID, userRole, this.state.userStatus, subCategoryId)
        .then((response) => {
          this.props.refreshUserList();
        })
        .catch((error) => { });
    };
  }
  editCategorie = (key, requestParam) => {
    putCategories(key, requestParam)
      .then((response) => {
        this.props.refreshCategoriesList();
      })
      .catch((error) => { });

  }
  addCategorie = (requestParam) => {
    postCategories(requestParam)
      .then((response) => {
        this.props.onOk("addCateSucess");
      })
      .catch((error) => { });
  }

  onCategoryChanged = (event) => {
    this.setState({ categoriesValue: event.target.value })
  }

  componentDidMount() {
    if (this.props.isViewIdea) {
      this.setState({ userID: this.props.adminRecentData.key });
    }
  }

  getCategories = () => {
    getActiveCategories()
        .then(response => {
            this.setState({ ideaActiveCategories: response.data })
        })
        .catch(error => {
        });
}
onCategoryItemChanged = (value) => {
  this.setState({ selectedCatValue: value })
}

  render() {
    const {
      key,
      location,
      role,
      userName,
      categories,
      enabled,
      active,
      type,
      status
    } = this.props.adminRecentData;

    let userRole = role;
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
        default:
          break;
      }
    }
    let currentManagement = this.props.selectedTab;
    let catTab = false;
    if (currentManagement === 'Categories') {
      catTab = true;
    }
    else {
      catTab = false;
    }
    let techBGColor = this.state.techBGColor;
    let nonTechBGColor = this.state.nonTechBGColor;
    if (!this.state.tabClicked && type === 'Technical') {
      techBGColor = '#f7941d';
      nonTechBGColor = '#b1b1b1'
    }
    else if (!this.state.tabClicked && type === 'Non-Technical') {
      nonTechBGColor = '#f7941d'
      techBGColor = '#b1b1b1';
    }

    let addCategory = this.props.buttonName;
    let addCat = false;

    if (addCategory === 'Add Category') {
      addCat = true;
    }
    else {
      addCat = false;
    }
    if (!this.state.tabClicked && addCategory === 'Add Category') {
      techBGColor = '#f7941d';
    }

    return (
      <>
        <Modal
          title={
            <Row className="popup-header-title" gutter={2}>
              {addCat ? <Col className="label-div" style={{ maxWidth: "55%" }}>
                <label className="header-label">Add Category</label>
              </Col> :
                <>
                  <Col className="label-div" style={{ maxWidth: "55%" }}>
                    <label className="header-label">Edit {!catTab ? `"${userName}"` : `"${categories}"`}</label>
                  </Col>
                  <Col>
                    <StatusTag
                      ideaStatus={status}
                      statusWidth="85px"
                      statusCursor="default"
                    />
                  </Col>
                </>
              }
              <Col className="right-display">
                <GenericButton
                  buttonName="Save"
                  btnColor="rgb(177, 177, 177)"
                  buttonClickHandler={() => this.onSaveClicked(key, catTab, addCategory)}
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
              {this.state.showCategories ?
              <Row style={{ marginTop: '10px' }}>
                <label>Assigning for Category</label>
             <Select
                 placeholder="---select category from here---"
                 style={{ width: "96%" ,paddingTop : '5px'}}
                 onChange={this.onCategoryItemChanged}>
                 {this.state.ideaActiveCategories.length > 0 ?
                 <>
                  {this.state.ideaActiveCategories.map(item => (
                   <Select.Option value={item.id}>{item.subCategoryName}</Select.Option>
                  ))}
                  </>
                 : null}
              </Select>
              </Row>:null}
              <Row gutter={8} style={{ marginTop: "16px" }} className="tag-div">
                <Col style={{ padding: "5px 4px" }}>
                  <label style={{ marginRight: "20px" }}>Deactivate User</label>
                </Col>
                <Col className="switch-div">
                  <Switch
                    size="small"
                    defaultChecked={!enabled}
                    onChange={this.onUserDeactivate}
                  />
                </Col>
              </Row>


            </Col> :
            <Col className="admin-content-main">
              <Row>
                <label style={{ marginBottom: '10px' }} className="timeline-header">Category</label>
                <Input type="text"
                  name="ideaCategory"
                  ref="ideaCategory"
                  value={this.state.categoriesValue} onChange={this.onCategoryChanged}
                  placeholder={addCat ? 'Enter category name' : ''} />
              </Row>
              <Row style={{ marginTop: '20px' }} gutter={8} className="tag-div">
                <Col style={{ padding: '5px 4px' }}><label style={{ marginRight: '20px' }}>Category Type</label></Col>
                <Tag className="type-tag" name="technical"
                  style={{ backgroundColor: techBGColor }} onClick={this.onUserTypeClicked}>Technical</Tag>
                <Tag className="type-tag" name="nontechnical"
                  style={{ backgroundColor: nonTechBGColor }} onClick={this.onUserTypeClicked}>Non Technical</Tag>
              </Row>
              {!addCat ?
                <Row gutter={8} style={{ marginTop: '20px' }} className="tag-div">
                  <Col style={{ padding: '5px 4px' }}><label style={{ marginRight: '20px' }}>Deactivate Category</label></Col>
                  <Col className="switch-div"><Switch defaultChecked={!active} size="small"
                    onChange={this.onCategoryDeactivate} /></Col>
                </Row> : null}
            </Col>}
        </Modal>
      </>
    );
  }
}

export default AdminPopUpModel;
