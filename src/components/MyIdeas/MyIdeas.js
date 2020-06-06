import React, { Component } from 'react';
import './MyIdeas.scss';
import { Table, Row, Col, Button } from 'antd';
import PopUpModel from '../PopUpModel/PopUpModel'
import { getToken } from '../Auth/Auth';
import { DEFAULT_PAGE_SIZE } from '../../Config/Constants';

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
      collectedIdeaList: { content: [] },
      selectedRow: [],
      data: [],
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
          sorter: (a, b) => a.ideaType.length - b.ideaType.length,
          sortDirections: ['descend', 'ascend'],
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
    this.mounted = true;
    this.getIdeaDetails(this.state.pagination);
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  componentDidUpdate(prevProps, prevState) {
    //this.getIdeaDetails()

    if (this.mounted && this.state.isSubmitted) {
      console.log('pokemons state has changed.')
      //this.setState({data:[]});
      this.getIdeaDetails(this.state.pagination);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.myIdeaData !== this.props.myIdeaData && Object.keys(nextProps.myIdeaData).length >= 1) {
      this.getIdeaDetails(this.state.pagination);
    }
  }



  getIdeaDetails(pagination) {
    const token = getToken();
    const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
    fetch(`https://cors-anywhere.herokuapp.com/http://iportal.herokuapp.com/innovation-portal/api/v1/ideas?pageNumber=${Number(pagination.current) - 1}&pageSize=${pagination.pageSize}`, { headers })
      .then(response => response.json())
      .then(result => {
        const newArr = this.setItem(result.result);
        const { currentPage, totalRecords } = result.result.page;

        this.setState({
          data: newArr,
          isSubmitted: false,
          lastPage: Number(currentPage) + 1,
          pagination: {
            ...this.state.pagination,
            current: Number(currentPage) + 1,
            total: totalRecords,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
          }
        });
        console.log('Service Call');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  setItem = (result) => {
    let newArr = Object.values(result.content).map((val, index) => {
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
    return newArr;
  };

  addToIdeaList = (contentList) => {
    let ideaList = this.state.collectedIdeaList.content;
    for (let idea of contentList) {
      ideaList.push(idea);
    }
    return ideaList;
  }

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
        this.setState({ status: data.code, isSubmitted: true });
        //  this.setItem(data.result);
        this.buttonActionHandler();
        //this.getIdeaDetails();
      })
      .catch((error) => {
        console.error('Error:', error);
        this.setState({ status: error.code })
      });

  }

  handlePageChange(pagination) {
    console.log(pagination);

    if (this.state.lastPage !== pagination.current) {
      this.getIdeaDetails(pagination);
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
              itemRender={this.itemRender}>
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