import React, { Component } from 'react';
import './MyIdeas.scss';
import { Table, Row, Col, Tag } from 'antd';
import PopUpModel from '../PopUpModel/PopUpModel'
import {
  DEFAULT_PAGE_SIZE,
  SUCCESS,
  GET_MYIDEAS_DETAIL,
  SUBMITTED,
  APPROVED,
  DEVELOPMENT,
  COMPLETED,
  DRAFT,
  REVIEW,
  CLOSED,
  IDEA_SUBJECT,
  IDEA_TYPE,
  IDEA_CATEGORY,
  SUBMITTED_ON,
  IDEA_STATUS
} from '../../Config/Constants';
import { getMyIdeas, saveAndSubmitIdeaById } from '../../services/AppService';
import { addNewProperty } from '../../Utility/CommonFunctions';
import { ReactComponent as AttachmentIcon } from '../../images/attach.svg'

const myIdeasColumn = [
  {
    title: IDEA_SUBJECT,
    dataIndex: 'ideaSubject',
    sorter: (a, b) => a.ideaSubject.length - b.ideaSubject.length,
    sortDirections: ['descend', 'ascend'],
    ellipsis: true,
    width: '43%'
  },
  {
    title: IDEA_TYPE,
    dataIndex: 'ideaType',
    sorter: (a, b) => a.ideaType.length - b.ideaType.length,
    sortDirections: ['descend', 'ascend'],
    ellipsis: true,
    width: '12%'
  },
  {
    title: IDEA_CATEGORY,
    dataIndex: 'ideaCategory',
    sorter: (a, b) => a.ideaCategory.length - b.ideaCategory.length,
    sortDirections: ['descend', 'ascend'],
    ellipsis: true,
    width: '12%'
  },
  {
    title: SUBMITTED_ON,
    dataIndex: 'submittedOn',
    sorter: (a, b) => a.submittedOn.length - b.submittedOn.length,
    sortDirections: ['descend', 'ascend'],
    ellipsis: true,
    width: '12%'
  },
  {
    title: '',
    dataIndex: 'attachment',
    width: '6%',
    ellipsis: true,
    render: (attachment) =>
      <div className="attach-container">
        <div className="attach-middle"><AttachmentIcon className="attach" alt="Attach" /></div>
      </div>
  },
  {
    title: IDEA_STATUS,
    dataIndex: 'status',
    sorter: (a, b) => a.status.length - b.status.length,
    sortDirections: ['descend', 'ascend'],
    ellipsis: true,
    width: '15%',
    render: (ideaStatus) => {
      let color = '';
      if (ideaStatus === SUBMITTED) {
        color = '#A5AAD9';
      } else if (ideaStatus === APPROVED) {
        color = '#0C5CC9';
      } else if (ideaStatus === DEVELOPMENT) {
        color = '#9B6496';
      } else if (ideaStatus === COMPLETED) {
        color = '#1A8B45';
      } else if (ideaStatus === DRAFT) {
        color = '#F7941D';
      } else if (ideaStatus === REVIEW) {
        color = '#F7C51D';
      } else if (ideaStatus === CLOSED) {
        color = '#7A8083';
      }
      return (<Tag className="display-status-tag" color={color} >{ideaStatus}</Tag>)
    }
  }
]

class MyIdeas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmitted: false,
      lastPage: 1,
      hitApi: false,
      showModal: false,
      btnColor: '#e4500e',
      saveandSubmit: "Save & Submit",
      pagination: {
        current: 1,
        pageSize: DEFAULT_PAGE_SIZE,
        showTotal: (total, range) => ``,
        position: ['topRight'],
        total: 0,
        showQuickJumper: true,
      },
      selectedRow: [],
      data: [],
      columns: myIdeasColumn
    }
    this.saveandSubmitHandler = this.saveandSubmitHandler.bind(this)
  }

  //To close popup model
  buttonActionHandler = (event) => {
    this.setState(prevstate => ({
      ...prevstate,
      showModal: !prevstate.showModal
    }))
  }

  componentDidMount() {
    this.mounted = true;
    this.getIdeaDetails(this.state.pagination);
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.mounted && this.state.isSubmitted) {
      this.getIdeaDetails(this.state.pagination);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.myIdeaData !== this.props.myIdeaData && Object.keys(nextProps.myIdeaData).length >= 1) {
      this.getIdeaDetails(this.state.pagination);
    }
  }

  //Get my ideas list
  getIdeaDetails = (pagination) => {
    getMyIdeas(pagination)
      .then(response => {
        if (response.data.message === SUCCESS) {
          const myIdeasList = addNewProperty(response.data.result.content, GET_MYIDEAS_DETAIL);
          const { currentPage, totalRecords } = response.data.result.page;
          this.setState({
            data: myIdeasList,
            isSubmitted: false,
            lastPage: Number(currentPage) + 1,
            pagination: {
              ...this.state.pagination,
              current: Number(currentPage) + 1,
              total: totalRecords,
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
            }
          });
        }
      })
      .catch(error => {
        console.log(error);
      })
  }

  //Save and submit handler
  saveandSubmitHandler(ideaSubject, ideaType, ideaCategoryValue, ideaDetails, ideaStatusId, ideaId) {
    let requestParam = {
      title: ideaSubject,
      ideaDescription: ideaDetails,
      categoryId: ideaType,
      subCategoryId: ideaCategoryValue,
      ideaStatusId: ideaStatusId
    }
    this.saveAndSubmitIdea(requestParam, ideaId);
  }

  //Save and submit the idea
  saveAndSubmitIdea(requestParam, ideaId) {
    saveAndSubmitIdeaById(requestParam, ideaId)
      .then(response => {
        this.setState({ status: response.data.code, isSubmitted: true });
        this.buttonActionHandler();
      })
      .catch(error => {
        this.setState({ status: error.code })
      })
  }

  //Handle pagination
  handlePageChange(pagination) {
    if (this.state.lastPage !== pagination.current) {
      this.getIdeaDetails(pagination);
    }
  }

  //Open Popupmodal to View/Add/Edit idea
  onRowClick = (record) => {
    if (record.status === DRAFT) {
      this.setState({ showModal: true, selectedRow: record })
    }
  }

  render() {
    return (
      <div className="my-ideas-container">
        <Row justify="center">
          <Col xs={20} sm={20} md={20} lg={20} xl={20}>
            <Table
              pagination={this.state.pagination}
              columns={this.state.columns}
              dataSource={this.state.data}
              onChange={pagination => (this.handlePageChange(pagination))}
              onRow={(record) => ({
                onClick: () => this.onRowClick(record)
              }
              )}>
            </Table>
          </Col>
        </Row>
        {this.state.showModal ? <PopUpModel
          onOk={this.buttonActionHandler}
          onCancel={this.buttonActionHandler}
          saveandSubmitHandler={this.saveandSubmitHandler}
          saveandSubmit={this.state.saveandSubmit}
          btnColor={this.state.btnColor}
          onEditHandler={this.state.selectedRow}
          isAddEditIdea="true"
          isViewIdea="false"
        /> : null}
      </div>
    );
  }
}

export default MyIdeas;