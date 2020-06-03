import React, { Component } from 'react'
import './AllIdea.scss';
import { Table, Row, Col, Button } from 'antd';
import Axios from '../Axios/Axios';
import { Link } from 'react-router-dom';
import {ReactComponent as BackLogo} from '../../images/return.svg'
import {getIdeaDetailsById } from '../../services/AppService';


import PopUpModel from '../PopUpModel/PopUpModel';
import { getToken } from '../Auth/Auth';
export class AllIdea extends Component {

    constructor(props) {
        super(props)

        this.state = {
            allIdeas: [],
            data: [
            ],
            selectedRow : [],
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
        const token = getToken();
        Axios.get('/ideas/recent',{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(response => {
                console.log('getAllIdeaDetails', response)
                if (response.data.message === 'success') {

                    this.setItemItem(response.data.result);
                }
            })
            .catch(error => {
            });
    }
    setItemItem = (result) => {
        let newArr = result.map((val, index) => {
            return {
                key: val.id,
                index: index,
                ideaSubject: val.title ? val.title : "- ",
                ideaType: val.categoryName ? val.categoryName : "-",
                submittedBy: val.subcategoryName ? val.subcategoryName : "-",
                submittedOn: val.submissionDate ? val.submissionDate : "-",
                ideaDescription : val.ideaDescription ? val.ideaDescription :"-"

            };
        })
        this.setState({ data: newArr });

    }

    onSelectedRowAction = (record, rowIndex) => {
        if(record) {
            this.getAllIdeaDetailsById(record.key)
        }
    }

    getAllIdeaDetailsById(ideaId) {
                if(ideaId){
                    getIdeaDetailsById(ideaId)
                    .then(response => {
                        console.log('getAllIdeaDetails', response)
                        if (response.data.message === 'success') {
                            this.setState({selectedRow : response.data.result,showModal : true})
                        }
                    })
                    .catch(error => {
                    });
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
                            onRow={(record, rowIndex) => ({
                            onClick: () => this.onSelectedRowAction(record, rowIndex)
                            })}
                        >
                        </Table>
                    </Col>
                </Row>

            {this.state.showModal ? <PopUpModel 
             onOk={this.buttonActionHandler}
             onCancel={this.buttonActionHandler}
             selectedRow ={this.state.selectedRow}  
             isAddEditIdea="false"
             isViewIdea="true"      
            /> : null}
             
            </div>
            <div className="block">
                        {/* <img src={BackLogo} alt="logo" className="backlogos" /> */}
                        <BackLogo className="back-interface back-tools" alt="back-Tools" >
                        </BackLogo>
                            {/* <label>Back</label> */}
                        <Link  to="/dashboard" className="backtoDash"
                        >Back</Link>
                    </div>
            </div>
        )
    }
}

export default AllIdea
