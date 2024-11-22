import React, { useEffect, useState, useContext } from "react";
import { Button, Modal, Form, Input, Table, Space, DatePicker, InputNumber, Popconfirm, Select } from "antd";
import Axios from "axios";
import { MainContext } from "../../context/context";
import moment from "moment";

const { RangePicker } = DatePicker;

const Promotions = () => {
  const { baseUrl, token } = useContext(MainContext);
  const [promotions, setPromotions] = useState([]);
  const [filteredPromotions, setFilteredPromotions] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [form] = Form.useForm();

  // Fetch promotions
  const fetchPromotions = async () => {
    try {
      const response = await Axios({
        method: "get",
        url: `${baseUrl}vendor-driver/ride-promotion`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const promotionsData = response.data?.data?.trips || [];
      setPromotions(promotionsData);
      setFilteredPromotions(promotionsData); // Initialize with all promotions
    } catch (error) {
      console.error("Error fetching promotions:", error);
    }
  };

  // Filter promotions based on search term
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = promotions.filter((promotion) => {
      return (
        promotion.title.toLowerCase().includes(term) ||
        promotion.description.toLowerCase().includes(term) ||
        promotion.target.toLowerCase().includes(term) ||
        promotion.reward.toString().includes(term) ||
        promotion.status.toLowerCase().includes(term)
      );
    });

    setFilteredPromotions(filtered);
  };

  // Handle create or update promotion
  const handleSavePromotion = async (values) => {
    try {
      const { dateRange, ...rest } = values;
      const data = {
        ...rest,
        fromWhen: dateRange ? dateRange[0].toISOString() : undefined,
        toWhen: dateRange ? dateRange[1].toISOString() : undefined,
      };

      if (isEditMode && selectedPromotion) {
        // Update request
        await Axios({
          method: "put",
          url: `${baseUrl}vendor-driver/ride-promotion`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            ...data,
            promoId: selectedPromotion._id,
            status: values.status,
          },
        });
      } else {
        // Create request
        await Axios({
          method: "post",
          url: `${baseUrl}vendor-driver/ride-promotion`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data,
        });
      }
      fetchPromotions();
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error(isEditMode ? "Error updating promotion:" : "Error creating promotion:", error);
    }
  };

  // Handle delete promotion
  const handleDeletePromotion = async (promoId) => {
    try {
      await Axios({
        method: "delete",
        url: `${baseUrl}vendor-driver/ride-promotion`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { promoId },
      });
      fetchPromotions();
    } catch (error) {
      console.error("Error deleting promotion:", error);
    }
  };

  useEffect(() => {
    fetchPromotions();
  }, []);

  const openModal = (promotion = null) => {
    setSelectedPromotion(promotion);
    setIsEditMode(!!promotion);
    setIsModalVisible(true);

    if (promotion) {
      form.setFieldsValue({
        title: promotion.title,
        description: promotion.description,
        target: promotion.target,
        reward: promotion.reward,
        status: promotion.status,
        dateRange: [
          moment(promotion.fromWhen),
          moment(promotion.toWhen),
        ],
      });
    } else {
      form.resetFields();
    }
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Target",
      dataIndex: "target",
      key: "target",
    },
    {
      title: "Reward",
      dataIndex: "reward",
      key: "reward",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "From When",
      dataIndex: "fromWhen",
      key: "fromWhen",
      render: (text) => moment(text).format("YYYY-MM-DD HH:mm"),
    },
    {
      title: "To When",
      dataIndex: "toWhen",
      key: "toWhen",
      render: (text) => moment(text).format("YYYY-MM-DD HH:mm"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => openModal(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this promotion?"
            onConfirm={() => handleDeletePromotion(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{padding: 20}}>
      <h1 style={{fontSize: 35}}>Promotions</h1>
      <div style={{ marginBottom: 20 }} className="flex flex-justify-between">
        <Input
          placeholder="Search promotions by title, description, target, status, or reward"
          value={searchTerm}
          onChange={handleSearch}
          style={{ width: 300, marginBottom: 20 }}
        />
        <Button type="primary" onClick={() => openModal()}>
          Create Promotion
        </Button>
      </div>

      <Table
        className="admin-table admin-table23"
        dataSource={filteredPromotions.map((promo) => ({ ...promo, key: promo._id }))}
        columns={columns}
        bordered
      />

      <Modal
        title={isEditMode ? "Edit Promotion" : "Create Promotion"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSavePromotion}
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please enter the title" }]}
          >
            <Input placeholder="e.g., Thirty Trips Per 24hours" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter the description" }]}
          >
            <Input.TextArea placeholder="Describe the promotion" />
          </Form.Item>

          <Form.Item
            name="target"
            label="Target"
            rules={[{ required: true, message: "Please enter the target" }]}
          >
            <Input placeholder="e.g., Complete Thirty Trips within 24 hours" />
          </Form.Item>

          <Form.Item
            name="reward"
            label="Reward"
            rules={[{ required: true, message: "Please enter the reward" }]}
          >
            <InputNumber placeholder="e.g., 30" style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="dateRange"
            label="Promotion Period"
            rules={[{ required: true, message: "Please select the date range" }]}
          >
            <RangePicker showTime style={{ width: "100%" }} />
          </Form.Item>

          {isEditMode && (
            <Form.Item
              name="status"
              label="Status"
              rules={[{ required: true, message: "Please select the status" }]}
            >
              <Select>
                <Select.Option value="pending">Pending</Select.Option>
                <Select.Option value="active">Active</Select.Option>
                <Select.Option value="completed">Completed</Select.Option>
              </Select>
            </Form.Item>
          )}

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {isEditMode ? "Update" : "Create"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Promotions;
