import React, { useState, useContext, useEffect } from 'react';
import { Button, DatePicker, Table, message } from 'antd';
import Axios from 'axios';
import moment from 'moment';
import { MainContext } from '../../context/context';
const { RangePicker } = DatePicker;

const RentalAccount = () => {
  const { baseUrl, token } = useContext(MainContext);
  const [isLoading, setIsLoading] = useState(false)
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [driverData, setDriverData] = useState([]); 

  const onDateChange = (dates, dateStrings) => {
    if (dates) {
      setStartDate(dateStrings[0]);
      setEndDate(dateStrings[1]); 
    }
  };

  const fetchDriverDetails = async () => {
    const defaultEndDate = moment().format('YYYY-MM-DD'); 
    const defaultStartDate = moment().subtract(1, 'months').format('YYYY-MM-DD'); 

    const start = startDate || defaultStartDate; 
    const end = endDate || defaultEndDate; 
    setIsLoading(true);
    try {
      const response = await Axios({
        method: 'get',
        url: `${baseUrl}admin/vendor-account?startDate=${start}&endDate=${end}`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
          Accept: '*/*',
        },
      });

        // Check if response.data is an array
        if (Array.isArray(response.data.data.data)) {
          // Sort data by the time they were added (dated)
          const sortedData = response.data.data.data.sort((a, b) => new Date(b.dated) - new Date(a.dated));
  
          // Format the dates
          const formattedData = sortedData.map((item) => ({
            ...item,
            dated: moment(item.dated).format('YYYY/MM/DD HH:mm'),
          }));
  
          setDriverData(formattedData);
          console.log(driverData)
        } else {
          console.error('Expected an array but received:', response.data.data.data);
          message.error('Unexpected data format received from the server.');
        }
      setIsLoading(false);
    } catch (error) {
      console.log('get driver account', error);
      setIsLoading(false);
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (startDate && endDate) {
      fetchDriverDetails();  // Only fetch data when both startDate and endDate are set
    }
  }, [startDate, endDate]);

  const columns = [
    {
      title: 'S/N',
      dataIndex: 'sn',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Driver Email',
      dataIndex: 'driverEmail',
    },
    {
      title: 'Rider Email',
      dataIndex: 'rideEmail',
    },
    {
      title: 'Transaction',
      dataIndex: 'transaction',
    },
    {
      title: 'Expenses',
      dataIndex: 'expenses',
    },
    {
      title: 'Profit',
      dataIndex: 'profit',
    },
    {
      title: 'Dated',
      dataIndex: 'dated', // Formatted date will appear here
    },
  ];
  return (
    <div>
      <RangePicker onChange={onDateChange} />
      <Table columns={columns} dataSource={driverData} rowKey="id" loading = {isLoading} />
    </div>
  )
}

export default RentalAccount