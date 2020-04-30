import React, { Component } from 'react';
import './MyIdeas.scss';
import {Table, Row, Col} from 'antd';

class MyIdeas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                  key: '1',
                  ideaSubject: 'Merchandising for new joiners',
                  ideaType: 'Non Technical',
                  ideaCategory: 'Design',
                  submittedOn: '-',
                  status: 'Draft'
                },
                {
                  key: '2',
                  ideaSubject: 'Chat Bot for Sales Team',
                  ideaType: 'Technical',
                  ideaCategory: 'Big Data',
                  submittedOn: '28 Nov, 2019',
                  status: 'Approved'
                },
                {
                  key: '3',
                  ideaSubject: 'The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters',
                  ideaType: 'Technical',
                  ideaCategory: 'Digital Assurance',
                  submittedOn:'04 Aug, 2019',
                  status: 'Closed'
                },
                {
                  key: '4',
                  ideaSubject: 'Neque porro chunk of Lorem Ipsum used since the 1500s',
                  ideaType: 'Non Technical',
                  ideaCategory: 'Human Resource',
                  submittedOn:'13 June, 2019',
                  status: 'Submitted'
                },
                {
                    key: '4',
                    ideaSubject: 'Induction Application for new joiners',
                    ideaType: 'Non Technical',
                    ideaCategory: 'Admin',
                    submittedOn:'25 May, 2019',
                    status: 'Completed'
                },
              ],
            columns: [
                {
                  title: 'Idea Subject',
                  dataIndex: 'ideaSubject',
                  sorter: (a, b) => a.ideaSubject.length - b.ideaSubject.length,
                  sortDirections: ['descend', 'ascend'],
                  ellipsis: true
                },
                {
                  title: 'Idea Type',
                  dataIndex: 'ideaType',
                  defaultSortOrder: 'descend',
                  sorter: (a, b) => a.ideaType.length - b.ideaType.length,
                  ellipsis: true
                },
                {
                  title: 'Idea Category',
                  dataIndex: 'ideaCategory',
                  sorter: (a, b) => a.ideaCategory.length - b.ideaCategory.length,
                  sortDirections: ['descend', 'ascend'],
                  ellipsis: true
                },
                {
                    title: 'Submitted on',
                    dataIndex: 'submittedOn',
                    sorter: (a, b) => a.submittedOn.length - b.submittedOn.length,
                    sortDirections: ['descend', 'ascend'],
                    ellipsis: true
                },
                {
                    title: 'Status',
                    dataIndex: 'status',
                    sorter: (a, b) => a.status.length - b.status.length,
                    sortDirections: ['descend', 'ascend'],
                    ellipsis: true
                }
            ]
        }
    }

    selectedRowAction = (event) => {
      debugger;
    }
    render() {
        return (
            <div className="my-ideas-container">
              <Row justify="center">
                <Col xs={20} sm={20} md={20} lg={20} xl={20}>
                    <Table
                    pagination={{position: ['topRight']}}
                    columns={this.state.columns} 
                    dataSource={this.state.data}
                    // rowSelection={
                    //   {onSelect: this.selectedRowAction}
                    // }
                    >
                    </Table>
                </Col>
              </Row>
              {/* <Row>
                <Table
                pagination={{position: ['topRight']}}
                columns={this.state.columns} 
                dataSource={this.state.data}
                // rowSelection={
                //   {onSelect: this.selectedRowAction}
                // }
                >
                </Table>
              </Row> */}
             
            </div>
        );
    }
}

export default MyIdeas;