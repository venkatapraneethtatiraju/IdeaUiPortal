import React, { PureComponent } from 'react';
import "./RecentRequests.scss";
import { Table, Col } from 'antd';
import {
    SUBMITTED_ON,
    IDEA_SUBJECT,
    SUBMITTED_BY,
    STATUS,
    SUCCESS,
    RECENT_REQUEST
} from '../../../Config/Constants';
import { getRecentRequest } from '../../../services/AppService';
import { addNewProperty } from '../../../Utility/CommonFunctions';
import StatusTag from '../../StatusTag/StatusTag';
import PopUpModel from '../../PopUpModel/PopUpModel';
import { Link } from 'react-router-dom';

class RecentRequests extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            pagination: false,
            isible: false,
            showModal: false,
            btnColor: '#e4500e',
            ideaId: '',
            recentRequestdata: [],
            showViewAll: false,
            columns: [
                {
                    title: IDEA_SUBJECT,
                    dataIndex: 'title',
                    ellipsis: true,
                    width: '50%',
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
                    width: '15%',
                },
                {
                    title: STATUS,
                    dataIndex: 'status',
                    ellipsis: true,
                    width: '15%',
                    render: (ideaStatus) => <StatusTag ideaStatus={ideaStatus} statusWidth="96px" statusCursor="pointer" />
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
                if (response.data.message === SUCCESS) {
                    const newArr = addNewProperty(response.data.result.content, RECENT_REQUEST);
                    this.setState({ recentRequestdata: newArr, showViewAll: true });
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    onRowClick = (ideaId) => {
        if (ideaId) {
            this.setState({ ideaId: ideaId, visible: true, showModal: true })
        }
    }

    buttonActionHandler = (event) => {
        this.setState(prevstate => ({
            ...prevstate,
            showModal: !prevstate.showModal
        }))
    }

    render() {
        const recentReuestData = this.state.recentRequestdata.filter((el, index) => index < 5);
        return (
            <Col className="recent-request-container " >
                <h2>Recent Requests</h2>
                <Table
                    {...this.state}
                    columns={this.state.columns}
                    dataSource={recentReuestData}
                    rowKey="id"
                    onRow={(record) => ({
                        onClick: () => this.onRowClick(record.id)
                    }
                    )}>
                </Table>
                <div onClick={(e) => this.props.onClick("request")}
                    visible={this.state.showViewAll}>
                    <Link className="viewDatas" to='/request'>View all requests</Link>
                </div>
                {this.state.showModal ? <PopUpModel
                    visible={this.state.visible}
                    onCancel={this.buttonActionHandler}
                    onOk={this.buttonActionHandler}
                    btnColor={this.state.btnColor}
                    isAddEditIdea="false"
                    isViewIdea="true"
                    ideaId={this.state.ideaId}
                    isOperPerform="true"
                /> : null}
            </Col>
        )
    }
}

export default RecentRequests;
