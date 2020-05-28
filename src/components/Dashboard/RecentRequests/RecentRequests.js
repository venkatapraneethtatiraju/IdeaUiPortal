import React, { Component } from 'react';
import "./RecentRequests.scss";
import { Col, Card } from 'antd';

export class RecentRequests extends Component {
    render() {
        return (
            <>
                <Col>
                    <h2>Recent Requests</h2>
                    <Card >
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                </Col>
            </>
        )
    }
}

export default RecentRequests
