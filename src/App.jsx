import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import Signup from './pages/signup/Signup';
import SignIn from './pages/signin/signIn';
import Layout from './layout/Layout';
import DriversLayout from './layout/DriversLayout';
import DashLayout from './layout/DashLayout';
import AllDrivers from './component/allDrivers/AllDrivers';
import RideRequest from './component/rideRequest/Request';
import Allvehicles from './component/allVehicles/Allvehicles';
import DriverDetails from './component/allDrivers/DriverDetails';
import ForgotPassword from './pages/ForgotPassword';
import Admins from './component/Admins/Admins.jsx';
import Context from './context/context.jsx';
import './App.css'
import VerifyAct from './pages/VerifyAct';
import PasswordReset from './pages/PasswordReset.jsx';
import Profile from './component/Profile/Profile.jsx';
import AdminLayout from './layout/AdminLayout.jsx';
import AdminDetails from './component/Admins/AdminDetails.jsx';
import CreateAdmin from './component/Admins/CreateAdmin.jsx';
import AccountLayout from './layout/AccountLayout.jsx';
import DriverAccounts from './component/Account/DriverAccounts.jsx';
import Rentals from './component/rentals/Rentals.jsx';
import RentalLayout from './layout/RentalLayout.jsx';
import RentalCars from './component/rentals/RentalCars.jsx';
import RentalCarDetails from './component/rentals/RentalCarDetails.jsx';
import RentalCarLayout from './layout/RentalCarLayout.jsx';
import RentalAllCars from './component/rentals/RentalAllCars.jsx';
import RentalCarDetailsLayout from './layout/RentalCarDetails.jsx';
import RentalAllCarsDetails from './component/rentals/RentalAllCarsDetails.jsx';
import RentalReport from './component/rentals/RentalReport.jsx';
import DashBoard from './component/dashboard/DashBoard.jsx';
import HospitaityAccount from './component/Account/HospitaityAccount.jsx';
import VehicleAccount from './component/Account/VehicleAccount.jsx';
import RentalAccount from './component/Account/RentalAccount.jsx';
import Message from './component/Message/Message.jsx';
import MessageLayout from './layout/MessageLayout.jsx';
import MessagesItem from './component/Message/MessagesItem.jsx';
import HotelLayout from './layout/HotelLayout.jsx';
import Hotel from './component/Hotel/Hotel.jsx';
import HotelPropertiesDetails from './component/Hotel/HotelPropertiesDetails.jsx';
import HotelPropertyLayout from './layout/HotelPropertyLayout.jsx';
import HotelReservationsLayout from './layout/HotelReservationsLayout.jsx';
import HotelReservationDetails from './component/Hotel/HotelReservationDetails.jsx';
import HotelNoticeDetails from './component/Hotel/HotelNoticeDetails.jsx';
import HotelNoticeLayout from './layout/HotelNoticeLayout.jsx';
import HotelNoticeSend from "./component/Hotel/HotelNoticeSend.jsx";
import House from "./component/House/House.jsx";
import HouseLayout from "./layout/HouseLayout.jsx";
import HousePropertiesDetails from "./component/House/HousePropertyDetails.jsx.jsx";
import HouseReservationDetails from "./component/Hotel/HotelReservationDetails.jsx";
import HouseNoticeDetails from "./component/House/HouseNoticeDetails.jsx";
import HouseNoticeSend from "./component/House/HouseNoticeSend.jsx";
import Shops from "./component/Vendor/Shops.jsx";
import ShopDetails from "./component/Vendor/ShopDetails.jsx";
import Orders from "./component/Vendor/Orders.jsx";
import OrderDetails from "./component/Vendor/OrderDetails.jsx";
import DeliveryPices from "./component/Vendor/DeliveryPices.jsx";
import ServiceCharge from "./component/Vendor/ServiceCharge.jsx";
import VehicleTypes from "./component/allDrivers/VehicleTypes.jsx";
import VehicleCategories from "./component/allDrivers/VehicleCategories.jsx";
import VehicleSubCategories from "./component/allDrivers/VehicleSubCategories.jsx";
import VehicleSync from "./component/allDrivers/VehicleSync.jsx";
import VehiclesDetails from "./component/allVehicles/VehiclesDetails.jsx";
import VehicleSyncDriver from "./component/allVehicles/VehicleSync.jsx";
import VehicleRoute from "./component/allVehicles/VehicleRoute.jsx";
import RideTypes from "./component/allVehicles/RideTypes.jsx";
import Promotions from "./component/allVehicles/Promotions.jsx";
import TripList from "./component/allVehicles/TripList.jsx";
function App() {
  const routes = createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<SignIn/>}/>
      <Route path='password/forgot' element= {<ForgotPassword/>}></Route>
      <Route path='verify/account' element= {<VerifyAct/>}></Route>
      <Route path='password/reset' element= {<PasswordReset/>}></Route>
      
      <Route path='dashboard' element ={<DashLayout/>}>
        <Route index element={<DashBoard/>}/>
        <Route path='alldrivers' element = {<DriversLayout/>}>
          <Route index element ={<AllDrivers/>}/>
          <Route path=':id' element ={<DriverDetails/>}/>
          <Route path="vehicle/type" element={<VehicleTypes/>}/>
          <Route path="vehicle/categories" element={<VehicleCategories/>}/>
          <Route path="vehicle/categories/sub" element={<VehicleSubCategories/>}/>
          <Route path="vehicle/sync" element={<VehicleSync/>}/>
        </Route>
        <Route path='rental' element={<RentalLayout/>}>
          <Route path='user' element={<Rentals/>}></Route>
          <Route path=':rentalcars' element={<RentalCars/>}/>
          <Route path='cars' element={<RentalAllCars/>}/>
          <Route path='rentalcardetails' element={<RentalCarLayout/>}>
              <Route path=':rentalcardetails' element={<RentalCarDetails/>}/>
          </Route> 
          <Route path='rentalallcardetails' element={<RentalCarDetailsLayout/>}>
              <Route path=':rentalallcardetails' element={<RentalAllCarsDetails/>}/>
              <Route path='report' element={<RentalReport/>}/>
          </Route>  
           
        </Route>
        <Route path='allVehicles' element={<HotelLayout/>}>
          <Route index element={<Allvehicles/>}/>
          <Route path="vehicleby"  element= {<HotelLayout/>}>
            <Route path=":vehicless" element={<VehiclesDetails/>}/>
          </Route>
          <Route path="vehicle-sync"  element= {<HotelLayout/>}>
            <Route path=":vehicleSyncd" element={<VehicleSyncDriver/>}/>
          </Route>
          <Route path="routes" element={<VehicleRoute/>}></Route>
          <Route path="ride/types" element={<RideTypes/>}></Route>
          <Route path="promotions" element={<Promotions/>}></Route>
          <Route path="trips" element={<TripList/>}></Route>
        </Route>
        <Route path='all/admins' element = {<AdminLayout/>}>
          <Route index element ={<Admins/>}/>
          <Route path=':admin' element = {<AdminDetails/>}></Route>
          <Route path='create/admin' element={<CreateAdmin/>}></Route>
        </Route>
        <Route path='profile' element = {<Profile/>}/>
        <Route path='messages' element ={<MessageLayout/>}>
          <Route index element ={<Message/>} />
          <Route path=':messagesId' element={<MessagesItem/>}></Route>
        </Route>
        <Route path='account' element ={<AccountLayout/>}>
          <Route path='driver' element ={<DriverAccounts/>}/>
          <Route path='hospitality' element ={<HospitaityAccount/>}/>
          <Route path ='vendor' element={<VehicleAccount/>} />
          <Route path='rental' element={<RentalAccount/>}/>
        </Route>
        <Route path='hotel' element={<HotelLayout/>}>
            <Route index element={<Hotel/>}/>
            <Route path='properties' element ={<HotelPropertyLayout/>}>
              <Route path=':hotelProperties' element={<HotelPropertiesDetails/>}/>
            </Route>
            <Route path='reservations' element ={<HotelReservationsLayout/>}>
              <Route path=':hotelReservations' element={<HotelReservationDetails/>}/>
            </Route>
            <Route path='notice' element ={<HotelNoticeLayout/>}>
              {/* <Route path="all" element ={<HotelNoticesAll/>}/> */}
              <Route path=':hotelNotice' element={<HotelNoticeDetails/>}/>
              <Route path="send" element={<HotelNoticeSend/>}/>
            </Route>
        </Route>
        <Route path="house" element={<HouseLayout/>}>
            <Route index element ={<House/>}/>
            <Route path='properties' element ={<HotelPropertyLayout/>}>
              <Route path=':houseProperties' element={<HousePropertiesDetails/>}/>
            </Route>
            <Route path='reservations' element ={<HotelReservationsLayout/>}>
              <Route path=':houseReservations' element={<HouseReservationDetails/>}/>
            </Route>
            <Route path='notice' element ={<HotelNoticeLayout/>}>
              {/* <Route path="all" element ={<HotelNoticesAll/>}/> */}
              <Route path=':houseNotice' element={<HouseNoticeDetails/>}/>
              <Route path="send" element={<HouseNoticeSend/>}/>
            </Route>
        </Route>
        <Route path="vendor" element={<HouseLayout/>}>
          <Route path="shops" element ={<HouseLayout/>}>
            <Route index element ={<Shops/>}/>
            <Route path = ':shopId' element ={<ShopDetails/>} />
          </Route>
          <Route path="orders" element ={<HouseLayout/>}>
            <Route index element={<Orders/>}/>
            <Route path=":orderId" element={<OrderDetails/>}/>
          </Route>
          <Route path="delivery/prices" element={<HouseLayout/>}>
            <Route index element={<DeliveryPices/>}/>
          </Route>
          <Route path="servicecharge" element={<HouseLayout/>}>
            <Route index element={<ServiceCharge/>}/>
          </Route>
        </Route>
      </Route>
    </Route>);
  const router = createBrowserRouter(routes);
  return (
    <Context>
      <RouterProvider router={router}>
      </RouterProvider>
    </Context>
  )
}

export default App
