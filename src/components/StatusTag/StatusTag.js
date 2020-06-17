import React, { Component } from 'react';
import './StatusTag.scss';
import { Tag } from 'antd';
import {
    SUBMITTED,
    APPROVED,
    DEVELOPMENT,
    COMPLETED,
    DRAFT,
    REVIEW,
    CLOSED,
    ACTIVE,
    DEACTIVATED,
    REVIEWED
} from '../../Config/Constants';

export class StatusTag extends Component {

    render() {
        const { ideaStatus, statusWidth, statusCursor } = this.props;
        let color = '';
        if (ideaStatus === SUBMITTED) {
            color = '#A5AAD9';
        } else if (ideaStatus === APPROVED || ideaStatus === ACTIVE) {
            color = '#0C5CC9';
        } else if (ideaStatus === DEVELOPMENT) {
            color = '#9B6496';
        } else if (ideaStatus === COMPLETED) {
            color = '#1A8B45';
        } else if (ideaStatus === DRAFT) {
            color = '#F7941D';
        } else if (ideaStatus === REVIEW || ideaStatus === REVIEWED) {
            color = '#F7C51D';
        } else if (ideaStatus === CLOSED || ideaStatus === DEACTIVATED) {
            color = '#7A8083';
        }

        return (
            <>
                <Tag className="status-tag"
                    style={{ width: statusWidth, cursor: statusCursor }}
                    color={color}>
                    {ideaStatus}
                </Tag>
            </>
        )
    }
}

export default StatusTag
