import React, { useContext, useEffect, useState } from 'react';
import Axios from 'axios';
import { MainContext } from '../../context/context';
import { Table, message, Form, Button, Modal, Input } from 'antd';

const ServiceCharge = () => {
  const [serviceCharge, setServiceCharge] = useState([]);
  const [filteredServiceCharge, setFilteredServiceCharge] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [material, setMaterial] = useState('');
  const [country, setCountry] = useState('');
  const [percentage, setPercentage] = useState('');
  const [percentage2, setPercentage2] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const { baseUrl, token } = useContext(MainContext);
  const [selectedService, setSelectedService] = useState(null);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      await Axios({
        method: 'post',
        url: `${baseUrl}vendor-food/admin-add-service-charge`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        data: {
          material,
          country,
          percentage,
        },
      });

      message.success('Service charge added successfully!');
      fetchDeliveryPrices();
    } catch (error) {
      console.error('Error adding service charge:', error);
    }
    setIsModalOpen(false);
  };

  const handleOk2 = async () => {
    if (!selectedService) {
      message.error('No service selected!');
      return;
    }

    try {
      await Axios({
        method: 'put',
        url: `${baseUrl}vendor-food/admin-edit-service-charge`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        data: {
          serviceChargeId: selectedService?._id,
          percentage: percentage2,
        },
      });

      message.success('Service charge updated successfully!');
      fetchDeliveryPrices();
      setIsModalOpen2(false);
    } catch (error) {
      console.error('Update error:', error);
      message.error('Failed to update service charge.');
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleCancel2 = () => {
    setIsModalOpen2(false);
  };

  const fetchDeliveryPrices = async () => {
    try {
      const response = await Axios({
        method: 'get',
        url: `${baseUrl}vendor-food/admin-service-charge`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });

      const serviceCharges = response.data?.data?.serviceCharge || [];
      setServiceCharge(serviceCharges);
      setFilteredServiceCharge(serviceCharges); // Initialize filtered list
    } catch (error) {
      console.error('fetch error >>>', error);
    }
  };

  useEffect(() => {
    fetchDeliveryPrices();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = serviceCharge.filter((item) => {
      const country = item.country?.toLowerCase() || '';
      const material = item.material?.toLowerCase() || '';
      const percentage = item.percentage?.toString() || '';

      return country.includes(term) || material.includes(term) || percentage.includes(term);
    });

    setFilteredServiceCharge(filtered);
  };

  const handleRowClick = (row) => {
    setSelectedService(row);
    setIsModalOpen2(true);
  };

  const columns = [
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
    },
    {
      title: 'Material',
      dataIndex: 'material',
      key: 'material',
    },
    {
      title: 'Percentage',
      dataIndex: 'percentage',
      key: 'percentage',
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ fontSize: 35 }}>Service Charge</h1>
      <div className="flex" style={{ justifyContent: 'space-between', marginBottom: 10 }}>
        <Input
          placeholder="Search by country, material, or percentage"
          value={searchTerm}
          onChange={handleSearch}
          style={{ width: 300 }}
        />
        <Button onClick={showModal}>Add Service Charge</Button>
      </div>
      <Table
        className="admin-tables"
        columns={columns}
        dataSource={filteredServiceCharge}
        onRow={(admin) => ({
          onClick: () => handleRowClick(admin),
        })}
      />
      <Modal title="Add Service Charge" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form layout="inline" style={{ padding: 15 }}>
          <Form.Item label="Material">
            <Input
              value={material}
              placeholder="Material"
              onChange={(e) => setMaterial(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Country">
            <Input
              value={country}
              placeholder="Country"
              onChange={(e) => setCountry(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Percentage">
            <Input
              value={percentage}
              placeholder="12.5"
              type="number"
              onChange={(e) => setPercentage(e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
      <Modal title="Update Service Charge" open={isModalOpen2} onOk={handleOk2} onCancel={handleCancel2}>
        <Form layout="inline" style={{ padding: 15 }}>
          <Form.Item label="Percentage">
            <Input
              value={percentage2}
              placeholder="12.5"
              type="number"
              onChange={(e) => setPercentage2(e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ServiceCharge;
