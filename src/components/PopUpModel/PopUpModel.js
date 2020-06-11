import React, { Component } from 'react';
import './PopUpModel.scss';
import { Modal, Row, Col, Tag, Button, Timeline, Avatar, Input, Select, Upload } from 'antd';
import GenericButton from '../Button/Button';
import { ReactComponent as JpgIcon } from '../../images/jpg.svg'
import { ReactComponent as PptIcon } from '../../images/ppt.svg'
import { ReactComponent as LikeIcon } from '../../images/hands.svg'
import { ReactComponent as DownloadIcon } from '../../images/download.svg'
import { ReactComponent as GestureIcon } from '../../images/gestures.svg'
import { postIdeaLike, postIdeaDisLike, getIdeaDetailsById } from '../../services/AppService';
import Editor from '../Editor/Editor';
import { SUCCESS, CLOSE, REVIEW, APPROVED, COMPLETE, DEVELOPMENT } from '../../Config/Constants';
import ReactHtmlParser from 'react-html-parser';
import { createIconShortName, getFormatttedDate } from '../../Utility/CommonFunctions';
import StatusButton from '../StatusButton/StatusButton';
import AdminPopUpModel from './AdminPopUpModel';
import StatusTag from '../StatusTag/StatusTag';



class PopUpModel extends Component {
    constructor(props) {
        super(props)

        this.state = {
            ideaId: '',
            ideaSubject: '',
            subject: '',
            subjectCategoryName: '',
            ideaType: 1,
            ideaCategory: {},
            ideaCategoryValue: 0,
            ideaDetails: '',
            ideaSubmittedBy: '',
            ideaStatusId: 0,
            ideaSubjectError: "",
            ideaTypeError: "",
            ideaCategoryValueError: "",
            ideaDetailsError: "",
            ideaColorTech: "rgb(247, 148, 29)",
            ideaColorNonTech: "rgb(177, 177, 177)",
            selectedRow: [],
            currentState: "",
            ideaStatusHistories: [],
            likeIdeaDetailList: [],
            ids: "",
            isAddEditIdea: this.props.isAddEditIdea,
            isViewIdea: this.props.isViewIdea,
            selectedId: this.props.selectedId,
            isLike: false,
            ideaDetailsListView: []
        }
        if (this.props.onEditHandler) {
            console.log("const...", this.props.onEditHandler.ideaDescription);
            let datas = this.props.onEditHandler;
            this.state.ideaId = datas.key;
            this.state.ideaSubject = datas.ideaSubject;
            this.state.ideaDetails = datas.ideaDescription;
            this.state.ideaType = datas.ideaType === 'TECHNICAL' ? this.state.ideaType = 1 : this.state.ideaType = 2;
            this.state.ideaCategoryValue = datas.ideaCategory;
            // this.state.isAddEditIdea = this.props.isAddEditIdea;
            // this.state.isViewIdea = this.state.isViewIdea;
        }
        if (this.props.isViewIdea === "true") {
            this.state.selectedId = this.props.selectedId;
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




            const { ideaSubject, ideaType, ideaCategoryValue, ideaDetails, ideaId, subject } = this.state;

            this.props.saveandSubmitHandler(ideaSubject, ideaType, ideaCategoryValue, ideaDetails, ideaStatusId, ideaId);
        }
    }
    onEditHandler = (e) => {
        // console.log("asdadaaaaa", this.props.onEditHandler)
    }

    onEditChanged = (e) => {
        this.setState({ ideaDetails: e })
    }
    inputChangedHandler = (event) => {
        debugger;
        if (event.target.name === "ideaSubject") {
            this.setState({ ideaSubject: event.target.value })
        }
        //   else if (event.target.name ==="ideaDetails"){
        //     this.setState({ideaDetails : event.target.value})
        //     }

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

    onLikeIconClicked = (ideaId) => {
        if (!this.state.isLike) {
            postIdeaLike(ideaId)
                .then(response => {
                    if (response.data.message === SUCCESS) {
                        this.setState({ isLike: true })
                        this.props.updateLikes(this.state.isLike)
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        }
        else {
            postIdeaDisLike(ideaId)
                .then(response => {
                    if (response.data.message === SUCCESS) {
                        this.setState({ isLike: false })
                        // this.props.updateLikes(this.state.isLike)
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }

    selectedRow = () => {
        debugger;
    }
    componentDidMount() {
        if (this.state.isViewIdea && this.props.ideaId) {
            getIdeaDetailsById(this.props.ideaId)
                .then(response => {
                    if (response.data.message === SUCCESS) {
                        this.setState({ ideaDetailsListView: response.data.result })
                    }
                })
                .catch(error => {
                });
        }
        console.log(this.state.ideaDetailsListView)
    }


    render() {
        const { title, categoryName, subcategoryName, ideaStatus,
            ideaDescription, ideaStatusHistories, likeIdeaDetailList, likeCount } = this.state.ideaDetailsListView;
        let optionTemplate = "";
        let count = 0;
        if (this.state.ideaCategory.length > 0) {
            optionTemplate = this.state.ideaCategory.map(value => (
                <option value={count = count + 1}>{value}</option>
            ));
        }

        return (
            <div className="modal-content">
                {/* {true ? <AdminPopUpModel /> : */}
                <Modal
                    title={
                        <Row className="popup-header-title" gutter={2}>
                            <Col className="label-div" style={{ maxWidth: '38%' }}>
                                <label className="header-label">
                                    {this.state.isViewIdea === "true" ? title : 'Add an Idea'}
                                </label>
                            </Col>
                            {this.state.isViewIdea === "true" && ideaStatus ?
                                <Col>
                                    <StatusTag ideaStatus={ideaStatus} statusWidth="96px" statusCursor="default" />
                                </Col> : null}

                            <Col style={{ display: 'none' }}>
                                <Tag className="display-status-tag" color="#F7941D" >Draft</Tag>
                            </Col>

                            <Col style={{ display: 'none' }}>
                                <Tag className="display-status-tag" color="#A5AAD9" >Submitted</Tag>
                            </Col>

                            {this.state.isViewIdea === "true" || this.state.currentState === "approved" ? null :
                                <Row className="right-display">
                                    {console.log('this.state.currentState : ' + this.state.currentState)}
                                    <Row>
                                        <Button type="link" onClick={this.saveandSubmitHandler} style={{
                                            color: this.props.btnColor
                                        }}>Save as Draft</Button>
                                        <GenericButton
                                            buttonClickHandler={this.saveandSubmitHandler}
                                            buttonName={this.props.saveandSubmit}
                                            btnColor={this.props.btnColor}
                                        ></GenericButton>
                                    </Row>
                                </Row>}

                            <Col className="right-display" style={{ display: 'none' }}>
                                <GenericButton
                                    buttonName="Edit"
                                    btnColor={this.props.btnColor}
                                ></GenericButton>
                            </Col>
                            <Row className="right-display" style={{ display: 'none' }}>
                                <StatusButton ideaStatus={CLOSE} />
                                <Col className="split-line" />
                                <StatusButton ideaStatus={REVIEW} />
                                <Col className="split-line" />
                                <StatusButton ideaStatus={APPROVED} />
                            </Row>
                            <Row className="right-display" style={{ display: 'none' }}>
                                <StatusButton ideaStatus={DEVELOPMENT} />
                                <Col className="split-line" />
                                <StatusButton ideaStatus={COMPLETE} />
                            </Row>
                        </Row>
                    }

                    visible
                    centered
                    onCancel={this.props.onCancel}
                    onOk={this.props.onOk}
                    footer={null}
                    width={760}

                >

                    <Row gutter={18} justify="space-between" className="attachments-column" >
                        {this.state.isAddEditIdea === "true" ? <Col style={{ paddingRight: '11px' }} className="column-left-idea">
                            {/* {this.state.currentState ==="ápproved" ? 
                            ''
                     
                             :   */}
                            <Col style={{ paddingLeft: '20px' }} className="column-addidea-left">
                                {this.state.isViewIdea === "true" || this.state.currentState === "ápproved" ? null :
                                    <div>
                                        <Row>
                                            <label>Idea Subject</label>
                                            <Input type="text" value={this.state.ideaSubject}
                                                name="ideaSubject"
                                                ref="ideaSubject"
                                                onChange={this.inputChangedHandler}
                                                className={!this.state.ideaSubjectError ? 'idea-input' : 'errorInput'} />
                                        </Row>
                                        {this.state.ideaSubjectError ? <div className="errorMessage">
                                            {this.state.ideaSubjectError}</div> : null}
                                        <br />
                                    </div>}
                                <Row gutter={8} className="tag-div">
                                    <Col style={{ padding: '5px 4px' }}><label style={{ marginRight: '20px' }}>Idea Type</label></Col>
                                    <Tag className="type-tag" onClick={this.ideaTypeChangedHandler} name="technical"
                                        color="#f7941d" style={{ backgroundColor: this.state.ideaColorTech }}>Technical</Tag>
                                    <Tag className="type-tag" onClick={this.ideaTypeChangedHandler} name="nontechnical"
                                        color="#b1b1b1" style={{ backgroundColor: this.state.ideaColorNonTech }}>Non Technical</Tag>
                                </Row>
                                <br />
                                <Row>
                                    <label>Idea Category</label>
                                    <Select className={!this.state.ideaCategoryValueError ? 'cat-dropdown' : 'errorInput'}
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
                                    {/* <div className="content-format-container"> */}

                                    <Editor name="ideaDetails" value={this.state.ideaDetails}
                                        onEditChanged={this.onEditChanged} handleChange={this.state.ideaDetails}
                                        ref="ideaDetails" />

                                </Row>

                            </Col>



                        </Col> : null}
                        {this.state.isAddEditIdea === "true" ? <Col style={{ paddingRight: '0px' }} className="column-right-idea">
                            <Col className="column-addidea-right">
                                <Row>
                                    <label className="text-formatter">Add Attachment</label>
                                    <Row className="attachment-title-container">
                                        <Upload>
                                            <Button>
                                                Upload from device
                                            </Button>
                                        </Upload>
                                        <span style={{ width: '114px', height: '29px' }} className="text-indication">or Drag your file here </span>
                                    </Row>
                                </Row>
                                <br />
                                <Row>
                                    <label className="text-formatter">Timeline</label>
                                    <span style={{ width: '100%', height: '29px' }} className="text-indication">Nothing to display here</span>
                                </Row>
                            </Col>
                        </Col> : null}
                        {this.state.isViewIdea === "true" ? <Col style={{ paddingRight: '0px' }} className="column-left-view-idea">
                            <Col style={{ paddingLeft: '20px' }} className="column-left-top">
                                <Row>
                                    <label className="timeline-header">Idea Type</label>
                                    <p>{categoryName}</p>
                                </Row>
                                <Row>
                                    <label className="timeline-header">Idea Category</label>
                                    <p>{subcategoryName}</p>
                                </Row>
                                <Row>
                                    <label className="timeline-header">Idea Details</label>
                                    <p>{ReactHtmlParser(ideaDescription)}</p>
                                </Row>
                            </Col>
                            <Row className="column-left-bottom">
                                {likeCount ?
                                    <Row className="like-container">
                                        <GestureIcon className="like-hands"
                                            onClick={() => this.onLikeIconClicked(this.state.ideaId)} />
                                    </Row> :
                                    <Row className="like-container">
                                        <LikeIcon className="like-hands" alt="Edit-Tools" />
                                        <Col className="gesture-middle">
                                            <Col className="gesture-container">
                                                <GestureIcon className="gesture"
                                                    onClick={() => this.onLikeIconClicked(this.state.ideaId)} />
                                            </Col>
                                        </Col>
                                    </Row>}

                                <Row style={{ marginRight: '10px', position: 'relative' }}>
                                    {likeIdeaDetailList && likeIdeaDetailList.map((data, index) => (
                                        <>
                                            {index < 8 ? <Col className="imageIcon">
                                                <Avatar style={{ backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}` }} size={35}>
                                                    {createIconShortName(data.name)}
                                                </Avatar>
                                            </Col> : index === 8 ? <Col className="imageIcon">
                                                <Avatar style={{ backgroundColor: '#7fa2c4' }} size={35}>
                                                    {`+${likeIdeaDetailList.length - 8}`}
                                                </Avatar>
                                            </Col> : null}
                                        </>
                                    ))}
                                </Row>
                                {/* <Row style={{ position: 'relative', width: '60px' }}>
                                    <p className="like-p">Likes this</p>
                                </Row> */}
                            </Row>
                        </Col> : null}

                        {this.state.isViewIdea === "true" ? <Col style={{ paddingRight: '0px' }} className="column-right-view-idea">
                            <Col className="column-right-top">
                                <Row>
                                    <label className="timeline-header">Attachments</label>
                                    <Row>
                                        <Col className="attach-container">
                                            <JpgIcon className="jpg-ppt" />
                                            <Col className="middle">
                                                <Col className="download-container">
                                                    <DownloadIcon className="download" />
                                                </Col>
                                            </Col>
                                        </Col>
                                        <Col className="attach-container">
                                            <PptIcon className="jpg-ppt" />
                                            <Col className="middle">
                                                <Col className="download-container">
                                                    <DownloadIcon className="download" />
                                                </Col>
                                            </Col>
                                        </Col>
                                    </Row>
                                </Row>
                                <Row>
                                    <label style={{ marginBottom: '25px' }} className="timeline-header">Timeline</label>
                                    <Timeline>
                                        {ideaStatusHistories && ideaStatusHistories.map((timeline) => (
                                            <Timeline.Item>
                                                <Col>
                                                    <p>{getFormatttedDate(timeline.creationTime)}</p>
                                                    <Row>
                                                        <StatusTag ideaStatus={timeline.ideaStatus} statusWidth="96px" statusCursor="default" />
                                                        <p>by {timeline.name}</p>
                                                    </Row>
                                                    {timeline.comment !== '' ? <Row className="comment">
                                                        <p style={{ padding: '5px 5px 0 10px' }}>{timeline.comment}</p>
                                                    </Row> : null}
                                                </Col>
                                            </Timeline.Item>
                                        ))}
                                    </Timeline>
                                </Row>
                            </Col>
                            <Col className="column-right-bottom"></Col>
                        </Col> : null}

                    </Row>
                </Modal>}
            </div>
        );
    }
}

export default PopUpModel;