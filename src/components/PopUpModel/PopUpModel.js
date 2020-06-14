import React, { Component } from 'react';
import './PopUpModel.scss';
import {
    Modal, Row, Col, Tag, Button, Timeline,
    Avatar, Input, Select, Upload
} from 'antd';
import GenericButton from '../Button/Button';
import { ReactComponent as JpgIcon } from '../../images/jpg.svg'
import { ReactComponent as PptIcon } from '../../images/ppt.svg'
import { ReactComponent as LikeIcon } from '../../images/hands.svg'
import { ReactComponent as DownloadIcon } from '../../images/download.svg'
import { ReactComponent as GestureIcon } from '../../images/gestures.svg'
import {
    postIdeaLike,
    postIdeaDisLike,
    getIdeaDetailsById,
    getActiveCategories
} from '../../services/AppService';
import Editor from '../Editor/Editor';
import {
    SUCCESS,
    CLOSE,
    REVIEW,
    APPROVED,
    COMPLETE,
    DEVELOPMENT,
    DRAFT,
    TECHNICAL,
    NON_TECHNICAL,
    WARNING_MESSAGE
} from '../../Config/Constants';
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
            ideaCategoryValue: [],
            ideaDetails: '',
            ideaSubmittedBy: '',
            ideaStatusId: 0,
            ideaSubjectError: "",
            ideaTypeError: "",
            ideaCategoryValueError: "",
            ideaDetailsError: "",
            ideaColorTech: "rgb(177, 177, 177)",
            ideaColorNonTech: "rgb(177, 177, 177)",
            selectedRow: [],
            currentState: "",
            ideaStatusHistories: [],
            likeIdeaDetailList: [],
            ids: "",
            isAddEditIdea: this.props.isAddEditIdea,
            isViewIdea: this.props.isViewIdea,
            selectedId: this.props.selectedId,
            isEditIdea: this.props.isEditIdea,
            isLike: false,
            ideaDetailsListView: [],
            ideaActiveCategories: [],
            ideaCategoryTech: [],
            ideaCategoryNonTech: [],
            ideaStatus: '',
        }

        if (this.props.onEditHandler) {
            let datas = this.props.onEditHandler;
            this.state.ideaId = datas.key;
            this.state.ideaSubject = datas.ideaSubject;
            this.state.ideaDetails = datas.ideaDescription;
            this.state.ideaType = datas.ideaType === TECHNICAL ? this.state.ideaType = 1 : this.state.ideaType = 2;
            this.state.ideaStatus = datas.ideaStatus;
        }

        if (this.props.isViewIdea === "true") {
            this.state.selectedId = this.props.selectedId;
        }
    }

    validateInputs = () => {

        const { ideaSubject, ideaCategoryValue, ideaDetails } = this.state;
        let valid = false;

        if (ideaSubject.trim() === "") {
            this.setState({ ideaSubjectError: WARNING_MESSAGE });
            valid = true;
        } else {
            this.setState({ ideaSubjectError: '' });
            valid = false;
        }

        if (ideaCategoryValue.length === 0) {
            this.setState({ ideaCategoryValueError: WARNING_MESSAGE });
            valid = true;
        } else {
            this.setState({ ideaCategoryValueError: '' });
            valid = false;
        }

        if (ideaDetails.trim() === "") {
            this.setState({ ideaDetailsError: WARNING_MESSAGE });
            valid = true;
        } else {
            this.setState({ ideaDetailsError: '' });
            valid = false;
        }

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

    onEditChanged = (details) => {
        this.setState({ ideaDetails: details })
    }

    inputChangedHandler = (event) => {
        if (event.target.name === "ideaSubject") {
            this.setState({ ideaSubject: event.target.value })
        }
    }

    ideaTypeChangedHandler = (event) => {
        if (event.target.textContent === TECHNICAL) {
            this.setState({
                ideaCategory: this.state.ideaCategoryTech,
                ideaColorTech: 'rgb(247, 148, 29)',
                ideaColorNonTech: 'rgb(177, 177, 177)',
                ideaType: 1,
                ideaCategoryValue: []
            })
        }
        else if (event.target.textContent === "Non Technical") {
            this.setState({
                ideaCategory: this.state.ideaCategoryNonTech,
                ideaColorNonTech: 'rgb(247, 148, 29)',
                ideaColorTech: 'rgb(177, 177, 177)',
                ideaType: 2,
                ideaCategoryValue: []
            })
        }
    }

    onCategoryChanged = (value) => {
        this.setState({ ideaCategoryValue: value })
    }

    onLikeIconClicked = (ideaId) => {
        if (!this.state.ideaDetailsListView.likeCount) {
            postIdeaLike(ideaId)
                .then(response => {
                    if (response.data.message === SUCCESS) {
                        debugger;
                        this.setState({ isLike: true })
                        this.props.updateLikes(this.state.ideaDetailsListView.likeCount)
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
                        this.props.updateLikes(this.state.isLike)
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }

    componentDidMount() {
        if (this.state.isViewIdea === "true" && this.props.ideaId) {
            this.getDetailsByID(this.props.ideaId);
        } else if (this.state.isAddEditIdea === "true") {
            this.getCategories();
        }
    }

    getDetailsByID = (ideaId) => {
        getIdeaDetailsById(ideaId)
            .then(response => {
                if (response.data.message === SUCCESS) {
                    this.setState({ ideaDetailsListView: response.data.result })
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    getCategories = () => {
        getActiveCategories()
            .then(response => {
                this.setState({ ideaActiveCategories: response.data })
                this.setCategoriesData(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    setCategoriesData = (categoriesData) => {
        let ideaCategoryTech = [];
        let ideaCategoryNonTech = [];
        for (let category of categoriesData) {
            if (category.ideaType === TECHNICAL) {
                ideaCategoryTech.push(category);
            }
            if (category.ideaType === NON_TECHNICAL) {
                ideaCategoryNonTech.push(category);
            }
        }

        if (this.props.onEditHandler !== undefined) {
            let editIdea = this.props.onEditHandler;
            if (editIdea.ideaType === TECHNICAL) {
                this.setState({
                    ideaCategory: ideaCategoryTech,
                    ideaCategoryTech: ideaCategoryTech,
                    ideaCategoryNonTech: ideaCategoryNonTech,
                    ideaColorTech: 'rgb(247, 148, 29)',
                    ideaColorNonTech: 'rgb(177, 177, 177)',
                    ideaCategoryValue: editIdea.subCategoryId
                })
            }
            else if (editIdea.ideaType === NON_TECHNICAL) {
                this.setState({
                    ideaCategory: ideaCategoryNonTech,
                    ideaCategoryTech: ideaCategoryTech,
                    ideaCategoryNonTech: ideaCategoryNonTech,
                    ideaColorNonTech: 'rgb(247, 148, 29)',
                    ideaColorTech: 'rgb(177, 177, 177)',
                    ideaCategoryValue: editIdea.subCategoryId
                })
            }
        }
        else {
            this.setState({
                ideaType: 1,
                ideaCategoryTech: ideaCategoryTech,
                ideaCategoryNonTech: ideaCategoryNonTech,
                ideaCategory: ideaCategoryTech,
                ideaColorTech: 'rgb(247, 148, 29)',
                ideaColorNonTech: 'rgb(177, 177, 177)'
            })
        }
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    render() {
        const {
            title,
            id,
            categoryName,
            subcategoryName,
            ideaStatus, ideaDescription,
            ideaStatusHistories,
            likeIdeaDetailList,
            likeCount } = this.state.ideaDetailsListView;

        return (
            <div className="modal-content">
                {/* {true ? <AdminPopUpModel /> : */}
                <Modal
                    title={
                        <Row className="popup-header-title" gutter={2}>
                            <Col className="label-div" style={{ maxWidth: '38%' }}>
                                <label className="header-label">
                                    {this.state.isViewIdea === "true" ? title
                                        : this.state.isEditIdea === "true" ? this.state.ideaSubject
                                            : 'Add an Idea'}
                                </label>
                            </Col>
                            {this.state.isViewIdea === "true" && ideaStatus ?
                                <Col>
                                    <StatusTag ideaStatus={ideaStatus} statusWidth="96px" statusCursor="default" />
                                </Col>
                                : this.state.isEditIdea === "true" ?
                                    <Col>
                                        <StatusTag ideaStatus={this.state.ideaStatus} statusWidth="96px" statusCursor="default" />
                                    </Col>
                                    : null}
                            <Col style={{ display: 'none' }}>
                                <Tag className="display-status-tag" color="#F7941D" >Draft</Tag>
                            </Col>

                            <Col style={{ display: 'none' }}>
                                <Tag className="display-status-tag" color="#A5AAD9" >Submitted</Tag>
                            </Col>

                            {this.state.isAddEditIdea === "true" ? <Row className="right-display">
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
                            </Row> : null}

                            {this.state.isViewIdea === "true" && ideaStatus !== undefined && ideaStatus === DRAFT ?
                                <Col className="right-display">
                                    <GenericButton
                                        buttonClickHandler={this.props.buttonEditHandler}
                                        buttonName="Edit"
                                        btnColor={this.props.btnColor}
                                    ></GenericButton>
                                </Col> : null}

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
                            <Col style={{ paddingLeft: '20px' }} className="column-addidea-left">
                                {this.state.isViewIdea === "true" || this.state.currentState === "ápproved" ? null :
                                    <div style={{ marginBottom: '15px' }}>
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
                                    </div>}
                                <Row gutter={8} className="tag-div" style={{ marginBottom: '15px' }}>
                                    <Col style={{ padding: '5px 4px' }}><label style={{ marginRight: '20px' }}>Idea Type</label></Col>
                                    <Tag className="type-tag" onClick={this.ideaTypeChangedHandler} name="technical"
                                        style={{ backgroundColor: this.state.ideaColorTech }}>Technical</Tag>
                                    <Tag className="type-tag" onClick={this.ideaTypeChangedHandler} name="nontechnical"
                                        style={{ backgroundColor: this.state.ideaColorNonTech }}>Non Technical</Tag>
                                </Row>
                                <Row style={{ marginBottom: '15px' }}>
                                    <label>Idea Category</label>
                                    <Select
                                        value={this.state.ideaCategoryValue}
                                        className={!this.state.ideaCategoryValueError ? 'cat-dropdown' : 'errorInput'}
                                        placeholder="---select category from here---"
                                        style={{ width: "100%" }}
                                        onChange={this.onCategoryChanged}>
                                        {this.state.ideaCategory.length > 0 ?
                                            <>
                                                {this.state.ideaCategory.map(item => (
                                                    <Select.Option value={item.id}>{item.subCategoryName}</Select.Option>
                                                ))}
                                            </>
                                            : null}
                                    </Select>
                                    {this.state.ideaCategoryValueError ? <div className="errorMessage">
                                        {this.state.ideaCategoryValueError}</div> : null}
                                </Row>
                                <Row style={{ marginBottom: '15px' }}>
                                    <label className="text-formatter">Idea Details</label>
                                    <Editor name="ideaDetails" value={this.state.ideaDetails}
                                        onEditChanged={this.onEditChanged}
                                        ref="ideaDetails" />
                                    {this.state.ideaDetailsError ?
                                        <div className="errorMessage" style={{ position: 'absolute', bottom: '20px' }}>
                                            {this.state.ideaDetailsError}
                                        </div> : null}
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
                            {ideaStatus !== undefined && ideaStatus !== DRAFT ?
                                <Row className="column-left-bottom">
                                    {likeCount || this.state.isLike ?
                                        <Row className="like-container">
                                            <GestureIcon className="like-hands"
                                                onClick={() => this.onLikeIconClicked(id)} />
                                        </Row> :
                                        <Row className="like-container">
                                            <LikeIcon className="like-hands" alt="Edit-Tools" />
                                            <Col className="gesture-middle">
                                                <Col className="gesture-container">
                                                    <GestureIcon className="gesture"
                                                        onClick={() => this.onLikeIconClicked(id)} />
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
                                </Row> : null}
                        </Col> : null}
                        {this.state.isViewIdea === "true" ? <Col style={{ paddingRight: '0px' }} className="column-right-view-idea">
                            <Col className="column-right-top">
                                <Row>
                                    <label className="timeline-header">Attachments</label>
                                    {ideaStatus !== undefined && ideaStatus !== DRAFT ?
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
                                        :
                                        <span style={{ width: '100%', height: '29px', marginBottom: '20px' }}
                                            className="text-indication">Nothing to display here</span>}
                                </Row>
                                <Row>
                                    <label style={{ marginBottom: '25px' }} className="timeline-header">Timeline</label>
                                    {ideaStatus !== undefined && ideaStatus !== DRAFT ?
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
                                        : <span style={{ width: '100%', height: '29px', marginTop: '-24px' }}
                                            className="text-indication">Nothing to display here</span>}
                                </Row>
                            </Col>
                            <Col className="column-right-bottom"></Col>
                        </Col> : null}
                    </Row>
                </Modal>
            </div>
        );
    }
}

export default PopUpModel;