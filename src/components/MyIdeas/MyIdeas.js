import React, { PureComponent } from 'react';
import './MyIdeas.scss';
import { Table, Row, Col } from 'antd';
import PopUpModel from '../PopUpModel/PopUpModel'
import {
  DEFAULT_PAGE_SIZE,
  SUCCESS,
  GET_MYIDEAS_DETAIL,
  IDEA_SUBJECT,
  IDEA_TYPE,
  IDEA_CATEGORY,
  SUBMITTED_ON,
  IDEA_STATUS,
  IDEA_UPDATED_MESSAGE
} from '../../Config/Constants';
import { getMyIdeas, saveAndSubmitIdeaById } from '../../services/AppService';
import { addNewProperty } from '../../Utility/CommonFunctions';
import { ReactComponent as AttachmentIcon } from '../../images/attach.svg'
import StatusTag from '../StatusTag/StatusTag';
import Alertbox from '../Alert/Alert';
import Loader from '../Loader/Loader';

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
    dataIndex: 'submissionDate',
    sorter: (a, b) => a.submissionDate.length - b.submissionDate.length,
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
      <div className="attach-div">
        <div className="attach-middle"><AttachmentIcon className="attach" alt="Attachment" /></div>
      </div>
  },
  {
    title: IDEA_STATUS,
    dataIndex: 'status',
    sorter: (a, b) => a.status.length - b.status.length,
    sortDirections: ['descend', 'ascend'],
    ellipsis: true,
    width: '15%',
    render: (ideaStatus) => <StatusTag ideaStatus={ideaStatus} statusWidth="96px" statusCursor="pointer" />
  }
]

class MyIdeas extends PureComponent {
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
      columns: myIdeasColumn,
      status: 0,
      displayAlert: false,
      isAddEditIdea: "false",
      isViewIdea: "true",
      isEditIdea: "false",
      ideaId: '',
      isLoading: false,
    }
    this.saveandSubmitHandler = this.saveandSubmitHandler.bind(this)
  }

  //To close popup model
  buttonActionHandler = (event) => {
    this.setState(prevstate => ({
      ...prevstate,
      showModal: !prevstate.showModal,
      isAddEditIdea: "false",
      isViewIdea: "true",
      isEditIdea: "false",
    }))
    setTimeout(() => {
      this.setState({ displayAlert: false })
    }, 4000);
  }

  componentDidMount() {
    this.mounted = true;
    this.props.onClick("myIdeas");
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
  getIdeaDetails = async (pagination) => {
    await this.setState({ isLoading: true })
    await getMyIdeas(pagination)
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
            },
            isLoading: false
          });
        }
      })
      .catch(error => {
        this.setState({ isLoading: false });
        console.log(error);
      })
  }

  //Save and submit handler
  saveandSubmitHandler(ideaSubject, ideaType, ideaCategoryValue, ideaDetails, ideaStatusId, businessImpact, ideaId) {
    let requestParam = {
      title: ideaSubject,
      ideaDescription: ideaDetails,
      categoryId: ideaType,
      subCategoryId: ideaCategoryValue,
      ideaStatusId: ideaStatusId,
      businessImpact: businessImpact,
    }
    this.saveAndSubmitIdea(requestParam, ideaId);
  }

  //Save and submit the idea
  saveAndSubmitIdea(requestParam, ideaId) {
    saveAndSubmitIdeaById(requestParam, ideaId)
      .then(response => {
        this.setState({ status: response.data.code, isSubmitted: true, displayAlert: true });
        this.buttonActionHandler();
      })
      .catch(error => {
        console.error('Error:', error);
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
    this.setState({ showModal: true, ideaId: record.id, selectedRow: record });
  }

  buttonEditHandler = (event) => {
    this.setState(prevstate => ({
      ...prevstate,
      showModal: !prevstate.showModal,
      isAddEditIdea: "false",
      isViewIdea: "true",
      isEditIdea: "false",
    }))

    setTimeout(() => {
      this.setState(prevstate => ({
        ...prevstate,
        showModal: true,
        isAddEditIdea: "true",
        isViewIdea: "false",
        isEditIdea: "true",
      }))
    }, 0);
  }

  render() {
    return (
      <>
        {this.state.isLoading ? <div className="loaderLayout">
          <Loader />
        </div> : null
        }
        {this.state.displayAlert ?
          <Alertbox alertName={IDEA_UPDATED_MESSAGE} /> : null
        }
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
            editIdeaData={this.state.selectedRow}
            isAddEditIdea={this.state.isAddEditIdea}
            isViewIdea={this.state.isViewIdea}
            isEditIdea={this.state.isEditIdea}
            ideaId={this.state.ideaId}
            buttonEditHandler={this.buttonEditHandler}
          /> : null}
        </div>
      </>
    );
  }
}

export default MyIdeas;