import React, { Component } from 'react';
import './PopUpModel.scss';
import {  Modal  } from 'antd';

class PopUpModel extends Component {
    render() {
        return (
            <div className="pop-up-model-container">
                <Modal
                title="Title"
                visible
                onCancel={this.props.onCancel}
                onOk={this.props.onOk}
                >
                <p>{this.props.modelText}</p>
                </Modal>
            </div>
        );
    }
}

export default PopUpModel;