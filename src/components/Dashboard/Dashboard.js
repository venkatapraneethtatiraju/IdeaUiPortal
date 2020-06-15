import React, { Component } from 'react';
import './Dashboard.scss';
import { Row, Col } from 'antd';
import TopTrendingIdeas from './TopTrendingIdeas/TopTrendingIdeas';
import IdeasStats from './IdeasStats/IdeasStats';
import TopContributors from './TopContributors/TopContributors';
import RecentlySubmittedIdeas from './RecentlySubmittedIdeas/RecentlySubmittedIdeas';
import RecentRequests from './RecentRequests/RecentRequests';
import {setUserType,getUserType} from '../Auth/Auth';
import { getUsersByEmailID } from '../../services/AppService';
import {
    DEFAULT_PAGE_SIZE
} from '../../Config/Constants';

class Dashboard extends Component {

    constructor(props){
        super(props);

        this.state={
            userRole:'',
            pagination1: {
                current: 1,
                pageSize: DEFAULT_PAGE_SIZE,
                showTotal: (total, range) => ``,
                position: ['topRight'],
                total: 0,
                showQuickJumper: true,
              }
        }
    }

    componentDidMount(){
            this.getAllUserByEmailIId();
            console.log("every");
    }
    // get all user by email ID search from API.

    getAllUserByEmailIId = async ()=>{

        let emailId = "mani.singh@xebia.com";
        await getUsersByEmailID(this.state.pagination1,emailId)
            .then(response => {
        const userRole =  response.data.content[0].role;
        setUserType(userRole);
        this.setState({userRole:userRole});
   })
   .catch(error => {
     console.log(error);
   })
   }

    render() {
        const userRole = this.state.userRole;
        return (
            <div className="dashboard-container">
                <Row justify="center">
                    <Col xs={20} sm={20} md={20} lg={20} xl={20}>
                        <Row gutter={16}>
                            <TopTrendingIdeas />
                            <IdeasStats />
                        </Row>
                        <Row gutter={16}>
                            <TopContributors />
                            <RecentlySubmittedIdeas />
                        </Row>
                        {userRole ==="Manager" || userRole ==="Admin"?
                        <Row gutter={16} >
                            <RecentRequests onClick={this.props.onClick} />
                        </Row>:null
                        }
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Dashboard;