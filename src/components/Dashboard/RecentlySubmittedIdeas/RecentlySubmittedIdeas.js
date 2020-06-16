import React, { PureComponent } from 'react';
import "./RecentlySubmittedIdeas.scss";
import { Col, Table } from 'antd';
import { Link } from 'react-router-dom';
import PopUpModel from '../../PopUpModel/PopUpModel'
import { addNewProperty } from '../../../Utility/CommonFunctions';
import { RECENTLY_SUBMITTED_IDEAS, SUCCESS } from '../../../Config/Constants';
import { getRecentlySubmittedIdeas } from '../../../services/AppService';

class RecentlySubmittedIdeas extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            pagination: false,
            size: '4',
            ideaData: [],
            cardName: 'Recently Submitted Ideas',
            showViewAll: false,
            selectedRow: [],
            ideaId: '',
            columns: [
                {
                    title: 'Idea Subject',
                    dataIndex: 'ideaSubject',
                    width: '35%',
                    ellipsis: true,
                },
                {
                    title: 'Submitted by',
                    dataIndex: 'submittedBy',
                    width: '25%',
                    ellipsis: true,
                },
                {
                    title: 'Submitted on',
                    dataIndex: 'submittedOn',
                    width: '20%',
                    ellipsis: true,
                },
                {
                    title: 'Idea Category',
                    dataIndex: 'ideaCategory',
                    width: '20%',
                    ellipsis: true,
                }
            ]
        }
    }

    componentDidMount() {
       
       
        this.getRecentIdeaDetails();
         
    }

    //Get the recently submitted ideas
    getRecentIdeaDetails() {
        getRecentlySubmittedIdeas()
            .then(response => {
                if (response.data.message === SUCCESS) {
                    const newArr = addNewProperty(response.data.result, RECENTLY_SUBMITTED_IDEAS);
                    this.setState({ ideaData: newArr, showViewAll: true });
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    buttonActionHandler = (event) => {
        this.setState(prevstate => ({
            ...prevstate,
            showModal: !prevstate.showModal
        }))
    }

    onSelectedRowAction = (record) => {
        if (record) {
            this.setState({ ideaId: record.key, showModal: true, })
        }
    }

    render() {
        var topRecords = [];
        if (this.state.ideaData.length > 0) {
            topRecords = this.state.ideaData.slice(0, 5);
        }
        return (
            <Col span={15} className="recentSubmitted-container">
                <h2>{this.state.cardName}</h2>
                <Table
                    {...this.state}
                    columns={this.state.columns}
                    dataSource={topRecords}
                    pagination={this.state.pagination}
                    onRow={(record) => ({
                        onClick: () => this.onSelectedRowAction(record)
                    })}
                >
                </Table>
                {this.state.showViewAll &&
                    <Link className="viewData" to='/allIdeas'
                        visible={this.state.showViewAll}>View all ideas</Link>}

                {this.state.showModal ? <PopUpModel
                    onOk={this.buttonActionHandler}
                    onCancel={this.buttonActionHandler}
                    isAddEditIdea="false"
                    isViewIdea="true"
                    ideaId={this.state.ideaId}
                /> : null}
            </Col>
        );
    }
}

export default RecentlySubmittedIdeas;