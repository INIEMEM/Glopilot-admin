import { Table } from "antd";

const VehicleTable = ({ vehicles }) => {
  const columns = [
    { title: "Make", dataIndex: "make", key: "make" },
    { title: "Model", dataIndex: "model", key: "model" },
    { title: "Year", dataIndex: "year", key: "year" },
    { title: "Color", dataIndex: "color", key: "color" },
    { title: "Transmission", dataIndex: "transmission", key: "transmission" },
    { title: "Seats", dataIndex: "seats", key: "seats" },
    {
      title: "Picture",
      dataIndex: "picture",
      key: "picture",
      render: (picture) =>
        picture ? <img src={picture} alt="Vehicle" width={50} /> : "N/A",
    },
  ];

  return <Table dataSource={vehicles} columns={columns} rowKey="_id" />;
};

export default VehicleTable