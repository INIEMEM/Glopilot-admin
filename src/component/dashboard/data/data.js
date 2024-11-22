import React from 'react';
import { Table, Tabs, Image } from "antd";
export const column = [
  {
    title: 'S/N',
    dataIndex: 'sn',
    render: (text, record, index) => index + 1,
  },
  
 
  {
    title: 'State',
    dataIndex: 'state'
  },
  {
    title: 'Street Address',
    dataIndex: 'streetAddress'
  },
  
  
   {
    title: 'Max Rooms',
    dataIndex: 'maxRooms'
  },
];

export const ordersColumn = [
  {
    title: 'S/N',
    dataIndex: 'sn',
    render: (text, record, index) => index + 1,
  },
  
 
  {
    title: 'Product',
    dataIndex: 'product'
  },
  {
    title: 'User Details',
    dataIndex: 'user'
  },
  
  
   {
    title: 'Quantity',
    dataIndex: 'quantity'
  },
];