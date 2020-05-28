import React, { Component } from 'react';
import './PopUpModel.scss';
import { Modal, Row, Col, Tag, Button, Timeline, Avatar, Input, Select, Card, Upload } from 'antd';
import GenericButton from '../Button/Button';
import { ReactComponent as JpgIcon } from '../../images/jpg.svg'
import { ReactComponent as PptIcon } from '../../images/ppt.svg'
import { ReactComponent as LikeIcon } from '../../images/hands.svg'
import { ReactComponent as DownloadIcon } from '../../images/download.svg'
import { ReactComponent as GestureIcon } from '../../images/gestures.svg'
import { BoldOutlined, ItalicOutlined, UnderlineOutlined, UnorderedListOutlined, OrderedListOutlined } from '@ant-design/icons';
import TextArea from 'antd/lib/input/TextArea';

class PopUpModel extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             ideaId :'',
             ideaSubject : '',
             subject : '',
             ideaType : 1,
             ideaCategory : {},
             ideaCategoryValue : 0,
             ideaDetails : '',
             ideaSubmittedBy : '',
             ideaStatusId : 0,
             ideaSubjectError :"",
             ideaTypeError : "",
             ideaCategoryValueError : "",
             ideaDetailsError : "",
             ideaColorTech :    "rgb(247, 148, 29)",
             ideaColorNonTech : "rgb(177, 177, 177)",
             selectedRow : [],
             currentState : "",
             ids :"",
             isAddEditIdea:this.props.isAddEditIdea,
             isViewIdea:this.props.isViewIdea,             
             likesThumbnailData: [
                { name: 'AS' },
                { name: 'DF' },
                { name: 'AG' },
                { name: 'SD' },
                { name: 'BE' },
                { name: 'PL' },
                { name: 'FR' },
                { name: 'KP' },
                { name: 'KD' },
                { name: 'DO' },
                { name: 'SD' },
                { name: 'NG' },
                { name: 'FG' },
            ],
            timeLineData: [
                { date: '12 April, 2020', status: 'Approved', comment: '', statusBy: 'Ajay' },
                { date: '25 March, 2020', status: 'Submitted', comment: 'This is a good idea but work on the other use cases which are essentials to kick start this project', statusBy: 'you with comment' },
                { date: '22 March, 2020', status: 'Review', comment: 'This is a good idea but work on the other use cases which are essentials to kick start this project', statusBy: 'Ajay with comment ' },
                { date: '04 March, 2020', status: 'Submitted', comment: '', statusBy: 'you' },
                { date: '20 February, 2020', status: 'Submitted', comment: '', statusBy: 'you' },
                { date: '10 February, 2020', status: 'Submitted', comment: '', statusBy: 'you' },
                { date: '1 February, 2020', status: 'Submitted', comment: 'Initial posted.', statusBy: 'you' },
            ],

        }
        if(this.props.onEditHandler){
        console.log("const...",this.props.onEditHandler.ideaDescription);
        let datas = this.props.onEditHandler;
        this.state.ideaId = datas.key;
        this.state.ideaSubject = datas.ideaSubject;
        this.state.ideaDetails = datas.ideaDescription;
        this.state.ideaType = datas.ideaType ==='TECHNICAL' ? this.state.ideaType = 1 : this.state.ideaType = 2;
        this.state.ideaCategoryValue = datas.ideaCategory;
        // this.state.isAddEditIdea = this.props.isAddEditIdea;
        // this.state.isViewIdea = this.state.isViewIdea;
        }
        
        
    }

    validateInputs = () => {
        console.log("child")
        const {ideaSubject,ideaType,ideaCategoryValue,ideaDetails} = this.state;
        let valid = false;
        if(ideaSubject.trim() ===""){
            this.setState({ideaSubjectError : 'This is a mandatory field'});
            valid = true;
        }else {
            this.setState({ideaSubjectError : ''});
            valid = false;
        }
         if(!ideaCategoryValue){
            this.setState({ideaCategoryValueError : 'This is a mandatory field'});
            valid = true;
        }else {
            this.setState({ideaCategoryValueError : ''});
            valid = false;
        }
        if(ideaDetails.trim() ===""){
            this.setState({ideaDetailsError : 'This is a mandatory field'});
            valid = true;

        }else {
            this.setState({ideaDetailsError : ''});
            valid = false;
        }
        // else {
        //     valid = false;
        //    this.setState({ideaSubjectError :'',ideaCategoryValueError : '', ideaDetailsError : ''});
        //    //this.setState({ideaSubjectError :''})
        // }
        console.log("child",valid)
        
        return valid;
    }
    saveandSubmitHandler = (e)  =>{
        let ideaStatusId  = 0;
       if(e.target.textContent === 'Save & Submit'){
        ideaStatusId  = 2;
       }
       else {
        ideaStatusId  = 1;
       }
       if(this.validateInputs())
            return;
            else {

         

       
       const {ideaSubject,ideaType,ideaCategoryValue,ideaDetails,ideaId,subject} = this.state;
    
    this.props.saveandSubmitHandler(ideaSubject,ideaType,ideaCategoryValue,ideaDetails,ideaStatusId,ideaId,);
      }
    }
    onEditHandler = (e) => {
       // console.log("asdadaaaaa", this.props.onEditHandler)
    }
    
      inputChangedHandler = (event) => {
          if(event.target.name ==="ideaSubject"){
              this.setState({ideaSubject : event.target.value})
          }
          else if (event.target.name ==="ideaDetails"){
            this.setState({ideaDetails : event.target.value})
            }
        
      }

      ideaTypeChangedHandler = (event) => {

          let ideaCategory = [];
          let ideaCategoryNonTech = [];
         if (event.target.textContent ==="Technical"){
            this.setState({ideaType : 1});
            ideaCategory.push('BI COE', 'DEVOPS COE', 'Microsoft COE', 
                'Digital Assurance COE', 'XACT COE','Mobility COE');
             this.setState({ideaCategory : ideaCategory,
                ideaColorTech : 'rgb(247, 148, 29)', 
                ideaColorNonTech : 'rgb(177, 177, 177)'})
                console.log(this.state.ideaCategory)
            }  
         else if (event.target.textContent ==="Non Technical"){
             this.setState({ideaType : 2});
             ideaCategory.push('HR', 'Admin', 'General');
             this.setState({ideaCategory : ideaCategory,
                ideaColorNonTech : 'rgb(247, 148, 29)',
                ideaColorTech : 'rgb(177, 177, 177)'}) 
             console.log(this.state.ideaCategory)

            }
      }

      onCategoryChanged = (event) => {
          this.setState({ideaCategoryValue : event})
      }
      
    componentDidUpdate () {
       // console.log("comp",this.props.selectedRow)
    }
    render() {
        // var aIdea  = this.props.selectedRow;
         console.log('this.state.isAddEditIdea : ' + this.state.isAddEditIdea)
         console.log('this.state.isViewIdea : ' + this.state.isViewIdea)

        if(this.props.selectedRow)
        {            
            console.log("cons",this.props.selectedRow);
            let datas1 = this.props.selectedRow;
            this.state.currentState = 'ápproved';

            if(datas1.hasOwnProperty('ideaSubject')){
                console.log('fsdfsdfsfsdf');
                this.state.ideaSubject = datas1.ideaSubject;
            }else if(datas1.hasOwnProperty('subject')){
                this.state.ideaSubject = datas1.subject;
            }else if(datas1.hasOwnProperty('title')){
                this.state.ideaSubject = datas1.title;
            }
            
            this.state.ideaType = datas1.ideaType;
             this.state.ideaSubmittedBy = datas1.submittedBy;
            this.state.ideaDetails = datas1.ideaDescription;

        }
        const { TextArea } = Input;
        let optionTemplate ="";
        let count = 0;
        if(this.state.ideaCategory.length >0) {
            optionTemplate = this.state.ideaCategory.map(value => (
                <option value={count = count+1}>{value}</option>
                ));
            }
        const {ideaSubject,ideaType,ideaCategoryValue,ideaDetails} = this.state;
        //() =>this.props.saveandSubmitHandler({ideaSubject,ideaType,ideaCategoryValue,ideaDetails})
        return (
            <div className="modal-content">
                <Modal
                title={
                    <Row className="popup-header-title" gutter={2}>
                         <Col xs={9} sm={9} md={9} lg={9} xl={9} className="label-div">
                         <label className="header-label">
                             {this.state.isViewIdea === "true" && (this.state.ideaId || this.state.currentState ==="ápproved") ? this.state.ideaSubject : 'Add an Idea'}
                             </label>
                        </Col>
                        {this.state.currentState ==="ápproved" ?
                        <Col>
                        <Tag className="display-status-tag" color="#0C5CC9" >Approved</Tag>
                    </Col>:null}
                        
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
                                color: this.props.btnColor}}>Save as Draft</Button>                        
                                    <GenericButton
                                        buttonClickHandler={this.saveandSubmitHandler}
                                        buttonName={this.props.saveandSubmit}
                                        btnColor={this.props.btnColor}
                                    ></GenericButton>
                                </Row>
                            </Row> }                        
                        
                            <Col className="right-display" style={{ display: 'none' }}>
                                <GenericButton
                                    buttonName="Edit"
                                    btnColor={this.props.btnColor}
                                ></GenericButton>
                            </Col>                       
                    </Row>
                }
                
                visible
                centered
                onCancel={this.props.onCancel}
                onOk={this.props.onOk}
                footer={null}
                width= {730}
                
                >
                    
                 <Row gutter={18} justify="space-between" className="attachments-column" >
                     {this.state.isAddEditIdea === "true" ? <Col style={{ paddingRight: '11px'}} className="column-left-idea">
                            {/* {this.state.currentState ==="ápproved" ? 
                            ''
                     
                             :   */}
                             <Col style={{ paddingLeft: '20px' }} className="column-addidea-left">
                             {this.state.isViewIdea === "true" || this.state.currentState ==="ápproved" ? null : 
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

                                         onChange={this.inputChangedHandler} ref="ideaDetails"
                                         className={!this.state.ideaDetailsError ? '' : 'errorInput'} />
                                 </Card>
                                 {this.state.ideaDetailsError ? <div className="errorMessage">
                                     {this.state.ideaDetailsError}</div> : null}
                             </Row>
                            
                         </Col>                    
                        
                         
                        
                     </Col> : null}
                        {this.state.isAddEditIdea === "true" ? <Col style={{ paddingRight: '0px'}} className="column-right-idea">
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
{this.state.isViewIdea === "true" ? <Col style={{ paddingRight: '0px'}} className="column-left-view-idea">
                            <Col style={{ paddingLeft: '20px' }} className="column-left-top">
                                <Row>
                                    <label className="timeline-header">Idea Subject</label>
                                    <p>Innovative Idea</p>
                                </Row>
                                <Row>
                                    <label className="timeline-header">Idea Category</label>
                                    <p>Big Data</p>
                                </Row>
                                <Row>
                                    <label className="timeline-header">Idea Details</label>
                                    <p><b>Aliquam erat volutpat.Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus</b>
                                        <ul>
                                            <li>Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a,
                                            ultricies in, diam. Sed arcu. Cras consequat.</li>
                                            <li>Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate
                                            magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan
                                             porttitor, facilisis luctus, metus.</li>
                                            <li>Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetuer ligula
                                            vulputate sem tristique cursus. Nam nulla quam, gravida non, commodo a, sodales
                                            sit amet, nisi.</li>
                                            <li>Pellentesque fermentum dolor. Aliquam quam lectus, facilisis auctor, ultrices ut,
                                            elementum vulputate, nunc.</li>
                                        </ul>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis
                                     egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.
                                     Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris
                                     placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum
                                     erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum,
                                     elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui.
                                      Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus
                                      faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat.</p>
                                </Row>
                            </Col>
                            <Row className="column-left-bottom">
                                <Row className="like-container">
                                    <LikeIcon className="like-hands" alt="Edit-Tools" />
                                    <Col className="gesture-middle">
                                        <Col className="gesture-container">
                                            <GestureIcon className="gesture" />
                                        </Col>
                                    </Col>
                                </Row>
                                <Row style={{ marginRight: '10px', position: 'relative' }}>
                                    {this.state.likesThumbnailData.map((data, index) => (
                                        <>
                                            {index < 8 ? <Col className="imageIcon">
                                                <Avatar style={{ backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}` }} size={35}>
                                                    {data.name}
                                                </Avatar>
                                            </Col> : index === 8 ? <Col className="imageIcon">
                                                <Avatar style={{ backgroundColor: '#7fa2c4' }} size={35}>
                                                    {`+${this.state.likesThumbnailData.length - 8}`}
                                                </Avatar>
                                            </Col> : null}
                                        </>
                                    ))}
                                </Row>
                                <Row style={{ position: 'relative', width: '60px' }}>
                                    <p className="like-p">Likes this</p>
                                </Row>
                            </Row>
                        </Col> : null}

                        {this.state.isViewIdea === "true" ? <Col style={{ paddingRight: '0px'}} className="column-right-view-idea">
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
                                        {this.state.timeLineData.map((timeline) => (
                                            <Timeline.Item>
                                                <Col>
                                                    <p>{timeline.date}</p>
                                                    <Row>
                                                        {timeline.status === 'Approved' ?
                                                            <Tag className="display-status-tag" color="#0C5CC9" >Approved</Tag> :
                                                            timeline.status === 'Submitted' ?
                                                                <Tag className="display-status-tag" color="#A5AAD9" >Submitted</Tag> :
                                                                timeline.status === 'Review' ?
                                                                    <Tag className="display-status-tag" color="#F7C51D" >Review</Tag> :
                                                                    null}
                                                        <p>by {timeline.statusBy}</p>
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
                </Modal>
            </div>
        );
    }
}

export default PopUpModel;