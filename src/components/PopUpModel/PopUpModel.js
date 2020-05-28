import React, { Component } from 'react';

import { Modal, Button, Row, Col, Input, Tag, Select, Card, Upload } from 'antd';
import GenericButton from '../Button/Button';
import { BoldOutlined, ItalicOutlined, UnderlineOutlined, UnorderedListOutlined, OrderedListOutlined } from '@ant-design/icons';

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
        if (this.props.onEditHandler) {
            console.log("const...", this.props.onEditHandler.ideaDescription);
            let datas = this.props.onEditHandler;
            this.state.ideaId = datas.key;
            this.state.ideaSubject = datas.ideaSubject;
            this.state.ideaDetails = datas.ideaDescription;
            this.state.ideaType = datas.ideaType === 'TECHNICAL' ? this.state.ideaType = 1 : this.state.ideaType = 2;
            this.state.ideaCategoryValue = datas.ideaCategory;
        }
    }

    validateInputs = () => {
        console.log("child")
        const { ideaSubject, ideaType, ideaCategoryValue, ideaDetails } = this.state;
        let valid = false;
        if (ideaSubject.trim() === "") {
            this.setState({ ideaSubjectError: 'This is a mandatory field' });
            valid = true;
        } else {
            this.setState({ ideaSubjectError: '' });
            valid = false;
        }
        if (!ideaCategoryValue) {
            this.setState({ ideaCategoryValueError: 'This is a mandatory field' });
            valid = true;
        } else {
            this.setState({ ideaCategoryValueError: '' });
            valid = false;
        }
        if (ideaDetails.trim() === "") {
            this.setState({ ideaDetailsError: 'This is a mandatory field' });
            valid = true;

        } else {
            this.setState({ ideaDetailsError: '' });
            valid = false;
        }
        // else {
        //     valid = false;
        //    this.setState({ideaSubjectError :'',ideaCategoryValueError : '', ideaDetailsError : ''});
        //    //this.setState({ideaSubjectError :''})
        // }
        console.log("child", valid)

        return valid;
    }
    saveandSubmitHandler = (e) => {
        let ideaStatusId = 0;
        if (e.target.textContent === 'Save & Submit') {
            ideaStatusId = 2;
        }
        else {
            ideaStatusId = 1;
        }
        if (this.validateInputs())
            return;
        else {




            const { ideaSubject, ideaType, ideaCategoryValue, ideaDetails, ideaId } = this.state;

            this.props.saveandSubmitHandler(ideaSubject, ideaType, ideaCategoryValue, ideaDetails, ideaStatusId, ideaId);
        }
    }
    onEditHandler = (e) => {
        // console.log("asdadaaaaa", this.props.onEditHandler)
    }

    inputChangedHandler = (event) => {
        if (event.target.name === "ideaSubject") {
            this.setState({ ideaSubject: event.target.value })
        }
        else if (event.target.name === "ideaDetails") {
            this.setState({ ideaDetails: event.target.value })
        }

    }

    ideaTypeChangedHandler = (event) => {

        let ideaCategory = [];
        let ideaCategoryNonTech = [];
        if (event.target.textContent === "Technical") {
            this.setState({ ideaType: 1 });
            ideaCategory.push('BI COE', 'DEVOPS COE', 'Microsoft COE',
                'Digital Assurance COE', 'XACT COE', 'Mobility COE');
            this.setState({
                ideaCategory: ideaCategory,
                ideaColorTech: 'rgb(247, 148, 29)',
                ideaColorNonTech: 'rgb(177, 177, 177)'
            })
        }
        else if (event.target.textContent === "Non Technical") {
            this.setState({ ideaType: 2 });
            ideaCategory.push('HR', 'Admin', 'General');
            this.setState({
                ideaCategory: ideaCategory,
                ideaColorNonTech: 'rgb(247, 148, 29)',
                ideaColorTech: 'rgb(177, 177, 177)'
            })
            console.log(this.state.ideaCategory)

        }
    }

    onCategoryChanged = (event) => {
        this.setState({ ideaCategoryValue: event })
    }

    render() {

        const { TextArea } = Input;
        let optionTemplate = "";
        let count = 0;
        if (this.state.ideaCategory.length > 0) {
            optionTemplate = this.state.ideaCategory.map(value => (
                <option value={count = count + 1}>{value}</option>
            ));
        }
        const { ideaSubject, ideaType, ideaCategoryValue, ideaDetails } = this.state;
        //() =>this.props.saveandSubmitHandler({ideaSubject,ideaType,ideaCategoryValue,ideaDetails})
        return (
            <div className="modal-content">
                <Modal
                    title={
                        <Row className="popup-header-title" gutter={2}>
                            <Col xs={14} sm={14} md={14} lg={14} xl={14}>
                                {this.state.ideaId ? this.state.ideaSubject : 'Add an Idea'}
                            </Col>

                            <Col>
                                <Button type="link" onClick={this.saveandSubmitHandler} style={{
                                    color: this.props.btnColor
                                }}>Save as Draft</Button>
                            </Col>
                            <Col>
                                <GenericButton
                                    buttonClickHandler={this.saveandSubmitHandler}
                                    buttonName={this.props.saveandSubmit}
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
                                <Input type="text" value={this.state.ideaSubject}
                                    name="ideaSubject"
                                    ref="ideaSubject"
                                    onChange={this.inputChangedHandler}
                                    className={!this.state.ideaSubjectError ? '' : 'errorInput'} />
                            </div>
                            {this.state.ideaSubjectError ? <div className="errorMessage">
                                {this.state.ideaSubjectError}</div> : null}
                            <br />
                            <Row gutter={12}>
                                <Col >Idea Type</Col>
                                <Col><Tag onClick={this.ideaTypeChangedHandler} name="technical"
                                    color="#f7941d" style={{ backgroundColor: this.state.ideaColorTech }}>Technical</Tag></Col>
                                <Col ><Tag onClick={this.ideaTypeChangedHandler} name="nontechnical"
                                    color="#b1b1b1" style={{ backgroundColor: this.state.ideaColorNonTech }}>Non Technical</Tag></Col>
                            </Row>
                            <br />
                            <Row>
                                <label>Idea Category</label>
                                <Select className={!this.state.ideaCategoryValueError ? '' : 'errorInput'}
                                    placeholder="---select category from here---"
                                    style={{ width: "100%" }}
                                    onChange={this.onCategoryChanged}>
                                    {optionTemplate}
                                </Select>
                                {this.state.ideaCategoryValueError ? <div className="errorMessage">
                                    {this.state.ideaCategoryValueError}</div> : null}
                            </Row>
                            <br />
                            <Row>
                                <label className="text-formatter">Idea Details</label>
                                <Card
                                    title={
                                        <Row gutter={12}>
                                            <Col className="formatter-icons"><BoldOutlined /></Col>
                                            <Col className="formatter-icons"><ItalicOutlined /></Col>
                                            <Col className="formatter-icons"><UnderlineOutlined /></Col>
                                            <Col className="formatter-icons"><UnorderedListOutlined /></Col>
                                            <Col className="formatter-icons"><OrderedListOutlined /></Col>
                                        </Row>
                                    }
                                    className="content-format-container">
                                    <TextArea rows={4} type="text" name="ideaDetails"
                                        value={this.state.ideaDetails}
                                        onChange={this.inputChangedHandler} ref="ideaDetails"
                                        className={!this.state.ideaDetailsError ? '' : 'errorInput'} />
                                </Card>
                                {this.state.ideaDetailsError ? <div className="errorMessage">
                                    {this.state.ideaDetailsError}</div> : null}
                            </Row>
                        </Col>
                        <Col className="column-left">
                            <Row>
                                <label style={{ width: "100%" }}>Add Attachment</label>
                                <div className="attachment-title-container">
                                    <Upload>
                                        <Button style={{ borderRadius: "4px" }}>
                                            Upload from device
                                    </Button>
                                    </Upload>
                                    {/* <Tag color="#b1b1b1">Upload from device</Tag> */}
                                    <span className="attachment-label">or Drag your file here </span>
                                </div>
                            </Row>
                            <br />
                            <Row>
                                <label className="timeline-header">Timeline</label><br />
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