import axios from "axios";
import { Router } from "react-router-dom";
const axiosClient = axios.create({
    baseURL: `https://laravel1.euleukcommunication.sn/api`,  
  });

  axiosClient.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('TOKEN')}`
    return config
  });
  
  axiosClient.interceptors.response.use(response => {
    return response;
  }, error => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('TOKEN')
      window.location.reload();
      // router.navigate('/login')
      Router.navigate('/')
      return error;
    }
    throw error;
  })

  
  
  
 
  
   export default axiosClient;

