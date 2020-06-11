import React, { Component } from 'react'
import { Modal, Row, Col, Tag, Select, Input, Switch } from 'antd'
import StatusTag from '../StatusTag/StatusTag';
import { ACTIVE, DEACTIVATED, ROLE_USER, ROLE_EMPLOYEE, ROLE_ADMIN, SUCCESS } from '../../Config/Constants';
import GenericButton from '../Button/Button';
import { putChangeUserRole } from '../../services/AppService';

export class AdminPopUpModel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true,
            ideaDetailsListView : [],
            userRole : '',
            userRoleBGColor :'',
            userStatus : false,
            userID : '',
        };
    }

    handleCancel = () => {
        this.setState({ visible: false });
    };

    onUserTypeClicked = (event) => {

        switch(event.target.textContent) {
            case 'Employee':  this.setState({userRole : ROLE_EMPLOYEE}); break;
            case 'Manager':   this.setState({userRole : ROLE_USER}); break;
            case 'Admin':  this.setState({userRole : ROLE_ADMIN}); break;
          }
    }
    onUserDeactivate =(event) => {
        this.setState({userStatus : !this.state.userStatus})
    }
    onSaveClicked = () => {
        putChangeUserRole(this.state.userID,this.state.userRole,this.state.userStatus)
        .then(response => {
            if (response.data.message === SUCCESS) {
                this.setState({ideaDetailsListView : response.data.result})
            }
        })
        .catch(error => {
        });
    }
    componentDidMount () {
        if(this.props.isViewIdea)
        {
            this.setState({userID : this.props.adminRecentData.key})
        }
    }
    

    render() {
        const {key,location,role,status,userName}  = this.props.adminRecentData;
        var userRole = role;
        let userEmpBGColor ='#b1b1b1'; let userMgrBGColor ='#b1b1b1'; let userAdmBGColor ='#b1b1b1';
        switch(userRole) {
            case 'Employee':  userEmpBGColor = '#f7941d'; break;
            case 'Manager':   userMgrBGColor = '#f7941d'; break;
            case 'Admin':  userAdmBGColor = '#f7941d'; break;
          }
     
        return (
            <>
                <Modal
                    title={
                        <Row className="popup-header-title" gutter={2}>
                            <Col className="label-div" style={{ maxWidth: '55%' }}>
                                <label className="header-label">
                                 Edit "{userName}"
                                </label>
                            </Col>
                            <Col>
                                <StatusTag ideaStatus={ACTIVE} statusWidth="85px" statusCursor="default" />
                            </Col>
                            <Col style={{ display: 'none' }}>
                                <StatusTag ideaStatus={DEACTIVATED} statusWidth="85px" statusCursor="default" />
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
                    footer={null}>
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
                            <Col style={{ padding: '5px 4px' }}><label style={{ marginRight: '20px' }}>User Role</label></Col>
                            <Tag className="type-tag" name="employee"  onClick={this.onUserTypeClicked}
                            style={{backgroundColor : userEmpBGColor}}>Employee</Tag>
                            <Tag className="type-tag" name="manager" onClick={this.onUserTypeClicked}
                            style={{backgroundColor : userMgrBGColor}}>Manager</Tag>
                            <Tag className="type-tag" name="admin" onClick={this.onUserTypeClicked}
                            style={{backgroundColor : userAdmBGColor}}>Admin</Tag>
                        </Row>
                        {/* <Row style={{ marginTop: '16px' }}>
                            <label style={{ marginBottom: '4px' }} className="timeline-header">Assigning for Category</label>
                            <Select className={!this.state.ideaCategoryValueError ? 'cat-dropdown' : 'errorInput'}
                                placeholder="---select category from here---"
                                style={{ width: "100%" }}
                                onChange={this.onCategoryChanged}>
                            </Select>
                            {this.state.ideaCategoryValueError ? <div className="errorMessage">
                                {this.state.ideaCategoryValueError}</div> : null}
                        </Row>
                        <Row style={{ marginTop: '16px' }}>
                            <label style={{ marginBottom: '4px' }} className="timeline-header">Category</label>
                            <Input type="text"
                                name="ideaCategory"
                                ref="ideaCategory"
                                onChange={this.inputChangedHandler}
                                className={!this.state.ideaSubjectError ? 'idea-input' : 'errorInput'} />
                        </Row> */}
                        {/* <Row style={{ marginTop: '16px' }} gutter={8} className="tag-div">
                            <Col style={{ padding: '5px 4px' }}><label style={{ marginRight: '20px' }}>Category Type</label></Col>
                            <Tag className="type-tag" name="technical" color="#f7941d">Technical</Tag>
                            <Tag className="type-tag" name="nontechnical" color="#f7941d">Non Technical</Tag>
                        </Row> */}
                        {/* <Row gutter={8} style={{ marginTop: '16px' }} className="tag-div">
                            <Col style={{ padding: '5px 4px' }}><label style={{ marginRight: '20px' }}>Deactivate Category</label></Col>
                            <Col className="switch-div"><Switch defaultChecked="true" size="small" /></Col>
                        </Row> */}
                        <Row gutter={8} style={{ marginTop: '16px' }} className="tag-div">
                            <Col style={{ padding: '5px 4px' }}><label style={{ marginRight: '20px' }} onClick={this.onUserDeactivate}>Deactivate User</label></Col>
                            <Col className="switch-div"><Switch size="small" /></Col>
                        </Row>
                    </Col>
                </Modal>
            </>
        )
    }
}

export default AdminPopUpModel
