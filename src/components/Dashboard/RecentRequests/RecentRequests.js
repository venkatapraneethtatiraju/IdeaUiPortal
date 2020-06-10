import React, { Component } from 'react';
import "./RecentRequests.scss";
import { Table, Col, Button } from 'antd';
import {
    SUBMITTED_ON,
    IDEA_SUBJECT,
    SUBMITTED_BY,
    STATUS
    
} from '../../../Config/Constants';
import { Link } from 'react-router-dom';
import { getRecentRequest } from '../../../services/AppService';
import {ReactComponent as BackLogo} from '../../../images/return.svg';






class RecentRequests extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pagination: false,
            recentRequestdata: [],
            columns: [
                {
                    title: IDEA_SUBJECT,
                    dataIndex: 'title',
                    ellipsis: true,
                    width: '35%',
            
                },
                {
                    title: SUBMITTED_BY,
                    dataIndex: 'submittedBy',
                    ellipsis: true,
                    width: '20%',
                },
                {
                    title: SUBMITTED_ON,
                    dataIndex: 'submittedOn',
                    ellipsis: true,
                    width: '20%',
                },
                {
                    title: STATUS,
                    dataIndex: 'status',
                    ellipsis: true,
                    width: '15%',
                    render: (status, rowData) => <Button onClick={(e) => this.handleStatus(rowData)} className={status} >  {status}</Button>
                }
                
            ],
           
        }
    }

     //Called when component is mount
     componentDidMount() {
        this.getRecentRequestRecord();
    }

      //To get the top trending ideas
      getRecentRequestRecord = () => {
        getRecentRequest()
            .then(response => {
                const RequestData = this.setRecentItem(response.data.result);
                this.setState({ recentRequestdata:RequestData});
                console.log(this.state.recentRequestdata,"mani")
            })
            .catch(error => {
                console.log(error);
            })
    }

    setRecentItem = (result) => {
        
        let newArr = result.content.map((val, index) => {
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
  


    render() {

        const recentReuestData= this.state.recentRequestdata.filter((el,index)=> index<5);
                               

        return (
            <>
                <Col   className="recent-request-container " >
                    <h2>Recent Requests</h2>
                    <Table
                    {...this.state}
                    columns={this.state.columns}
                    dataSource={recentReuestData}
                    >
                </Table>
            
                <div className="viewDatas"  onClick={(e )=>this.props.onClick("request")}
                visible={this.state.showViewAll}>View all requests</div>  
                </Col>
              
            </>
        )
    }
}

export default RecentRequests;
