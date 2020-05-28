import React from 'react';
import './AlertStyle.css';
import Logo from '../../images/shapes-and-symbols.svg'

const Alertbox = (props)=>(console.log(props),
   
    <div className='alertOuter' >
     <img src= {Logo} 
        class="shapes-and-symbols"/>
      <h1 className='This-idea-has-been-Closed-successfully'>
        {props.alertName}</h1>
    </div>
      
)

export default Alertbox;
