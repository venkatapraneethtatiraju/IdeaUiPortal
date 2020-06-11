import React, { Component } from 'react';
import GenericButton from '../Button/Button';
import './SubHeader.scss';
class SubHeader extends Component {
    render() {
        return (
            <div className="sub-header-container">
               
                { this.props.subHeaderTitle ==="Management" ?
                    <div className="textBody" >
                    <h2 style={{color :this.props.value.userClickColor}} onClick={()=>this.props.userClicked("users")} className="UserText">Users</h2>

                    <h2 style={{color:this.props.value.categoriesClickColor}} onClick={()=>this.props.categoriesClicked("categories")} className="Categories">Categories</h2>
                    </div>:
                    <h2>{this.props.subHeaderTitle}</h2>
                }
                {this.props.value.userClickColor !=="black"?

                <GenericButton 
                buttonClickHandler={this.props.buttonClickHandler}
                buttonName={this.props.buttonName}
                btnColor={this.props.btnColor}
                >
                </GenericButton>:null}
            </div>
        );
    }
}

export default SubHeader;