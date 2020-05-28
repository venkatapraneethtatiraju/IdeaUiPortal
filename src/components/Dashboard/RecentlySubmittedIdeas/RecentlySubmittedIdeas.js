import React, { Component } from 'react';
import "./RecentlySubmittedIdeas.scss";
import { Col, Card, Row, Table} from 'antd';
import { getToken } from '../../Auth/Auth';
import { Link, Redirect } from 'react-router-dom';
import Axios from '../../Axios/Axios';
import PopUpModel from '../../PopUpModel/PopUpModel'

class RecentlySubmittedIdeas extends Component {
  
    constructor(props) {
        super(props);
        this.state = {
            pagination : false,
            size : '4',
            ideaData : [],
            cardName : 'Recently Submitted Ideas',
            showViewAll : false,
            selectedRow : [],
            columns: [
                {
                  title: 'Idea Subject',
                  dataIndex: 'ideaSubject',
                 width : '40%',
                },
                {
                  title: 'Submitted by',
                  dataIndex: 'submittedBy',
                  width : '20%',
                },
                {
                  title: 'Submitted on',
                  dataIndex: 'submittedOn',
                  width : '20%',
                 
                },
                {
                    title: 'Idea Category',
                    dataIndex: 'ideaCategory',
                    width : '20%',
                    
                }
               
            ]
        }
      
    }
    componentDidMount() {
         this.getRecentIdeaDetails();       
     }

     getRecentIdeaDetails () {
     const token = getToken();
      Axios.get('/ideas/recent',{
            headers: {
                Authorization: `Bearer ${token}`,
              },
        })
        .then(response => { 
            console.log('getRecentIdeaDetails', response)
            if(response.data.message === 'success'){

                this.setItemItem(response.data.result);
            }})
            .catch(error => {
            });
        }
            setItemItem = (result) => {
            let newArr = result.map((val, index)=>{
                return {
                key: val.id,
                index: index,
                ideaSubject: val.title ? val.title : "- ",
                ideaType: val.categoryName ? val.categoryName : "-",
                submittedBy: val.subcategoryName ? val.subcategoryName : "-",
                submittedOn: val.submissionDate ? val.submissionDate : "-",
                ideaCategory : val.categoryName ? val.categoryName : "-",
                ideaDescription : val.ideaDescription ? val.ideaDescription :"-"
                  
                };
            })
            this.setState({ideaData : newArr,showViewAll : true});

        }

        buttonActionHandler = (event) => {
            this.setState(prevstate => ({
              ...prevstate,
              showModal: !prevstate.showModal
            }))
          }

        onSelectedRowAction = (record, rowIndex) => {
            console.log("selectedRowAction", record, rowIndex)
            if(record) {
                this.setState({selectedRow : record,showModal : true})
                //this.showModal()
            }
        }
    
       
    render() {

        var topRecords =[];
        if(this.state.ideaData.length>0) {
            topRecords= this.state.ideaData.slice(0,5);
        }


        return (
            < >
              
                <Col span={15} className="recentSubmitted-container">
                    <h2>{this.state.cardName}</h2>
                    <Table    
                    {...this.state}              
                    columns={this.state.columns} 
                    dataSource={topRecords}
                    pagination={this.state.pagination} 
                    onRow={(record, rowIndex) => ({
                        onClick: () => this.onSelectedRowAction(record, rowIndex)
                        })}
                    >
                    </Table>
                    {this.state.showViewAll && 
                        <Link className="viewData" to='/allIdeas'  
                    visible={this.state.showViewAll}>View all ideas</Link>  }
                </Col>

                {this.state.showModal ? <PopUpModel
             onOk={this.buttonActionHandler}
             onCancel={this.buttonActionHandler}
             selectedRow ={this.state.selectedRow}  
             isAddEditIdea="false"
             isViewIdea="true"     
            /> : null}
            
             </>
        );
    }
}

export default RecentlySubmittedIdeas;