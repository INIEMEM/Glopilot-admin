import React from "react";
import { Table, Avatar, Typography, Space } from "antd";

const { Title } = Typography;

const DriverVehicles = ({ data }) => {
  const vehicles = data?.data?.vehicles || [];
  console.log('vehs', vehicles)
  const columns = [
    {
      title: "Picture",
      dataIndex: "picture",
      key: "picture",
      render: (picture) => (
        <Avatar
          size={64}
          src={picture || "/default-car-image.jpg"}
        />
      ),
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
      title: "Status",
      dataIndex: "isAvailable",
      key: "isAvailable",
      render: (isAvailable) => (isAvailable ? "Available" : "Not Available"),
    },
    {
      title: "Admin Consent",
      dataIndex: "adminConsentMessage",
      key: "adminConsentMessage",
      render: (consent) => (consent === "true" ? "Approved" : "Pending"),
    },
  ];

  const dataSource = vehicles.map((vehicle) => ({
    key: vehicle.row._id,
    picture: vehicle.row.picture,
    makeModel: `${vehicle.row.make} ${vehicle.row.model}`,
    year: vehicle.row.year,
    ownerName: vehicle.userDetails.name,
    ownerEmail: vehicle.userDetails.email,
    isAvailable: vehicle.row.isAvailable,
    adminConsentMessage: vehicle.row.adminConsentMessage,
  }));

  return (
    <div style={{ padding: "20px" }}>
      <Title level={2}>Driver Vehicles</Title>
      <Space direction="vertical" style={{ width: "100%" }}>
        <div>
          <Title level={4}>Driver Details</Title>
          <p><strong>Name:</strong> {vehicles[0]?.userDetails?.name}</p>
          <p><strong>City:</strong> {vehicles[0]?.driver?.city}</p>
          <p><strong>Drive Type:</strong> {vehicles[0]?.driver?.driveType}</p>
        </div>
        <Table
          columns={columns}
          dataSource={dataSource}
          bordered
          pagination={{ pageSize: 5 }}
          className="admin-table"
        />
      </Space>
    </div>
  );
};

export default DriverVehicles;
