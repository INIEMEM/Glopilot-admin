import { Menu } from 'antd'
import { HomeOutlined, CarOutlined, ShoppingOutlined, BankOutlined, UserOutlined,UsergroupAddOutlined  } from '@ant-design/icons'
import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { MainContext } from '../context/context'
import './component.css'
const MenuList = () => {
  const {currentUser} =  useContext(MainContext);
  const [userRole, setUserRole] = useState(currentUser?.role);
  const [adminType, setAdminType] = useState('driver');
  
  console.log(currentUser)
  const keys =  ['home', 'driver', 'vendor', 'hospitality','rentals' ];
  // console.log(userRole.includes('vendor') || userRole.includes('super'))
  return (
    <Menu theme='dark' mode='inline' className='menu-bar flex flex-column'>
      <Menu.Item key="home" icon = {<HomeOutlined/>}>
        <Link to='/dashboard'>Dashboard</Link>
      </Menu.Item>
      {(userRole?.includes('driver') || userRole?.includes('super')) &&
        (<Menu.SubMenu title = "Driver" key="driver" icon = {<CarOutlined/>}>
          <Menu.Item key="allDriver">
             <Link to="allDrivers">All Drivers</Link>
           </Menu.Item> 
          <Menu.Item key="allVehicles">
             <Link to='allVehicles'>All Vehicles</Link>
           </Menu.Item> 
           <Menu.Item key="vehicletypes">
             <Link to='allDrivers/vehicle/type'>Vehicle Type</Link>
           </Menu.Item> 
           <Menu.Item key="vehicleCategories">
             <Link to='allDrivers/vehicle/categories'>Vehicle Categories</Link>
           </Menu.Item> 
           <Menu.Item key="vehicleSubCategories">
             <Link to='allDrivers/vehicle/categories/sub'>Vehicle Sub-categories</Link>
           </Menu.Item> 
           <Menu.Item key="vehiclesynv" className='flex flex-center' >
               <Link to="allDrivers/vehicle/sync">Vehicle Sync</Link>
           </Menu.Item>
           <Menu.Item key="rideRequest" className='flex flex-center' >
               <Link to="allVehicles/routes">Routes</Link>
           </Menu.Item>
           <Menu.Item key="ridetpe" className='flex flex-center' >
               <Link to="allVehicles/ride/types">Ride Type</Link>
           </Menu.Item>
           <Menu.Item key="promotions" className='flex flex-center' >
               <Link to="allVehicles/promotions">Promotions</Link>
           </Menu.Item>
           <Menu.Item key="trpi" className='flex flex-center' >
               <Link to="allVehicles/trips">Trip List</Link>
           </Menu.Item>
          <Menu.Item key="interState" disabled>
               Inter State
          </Menu.Item>
          <Menu.Item key="flight" disabled>
               Flight
          </Menu.Item>
          <Menu.Item key="boltCruise" disabled>
               Bolt Cruise
          </Menu.Item>
       </Menu.SubMenu>)
      }

      {(userRole?.includes('vendor') || userRole?.includes('super')) && (
        (<Menu.SubMenu title="Vendor" key="vendor" icon={<ShoppingOutlined />}>
          <Menu.Item key='Shops' >
            <Link to='vendor/shops'>Shops</Link>
          </Menu.Item>
          {/* <Menu.Item key="vendorList">Vendor List</Menu.Item> */}
          <Menu.Item key="orders">
            <Link to='vendor/orders'>Orders</Link>
          </Menu.Item>
          {/* <Menu.Item key="delivery">
            <Link to="vendor/delivery/prices">
              Delivery Prices
            </Link>
          </Menu.Item> */}
          <Menu.Item key="pickup">
            <Link to='vendor/servicecharge'>
            Service Charges
              </Link>  
          </Menu.Item>
        </Menu.SubMenu>)
      )}
      {(userRole?.includes('hospitality') || userRole?.includes('super')) &&
        (<Menu.SubMenu title = "Hospitality"  key="hospitality" icon = {<BankOutlined/>} >
          <Menu.Item key="Hotel">
            <Link to='hotel'>Hotel</Link>
          </Menu.Item>
          <Menu.Item key="House">
            <Link to='house'>House</Link>
          </Menu.Item>
        </Menu.SubMenu>)
      }
      {(userRole?.includes('rental') || userRole?.includes('super')) &&
        (<Menu.SubMenu title = "Rentals" key="rentals" icon = {<ShoppingOutlined />} >
              <Menu.Item key='rentalUser'>
                  <Link to='rental/user'>Users</Link>
              </Menu.Item>
              <Menu.Item key='rentalCars'>
                  <Link to='rental/cars'>Cars</Link>
              </Menu.Item>
              {/* <Menu.Item key='rentalCarsrent'>
                  <Link>Rental Cars</Link>
              </Menu.Item> */}
          </Menu.SubMenu>)
      }
      { (userRole?.includes('super')) &&
        (<Menu.Item key="create" icon = {<UserOutlined />}>
          <Link to="all/admins">Admin</Link>
       </Menu.Item>)
      }
      { (userRole?.includes('super')) &&
        (<Menu.SubMenu title = "Accounts" key="account" icon = {<UsergroupAddOutlined />}>
          <Menu.Item key="driveraccount">
             <Link to="account/driver">Driver Account</Link>
           </Menu.Item> 
          <Menu.Item key="vehicleaccount">
             <Link to='account/vendor'>Vendor Account</Link>
           </Menu.Item> 
           <Menu.Item key="rentalaccount" className='flex flex-center' >
               <Link to="account/rental">Rental Account</Link>
           </Menu.Item>
           <Menu.Item key="hospitalityaccount" className='flex flex-center' >
               <Link to="account/hospitality">Hospitality Account</Link>
           </Menu.Item>
          
       </Menu.SubMenu>)
      }
    </Menu>
  )
}

export default MenuList