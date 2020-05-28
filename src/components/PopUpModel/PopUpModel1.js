import React, { Component } from 'react';
import './PopUpModel1.scss';
import { Modal, Row, Col, Input, Tag, Button } from 'antd';
import GenericButton from '../Button/Button';

class PopUpModel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ideaId: '',
            ideaSubject: '',
            ideaType: 1,
            ideaCategory: {},
            ideaCategoryValue: 0,
            ideaDetails: '',
            ideaStatusId: 0,
            ideaSubjectError: "",
            ideaTypeError: "",
            ideaCategoryValueError: "",
            ideaDetailsError: "",
            ideaColorTech: "rgb(247, 148, 29)",
            ideaColorNonTech: "rgb(177, 177, 177)",
            selectedRow: []
        }
    }

    render() {
        return (
            <div className="modal-content">
                <Modal
                    title={
                        <Row className="popup-header-title" gutter={2}>
                            <Col xs={9} sm={9} md={9} lg={9} xl={9}>
                                <label className="header-label">Chat Bot for Sales Team</label>
                            </Col>
                            <Col>
                                <Tag className="display-status-tag" color="#0C5CC9" >Approved</Tag>
                            </Col>
                            <Col>
                                <Tag style={{ display: 'none' }} className="display-status-tag" color="#F7941D" >Draft</Tag>
                            </Col>
                            <Col>
                                <Tag style={{ display: 'none' }} className="display-status-tag" color="#A5AAD9" >Submitted</Tag>
                            </Col>
                            <Col>
                                <Button type="link" style={{ color: this.props.btnColor }}>Save as Draft</Button>
                            </Col>
                            <Col>
                                <GenericButton
                                    buttonName="Save and Submit"
                                    btnColor={this.props.btnColor}
                                ></GenericButton>
                            </Col>
                            <Col>
                                <GenericButton
                                    buttonName="Edit"
                                    btnColor={this.props.btnColor}
                                ></GenericButton>
                            </Col>
                            <Col>
                                <div className="circle"></div>
                            </Col>
                        </Row>
                    }
                    visible
                    onCancel={this.props.onCancel}
                    onOk={this.props.onOk}
                    footer={null}
                    width={730}
                >

                    <Row gutter={18} justify="space-between" className="attachments-column" >
                        <Col className="column-2">
                            <div>
                                <label>Idea Subject</label>
                                <Input type="text"
                                    name="ideaSubject" />
                            </div>

                        </Col>
                        <Col className="column-left">

                        </Col>
                    </Row>
                </Modal>
            </div>
        );
    }
}

export default PopUpModel;