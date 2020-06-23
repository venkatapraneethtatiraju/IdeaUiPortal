import React from 'react';
import './AlertStyle.css';
import Logo from '../../images/shapes-and-symbols.svg'

const Alertbox = (props) => (
  <div className='alertOuter' >
    <img src={Logo} className="shapes-and-symbols" alt="" />
    <h1 className='display-message'>
      {props.alertName}</h1>
  </div>
)

export default Alertbox;

