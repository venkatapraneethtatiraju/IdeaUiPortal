import React from 'react'
import './DropDownComponent.scss';
import { Select } from 'antd';


export default function DropDown (props){
    const { Option } = Select;
    return(

        <div className='searchBarbody'>
         <Select placeholder={props.placeholder}
                labelInValue
                style={{ width: 120 }}
                onChange={(value)=>props.onSelect(value)}
              >
              {props.title !=="request"?
                 props.value.allRoles.map((el)=>(
                 <Option  key={el.key} value={el}>{el}</Option>
                 )):
                 props.value.allStatus.map((el)=>(
                    <Option key={el.key} value={el}>{el}</Option>
                ))
              }
             </Select>
        </div>
    )
}


