import React, { Component } from 'react';
import GenericButton from '../Button/Button';
import './SubHeader.scss';
class SubHeader extends Component {
    render() {
        return (
            <div className="sub-header-container">
                <h2>{this.props.subHeaderTitle}</h2>
                <GenericButton 
                buttonClickHandler={this.props.buttonClickHandler}
                buttonName={this.props.name}
                btnColor={this.props.btnColor}
                >
                </GenericButton>
            </div>
        );
    }
}

export default SubHeader;