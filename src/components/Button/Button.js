import React, { Component } from 'react';
import './Button.scss';
import { Button } from 'antd';

class GenericButton extends Component {
    render() {
        return (
            <div className="btn-action">
                <Button type="primary"
                    onClick={this.props.buttonClickHandler}
                    className="common-action-btn"
                    style={{
                        borderColor: this.props.btnColor,
                        backgroundColor: this.props.btnColor,
                        borderRadius: '4px',
                        fontWeight: 500,
                        fontSize: '14px',
                        width: 'auto',
                        height: '34px',
                    }}
                >
                    {this.props.buttonName}
                </Button>
            </div>
        );
    }
}

export default GenericButton;