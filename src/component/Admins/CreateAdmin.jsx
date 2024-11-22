import React, {useContext, useState} from 'react'
import {  Button, message, Form , Input, Select} from 'antd';
import { MainContext } from '../../context/context';
import Axios from 'axios'
const CreateAdmin = () => {
  const {  baseUrl,token } = useContext(MainContext);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    setLoading(true)
    try {
   const response = await  Axios({
        method: 'post',
        url: `${baseUrl}admin/register`,
        headers:
        {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Accept": "*/*",
        },
        data:{
          email: values.email,
          password: values.password,
          username: values.username,
          name: values.name,
          phoneNumber: values.phoneNumber,
          role: values.role,
          actions: values.actions
        }

        
      });
      console.log(response?.data);
      
      message.success('Register Admin success');
      // form.resetFields();
      setLoading(false)
    } catch (error) {
      message.error(error.message);
      setLoading(false)
      console.log(error)
      console.log('roles  ',values.role);
    }
    
  
  };
  return (
    <div>
      <section className="driver-details-info">
      
          <Form layout='inline' className='flex  flex-center driver-details-form-header' 
          onFinish={onFinish} autoComplete="off" >
            <Form.Item label="Admin Name" layout='vertical' 
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Please input the admin name!',
                },
              ]}
            >
              <Input className='inp-new'  />
            </Form.Item>
            <Form.Item label="Admin email" layout='vertical'
               name="email"
               rules={[
                 {
                   required: true,
                   message: 'Please input the admin email!',
                 },
               ]} 
            >
              <Input className='inp-new'   />
            </Form.Item>
            <Form.Item label="Admin UserName" layout='vertical'
               name="username"
               rules={[
                 {
                   required: true,
                   message: 'Please input the admin username!',
                 },
               ]} 
            >
              <Input  className='inp-new'   />
            </Form.Item>
            
        
            
            <Form.Item label="Admin Password" layout='vertical' 
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input the admin password!',
                },
              ]}
            >
              <Input.Password className='inp-new'  />
            </Form.Item>
            <Form.Item label="Admin phone number" layout='vertical'
               name="phoneNumber"
               rules={[
                 {
                   required: true,
                   message: 'Please input the admin phone number!',
                 },
               ]} 
            >
              <Input className='inp-new'   />
            </Form.Item>
            <Form.Item label="Admin role" layout='vertical'
               name="role"
               rules={[
                 {
                   required: true,
                   message: 'Please input the admin role!',
                 },
               ]} 
            >
            <Select
              
              mode="multiple"
              defaultValue={['driver']}
              placeholder="Outlined"
              style={{
                flex: 1,
                width:310
              }}
              options={[
                {
                  value: 'driver',
                  label: 'Driver',
                },
                {
                  value: 'CarDriver',
                  label: 'CarDriver',
                },
                {
                  value: 'TricycleDriver',
                  label: 'TricycleDriver',
                },
                {
                  value: 'MotorcycleDriver',
                  label: 'MotorcycleDriver',
                },
                {
                  value: 'TruckDriver',
                  label: 'TruckDriver',
                },
                {
                  value: 'carOwner',
                  label: 'carOwner',
                },
              ]}
            />
            </Form.Item>
            
        <Form.Item label="Admin action" layout='vertical'
           name="actions"
           rules={[
             {
               required: true,
               message: 'Please input the admin action!',
             },
           ]} 
        >
        <Select
          
          mode="multiple"
          defaultValue={['view']}
          placeholder="Outlined"
          style={{
            flex: 1,
            width:310
          }}
          options={[
            {
              value: 'view',
              label: 'View',
            },
            {
              value: 'add',
              label: 'Add',
            },
           
          ]}
        />
        </Form.Item>
       <div className='btn'>
       <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          
      <Button type="primary" htmlType="submit" loading = {loading}>
        Create admin
      </Button>
       </Form.Item>
       </div>
      </Form>
  </section>
    </div>
  )
}

export default CreateAdmin