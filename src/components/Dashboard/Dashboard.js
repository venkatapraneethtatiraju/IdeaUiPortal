import React, { Component } from 'react';
import './Dashboard.scss';
import { Row, Col } from 'antd';
import TopTrendingIdeas from './TopTrendingIdeas/TopTrendingIdeas';
import IdeasStats from './IdeasStats/IdeasStats';
import TopContributors from './TopContributors/TopContributors';
import RecentlySubmittedIdeas from './RecentlySubmittedIdeas/RecentlySubmittedIdeas';
import RecentRequests from './RecentRequests/RecentRequests';

class Dashboard extends Component {
    render() {
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
                        <Row gutter={16}>
                            <RecentRequests />
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Dashboard;