import { useState, useEffect, useContext } from "react";
import { MainContext } from "../../context/context";
import { Image, Table, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

const Rentals = () => {
  const { imgBaseUrl, baseUrl, token } = useContext(MainContext);
  const [dataLoad, setDataLoad] = useState(false);
  const [userList, setUserList] = useState([]);
  const [userFilteredList, setUserFilteredList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const getUser = async () => {
    setDataLoad(true);
    try {
      const response = await Axios({
        method: "get",
        url: `${baseUrl}admin/users`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      setUserList(response.data.users);
      setDataLoad(false);
    } catch (error) {
      message.error(error?.response?.data?.message);
      setDataLoad(false);
    }
  };

  useEffect(() => {
    if (userList.length) {
      const carOwners = userList.filter((user) => user.userType === "carOwner");
      setUserFilteredList(carOwners);
    }
  }, [userList]);

  useEffect(() => {
    getUser();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = userList.filter((user) => {
      const name = user.name?.toLowerCase() || "";
      const email = user.email?.toLowerCase() || "";
      const phoneNumber = user.phoneNumber?.toString() || "";

      return name.includes(term) || email.includes(term) || phoneNumber.includes(term);
    });

    setUserFilteredList(filtered);
  };

  const column = [
    {
      title: "S/N",
      dataIndex: "sn",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Img",
      dataIndex: "profilePic",
      render: (_, record) => (
        <Image
          width={40}
          height={40}
          className="driver-profile-image"
          src={`${imgBaseUrl}${record.profilePic}`}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
    },
    {
      title: "Date",
      dataIndex: "updatedAt",
    },
  ];

  const handleRowClick = (driver) => {
    navigate(`/dashboard/rental/${driver._id}`);
  };

  return (
    <div style={{ padding: "10px 15px" }}>
      <Input
        placeholder="Search by name, email, or phone number"
        value={searchTerm}
        onChange={handleSearch}
        style={{ marginBottom: "15px", width: "300px" }}
      />
      <Table
        style={{ background: "white" }}
        className="admin-table"
        columns={column}
        dataSource={userFilteredList}
        loading={dataLoad}
        onRow={(admin) => ({
          onClick: () => handleRowClick(admin),
        })}
      />
    </div>
  );
};

export default Rentals;
