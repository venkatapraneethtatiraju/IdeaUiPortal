import React, { Component } from 'react';
import { Table, Row, Col } from 'antd';
import { getUsersByName, getUsersByEmailID, getAllRecentRequest } from '../../services/AppService';
import {
  SUBMITTED_ON,
  IDEA_SUBJECT,
  SUBMITTED_BY,
  STATUS,
  USERS,
  XEBIAOFFICE,
  ROLE,
  DEFAULT_PAGE_SIZE
} from '../../Config/Constants';
import './AllRecentRequest.scss';
import Loader from '../../components/Loader/Loader';
import DropDown from '../DropDownComponent/DropDownComponent'
import SearchBox from '.././/SearchBarComponent/SearchBar'
import { getUserData, getCategoriesData } from './Management/UserColumnAndData';
import StatusTag from '../StatusTag/StatusTag';
import { getFormatttedDate } from '../../Utility/CommonFunctions';
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
      lastPage: 1,
      dropDownDefaultValue: '',
      isUserSelected: true,
      isCategoriesSelected: false,
      selectedStatus: "",
      isLoading: false,
      showModal: false,
      adminRecentData: [],
      data: [],
      columns: [],
      btnColor: '#e4500e',
      allStatus:
        [
          "All Status",
          "Submitted",
          "Approved",
          "Completed",
          "Draft"
        ],

      allRoles:
        [
          "All Roles",
          "Admin",
          "Employee",
          "Manager"
        ]
      ,
      allType:
        [
          "All Type",
          "Technical",
          "Non-Technical",
        ],
      pagination: {
        current: 1,
        pageSize: DEFAULT_PAGE_SIZE,
        showTotal: (total, range) => ``,
        position: ['topRight'],
        total: 0,
        showQuickJumper: true,
      },

    }
  }

    // mount first time lifeCycle
    componentDidMount(){
    if (this.props.title === "request") {

      this.getAllRecentRequestRecord(this.state.pagination);

    }
    else {
      this.getUserDataRecord(this.state.pagination);

    }
  }
  async componentDidUpdate(prevState, nextState) {
    if (prevState.title !== this.props.title) {

      if (this.props.title === "request") {
        this.getAllRecentRequestRecord(this.state.pagination);

      }
      else {
        console.log("Users");
        this.getUserDataRecord(this.state.pagination);
      }
    }
    else {
      if (prevState.value.subHeaderTextTitle !== this.props.value.subHeaderTextTitle) {
        if (this.props.value.subHeaderTextTitle === "Categories") {
          this.getCategoriesDataRecord(this.state.pagination);
        }
        else {
          this.getUserDataRecord(this.state.pagination);
        }
      }
    }
  }

  refreshCategoriesList = () => {
    this.buttonActionHandler();
    this.getCategoriesDataRecord(this.state.pagination);
  }

  refreshUserList = () => {
    this.buttonActionHandler();
    this.getUserDataRecord(this.state.pagination);
  }

  // get all users from UserColumnAndData.js file i.e hitting users api
  getUserDataRecord = async (pagination) => {
    await this.setState({ isLoading: true, columns: [], data: [] })
    await getUserData(pagination).then(response => {
     
      const {data,responses}=  response;
      const { currentPage, totalRecords } = responses.data.page;
      this.setState({
        lastPage: Number(currentPage) + 1,
        pagination: {
          ...this.state.pagination,
          current: Number(currentPage) + 1,
          total: totalRecords,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
        },
        selectedStatus: '', dropDownDefaultValue: "All Roles", isLoading: false, columns: userColumn, data: data
      });
    }
    )
    .catch(error => {
      console.log(error);
      this.setState({isLoading:false})
    })
  }

 


  // get all users from UserColumnAndData.js file i.e hitting users api
  getCategoriesDataRecord = async (pagination) => {
    await this.setState({ isLoading: true, columns: [], data: [] })
    await getCategoriesData(pagination).then(response => {
      //const { currentPage, totalRecords } = response.data.result.page;
      this.setState({

        pagination: {
          ...this.state.pagination,
          current: 1,
          total: 15,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
        },
        selectedStatus: '', dropDownDefaultValue: "All Type", isLoading: false, columns: categoriesColumn, data: response
      });

    })
    .catch(error => {
      console.log(error);
      this.setState({isLoading:false})
    })
  }

  componentWillReceiveProps() {

  }

  //To get all recent request
  getAllRecentRequestRecord = async (pagination) => {
    await this.setState({ isLoading: true, columns: [], data: [] })
    await getAllRecentRequest(pagination)
      .then(response => {
        console.log(response, "requestw");
        const { currentPage, totalRecords } = response.data.result.page;
        const RequestData = this.setRecentItem(response.data.result.content);
        this.setState({
          lastPage: Number(currentPage) + 1,
          pagination: {
            ...this.state.pagination,
            current: Number(currentPage) + 1,
            total: totalRecords,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
          },
          selectedStatus: '', dropDownDefaultValue: "All Status", columns: requestColumn, data: RequestData, isLoading: false
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


  async dropDownHandleChange(value) {
    await this.setState({ selectedStatus: '' })
    console.log(value);
    await this.setState({ selectedStatus: value.value })
    console.log(this.state.selectedStatus, "manii")
  }


  filterData(tabelData) {
    console.log(tabelData, "monster");
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

  //Handle pagination
  handlePageChange(pagination) {
    console.log(pagination, this.state.lastPage);
    if (this.props.title === "request") {
      console.log("request");
      if (this.state.lastPage !== pagination.current) {
        this.getAllRecentRequestRecord(this.state.pagination);
      }
    }
    else if (this.props.value.subHeaderTextTitle === "Categories") {
      console.log("categories");
      if (this.state.lastPage !== pagination.current) {
        this.getCategoriesDataRecord(this.state.pagination);
      }
    }
    else {
      if (this.state.lastPage !== pagination.current) {
        console.log("users");
        this.getUserDataRecord(this.state.pagination);
      }
    }
  }



  SearchTextHandle(searchTxt) {
    console.log(searchTxt);
    clearTimeout(this.typingTimer);

    let inputText = this.validateEmail(searchTxt);
    if (inputText) {

      this.typingTimer = setTimeout(() => {

        this.getAllUserByEmailIId(this.state.pagination, searchTxt);

      }, 8);
    }
    else {
      this.typingTimer = setTimeout(() => {

        this.getAllUserByName(this.state.pagination, searchTxt);

      }, 5);
    }
  }

  setItemCategories(result) {
    const newArr = result.map((val, index) => {
      return {
        key: val.userId,
        userName: val.name ? val.name : "- ",
        location: val.location.country ? val.location.country : "-",
        role: val.role ? val.role : "-",
        status: val.enabled ? "Active" : "Deactivated"
      };
    })
    return newArr;
  };

  // get all user by name search from API.
  getAllUserByName= async (pagination,searchTxt)=>{
      console.log(searchTxt);
       await this.setState({isLoading:true,columns:[],data:[]})   
       await getUsersByName(pagination,searchTxt)
          .then(response => {
            
              const { currentPage, totalRecords } = response.data.page;
              console.log(response.data.content,"userName")
             const RequestData = this.setItemCategories(response.data.content);
             this.setState({
              pagination: {
                ...this.state.pagination,
                current: Number(currentPage) + 1,
                total: totalRecords,
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
              },
               columns:userColumn, data:RequestData,isLoading:false});
            
            })
          .catch(error => {
             this.setState({ isLoading:false});
              console.log(error);
          })
   }

   // get all user by email ID search from API.

   getAllUserByEmailIId = async (pagination,searchTxt)=>{
    await this.setState({isLoading:true,columns:[],data:[]})   
     await getUsersByEmailID(pagination,searchTxt)
        .then(response => {
          
            const { currentPage, totalRecords } = response.data.page;
            console.log(response.data.content,"emailID")
           const RequestData = this.setItemCategories(response.data.content);
           this.setState({
            pagination: {
              ...this.state.pagination,
              current: Number(currentPage) + 1,
              total: totalRecords,
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
            },
             columns:userColumn, data:RequestData,isLoading:false});
          
          })
        .catch(error => {
           this.setState({ isLoading:false});
            console.log(error);
        })
   }
   

   validateEmail = (email) => {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email)) {
      //Email valid. Procees to test if it's from the right domain (Second argument is to check that the string ENDS with this domain, and that it doesn't just contain it)
      if (email.indexOf("@xebia.com", email.length - "@xebia.com".length) !== -1) {
        //VALID
        console.log("VALID");
        return true;
      }
    }
  }
  buttonActionHandler = (event) => {
    this.setState(prevstate => ({
      ...prevstate,
      showModal: !prevstate.showModal
    }))
  }
  onSelectedRowAction = (record) => {
    //debugger;
    if (record) {
      this.setState({ adminRecentData: record, showModal: true, })
    }
  }
  render() {
    const columns = this.state.columns;
    const tabelData= this.state.data;
    const selectedStatusData =  this.filterData(tabelData);
    console.log(selectedStatusData);
    return (

      <div>
        {this.state.isLoading ? <div className="loaderLayout">
          <Loader />
        </div> : null
        }
        <div className="my-ideas-container ">
          {columns !== [] && selectedStatusData !== [] ?
            <Row justify="center">
              <Col xs={20} sm={20} md={20} lg={20} xl={20}>
                <Table
                  pagination={this.state.pagination}
                  onChange={pagination => (this.handlePageChange(pagination))}
                  columns={columns}
                  dataSource={selectedStatusData}
                  onRow={(record) => ({
                    onClick: () => this.onSelectedRowAction(record)
                  })}
                >
                </Table>
              </Col>

            </Row> : null
          }
          {this.props.value.userClickColor === "black" ?
            <div className="searchUserTypeMainLyout" >
              <SearchBox value={this.props} onChange={(evt) => this.SearchTextHandle(evt)} />
            </div>
            : null
          }
          <div className="searchMainLyout" >
            <DropDown subHeaderTextTitle={this.props.value.subHeaderTextTitle} placeholder={this.state.dropDownDefaultValue} title={this.props.title} value={this.state} onSelect={(value) => this.dropDownHandleChange(value)} />
          </div>

          {this.state.showModal && this.props.title!=='request'? <AdminPopUpModel
            onOk={this.buttonActionHandler}
            onCancel={this.buttonActionHandler}
            isAddEditIdea="false"
            isViewIdea="true"
            adminRecentData={this.state.adminRecentData}
            refreshUserList={this.refreshUserList}
            selectedTab={this.props.value.subHeaderTextTitle}
          /> : null}
        </div>

        {this.state.showModal && this.props.title!=='request' ? <AdminPopUpModel
                        onOk={this.buttonActionHandler}
                        onCancel={this.buttonActionHandler}
                        isAddEditIdea="false"
                        isViewIdea="true"
                        adminRecentData={this.state.adminRecentData}
                        refreshUserList = {this.refreshUserList}
                        refreshCategoriesList = {this.refreshCategoriesList}
                        selectedTab = {this.props.value.subHeaderTextTitle}
                    /> : null}
         {this.state.showModal && this.props.title ==='request'?  <PopUpModel title="request"
          onOk={this.buttonActionHandler}
          onCancel={this.buttonActionHandler}
          ideaId={this.state.adminRecentData.key}
          btnColor={this.state.btnColor}
          isOperPerform = "true"
          isAddEditIdea="false"
          isViewIdea="true"/>:null}       
      </div>
    );
  }
}

export default AllRecentRequest
