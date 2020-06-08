import React, { PureComponent } from 'react';
import "./TopTrendingIdeas.scss"
import { Col, Table } from 'antd';
import { getTopTrendingIdeas, getIdeaDetailsById } from '../../../services/AppService';
import {
    TOP_TRENDING_IDEAS,
    IDEA_SUBJECT,
    SUBMITTED_BY,
    LIKES,
    SUCCESS
} from '../../../Config/Constants';
import PopUpModel from '../../PopUpModel/PopUpModel';

//Top trending ideas column 
const topTrendingColumn = [
    {
        title: IDEA_SUBJECT,
        dataIndex: 'title',
        ellipsis: true,
        width: '55%',
    },
    {
        title: SUBMITTED_BY,
        dataIndex: 'submittedBy',
        ellipsis: true,
        width: '25%',
    },
    {
        title: LIKES,
        dataIndex: 'likeCount',
        ellipsis: true,
        width: '10%',
    }
]

export class TopTrendingIdeas extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            pagination: false,
            toptrendingdata: [],
            columns: topTrendingColumn,
            visible: false,
            showModal: false,
            btnColor: '#e4500e',
            ideaId: '',
            selectedRow: []
        }
    }

    //Called the service when component is mount
    componentDidMount() {
        this.getTopTrendingRecord();
    }

    //Unmount the component
    componentWillUnmount() {
        this.mounted = false;
    }

    //To get the top trending ideas
    getTopTrendingRecord = () => {
        getTopTrendingIdeas()
            .then(response => {
                this.setState({ toptrendingdata: response.data })
            })
            .catch(error => {
                console.log(error);
            })
    }

    onRowClick = (ideaId) => {
        if (ideaId) {
            getIdeaDetailsById(ideaId)
                .then(response => {
                    if (response.data.message === SUCCESS) {
                        this.setState({ selectedRow: response.data.result, visible: true, showModal: true, })
                    }
                })
                .catch(error => {
                });
        }
    }

    updateLikes = (isLike) => {
        this.getTopTrendingRecord();
    }

    buttonActionHandler = (event) => {
        this.setState(prevstate => ({
            ...prevstate,
            showModal: !prevstate.showModal
        }))
    }

    render() {
        return (
            <Col span={15} className="top-trending-container">
                <h2>{TOP_TRENDING_IDEAS}</h2>
                <Table
                    {...this.state}
                    columns={this.state.columns}
                    dataSource={this.state.toptrendingdata}
                    rowKey="ideaId"
                    onRow={(record) => ({
                        onClick: () => this.onRowClick(record.ideaId)
                    }
                    )}>
                </Table>
                {this.state.showModal ? <PopUpModel
                    visible={this.state.visible}
                    onCancel={this.buttonActionHandler}
                    onOk={this.buttonActionHandler}
                    btnColor={this.state.btnColor}
                    isAddEditIdea="false"
                    isViewIdea="true"
                    selectedRow={this.state.selectedRow}
                    updateLikes={this.updateLikes}
                /> : null}
            </Col>
        )
    }
}

export default TopTrendingIdeas
