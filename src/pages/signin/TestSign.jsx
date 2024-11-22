import React, {useContext, useState} from 'react'
import Axios from 'axios'
import { MainContext } from '../../context/context';

const TestSign = () => {
  const {  baseUrl } = useContext(MainContext);
  const onFinish = async () => {
  
    try {
    const response = await  Axios({
        method: 'post',
        url: `${baseUrl}admin/login`,
        data:{
          email: 'ugboguj@yahoo.com',
          password: '12344'
        },
          
      });
      console.log(response?.data);
     
     
     
    } catch (error) {
     
      console.log('login error',error);
   
    }
    
  
  };
  return (
    <div>
      <button onClick={()=>onFinish()}>login</button>
    </div>
  )
}

export default TestSign