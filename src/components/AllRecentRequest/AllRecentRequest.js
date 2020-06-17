import React, { Component } from 'react';
import { Table, Row, Col } from 'antd';
import { getUsersByName, getUsersByEmailID, getAllRecentRequest } from '../../services/AppService';
import {
  ALLSTATUS, ALLROLES, ALLTYPE,
  SUBMITTED_ON,
  IDEA_SUBJECT,
  SUBMITTED_BY,
  STATUS,
  USERS,
  XEBIAOFFICE,
  ROLE, DEFAULTPAGINATION,
} from '../../Config/Constants';
import './AllRecentRequest.scss';
import Loader from '../../components/Loader/Loader';
import DropDown from '../DropDownComponent/DropDownComponent'
import SearchBox from '.././/SearchBarComponent/SearchBar'
import { getUserData, getCategoriesData } from './Management/UserColumnAndData';
import StatusTag from '../StatusTag/StatusTag';
import { getFormatttedDate, validateEmail } from '../../Utility/CommonFunctions';
import AdminPopUpModel from '../PopUpModel/AdminPopUpModel';
import PopUpModel from '../PopUpModel/PopUpModel';

// User Table Column
const userColumn = [
  {
    title: USERS,
    dataIndex: 'userName',
    sorter: (a, b) => a.userName.length - b.userName.length,
    sortDirections: ['descend', 'ascend'],
    ellipsis: true,
    width: '40%'
  },
  {
    title: XEBIAOFFICE,
    dataIndex: 'location',
    ellipsis: true,
    width: '20%'
  },

  {
    title: ROLE,
    dataIndex: 'role',
    sorter: (a, b) => a.role.length - b.role.length,
    sortDirections: ['descend', 'ascend'],
    ellipsis: true,
    width: '20%'
  },
  {
    title: STATUS,
    dataIndex: 'status',
    sorter: (a, b) => a.status.length - b.status.length,
    sortDirections: ['descend', 'ascend'],
    ellipsis: true,
    width: '20%',
    render: (status) => <StatusTag ideaStatus={status} statusWidth="96px" statusCursor="pointer" />
  }
]

// Request Column
const requestColumn = [

  {
    title: IDEA_SUBJECT,
    dataIndex: 'title',
    sorter: (a, b) => a.title.length - b.title.length,
    sortDirections: ['descend', 'ascend'],
    ellipsis: true,
    width: '40%'
  },
  {
    title: SUBMITTED_BY,
    dataIndex: 'submittedBy',
    sorter: (a, b) => a.submittedBy.length - b.submittedBy.length,
    ellipsis: true,
    width: '15%'
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
    title: STATUS,
    dataIndex: 'status',
    sorter: (a, b) => a.status.length - b.status.length,
    sortDirections: ['descend', 'ascend'],
    ellipsis: true,
    width: '12%',
    render: (status) => <StatusTag ideaStatus={status} statusWidth="96px" statusCursor="pointer" />
  }

]

// categoriesColumn
const categoriesColumn = [
  {
    title: "Categories",
    dataIndex: 'categories',
    sorter: (a, b) => a.categories.length - b.categories.length,
    sortDirections: ['descend', 'ascend'],
    ellipsis: true,
    width: '40%'
  },
  {
    title: "Type",
    dataIndex: 'type',
    sorter: (a, b) => a.type.length - b.type.length,
    ellipsis: true,
    width: '20%'
  },
  {
    title: 'Updated On',
    dataIndex: 'updatedOn',
    sorter: (a, b) => a.updatedOn.length - b.updatedOn.length,
    sortDirections: ['descend', 'ascend'],
    ellipsis: true,
    width: '20%'
  },
  {
    title: STATUS,
    dataIndex: 'status',
    sorter: (a, b) => a.status.length - b.status.length,
    sortDirections: ['descend', 'ascend'],
    ellipsis: true,
    width: '20%',
    render: (status) => <StatusTag ideaStatus={status} statusWidth="96px" statusCursor="pointer" />
  }
]

class AllRecentRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requestLastPage: 1,
      userLastPage: 1,
      dropDownDefaultValue: '',
      isUserSelected: true,
      isCategoriesSelected: false,
      selectedStatus: "",
      isLoading: false,
      showModal: false,
      adminRecentData: [],
      userData: [],
      requestData: [],
      categoriesData: [],
      columns: [],
      btnColor: '#e4500e',
      allStatus: ALLSTATUS,
      allRoles: ALLROLES,
      allType: ALLTYPE,
      requestPagination: DEFAULTPAGINATION,
      userPagination: DEFAULTPAGINATION
    }
  }

  // mount first time lifeCycle
  componentDidMount() {
    this.mounted = true;
    if (this.props.title === "request") {
      this.getAllRecentRequestRecord(this.state.requestPagination);
    }
    else {
      this.getUserDataRecord(this.state.userPagination);
    }
  }

  // UNMOUNT cycle
  componentWillUnmount() {
    this.mounted = false;
  }

  // every time invoke cycle on update
  async componentDidUpdate(prevState, nextState) {
    console.log(prevState, "Previous");
    console.log(this.props, "Current");
    if (prevState.title !== this.props.title) {
      if (this.props.title === "request") {
        this.getAllRecentRequestRecord(this.state.requestPagination);
      }
      else {
        this.getUserDataRecord(this.state.userPagination);
      }
    }
    else {
      if (prevState.value.subHeaderTextTitle !== this.props.value.subHeaderTextTitle) {
        if (this.props.value.subHeaderTextTitle === "Categories") {
          this.getCategoriesDataRecord();
        }
        else {
          this.getUserDataRecord(this.state.userPagination);
        }
      }
    }
  }

  // refresh function
  refreshCategoriesList = () => {
    this.buttonActionHandler();
    this.getCategoriesDataRecord();
  }

  // refreshCategories
  refreshUserList = () => {
    this.buttonActionHandler();
    this.getUserDataRecord(this.state.userPagination);
  }

  // get all users from UserColumnAndData.js file i.e hitting users api
  getUserDataRecord = async (pagination) => {
    await this.setState({ isLoading: true })
    await getUserData(pagination).then(response => {
      const { data, responses } = response;
      const { currentPage, totalRecords } = responses.data.result.page;
      this.setState({
        lastPage: Number(currentPage) + 1,
        userPagination: {
          ...this.state.userPagination,
          current: Number(currentPage) + 1,
          total: totalRecords,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
        },
        selectedStatus: '', dropDownDefaultValue: "All Roles", isLoading: false, userData: data
      });
    }
    )
      .catch(error => {
        console.log(error);
        this.setState({ isLoading: false })
      })
  }




  // get all users from UserColumnAndData.js file i.e hitting users api
  getCategoriesDataRecord = async () => {
    await this.setState({ isLoading: true })
    await getCategoriesData().then(response => {
      this.setState({
        selectedStatus: '', dropDownDefaultValue: "All Type", isLoading: false, categoriesData: response
      });
    })
      .catch(error => {
        console.log(error);
        this.setState({ isLoading: false })
      })
  }

  //To get all recent request
  getAllRecentRequestRecord = async (pagination) => {

    await this.setState({ isLoading: true })
    await getAllRecentRequest(pagination)
      .then(response => {
        const { currentPage, totalRecords } = response.data.result.page;
        const RequestData = this.setRecentItem(response.data.result.content);
        this.setState({
          requestLastPage: Number(currentPage) + 1,
          requestPagination: {
            ...this.state.requestPagination,
            current: Number(currentPage) + 1,
            total: totalRecords,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
          },
          selectedStatus: '', dropDownDefaultValue: "All Status", requestData: RequestData, isLoading: false
        });

      })
      .catch(error => {
        this.setState({ isLoading: false });
        console.log(error);
      })
  }

  setRecentItem = (result) => {
    let newArr = result.map((val, index) => {
      return {
        key: val.id,
        title: val.title ? val.title : "- ",
        submittedBy: val.submittedBy ? val.submittedBy : "-",
        submittedOn: val.submissionDate ? getFormatttedDate(val.submissionDate) : "-",
        status: val.ideaStatus ? val.ideaStatus : "-"
      };
    })
    return newArr;
  };

  // dropDown handle change on selection
  async dropDownHandleChange(value) {
    await this.setState({ selectedStatus: '' })
    await this.setState({ selectedStatus: value.value })
  }

  // filter function on the basis of dropdown value

  filterData(tabelData) {
    if (this.props.title === "request") {
      if (this.state.selectedStatus === "All Status") {
        return tabelData;
      }
      else if (this.state.selectedStatus) {
        return tabelData.filter((el) => el.status === this.state.selectedStatus)
      }
      else {
        return tabelData;
      }
    }
    else {
      if (this.props.value.subHeaderTextTitle === "Categories") {
        if (this.state.selectedStatus === "All Type") {
          return tabelData;
        }
        else if (this.state.selectedStatus) {
          return tabelData.filter((el) => el.type === this.state.selectedStatus)
        }
        else {
          return tabelData;
        }
      }
      else {

        if (this.state.selectedStatus === "All Roles") {
          return tabelData;
        }
        else if (this.state.selectedStatus) {
          return tabelData.filter((el) => el.role === this.state.selectedStatus)
        }
        else {
          return tabelData;
        }
      }
    }
  }

  //Handle pagination function
  handlePageChange(pagination) {
    if (this.props.title === "request") {
      if (this.state.requestLastPage !== pagination.current) {
        this.getAllRecentRequestRecord(pagination);
      }
    }
    else if (this.props.title === "management" && this.props.value.subHeaderTextTitle === "Users") {
      if (this.state.userLastPage !== pagination.current) {
        this.getCategoriesDataRecord(pagination);
      }
    }
  }

  // Users search on the basis of name and email ID;
  SearchTextHandle(searchTxt) {
    clearTimeout(this.typingTimer);
    let inputText = validateEmail(searchTxt);
    if (inputText) {
      this.typingTimer = setTimeout(() => {
        this.getAllUserByEmailIId(this.state.userPagination, searchTxt);
      }, 10);
    }
    else {
      this.typingTimer = setTimeout(() => {
        this.getAllUserByName(this.state.userPagination, searchTxt);
      }, 10);
    }
  }

  // return modify property of categories array
  setItemCategories(result) {
    const catgeoriesArr = result.map((val, index) => {
      return {
        key: val.userId,
        userName: val.name ? val.name : "- ",
        location: val.location.country ? val.location.country : "-",
        role: val.role ? val.role : "-",
        status: val.enabled ? "Active" : "Deactivated"
      };
    })
    return catgeoriesArr;
  };

  // get all user by name search from API.
  getAllUserByName = async (pagination, searchTxt) => {
    console.log(searchTxt);
    await this.setState({ isLoading: true })
    await getUsersByName(pagination, searchTxt)
      .then(response => {
        const { currentPage, totalRecords } = response.data.result.page;
        const RequestData = this.setItemCategories(response.data.result.content);
        this.setState({
          pagination: {
            ...this.state.pagination,
            current: Number(currentPage) + 1,
            total: totalRecords,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
          },
          userData: RequestData, isLoading: false
        });
      })
      .catch(error => {
        this.setState({ isLoading: false });
        console.log(error);
      })
  }

  // get all user by email ID search from API.

  getAllUserByEmailIId = async (pagination, searchTxt) => {
    await this.setState({ isLoading: true })
    await getUsersByEmailID(pagination, searchTxt)
      .then(response => {
        const { currentPage, totalRecords } = response.data.result.page;
        const RequestData = this.setItemCategories(response.data.result.content);
        this.setState({
          pagination: {
            ...this.state.pagination,
            current: Number(currentPage) + 1,
            total: totalRecords,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
          },
          userData: RequestData, isLoading: false
        });

      })
      .catch(error => {
        this.setState({ isLoading: false });
        console.log(error);
      })
  }

  buttonActionHandler = (event) => {
    this.setState(prevstate => ({
      ...prevstate,
      showModal: !prevstate.showModal
    }))
  }

  // on row selection of table function
  onSelectedRowAction = (record) => {
    //debugger;
    if (record) {
      this.setState({ adminRecentData: record, showModal: true, })
    }
  }

  refereshRequestData = () => {
    this.getAllRecentRequestRecord(this.state.requestPagination);
    this.buttonActionHandler();
  }

  render() {

    // requestData state
    const requestData = this.state.requestData;
    const selectedRequestData = this.filterData(requestData);

    //userData state
    const userData = this.state.userData;
    const selectedUserData = userData ? this.filterData(userData) : null;

    //categories state
    const categoriesData = this.state.categoriesData;
    const selectedCategoriesData = categoriesData ? this.filterData(categoriesData) : null;

    return (
      <div>
        {this.state.isLoading ? <div className="loaderLayout">
          <Loader />
        </div> : null
        }
        <div className="my-ideas-container ">

          <Row justify="center">
            <Col xs={20} sm={20} md={20} lg={20} xl={20}>

              {this.props.title === "request" ?
                <Table
                  pagination={this.state.requestPagination}
                  onChange={pagination => (this.handlePageChange(pagination))}
                  columns={requestColumn}
                  dataSource={selectedRequestData}
                  onRow={(record) => ({
                    onClick: () => this.onSelectedRowAction(record)
                  })}
                >
                </Table> : null
              }
              {this.props.title === "management" && this.props.value.subHeaderTextTitle === "Users" ?

                <Table
                  pagination={this.state.userPagination}
                  onChange={pagination => (this.handlePageChange(pagination))}
                  columns={userColumn}
                  dataSource={selectedUserData}
                  onRow={(record) => ({
                    onClick: () => this.onSelectedRowAction(record)
                  })}
                >
                </Table> : null}


              {this.props.title === "management" && this.props.value.subHeaderTextTitle === "Categories" ?
                <div className="categoriesTable" >
                  <Table
                    pagination={false}
                    columns={categoriesColumn}
                    dataSource={selectedCategoriesData}
                    onRow={(record) => ({
                      onClick: () => this.onSelectedRowAction(record)
                    })}
                  >
                  </Table></div> : null}

            </Col>
          </Row>

          {this.props.value.userClickColor === "black" ?
            <div className="searchUserTypeMainLyout" >
              <SearchBox value={this.props} onChange={(evt) => this.SearchTextHandle(evt)} />
            </div>
            : null
          }

          {this.props.value.subHeaderTextTitle === "Categories" && this.props.title === "management" ?
            <div className="categoriesMainLyout" >
              <DropDown subHeaderTextTitle={this.props.value.subHeaderTextTitle} placeholder={this.state.dropDownDefaultValue} title={this.props.title} value={this.state} onSelect={(value) => this.dropDownHandleChange(value)} />
            </div> :
            <div className="searchMainLyout" >
              <DropDown subHeaderTextTitle={this.props.value.subHeaderTextTitle} placeholder={this.state.dropDownDefaultValue} title={this.props.title} value={this.state} onSelect={(value) => this.dropDownHandleChange(value)} />
            </div>
          }

          {this.state.showModal && this.props.title !== 'request' ? <AdminPopUpModel
            onOk={this.buttonActionHandler}
            onCancel={this.buttonActionHandler}
            isAddEditIdea="false"
            isViewIdea="true"
            adminRecentData={this.state.adminRecentData}
            refreshUserList={this.refreshUserList}
            selectedTab={this.props.value.subHeaderTextTitle}
          /> : null}
        </div>

        {this.state.showModal && this.props.title !== 'request' ? <AdminPopUpModel
          onOk={this.buttonActionHandler}
          onCancel={this.buttonActionHandler}
          isAddEditIdea="false"
          isViewIdea="true"
          adminRecentData={this.state.adminRecentData}
          refreshUserList={this.refreshUserList}
          refreshCategoriesList={this.refreshCategoriesList}
          selectedTab={this.props.value.subHeaderTextTitle}
        /> : null}

        {this.state.showModal && this.props.title === 'request' ? <PopUpModel title="request"
          onOk={this.buttonActionHandler}
          onCancel={this.buttonActionHandler}
          ideaId={this.state.adminRecentData.key}
          btnColor={this.state.btnColor}
          isOperPerform="true"
          isAddEditIdea="false"
          isViewIdea="true"
          requestedPage="Request"
          refereshRequest={this.refereshRequestData} /> : null}
      </div>
    );
  }
}

export default AllRecentRequest
