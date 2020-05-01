import React, { Component } from 'react';
import './PopUpModel.scss';
import {  Modal, Button , Row, Col , Input, Tag, Select, Card, Upload} from 'antd';
import GenericButton from '../Button/Button';
import { BoldOutlined, ItalicOutlined, UnderlineOutlined, UnorderedListOutlined, OrderedListOutlined } from '@ant-design/icons';

class PopUpModel extends Component {
    render() {
        const { TextArea } = Input;
        return (
            <div className="write-popup-modal-container">
                <Modal
                title={
                    <Row className="popup-header-title" gutter={2}>
                        <Col xs={14} sm={14} md={14} lg={14} xl={14}>
                            Add an Idea
                        </Col>
                        <Col>
                             <Button type="link" style={{
                                 color: this.props.btnColor
                             }}>Save as Draft</Button>
                        </Col>
                        <Col>
                            <GenericButton
                            buttonClickHandler={this.props.saveandSubmitHandler}
                            buttonName={this.props.saveandSubmit}
                            btnColor={this.props.btnColor}
                            ></GenericButton>
                        </Col>
                    </Row>
                }
                visible
                onCancel={this.props.onCancel}
                onOk={this.props.onOk}
                footer={null}
                width= {730}
                >
                 <Row gutter={18} justify="space-between" className="attachments-column">
                     <Col className="column-2">
                         <div>
                             <label>Idea Subject</label>
                            <Input/>
                         </div>
                         <br/>
                         <Row gutter={12}>
                             <Col >Idea Type</Col>
                             <Col><Tag color="#f7941d">Technical</Tag></Col>
                             <Col ><Tag color="#b1b1b1">Non Technical</Tag></Col>
                         </Row>
                         <br/>
                         <Row>
                             <label>Idea Category</label>
                            <Select
                            placeholder="---select category from here---"
                            style={{ width: "100%" }}
                            ></Select>
                         </Row>
                         <br/>
                         <Row>
                             <label className="text-formatter">Idea Details</label>
                             <Card
                             title={
                                 <Row gutter={12}>
                                     <Col className="formatter-icons"><BoldOutlined/></Col>
                                     <Col className="formatter-icons"><ItalicOutlined/></Col> 
                                     <Col className="formatter-icons"><UnderlineOutlined/></Col> 
                                     <Col className="formatter-icons"><UnorderedListOutlined/></Col>
                                     <Col className="formatter-icons"><OrderedListOutlined/></Col>
                                 </Row>
                             }
                             className="content-format-container"> 
                                    <TextArea rows={4} />
                             </Card>
                         </Row>
                     </Col>
                     <Col className="column-2">
                        <Row>
                            <label style={{width: "100%"}}>Add Attachment</label>
                            <div className="attachment-title-container">
                                <Upload>
                                    <Button style={{borderRadius: "4px"}}>
                                        Upload from device
                                    </Button>
                                </Upload>
                                {/* <Tag color="#b1b1b1">Upload from device</Tag> */}
                                <span className="attachment-label">or Drag your file here </span>
                            </div>
                        </Row>
                        <br/>
                        <Row>
                            <label className="timeline-header">Timeline</label><br/>
                            <p>Nothing to display here</p>
                        </Row>
                     </Col>
                 </Row>
                </Modal>
            </div>
        );
    }
}

export default PopUpModel;