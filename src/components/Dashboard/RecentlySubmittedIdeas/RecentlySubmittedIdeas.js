import React, { Component } from 'react';
import "./RecentlySubmittedIdeas.scss";
import { Col, Card } from 'antd';

export class RecentlySubmittedIdeas extends Component {
    render() {
        return (
            <>
                <Col span={15}>
                    <h2>Recently Submitted Ideas</h2>
                    <Card>
                        <p>Card content</p>
                        <p>Card content</p>
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

export default RecentlySubmittedIdeas
