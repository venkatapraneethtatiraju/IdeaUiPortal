import React, { Component } from 'react';
import "./TopTrendingIdeas.scss"
import { Col, Table } from 'antd';
import { getTopTrendingIdeas } from '../../../services/AppService';
import {
    TOP_TRENDING_IDEAS,
    IDEA_SUBJECT,
    SUBMITTED_BY,
    LIKES
} from '../../../Config/Constants';
import { addNewProperty } from '../../../Utility/CommonFunctions';
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

export class TopTrendingIdeas extends Component {
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

    //Called when component is mount
    componentDidMount() {
        this.getTopTrendingRecord();
    }

    //To get the top trending ideas
    getTopTrendingRecord = () => {
        getTopTrendingIdeas()
            .then(response => {
                const trendingData = addNewProperty(response.data, TOP_TRENDING_IDEAS);
                this.setState({ toptrendingdata: trendingData })
            })
            .catch(error => {
                console.log(error);
            })
    }

    onRowClick = (record) => {
        this.setState({ visible: true, showModal: true, ideaId: record.ideaId, selectedRow: record });
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
                    onRow={(record) => ({
                        onClick: () => this.onRowClick(record)
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
                /> : null}
            </Col>
        )
    }
}

export default TopTrendingIdeas
