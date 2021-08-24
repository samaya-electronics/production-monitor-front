import React, { useEffect } from "react";

const Select = (props) => {
    const {} = props;
    useEffect(()=>{
      
        fetch(props.url,{
          method:'get',
          headers:{
              'Content-Type':'application/json',
              'Authorization':props.token
          }  
        })
    },[]);
    
    return (
    <div className="field">
      <label className="label">{props.label}</label>
      <div className="select">
        <select name={props.name} onChange={props.inputHandle}>
          <option>Select {props.label}</option>
        </select>
      </div>
    </div>
  );
};

export default Select;