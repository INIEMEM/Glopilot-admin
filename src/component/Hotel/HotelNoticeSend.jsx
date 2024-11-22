import React, { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Form, Input, message, Button, Mentions } from 'antd';
import Axios from 'axios';
import { MainContext } from '../../context/context';

const HotelNoticeSend = () => {
  const location = useLocation();
  const { reservationId } = location.state || {};
  const {  imgBaseUrl,baseUrl, token } = useContext(MainContext);
  const [mentionType, setMentionType] = useState(''); // To store the selected mention

  // Handle Mentions change or selection
  const handleMentionSelect = (option) => {
    console.log('Selected mention:', option.value);
    setMentionType(option.value); // Store the selected mention type (user/vendor)
  };

  const handleFormSubmit = async (values) => {
    if (!mentionType) {
      message.error('Please select either user or vendor in the description.');
      return;
    }

    try {
      const endpoint =
        mentionType === 'user'
          ? `${baseUrl}vendor-hotel/admin-send-notice-user`
          : `${baseUrl}vendor-hotel/admin-send-notice-vendor`;

      const response = await Axios({
        method: 'post',
        url: endpoint,
        headers: 
        {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
          "Accept": "*/*",
        },
        data:{
          reservationId: reservationId,
          title: values.title,
          description: values.description,
        }
      });

      message.success('Notice sent successfully!');
    } catch (error) {
      console.error('Error sending notice:', error);
      message.error('Failed to send the notice.');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1 className='flex flex-center' style={{marginBottom: 15}}>Send a Notice</h1>
      <div className="flex flex-center">
        <div className="form-notice-holder">
          <Form onFinish={handleFormSubmit} layout="vertical">
            <Form.Item
              name="title"
              label="Title"
              rules={[{ required: true, message: 'Please enter a title.' }]}
            >
              <Input placeholder="Please type the title" />
            </Form.Item>

            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: 'Please type the description.' }]}
            >
              <Mentions
                options={[
                  { value: 'user', label: 'user' },
                  { value: 'vendor', label: 'vendor' },
                ]}
                placeholder="Please type the description"
                onSelect={handleMentionSelect} // Capture selected mention
                style={{ height: 100 }}
              />
            </Form.Item>

            <Form.Item style={{ marginTop: 0 }}>
              <Button type="primary" htmlType="submit" className="snd-notice-btn">
                Submit Notice
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default HotelNoticeSend;
