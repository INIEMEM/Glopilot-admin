import React, {useContext, useState} from 'react'
import { Button, message, Form, Input } from 'antd';
import { MainContext } from '../context/context';
import { Link, useNavigate } from 'react-router-dom';
import './pages.css'
import Axios  from 'axios';
const PasswordReset = () => {
  const {  baseUrl, } = useContext(MainContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isGap, setIsGap] = useState(false);
  const navigate =  useNavigate();
  const onFinish = async (values) => {
    setIsLoading(true);
    try {
   const response = await Axios({
        method: 'post',
        url: `${baseUrl}admin/reset`,
        data:{
          otp: values.otp,
          password: values.password,
          passwordConfirm: values.passwordConfirm
        }
      });
      message.success('Password reset Success');
      console.log(response.data);
      setIsLoading(false);
      navigate('/')
    } catch (error) {
      message.error(error.message);
      setIsLoading(false);
    }
    
  
  };
  const onFinishFailed = (errorInfo) => {
    message.error('login failed ');
    setIsGap(true);
    console.error('the error message', errorInfo)
  };
  return (
    <div className='flex' style={{height: '100vh'}}>
      <div className='reset-form-holder  flex flex-column flex-center '>
            <div className='reset-form-container flex flex-column flex-center '>
        <h1 className='flex flex-center reset-h1'>Password reset</h1>
       <p className='flex flex-center reset-p' >Enter OTP, new password, and confirm password to reset your account securely. </p>
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
      label="Password"
      name="password"
      rules={[
        {
          required: true,
          message: false,
        },
      ]}
      layout='vertical'
      className='reset-inp'
    >
      <Input.Password placeholder='*****' />
    </Form.Item>
    <Form.Item
      label="Confirm Password"
      name="passwordConfirm"
      rules={[
        {
          required: true,
          message: false,
        },
      ]}
      layout='vertical'
      className='reset-inp'
    >
      <Input.Password  placeholder='*****'/>
    </Form.Item>
    
    <Button type="primary" htmlType="submit" className='reset-btn flex flex-center' >
        Change 
      </Button>
      </Form>
            </div>
      </div>
      <div className='forgot-backgrounds'></div>
    </div>
  )
}

export default PasswordReset