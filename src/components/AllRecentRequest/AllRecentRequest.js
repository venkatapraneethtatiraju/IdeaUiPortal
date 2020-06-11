import React,{Component} from 'react';
import { Table, Row, Col, Button } from 'antd';
import {getUsersByName,getUsersByEmailID, getAllRecentRequest ,getAllCategories} from '../../services/AppService';
import {
    SUBMITTED_ON,
    IDEA_SUBJECT,
    SUBMITTED_BY,
    STATUS,
    USERS,
    XEBIAOFFICE,
    ROLE,
    JOINEDON,
} from '../../Config/Constants';
import './AllRecentRequest.scss';
import Loader from '../../components/Loader/Loader';
import DropDown from '../DropDownComponent/DropDownComponent'
import SearchBox from '.././/SearchBarComponent/SearchBar'
import {getUserData,getCategoriesData} from './Management/UserColumnAndData';
import  AdminPopUpModel from '../PopUpModel/AdminPopUpModel';
// User Table Column
const userColumn = [
  {
    title: USERS,
    dataIndex: 'userName',
    sorter: (a, b) => a.userName.length - b.userName.length,
    sortDirections: ['descend', 'ascend'],
    ellipsis: true
  },
  {
    title: XEBIAOFFICE,
    dataIndex: 'location',
    ellipsis: true
  },

  {
    title: ROLE,
    dataIndex: 'role',
   // sorter: (a, b) => a.role.length - b.role.length,
    sortDirections: ['descend', 'ascend'],
    ellipsis: true
  },
  {
    title: STATUS,
    dataIndex: 'status',
    sorter: (a, b) => a.status.length - b.status.length,
    sortDirections: ['descend', 'ascend'],
    ellipsis: true,
    render: (status, rowData) => <Button onClick={(e) => this.handleStatus(rowData)} className={status} >  {status}</Button>
  }
]

// Request Column
const requestColumn =[

  {
    title: IDEA_SUBJECT,
    dataIndex: 'title',
    sorter: (a, b) => a.title.length - b.title.length,
    sortDirections: ['descend', 'ascend'],
    ellipsis: true
  },
  {
    title: SUBMITTED_BY,
    dataIndex: 'submittedBy',
    sorter: (a, b) => a.submittedBy.length - b.submittedBy.length,
    ellipsis: true
  },

  {
    title: SUBMITTED_ON,
    dataIndex: 'submittedOn',
    sorter: (a, b) => a.submittedOn.length - b.submittedOn.length,
    sortDirections: ['descend', 'ascend'],
    ellipsis: true
  },
  {
    title: STATUS,
    dataIndex: 'status',
    sorter: (a, b) => a.status.length - b.status.length,
    sortDirections: ['descend', 'ascend'],
    ellipsis: true,
    render: (status, rowData) => <Button onClick={(e) => this.handleStatus(rowData)} className={status} >  {status}</Button>
  }

]

// categoriesColumn

const categoriesColumn =[

  {
    title: "Categories",
    dataIndex: 'categories',
    sorter: (a, b) => a.categories.length - b.categories.length,
    sortDirections: ['descend', 'ascend'],
    ellipsis: true
  },
  {
    title: "Type",
    dataIndex: 'type',
    sorter: (a, b) => a.type.length - b.type.length,
    ellipsis: true
  },

  {
    title: 'Updated On',
    dataIndex: 'updatedOn',
    //sorter: (a, b) => a.submittedOn.length - b.submittedOn.length,
    sortDirections: ['descend', 'ascend'],
    ellipsis: true
  },
  {
    title: STATUS,
    dataIndex: 'status',
    sorter: (a, b) => a.status.length - b.status.length,
    sortDirections: ['descend', 'ascend'],
    ellipsis: true,
    render: (status, rowData) => <Button onClick={(e) => this.handleStatus(rowData)} className={status} >  {status}</Button>
  }

]

class AllRecentRequest extends Component{


    constructor(props){

        super(props);

        this.state={
                dropDownDefaultValue:'',
                isUserSelected:true,
                isCategoriesSelected:false,
                selectedStatus:"",
                isLoading:false,
                showModal : false,
                adminRecentData : [],
                data: [
          
                ],
                columns:[],

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
                ]

        }
    }

    // mount first time lifeCycle
    componentDidMount(){
        
        console.log("firstTime");
        if(this.props.title ==="request"){

          this.getAllRecentRequestRecord();

        }
        else{
    
            this.getUserDataRecord();
         
          
        }
      }

       

  

    async componentDidUpdate(prevState,nextState){

      
      console.log(prevState,"previouspros")
      console.log(this.props,"presentprops");
      console.log(this.state,"props");

           if(prevState.title !== this.props.title){

                if(this.props.title ==="request"){
                  this.getAllRecentRequestRecord();

                }
                else{

                      console.log("Users");
                      this.getUserDataRecord();
                  
                  }

                }
       else{
       

          if(prevState.value.subHeaderTextTitle !== this.props.value.subHeaderTextTitle)
          {
              if(this.props.value.subHeaderTextTitle==="Categories"){
                
                this.getCategoriesDataRecord();
              }
              else{
                this.getUserDataRecord();
               }

          }
        }

      }
     
    

  

    // get all users from UserColumnAndData.js file i.e hitting users api
    getUserDataRecord=async()=>
    { 
      this.setState({isLoading:true,columns:[],data:[]})   
      await getUserData().then(response =>
      {
        this.setState({selectedStatus:'', dropDownDefaultValue:"All Roles",isLoading:false, columns:userColumn, data:response});
      })
    }

    // get all users from UserColumnAndData.js file i.e hitting users api
    getCategoriesDataRecord=async()=>
    { 
      this.setState({isLoading:true,columns:[],data:[]})   
      await getCategoriesData().then(response =>
      {
        this.setState({selectedStatus:'', dropDownDefaultValue:"All Type",isLoading:false, columns:categoriesColumn, data:response});
      })
    }

    componentWillReceiveProps(){

    }

    //To get all recent request
    getAllRecentRequestRecord = async () =>
     {
       this.setState({isLoading:true,columns:[],data:[]})   
       await getAllRecentRequest()
          .then(response => {
              const RequestData = this.setRecentItem(response.data.result.content);
              this.setState({selectedStatus:'', dropDownDefaultValue:"All Status" ,columns:requestColumn, data:RequestData,isLoading:false});
          })
          .catch(error => {
             this.setState({ isLoading:false});
              console.log(error);
          })
    }

    setRecentItem = (result) => {
      let newArr = result.map((val, index) => {
      return {
          key: val.id,
          title: val.title ? val.title : "- ",
          submittedBy:val.submittedBy? val.submittedBy:"-",
          submittedOn: val.submissionDate? val.submissionDate:"-",
          status: val.ideaStatus ? val.ideaStatus : "-"
      };
    })
    return newArr;
  };

  
 async dropDownHandleChange(value) {
    await this.setState({selectedStatus:''})
    console.log(value); 
     await this.setState({selectedStatus:value.value})
    console.log(this.state.selectedStatus,"manii")
  }


  filterData(tabelData){
    console.log(tabelData,"monster");
    if(this.props.title ==="request"){
      if(this.state.selectedStatus === "All Status"){
        return tabelData;
    }
    else if(this.state.selectedStatus){
       return tabelData.filter((el)=> el.status === this.state.selectedStatus)
      }
      else{
        return tabelData;
      }
    }
    else{
      if(this.props.value.subHeaderTextTitle ==="Categories"){

        


         if(this.state.selectedStatus === "All Type"){
          return tabelData;
         }
         else if(this.state.selectedStatus){
            return tabelData.filter((el)=> el.type === this.state.selectedStatus)
         }
       else{
         return tabelData;
        }
    }
    else{

      if(this.state.selectedStatus === "All Roles"){
        return tabelData;
       }
       else if(this.state.selectedStatus){
          return tabelData.filter((el)=> el.role === this.state.selectedStatus)
       }
     else{
       return tabelData;
      }
    }
  }
}
   


   SearchTextHandle(searchTxt)
   {  
      console.log(searchTxt);
      clearTimeout(this.typingTimer);

      let inputText = this.validateEmail(searchTxt);
      if (inputText) {

           this.typingTimer = setTimeout(() => {
            
           this.getAllUserByEmailIId(searchTxt);
           
        }, 8);
        }
        else
        {
          this.typingTimer = setTimeout(() => {

          this.getAllUserByName(searchTxt);
           
          }, 5);
        }
    }
   
   setItemCategories(result) {
      const newArr = result.map((val, index) => {
      return {
        key: val.userId,
        userName: val.name ? val.name : "- ",
        location:val.location.country? val.location.country:"-",
        role: val.role? val.role:"-",
        status: val.enabled ? "Active": "Deactivated"
     };
   })
   return newArr;
  };

  getAllUserByName= async (searchTxt)=>{
      console.log(searchTxt);
      this.setState({isLoading:true,columns:[],data:[]})   
       await getUsersByName(searchTxt)
          .then(response => {
              console.log(response.data.content,"userName")
             const RequestData = this.setItemCategories(response.data.content);
             this.setState({columns:userColumn, data:RequestData,isLoading:false});
          })
          .catch(error => {
             this.setState({ isLoading:false});
              console.log(error);
          })
   }

   getAllUserByEmailIId = async (searchTxt)=>{
    this.setState({isLoading:true,columns:[],data:[]})   
     await getUsersByEmailID(searchTxt)
        .then(response => {
            console.log(response.data.content,"emailID")
           const RequestData = this.setItemCategories(response.data.content);
           this.setState({columns:userColumn, data:RequestData,isLoading:false});
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
  debugger;
  if (record) {
      this.setState({ adminRecentData: record, showModal: true, })
  }
}
  render() {

    const tabelData= this.state.data;
    const selectedStatusData =  this.filterData(tabelData);
    console.log(selectedStatusData);
    return (

    <div>
    {this.state.isLoading?<div className="loaderLayout">
    <Loader/>
     </div>:null
    }
      <div className="my-recent-container">
        <Row justify="center">
          <Col xs={20} sm={20} md={20} lg={20} xl={20}>
            <Table
              pagination={{ position: ['topRight'] }}
              columns={this.state.columns}
              dataSource={selectedStatusData}
              onRow={(record) => ({
                onClick: () => this.onSelectedRowAction(record)
            })}
            >
            </Table>
          </Col>
        
        </Row>
        
        {this.props.title !=="request"?
        <div className="searchUserTypeMainLyout" >
        <SearchBox value={this.props} onChange={(evt)=> this.SearchTextHandle(evt)} />
        </div>
        :null
        }
        <div className="searchMainLyout" >
         <DropDown subHeaderTextTitle={this.props.value.subHeaderTextTitle} placeholder={this.state.dropDownDefaultValue}  title={this.props.title} value={this.state} onSelect={(value)=> this.dropDownHandleChange(value)}  />
        </div>

        {this.state.showModal ? <AdminPopUpModel
                        onOk={this.buttonActionHandler}
                        onCancel={this.buttonActionHandler}
                        isAddEditIdea="false"
                        isViewIdea="true"
                        adminRecentData={this.state.adminRecentData}
                    /> : null}
      </div>
      </div> 
    );
  }
}

export default AllRecentRequest
