import React, { Component } from 'react'
import { Modal, Col } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import GenericButton from '../Button/Button'
import { WARNING_MESSAGE } from '../../Config/Constants';

export class CommentPopupModel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            titleMessage: this.props.titleMessage,
            commentError: "",
            comment: ''
        };
    }

    validateComment = () => {
        const { comment } = this.state;
        let valid = false;
        if (comment.trim() === "") {
            this.setState({ commentError: WARNING_MESSAGE });
            valid = true;
        } else {
            this.setState({ commentError: '' });
            valid = false;
        }
        return valid;
    }

    inputChangedHandler = (event) => {
        if (event.target.name === "comment") {
            this.setState({ comment: event.target.value })
        }
    }

    closeReasonHandler = () => {
        if (this.validateComment())
            return;
        else {
            this.props.changeStatusHandler(this.state.comment);
        }
    }

    render() {
        return (
            <>
                <Modal
                    title=''
                    centered
                    visible
                    onOk={this.props.onCancel}
                    onCancel={this.props.onOk}
                    width={407}
                    footer={null}>
                    <Col className="reason-main">
                        <Col className="col-inner">
                            <label className="reason-header-label">
                                {this.state.titleMessage}
                            </label>
                        </Col>
                        <Col className="col-inner">
                            <TextArea name="comment" value={this.state.comment}
                                className={!this.state.commentError ? 'textarea-style' : 'errorComment'}
                                onChange={this.inputChangedHandler} />
                            {this.state.commentError ?
                                <div className="errorMessage">
                                    {this.state.commentError}
                                </div> : null}
                        </Col>
                        <Col className="close-button-div">
                            <GenericButton
                                buttonClickHandler={this.closeReasonHandler}
                                buttonName="Close"
                                btnColor='#e4500e'
                            ></GenericButton>
                        </Col>
                    </Col>
                </Modal>
            </>
        )
    }
}

export default CommentPopupModel
