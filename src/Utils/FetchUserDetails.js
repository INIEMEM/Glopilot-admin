import Axios from 'axios';
export const fetchUserDetails = async (userId, token, baseUrl) =>
  {
    try 
      {
        //vendor-food/admin-shop-food?shopId=  
        const response = await Axios({
          method: 'get',
          url: `${baseUrl}admin/user?userId=${userId}`,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
            "Accept": "*/*",
          }
        })
  
    return response?.data?.user;
      } catch (error) 
      {
        console.error(error);
      }
  } 