import React, { useState, useEffect, useContext } from "react";
import { Table, message, Form, Button, Modal, Input, Space } from "antd";
import Axios from "axios";
import { MainContext } from "../../context/context";

const VehicleCategories = () => {
  const [vehicleData, setVehicleData] = useState([]);
  const [filteredVehicleData, setFilteredVehicleData] = useState([]);
  const [vehicleTypeID, setVehicleTypeId] = useState("");
  const [name, setName] = useState("");
  const { baseUrl, token } = useContext(MainContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      await Axios({
        method: "post",
        url: `${baseUrl}vendor-driver/vehicle-categories`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          Accept: "*/*",
        },
        data: {
          name: name,
          vehicleTypeId: vehicleTypeID,
        },
      });

      message.success("Success");
      fetchVehicleCategories();
    } catch (error) {
      console.error(error);
      message.error(error?.response?.data?.message);
    }
    setIsModalOpen(false);
  };

  const fetchVehicleCategories = async () => {
    try {
      const response = await Axios({
        method: "get",
        url: `${baseUrl}vendor-driver/vehicle-categories`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          Accept: "*/*",
        },
      });

      setVehicleData(response.data?.data?.vehicleCategoryData);
      setFilteredVehicleData(response.data?.data?.vehicleCategoryData); // Initialize filtered data
      setVehicleTypeId(response.data?.data?.vehicleCategoryData[0]?.vehicleType?._id);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchVehicleCategories();
  }, []);

  const handleSearch = (value) => {
    const searchValue = value.toLowerCase();
    const filteredData = vehicleData.filter(
      (item) =>
        item.row.name.toLowerCase().includes(searchValue) ||
        item.vehicleType?.name?.toLowerCase().includes(searchValue) ||
        item.vehicleType?.uses?.toLowerCase().includes(searchValue) ||
        item.vehicleType?.chargeMethod?.toLowerCase().includes(searchValue)
    );
    setFilteredVehicleData(filteredData);
  };

  const columns = [
    {
      title: "Category Name",
      dataIndex: ["row", "name"],
      key: "categoryName",
    },
    {
      title: "Vehicle Type",
      dataIndex: ["vehicleType", "name"],
      key: "vehicleType",
    },
    {
      title: "Uses",
      dataIndex: ["vehicleType", "uses"],
      key: "uses",
    },
    {
      title: "Charge Method",
      dataIndex: ["vehicleType", "chargeMethod"],
      key: "chargeMethod",
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h2>Vehicle Categories</h2>
      <Space style={{ marginBottom: 16, justifyContent: "space-between", width: "100%" }}>
        <Input.Search
          placeholder="Search by Category, Vehicle Type, Uses, or Charge Method"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={handleSearch}
          onChange={(e) => handleSearch(e.target.value)} // Update as user types
        />
        <Button style={{ marginBottom: 10 }} onClick={showModal}>
          Add Vehicle Category
        </Button>
      </Space>
      <Modal
        title={<div>Create Vehicle Category</div>}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Create a Vehicle category by simply filling out the field below. This ensures your total covers all associated costs!</p>
        <Form layout="inline" className="driver-details-form-header" style={{ padding: 15 }}>
          <Form.Item label="Name" layout="vertical">
            <Input
              value={name}
              placeholder="Economy"
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="inp-new"
            />
          </Form.Item>
        </Form>
      </Modal>
      <Table
        className="admin-tables"
        dataSource={filteredVehicleData} // Use filtered data
        columns={columns}
        rowKey={(record) => record.row._id}
      />
    </div>
  );
};

export default VehicleCategories;
