import React, {useState, useEffect, useContext} from 'react'
import { Input, List, Card, Table, message, Form, Button, Modal  } from "antd";
const { Search } = Input;
import { MainContext } from '../../context/context';
import Axios from 'axios'
import { DeleteOutlined } from "@ant-design/icons";
const VehicleSubCategories = () => {
  const { baseUrl, token} = useContext(MainContext);
  const [subCategories, setSubCategories] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [vehicleCategoryId, setVehicleCategoryId] = useState('');
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [hourlyPrice, sethourlyPrice] = useState('');
  const [distancePrice, setdistancePrice] = useState('');
  const [dailyPrice, setdailyPrice] = useState('');
  const [transportPrice, settransportPrice] = useState('');
  const [serviceCharge, setserviceCharge] = useState('');
  const [maxLoadWeight, setmaxLoadWeight] = useState('');
  const [minLoadWeight, setminLoadWeight] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSubCategory, setselectedSubCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);

  useEffect(() => {
    const fetchVehicleSubCategories = async () => {
      try {
        const response = await Axios({
          method:'get',
          url: `${baseUrl}vendor-driver/vehicle-sub-categories`,
          headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "Accept": "*/*",
          },
        });
        console.log(response.data.data.vehicleSubCategoryData)
        setVehicleCategoryId(response.data?.data?.vehicleSubCategoryData[0]?.vehicleCategory?._id)
        setSubCategories(response.data?.data.vehicleSubCategoryData);
        setFilteredData(response.data.data?.vehicleSubCategoryData);
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchVehicleSubCategories();
  }, []);

  const handleSearch = (value) => {
    const result = subCategories.filter((item) =>
      item.row.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(result);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  }
  const handleCancel2 = () => {
    setIsModalOpen2(false);
  }
  const showModal = () => {
    setIsModalOpen(true);
  };
  const showModal2 = (item) => {
    setIsModalOpen2(true);
    setselectedSubCategory(item)
  };
  const handleOk = async () => {
    try {
      await Axios({
        method: 'post',
        url: `${baseUrl}vendor-driver/vehicle-sub-category`,
        
        headers:{
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Accept": "*/*",
        },
        data: {
          name: name,
          country: country,
          hourlyPrice: hourlyPrice,
          distancePrice: distancePrice,
          dailyPrice: dailyPrice,
          transportPrice: transportPrice,
          serviceCharge: serviceCharge,
          vehicleCategoryId:vehicleCategoryId,
          minLoadWeight: minLoadWeight,
          maxLoadWeight: maxLoadWeight
        },
      });

      message.success('Success');
      fetchVehicleSubCategories();
    } catch (error) {
      console.error(error)
      message.error(error?.response?.data?.message)
    }
    setIsModalOpen(false);

  };
  const handleOk2 = async () => {
    try {
      await Axios({
        method: 'put',
        url: `${baseUrl}vendor-driver/vehicle-sub-category`,
        
        headers:{
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Accept": "*/*",
        },
        data: {
          name: name,
          country: country,
          hourlyPrice: hourlyPrice,
          distancePrice: distancePrice,
          dailyPrice: dailyPrice,
          transportPrice: transportPrice,
          serviceCharge: serviceCharge,
          vehicleSubCategoryId: selectedSubCategory?.row?._id,
          minLoadWeight: minLoadWeight,
          maxLoadWeight: maxLoadWeight
        },
      });

      message.success('Success');
      fetchVehicleSubCategories();
    } catch (error) {
      console.error(error)
      message.error(error?.response?.data?.message)
    }
    setIsModalOpen(false);

  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  const handleDelete = async (vehicleSubCategoryId) => {
    try {
      await Axios({
        method: "delete",
        url: `${baseUrl}vendor-driver/vehicle-sub-category`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        data: { vehicleSubCategoryId },
      });

      message.success("Vehicle Sub Category deleted successfully");
      setSubCategories((prev) =>
        prev.filter((item) => item.row._id !== vehicleSubCategoryId)
      );
      setFilteredData((prev) =>
        prev.filter((item) => item.row._id !== vehicleSubCategoryId)
      );

      fetchVehicleSubCategories();
    } catch (error) {
      // message.error("Failed to delete vehicle subcategory");
    }
  };
  return (
    <div style={{ padding: "20px" }}>
      <h2>Vehicle Sub Categories
      <div className='flex' style={{justifyContent: 'end'}}>
        <Button style={{marginBottom: 10}} onClick={showModal}> Vehicle sub Category</Button>
        <Modal title={<div style={{background:''}}>Create Vehicle Category</div>} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <p>Create a Vehicle sub category by simply filling out the field below. This ensures your total covers all associated costs!</p>
        <Form layout='inline' className=' driver-details-form-header' style={{padding: 15}} >
          <Form.Item label="Name" layout='vertical' >
              <Input value={name} placeholder='Glopilots pet' onChange={(e)=>{setName(e.target.value)}} className='inp-new'  />
          </Form.Item>
          <Form.Item label="Country" layout='vertical' >
              <Input value={country} placeholder='Nigeria' onChange={(e)=>{setCountry(e.target.value)}} className='inp-new'  />
          </Form.Item>
          <Form.Item label="Hourly Price" layout='vertical' >
              <Input value={hourlyPrice} placeholder='3' onChange={(e)=>{sethourlyPrice(e.target.value)}} className='inp-new'  />
          </Form.Item>
          <Form.Item label="Distance Price" layout='vertical' >
              <Input value={distancePrice} placeholder='0.6' onChange={(e)=>{setdistancePrice(e.target.value)}} className='inp-new'  />
          </Form.Item>
          <Form.Item label="Daily Price" layout='vertical' >
              <Input value={dailyPrice} placeholder='0.6' onChange={(e)=>{setdailyPrice(e.target.value)}} className='inp-new'  />
          </Form.Item>
          <Form.Item label="transportPrice" layout='vertical' >
              <Input value={transportPrice} placeholder='0.6' onChange={(e)=>{settransportPrice(e.target.value)}} className='inp-new'  />
          </Form.Item>
          <Form.Item label="service Charge" layout='vertical' >
              <Input value={serviceCharge} placeholder='0.6' onChange={(e)=>{setserviceCharge(e.target.value)}} className='inp-new'  />
          </Form.Item>
          <Form.Item label="Mininmum Load weight" layout='vertical' >
              <Input value={minLoadWeight} placeholder='0.6' onChange={(e)=>{setminLoadWeight(e.target.value)}} className='inp-new'  />
          </Form.Item>
          <Form.Item label="Maximum Load weight" layout='vertical' >
              <Input value={maxLoadWeight} placeholder='0.6' onChange={(e)=>{setmaxLoadWeight(e.target.value)}} className='inp-new'  />
          </Form.Item>
        </Form>
        </Modal>
      </div>
      </h2>
      <Search
        placeholder="Search by name"
        onSearch={handleSearch}
        style={{ marginBottom: "20px" }}
      />
      
      <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={filteredData}
        renderItem={(item) => (
          <List.Item>
            <Card title={item.row.name} hoverable onClick={()=> showModal2(item)}>
              <p>Type: {item.vehicleType.name}</p>
              <p>Category: {item.vehicleCategory.name}</p>
              <p>Country: {item.row.country}</p>
              <p>Hourly Price: ${item.row.hourlyPrice}</p>
              <p>Distance Price: ${item.row.distancePrice}/km</p>
              <p>Daily Price: ${item.row.dailyPrice}</p>
              <p>Min Load Weight: {item.row.minLoadWeight} kg</p>
              <p>Max Load Weight: {item.row.maxLoadWeight} kg</p>
            </Card>
          </List.Item>
        )}
      />

      <Modal title='Edit/Delete Subcategory' onOk={handleOk2}  onCancel={handleCancel2} open={isModalOpen2} >
     
      <Form layout='inline' className=' driver-details-form-header' style={{padding: 15}} >
          <Form.Item label="Name" layout='vertical' >
              <Input value={name} placeholder='Glopilots pet' onChange={(e)=>{setName(e.target.value)}} className='inp-new'  />
          </Form.Item>
          <Form.Item label="Country" layout='vertical' >
              <Input value={country} placeholder='Nigeria' onChange={(e)=>{setCountry(e.target.value)}} className='inp-new'  />
          </Form.Item>
          <Form.Item label="Hourly Price" layout='vertical' >
              <Input value={hourlyPrice} placeholder='3' onChange={(e)=>{sethourlyPrice(e.target.value)}} className='inp-new'  />
          </Form.Item>
          <Form.Item label="Distance Price" layout='vertical' >
              <Input value={distancePrice} placeholder='0.6' onChange={(e)=>{setdistancePrice(e.target.value)}} className='inp-new'  />
          </Form.Item>
          <Form.Item label="Daily Price" layout='vertical' >
              <Input value={dailyPrice} placeholder='0.6' onChange={(e)=>{setdailyPrice(e.target.value)}} className='inp-new'  />
          </Form.Item>
          <Form.Item label="transportPrice" layout='vertical' >
              <Input value={transportPrice} placeholder='0.6' onChange={(e)=>{settransportPrice(e.target.value)}} className='inp-new'  />
          </Form.Item>
          <Form.Item label="service Charge" layout='vertical' >
              <Input value={serviceCharge} placeholder='0.6' onChange={(e)=>{setserviceCharge(e.target.value)}} className='inp-new'  />
          </Form.Item>
          <Form.Item label="Mininmum Load weight" layout='vertical' >
              <Input value={minLoadWeight} placeholder='0.6' onChange={(e)=>{setminLoadWeight(e.target.value)}} className='inp-new'  />
          </Form.Item>
          <Form.Item label="Maximum Load weight" layout='vertical' >
              <Input value={maxLoadWeight} placeholder='0.6' onChange={(e)=>{setmaxLoadWeight(e.target.value)}} className='inp-new'  />
          </Form.Item>
        </Form>
        <Button
          type="primary"
          danger
          icon={<DeleteOutlined />}
          
          className="delete-btn"
          onClick={() => handleDelete(selectedSubCategory?.row?._id)}
        />
      </Modal>
    </div>
  );
}

export default VehicleSubCategories