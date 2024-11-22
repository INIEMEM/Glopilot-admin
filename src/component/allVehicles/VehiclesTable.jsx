import React, { useState, useContext } from "react";
import { Table, Avatar, Typography, Space, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { DeleteFilled, DownCircleFilled } from "@ant-design/icons";
import  Axios  from "axios";
import { MainContext } from "../../context/context";
const { Title } = Typography;

const VehiclesTable = ({ vehiclesData }) => {
  const {baseUrl, token} = useContext(MainContext)
  const vehicles = vehiclesData?.data?.vehicles || [];
  const [searchText, setSearchText] = useState("");

  const navigate = useNavigate();

  const handleUpdate = async (id, status) => {
   try {
    const response =  await Axios({
      method: 'put',
      url: `${baseUrl}vendor-driver/vehicle-${status}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        vehicleId: id
      }
    })
    message.success('update sucess')
   } catch (error) {
    console.error('the error message', error)
   }
  }
  // Map the data to table-friendly format
  const dataSource = vehicles.map((vehicle) => ({
    key: vehicle?.row._id,
    id: vehicle?.row?._id,
    driverId: vehicle?.row?.owner, // Assuming this is the driver's ID
    picture: vehicle?.row?.picture,
    makeModel: `${vehicle?.row?.make} ${vehicle?.row?.model}`,
    year: vehicle?.row?.year,
    ownerName: vehicle?.userDetails?.name,
    ownerEmail: vehicle?.userDetails?.email,
    adminConsentMessage: vehicle?.row?.adminConsentMessage,
  }));

  // Handle search input change
  const handleSearch = (e) => {
    setSearchText(e.target.value.toLowerCase());
  };

  // Filtered data based on search
  const filteredData = dataSource.filter((item) => {
    return (
      item.ownerName.toLowerCase().includes(searchText) ||
      item.ownerEmail.toLowerCase().includes(searchText) ||
      item.makeModel.toLowerCase().includes(searchText)
    );
  });

  const columns = [
    {
      title: "Picture",
      dataIndex: "picture",
      key: "picture",
      render: (picture) => <Avatar size={64} src={picture || "/default-car-image.jpg"} />,
    },
    {
      title: "Make & Model",
      dataIndex: "makeModel",
      key: "makeModel",
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
    },
    {
      title: "Owner Name",
      dataIndex: "ownerName",
      key: "ownerName",
    },
    {
      title: "Owner Email",
      dataIndex: "ownerEmail",
      key: "ownerEmail",
    },
    {
      title: "Update",
      dataIndex: "update",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            onClick={() =>handleUpdate(record?.id, 'decline')}
            icon ={<DeleteFilled />}
          >
            
          </Button>
          <Button
            type="default"
            onClick={() =>handleUpdate(record?.id, 'approve')}
            icon ={<DownCircleFilled/>}
          >
             
          </Button>
        </Space>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            onClick={() => navigate(`/dashboard/allVehicles/vehicle-sync/${record.driverId}`)}
          >
            Vehicle Sync 
          </Button>
          <Button
            type="default"
            onClick={() => navigate(`/dashboard/allVehicles/vehicleby/${record.driverId}`)}         
          >
             Driver
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <Title level={2}>Vehicles</Title>
      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder="Search by Owner Name, Email, or Car Model"
          value={searchText}
          onChange={handleSearch}
          style={{ width: 300 }}
        />
      </Space>
      <Table
        columns={columns}
        dataSource={filteredData} // Use filtered data
        bordered
        pagination={{ pageSize: 5 }}
        className="admin-table "
      />
    </div>
  );
};

export default VehiclesTable;
