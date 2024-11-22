import React,{useContext, useState} from 'react'
import { Button, message, Form, Input, InputNumber } from 'antd';
import { useNavigate, Link, useParams } from 'react-router-dom'; 
import { MainContext } from '../context/context';
import Axios from 'axios';
const VerifyAct = () => {
  const {  baseUrl, token } = useContext(MainContext);
  const [isGap, setIsGap] = useState(false);
  const navigate =  useNavigate();
  const onFinish = async (values) => {

    try {
    // setIsLoading(true);
    const response = await  Axios({
        method: 'post',
        url: `${baseUrl}admin/verify`,
        headers: {
          'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "Accept": "*/*",
        }, 
        data:{
          email: values.email,
          otp: values.otp
        }
      });
      
      console.log(response.data);
      message.success('An OTP has been sent to your mail');
      navigate('/');
      // setIsLoading(false);
    } catch (error) {
      // setIsLoading(false);
      message.error(error.message);
      
    }
    
  };
  const onFinishFailed = (errorInfo) => {
    message.error('login failed ')
    console.error('the error message', errorInfo)
  }
  return (
    <div className='flex' style={{height: '100vh'}}>
      <div className='reset-form-holder  flex flex-column flex-center '>
            <div className='reset-form-container flex flex-column flex-center '>
        <h1 className='flex flex-center reset-h1'>Verify your account</h1>
       <p className='flex flex-center reset-p' >Enter OTP and email to get your account verified. </p>
      <Form
    name="basic" 
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
    className={`${!isGap ? 'reset-form flex flex-column flex-center gap-30': 'reset-form flex flex-column flex-center gap-60'}`}
  >
    <Form.Item
      label="OTP"
      name="otp"
      rules={[
        {
          required: true,
          message: false,
        },
      ]}
      layout='vertical'
      className='reset-inp '
    >
      <Input placeholder='12345'/>
    </Form.Item>

    
    <Form.Item
      label="Email"
      name="email"
      rules={[
        {
          required: true,
          message: false,
        },
      ]}
      layout='vertical'
      className='reset-inp'
    >
      <Input  placeholder='*****'/>
    </Form.Item>
    
    <Button type="primary" htmlType="submit" className='reset-btn flex flex-center' >
        Verify Account
      </Button>
      </Form>
            </div>
      </div>
      <div className='forgot-backgroundsss'></div>
    </div>
  )
}

export default VerifyAct