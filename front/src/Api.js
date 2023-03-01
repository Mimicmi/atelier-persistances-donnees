import axios from 'axios';


export default axios.create({
  baseURL: `http://localhost:8090/`, 
  headers: {
    'Access-Control-Allow-Origin': '*', 
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
    "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS"
    }, 
  withCredentials: 'include'
});