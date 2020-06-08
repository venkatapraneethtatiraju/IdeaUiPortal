import React, { Component } from 'react';
import { Col } from 'antd';
import {
    APPROVED,
    DEVELOPMENT,
    REVIEW,
    CLOSE,
    COMPLETE
} from '../../Config/Constants';
import { ReactComponent as CloseIcon } from '../../images/signs.svg';
import { ReactComponent as ReviewIcon } from '../../images/round.svg';
import { ReactComponent as CompleteIcon } from '../../images/flag.svg';
import { ReactComponent as ApprovedIcon } from '../../images/approved.svg';
import { ReactComponent as DevelopmentIcon } from '../../images/flag.svg';
import './StatusButton.scss';

export class StatusButton extends Component {
    render() {
        const { ideaStatus } = this.props;
        let color = '';
        let statusIcon;
        if (ideaStatus === APPROVED) {
            color = '#0C5CC9';
            statusIcon = <ApprovedIcon className="status-svg-icon" />;
        } else if (ideaStatus === DEVELOPMENT) {
            color = '#9B6496';
            statusIcon = <DevelopmentIcon className="status-svg-icon" />;
        } else if (ideaStatus === COMPLETE) {
            color = '#1A8B45';
            statusIcon = <CompleteIcon className="status-svg-icon" />;
        } else if (ideaStatus === REVIEW) {
            color = '#F7C51D';
            statusIcon = <ReviewIcon className="status-svg-icon" />;
        } else if (ideaStatus === CLOSE) {
            color = '#7A8083';
            statusIcon = <CloseIcon className="status-svg-icon" />;
        }
        return (
            <>
                <Col className="status-button-main" onClick={this.props.onStatusChange}>
                    <Col className="status-button-inner" style={{ backgroundColor: color }} >
                        {statusIcon}
                    </Col>
                    <label className="status-button-label">{ideaStatus}</label>
                </Col>
            </>
        )
    }
}

export default StatusButton
