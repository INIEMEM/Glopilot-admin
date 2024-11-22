import { useState, createContext } from "react";
export const MainContext = createContext();

const Context = (props) => {

  // const [apiKey, setApiKey] = useState('base64:mrbHT4tAp2pe2lMYJfliwIugvVZkO7RSH7ojdfGJ9oc=');
  const [baseUrl, setBaseUrl] = useState('https://backend.glopilots.com/');
  const [imgBaseUrl, setImgBaseUrl] = useState('https://backend.glopilots.com/');
  const [googleApiKey, setGoogleApiKey] = useState('AIzaSyAMK0gm6FqImxY1oLDQ72UcTuZzybFl7Lw');
  const [apiKey, setApiKey] = useState('http://66.29.143.70:5010/');
  const [userRole, setUserRole] = useState([]);
  const [reportDetails, setReportDetails] = useState([]);
  const [userType, setUserType] = useState('');
  const [isUndreadMessages, setIsUnreadMessages] = useState(false)
  const getToken = () =>
    {
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken
    }  
    const getUser = () =>
      {
          const userString = sessionStorage.getItem('user');
          const userDetail = JSON.parse(userString)
  
          return userDetail
      }
    const [currentUser, setCurrentUser] = useState(getUser());
    const [token, setToken] = useState(getToken());
    const saveToken = (token, user) =>
    {
        sessionStorage.setItem('token', JSON.stringify(token));
        sessionStorage.setItem('user', JSON.stringify(user));
        setCurrentUser(user)
        setToken(token)

    }

    const contextValue = 
    {
      userType,
      setToken:saveToken,
      token,
      baseUrl,
      setCurrentUser,
      currentUser,
      imgBaseUrl,
      userRole,
      setUserRole,
      setReportDetails,
      reportDetails,
      setIsUnreadMessages,
      isUndreadMessages,
      googleApiKey
    }
  return (
    <MainContext.Provider value={contextValue}>{props.children}</MainContext.Provider> 
  )
}

export default Context