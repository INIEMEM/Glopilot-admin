import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import { MainContext } from "../../context/context";
import { Table, Modal, Button, Form, Input, message, Space } from "antd";

const VehicleTypes = () => {
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [filteredVehicleTypes, setFilteredVehicleTypes] = useState([]);
  const [name, setName] = useState("");
  const [uses, setUses] = useState("");
  const [chargeMethod, setChargeMethod] = useState("");
  const { baseUrl, token } = useContext(MainContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState(""); // State for search input

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
        url: `${baseUrl}vendor-driver/vehicle-types`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          Accept: "*/*",
        },
        data: {
          name: name,
          uses: uses,
          chargeMethod: chargeMethod,
        },
      });

      message.success("Success");
      fetchVehicleTypes();
    } catch (error) {
      console.error(error);
      message.error(error?.response?.data?.message);
    }
    setIsModalOpen(false);
  };

  const fetchVehicleTypes = async () => {
    try {
      const response = await Axios({
        method: "get",
        url: `${baseUrl}vendor-driver/vehicle-types`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          Accept: "*/*",
        },
      });

      setVehicleTypes(response.data?.data?.vehicleTypes);
      setFilteredVehicleTypes(response.data?.data?.vehicleTypes); // Initialize filtered data
    } catch (error) {
      console.error("fetch err", error);
    }
  };

  useEffect(() => {
    fetchVehicleTypes();
  }, []);

  const handleSearch = (value) => {
    const searchValue = value.toLowerCase();
    const filteredData = vehicleTypes.filter(
      (type) =>
        type.name.toLowerCase().includes(searchValue) ||
        type.uses.toLowerCase().includes(searchValue) ||
        type.chargeMethod.toLowerCase().includes(searchValue)
    );
    setFilteredVehicleTypes(filteredData);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Uses",
      dataIndex: "uses",
      key: "uses",
    },
    {
      title: "Charge Method",
      dataIndex: "chargeMethod",
      key: "chargeMethod",
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ fontSize: 35 }}>Vehicle Types</h1>
      <Space style={{ marginBottom: 16, justifyContent: "space-between", width: "100%" }}>
        <Input.Search
          placeholder="Search by Name, Uses, or Charge Method"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={handleSearch}
          onChange={(e) => handleSearch(e.target.value)} // Update while typing
        />
        <Button style={{ marginBottom: 10 }} onClick={showModal}>
          Add Vehicle Type
        </Button>
      </Space>
      <Modal
        title={<div>Create Vehicle Types</div>}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>
          Create a Vehicle Type by simply filling out the field below. This ensures your total
          covers all associated costs!
        </p>
        <Form layout="inline" className="driver-details-form-header" style={{ padding: 15 }}>
          <Form.Item label="Name" layout="vertical">
            <Input
              value={name}
              placeholder="cars"
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="inp-new"
            />
          </Form.Item>
          <Form.Item label="Uses" layout="vertical">
            <Input
              value={uses}
              placeholder="rides"
              onChange={(e) => {
                setUses(e.target.value);
              }}
              className="inp-new"
            />
          </Form.Item>
          <Form.Item label="Charge method" layout="vertical">
            <Input
              value={chargeMethod}
              placeholder="deliveries"
              onChange={(e) => {
                setChargeMethod(e.target.value);
              }}
              className="inp-new"
            />
          </Form.Item>
        </Form>
      </Modal>
      <Table
        className="admin-tables"
        dataSource={filteredVehicleTypes} // Use filtered data
        columns={columns}
      />
    </div>
  );
};

export default VehicleTypes;
