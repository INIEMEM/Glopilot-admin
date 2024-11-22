import React from "react";
import { Table } from "antd";

const VehicleRouteTable = ({ routeData }) => {
  // Safely access route data
  const routes = routeData?.data?.routes || [];

  if (routes.length === 0) {
    return <div>No routes available.</div>;
  }

  // Define columns for the table
  const columns = [
    {
      title: "From",
      dataIndex: "from",
      key: "from",
      render: (_, record) =>
        `${record.fromBusStopAddress} (${record.fromBusStopCordinate.join(", ")})`,
    },
    {
      title: "To",
      dataIndex: "to",
      key: "to",
      render: (_, record) =>
        `${record.toBusStopAddress} (${record.toBusStopCordinate.join(", ")})`,
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
    },
    {
      title: "Distance Price (₦)",
      dataIndex: "distancePrice",
      key: "distancePrice",
    },
    {
      title: "Fixed Price (₦)",
      dataIndex: "fixedPrice",
      key: "fixedPrice",
    },
  ];

  // Map the routes to a suitable structure for Ant Design Table
  const dataSource = routes.map((route, index) => ({
    key: route._id, // Unique key for each row
    fromBusStopAddress: route.fromBusStopAddress,
    fromBusStopCordinate: route.fromBusStopCordinate,
    toBusStopAddress: route.toBusStopAddress,
    toBusStopCordinate: route.toBusStopCordinate,
    country: route.country,
    distancePrice: route.distancePrice,
    fixedPrice: route.fixedPrice,
  }));

  return (
    <div >
      <Table style={{background: 'white'}} className="admin-table" dataSource={dataSource} columns={columns} bordered />
    </div>
  );
};

export default VehicleRouteTable;
