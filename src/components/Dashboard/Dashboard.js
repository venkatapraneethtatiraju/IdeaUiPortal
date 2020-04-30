import React, { Component } from 'react';
import './Dashboard.scss';
import {Row, Col, Card} from 'antd';

class Dashboard extends Component {
    render() {
        return (
            <div className="dashboard-container">
                <Row justify="center">
                    <Col xs={20} sm={20} md={20} lg={20} xl={20}>
                        <Row gutter={12}>
                            <Col>
                                <h2>Top Ideas</h2>
                                <Card >
                                    <p>Card content</p>
                                    <p>Card content</p>
                                    <p>Card content</p>
                                </Card>
                            </Col>
                            <Col>
                                <h2>My Ideas</h2>
                                <Card >
                                    <p>Card content</p>
                                    <p>Card content</p>
                                    <p>Card content</p>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                {/* <Row gutter={12}>
                    <Col>
                        <h2>Top Ideas</h2>
                        <Card >
                            <p>Card content</p>
                            <p>Card content</p>
                            <p>Card content</p>
                        </Card>
                    </Col>
                    <Col>
                        <h2>My Ideas</h2>
                        <Card >
                            <p>Card content</p>
                            <p>Card content</p>
                            <p>Card content</p>
                        </Card>
                    </Col>
                </Row> */}
            </div>
        );
    }
}

export default Dashboard;