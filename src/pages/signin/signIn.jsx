import React, {useContext, useState} from 'react'
import { Button, message, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { MailOutlined, LockFilled } from '@ant-design/icons';
import Axios from 'axios'
import { MainContext } from '../../context/context';
import './signIn.css'


const SignIn =  () => {
  const {  baseUrl,setToken, setCurrentUser, currentUser, setUserRole } = useContext(MainContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isGap, setIsGap] = useState(false);
  const onFinish = async (values) => {
    setLoading(true)
    try {
    const response = await  Axios({
        method: 'post',
        url: `${baseUrl}admin/login`,
        data:{
          email: values.email,
          password: values.password
        },
          
      });
      console.log(response?.data);
      message.success('Login Success');
      // setCurrentUser(response?.data);
      console.log(currentUser);
      setToken(response?.data?.token, response?.data);
      setUserRole(response?.data?.role);
      setLoading(false);
      navigate('/dashboard');
    } catch (error) {
      message.error(error.response?.data?.message);
      console.log('login error',error);
      setLoading(false);
    }
    
  
  };
  const onFinishFailed = (errorInfo) => {
    message.error(errorInfo?.response?.data?.message)
    setIsGap(true);
    console.error('the error message', errorInfo)
  };
  // <lord-icon src="https://cdn.lordicon.com/mewmkith.json" trigger="loop" style={{width: '30px', height: '30px'}}></lord-icon>
  return (
    <div className='flex  login-form-main-holder'>
        
      <div className='login-form-holder flex flex-column flex-justify-center'>
      
       <h1 className='flex flex-center'>Welcome back 👋 </h1>
       <p className='flex flex-center reset-p'>Access your dashboard to streamline rides and enhance transportation services with ease. </p>
      <Form
    name="basic" labelCol={{span: 8,}}
    wrapperCol={{span: 16,}}
    style={{maxWidth: 600,}}initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    className={`${!isGap ? 'flex flex-column gap-40': 'flex flex-column gap-50'}`}
    autoComplete="off"
    onFinishFailed={onFinishFailed}
  >
    <Form.Item
      label="Email"
      name="email"

      rules={[
        {
          required: true,
          message: false
        },
      ]}
      layout='vertical'
      className='login-inp'
    >
      <Input size="large" placeholder="johndoe@gmal.com" prefix={<MailOutlined />}  />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[
        {
          required: true,
          message: false
        },
      ]}
      layout='vertical'
      className='hhh'
      
    >
      <Input.Password  size="large" placeholder="*****" prefix={<LockFilled />}  className='login-inp'/>
    </Form.Item>
    <Link to="password/forgot"className='forgot-password'> forgot password?</Link>
    <Button type="primary" htmlType="submit" style={{width : '100%', height: '50px', marginTop: '10px'}} loading = {loading}>
        Login to dashboard
      </Button>   
      </Form>

      
      </div>
      <div className='login-background '>
      <p className='glop'>GLOPILOTs</p>
          {/* <p>GLOPILOTs</p> */}
      </div>
      {/* <button onClick={()=> logs()}>Logs</button> */}
    </div>
  )
}

export default SignIn