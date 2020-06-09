import React, { Component } from 'react'
import { Modal, Row, Col, Tag, Select, Input, Switch } from 'antd'
import StatusTag from '../StatusTag/StatusTag';
import { ACTIVE, DEACTIVATED } from '../../Config/Constants';
import GenericButton from '../Button/Button';

export class AdminPopUpModel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ModalText: 'Content of the modal',
            visible: true,
            confirmLoading: false,
        };
    }

    handleCancel = () => {
        this.setState({ visible: false });
    };

    render() {
        return (
            <>
                <Modal
                    title={
                        <Row className="popup-header-title" gutter={2}>
                            <Col className="label-div" style={{ maxWidth: '55%' }}>
                                <label className="header-label">
                                    Admin Popup
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
                                ></GenericButton>
                            </Col>
                        </Row>
                    }
                    onCancel={this.handleCancel}
                    visible={this.state.visible}
                    width={550}
                    footer={null}>
                    <Col className="admin-content-main">
                        <Row>
                            <label className="timeline-header">User Name</label>
                            <p className="admin-p">Bikrant Singh</p>
                        </Row>
                        <Row>
                            <label className="timeline-header">Xebia Location</label>
                            <p className="admin-p">Gurugram</p>
                        </Row>
                        <Row gutter={8} className="tag-div">
                            <Col style={{ padding: '5px 4px' }}><label style={{ marginRight: '20px' }}>User Role</label></Col>
                            <Tag className="type-tag" name="employee" color="#f7941d">Employee</Tag>
                            <Tag className="type-tag" name="manager" color="#f7941d">Manager</Tag>
                            <Tag className="type-tag" name="admin" color="#f7941d">Admin</Tag>
                        </Row>
                        <Row style={{ marginTop: '16px' }}>
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
                        </Row>
                        <Row style={{ marginTop: '16px' }} gutter={8} className="tag-div">
                            <Col style={{ padding: '5px 4px' }}><label style={{ marginRight: '20px' }}>Category Type</label></Col>
                            <Tag className="type-tag" name="technical" color="#f7941d">Technical</Tag>
                            <Tag className="type-tag" name="nontechnical" color="#f7941d">Non Technical</Tag>
                        </Row>
                        <Row gutter={8} style={{ marginTop: '16px' }} className="tag-div">
                            <Col style={{ padding: '5px 4px' }}><label style={{ marginRight: '20px' }}>Deactivate Category</label></Col>
                            <Col className="switch-div"><Switch defaultChecked="true" size="small" /></Col>
                        </Row>
                        <Row gutter={8} style={{ marginTop: '16px' }} className="tag-div">
                            <Col style={{ padding: '5px 4px' }}><label style={{ marginRight: '20px' }}>Deactivate User</label></Col>
                            <Col className="switch-div"><Switch size="small" /></Col>
                        </Row>
                    </Col>
                </Modal>
            </>
        )
    }
}

export default AdminPopUpModel
