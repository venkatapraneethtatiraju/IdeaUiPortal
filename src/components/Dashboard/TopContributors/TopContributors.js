import React, { Component } from 'react'
import "./TopContributors.scss";
import { Col, Table, Avatar, Tooltip } from 'antd';
import { TOP_CONSTRIBUTORS, TOTAL_IDEAS, COMPLETED_IDEAS } from '../../../Config/Constants';
import { ReactComponent as EditToolsIcon } from '../../../images/edit-tools.svg'
import { ReactComponent as InterfaceIcon } from '../../../images/interface.svg'
import { getTopContributors } from '../../../services/AppService';
import { addNewProperty } from '../../../Utility/CommonFunctions';

export class TopContributors extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pagination: false,
            showHeader: false,
            topcontributordata: [],
            columns: [
                {
                    dataIndex: 'iconName',
                    ellipsis: true,
                    width: '13%',
                    render: (iconShortName) =>
                        <Avatar style={{ backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}` }} size={35}>
                            {iconShortName}
                        </Avatar>,
                },
                {
                    dataIndex: 'user',
                    ellipsis: true,
                    width: '50%',
                    render: (user) =>
                        <div>
                            <div className="txt-div"><span className="name-designation name-color">{user.username}</span></div>
                            <div className="txt-div"><span className="name-designation designation-color">{user.designation}</span></div>
                        </div>,
                },
                {
                    dataIndex: 'totalIdeas',
                    ellipsis: true,
                    width: '15%',
                    render: (totalIdeas) =>
                        <div>
                            <Tooltip title={`${TOTAL_IDEAS} : ${totalIdeas}`}>
                                <EditToolsIcon className="edit-interface edit-tools" alt="Edit-Tools" />
                            </Tooltip>
                            <span className="edit-interface-count edit-count-color">{totalIdeas}</span>
                        </div>,
                },
                {
                    dataIndex: 'completedIdeas',
                    ellipsis: true,
                    width: '20%',
                    render: (completedIdeas) =>
                        <div>
                            <Tooltip title={`${COMPLETED_IDEAS} : ${completedIdeas}`}>
                                <InterfaceIcon className="edit-interface interface" alt="Interface" />
                            </Tooltip>
                            <span className="edit-interface-count interface-count-color">{completedIdeas}</span>
                        </div>,
                }
            ],
        };
    }

    componentDidMount() {
        this.getTopContributorRecord();
    }

    //To get the top contributors
    getTopContributorRecord = () => {
        getTopContributors()
            .then(response => {
                const contributorsData = addNewProperty(response.data, TOP_CONSTRIBUTORS);
                this.setState({ topcontributordata: contributorsData })
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        return (
            <Col span={9} className="top-contributor-container">
                <h2>{TOP_CONSTRIBUTORS}</h2>
                <Table
                    {...this.state}
                    columns={this.state.columns}
                    dataSource={this.state.topcontributordata}>
                </Table>
            </Col>
        )
    }
}

export default TopContributors
