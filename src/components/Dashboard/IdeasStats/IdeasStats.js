import React, { Component } from 'react'
import "./IdeasStats.scss"
import { Col, Card } from 'antd';

export class IdeasStats extends Component {
    render() {
        return (
            <>
                <Col span={9}>
                    <h2>Ideas stats</h2>
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

export default IdeasStats
