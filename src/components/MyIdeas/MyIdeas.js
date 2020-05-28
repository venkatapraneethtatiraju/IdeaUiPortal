import React, { Component } from 'react';
import './MyIdeas.scss';
import { Table, Row, Col, Button } from 'antd';
import PopUpModel from '../PopUpModel/PopUpModel'
import { getToken } from '../Auth/Auth';

class MyIdeas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmitted: false,
      currentPage:0,
      lastPage:0,
      hitApi:false,
      showModal: false,
      btnColor: '#e4500e',
      saveandSubmit: "Save & Submit",
      selectedRow: [],
      data: [

      ],
      columns: [
        {
          title: 'Idea Subject',
          dataIndex: 'ideaSubject',
          sorter: (a, b) => a.ideaSubject.length - b.ideaSubject.length,
          sortDirections: ['descend', 'ascend'],
          ellipsis: true
        },
        {
          title: 'Idea Type',
          dataIndex: 'ideaType',
          defaultSortOrder: 'descend',
          sorter: (a, b) => a.ideaType.length - b.ideaType.length,
          ellipsis: true
        },
        {
          title: 'Idea Category',
          dataIndex: 'ideaCategory',
          sorter: (a, b) => a.ideaCategory.length - b.ideaCategory.length,
          sortDirections: ['descend', 'ascend'],
          ellipsis: true
        },
        {
          title: 'Submitted on',
          dataIndex: 'submittedOn',
          sorter: (a, b) => a.submittedOn.length - b.submittedOn.length,
          sortDirections: ['descend', 'ascend'],
          ellipsis: true
        },
        {
          title: 'Status',
          dataIndex: 'status',
          sorter: (a, b) => a.status.length - b.status.length,
          sortDirections: ['descend', 'ascend'],
          ellipsis: true,
          render: (status, rowData) => <Button onClick={(e) => this.handleStatus(rowData)} className={status} >  {status}</Button>
        }
      ]
    }
    this.saveandSubmitHandler = this.saveandSubmitHandler.bind(this)
  }

  handleStatus = (rowData) => {

    if (rowData.status === "Draft") {

      this.openModel(rowData);
    }

  }

  openModel = (rowData) => {

    this.setState({ showModal: true, selectedRow: rowData })


  }

  buttonActionHandler = (event) => {
    this.setState(prevstate => ({
      ...prevstate,
      showModal: !prevstate.showModal
    }))
  }

  selectedRowAction = (event) => {
    debugger;
  }

  componentDidMount() {
    this.mounted=true
    this.getIdeaDetails();

  }

  componentWillUnmount() {
    this.mounted = false; 
 }

  componentDidUpdate(prevProps, prevState) {
    //this.getIdeaDetails()

    if(this.mounted && this.state.isSubmitted) {
      console.log('pokemons state has changed.')
      //this.setState({data:[]});
      this.getIdeaDetails();
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.myIdeaData!== this.props.myIdeaData && Object. keys(nextProps.myIdeaData).length >=1)
    {
        this.getIdeaDetails();
    }
  }

  
  
  getIdeaDetails(pageNum) {
    const token = getToken();
    const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
    let pageNumber = 0;
    let pageSize = 15
    console.log(pageNumber,"Page");
    fetch('https://cors-anywhere.herokuapp.com/http://iportal.herokuapp.com/innovation-portal/api/v1/ideas?pageNumber=' + pageNumber + '&pageSize=' + pageSize, { headers })
      .then(response => response.json()).
      then(result => this.setItem(result));
  }
 
  setItem = (result) => {
      console.log('getIdeaDetails', JSON.stringify(result['content']))

      let newArr = Object.values(result.result.content).map((val, index) => {
      return {
        key: val.id,
        index: index,
        ideaSubject: val.title ? val.title : "- ",
        ideaType: val.categoryName ? val.categoryName : "-",
        ideaCategory: val.subcategoryName ? val.subcategoryName : "-",
        ideaDescription: val.ideaDescription ? val.ideaDescription : "-",
        submittedOn: "-",
        status: val.ideaStatus ? val.ideaStatus : "-"
      };
    })

   
    // if(this.state.data){
    // let v = [...this.state.data,...newArr];
    // this.setState({ data:v,isSubmitted:false});
    // }
    // else{
      this.setState({ data:newArr,isSubmitted:false});
   // }
  };

  saveandSubmitHandler(ideaSubject, ideaType, ideaCategoryValue, ideaDetails, ideaStatusId, ideaId) {
    console.log("myidea")
    let requestParam = {
      title: ideaSubject,
      ideaDescription: ideaDetails,
      categoryId: ideaType,
      subCategoryId: ideaCategoryValue,
      ideaStatusId: ideaStatusId
    }
    this.createPutReq(requestParam, ideaId);
  }


  createPutReq(requestParam, ideaId) {
    const token = getToken();
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(requestParam)
    };

    console.log("requestOptions", requestOptions, ideaId)
    fetch('https://cors-anywhere.herokuapp.com/http://iportal.herokuapp.com/innovation-portal/api/v1/ideas/' + ideaId, requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data.code);
        this.setState({ status: data.code ,isSubmitted:true});
        //  this.setItem(data.result);
        this.buttonActionHandler();
         //this.getIdeaDetails();
      })
      .catch((error) => {
        console.error('Error:', error);
        this.setState({ status: error.code })
      });

  }

  async onChange(pageNumber) {
    
    let data = pageNumber;
    console.log(data.current,"Change");
    if(this.state.lastPage < data.current)
    {

      await this.setState({currentPage:data.current-1,lastPage:data.current});

      //this.getIdeaDetails();
    }
    else
    {
      console.log(this.state.lastPage,"less");
    }
  }

 

  render() {

    return (
      <div className="my-ideas-container">
        <Row justify="center">
          <Col xs={20} sm={20} md={20} lg={20} xl={20}>
            <Table
              pagination={{ position: ['topRight'] }}
              columns={this.state.columns}
              dataSource={this.state.data}
              onChange={e =>(this.onChange(e))}
              itemRender={this.itemRender}
              
            // rowSelection={
            //   {onSelect: this.selectedRowAction}
            // }
            >
            </Table>
          </Col>
        </Row>
        {/* <Row>
                <Table
                pagination={{position: ['topRight']}}
                columns={this.state.columns} 
                dataSource={this.state.data}
                // rowSelection={
                //   {onSelect: this.selectedRowAction}
                // }
                >
                </Table>
              </Row> */}

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