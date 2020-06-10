import React, { PureComponent } from 'react'
import './AllIdea.scss';
import { Table, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import { ReactComponent as BackLogo } from '../../images/return.svg'
import { getRecentlySubmittedIdeas } from '../../services/AppService';
import PopUpModel from '../PopUpModel/PopUpModel';
import { ALL_IDEAS } from '../../Config/Constants';
import { addNewProperty } from '../../Utility/CommonFunctions';

export class AllIdea extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            allIdeas: [],
            data: [],
            selectedRow: [],
            ideaId: '',
            columns: [
                {
                    title: 'Idea Subject',
                    dataIndex: 'ideaSubject',
                    sorter: (a, b) => a.ideaSubject.length - b.ideaSubject.length,
                    sortDirections: ['descend', 'ascend'],
                    ellipsis: true,
                    width: '40%',
                },
                {
                    title: 'Idea Type',
                    dataIndex: 'ideaType',
                    sorter: (a, b) => a.ideaType.length - b.ideaType.length,
                    sortDirections: ['descend', 'ascend'],
                    ellipsis: true
                },
                {
                    title: 'Submitted by',
                    dataIndex: 'submittedBy',
                    sorter: (a, b) => a.submittedOn.length - b.submittedOn.length,
                    sortDirections: ['descend', 'ascend'],
                    ellipsis: true
                },
                {
                    title: 'Submitted on',
                    dataIndex: 'submittedOn',
                    sorter: (a, b) => a.submittedOn.length - b.submittedOn.length,
                    sortDirections: ['descend', 'ascend'],
                    ellipsis: true
                }
            ]
        }
    }

    componentDidMount() {
        this.getAllIdeaDetails();
    }

    getAllIdeaDetails() {
        getRecentlySubmittedIdeas()
            .then(response => {
                if (response.data.message === 'success') {
                    const newArr = addNewProperty(response.data.result, ALL_IDEAS);
                    this.setState({ data: newArr });
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    onSelectedRowAction = (record) => {
        if (record) {
            this.setState({ ideaId: record.key, showModal: true, })
        }
    }

    buttonActionHandler = (event) => {
        this.setState(prevstate => ({
            ...prevstate,
            showModal: !prevstate.showModal
        }))
    }

    render() {
        return (
            <div>
                <div className="allideas-container">
                    <Row justify="center">
                        <Col xs={20} sm={20} md={20} lg={20} xl={20}>
                            <Table
                                {...this.state}
                                pagination={{ position: ['topRight'] }}
                                columns={this.state.columns}
                                dataSource={this.state.data}
                                onRow={(record) => ({
                                    onClick: () => this.onSelectedRowAction(record)
                                })}
                            >
                            </Table>
                        </Col>
                    </Row>
                    {this.state.showModal ? <PopUpModel
                        onOk={this.buttonActionHandler}
                        onCancel={this.buttonActionHandler}
                        isAddEditIdea="false"
                        isViewIdea="true"
                        ideaId={this.state.ideaId}
                    /> : null}
                </div>
                <div className="block">
                    {/* <img src={BackLogo} alt="logo" className="backlogos" /> */}
                    <BackLogo className="back-interface back-tools" alt="back-Tools" >
                    </BackLogo>
                    {/* <label>Back</label> */}
                    <Link to="/dashboard" className="backtoDash"
                    >Back</Link>
                </div>
            </div>
        )
    }
}

export default AllIdea
