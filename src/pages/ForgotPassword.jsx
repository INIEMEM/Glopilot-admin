import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, message, Form, Input, InputNumber } from 'antd';
import { MainContext } from '../context/context';
import Axios  from 'axios';
import { MailOutlined } from '@ant-design/icons';
const ForgotPassword = () => {
  const {  baseUrl, } = useContext(MainContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isGap, setIsGap] = useState(false);
  const navigate = useNavigate()
  const onFinish = async (values) => {

    try {
    setIsLoading(true);
    const response = await  Axios({
        method: 'post',
        url: `${baseUrl}admin/forgot`,
        data:{
          email: values.email,
        }
      });
      
      console.log(response.data);
      message.success('An OTP has been sent to your mail');
      navigate('/password/reset');
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      message.error(error.message);
      
    }
    
  
  };
  const onFinishFailed = (errorInfo) => {
    message.error('login failed ')
    setIsGap(true);
    console.error('the error message', errorInfo)
  };
  return (
    <div className='flex  ' style={{height: '100vh'}}>
    <div className='reset-form-holder gg flex flex-column flex-justify-center'>
     <h1 className='flex flex-center'>Forgot password</h1>
     <p className='flex flex-center reset-p'>Forgot your password? Just enter your email to reset it and regain access instantly! </p>
    <Form
  name="basic" labelCol={{span: 8,}}
  wrapperCol={{span: 16,}}
  style={{maxWidth: 600,}}initialValues={{
    remember: true,
  }}
  onFinish={onFinish}
  onFinishFailed={onFinishFailed}
  autoComplete="off"
  className={`${!isGap ? 'reset-form flex flex-column flex-center gap-30': 'reset-form flex flex-column flex-center gap-50'}`}
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
    className='reset-inps'
  >
    <Input  className='reset-inpss' placeholder='JohnDoe@gmail.com' prefix={<MailOutlined/>}/>
  </Form.Item>

  {/* <Form.Item
    label="OTP"
    name="otp"
    rules={[
      {
        required: true,
        message: 'Please input your OTP!',
      },
    ]}
  >
    <InputNumber className='forgot-pass-inp'/>
  </Form.Item> */}
  
    <Button type="primary" htmlType="submit" style={{marginTop: '20px'}} className='reset-btns flex flex-center' >
        Reset Password 
      </Button>
    </Form>
    </div>
    <div className='forgot-backgroundss' style={{position: 'relative'}}>
    {/* <p className='glop'>GLOPILOTs</p> */}
    </div>
  </div>
  )
}

export default ForgotPassword