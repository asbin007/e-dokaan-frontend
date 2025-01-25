import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3001/api",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

const APIWithToken = axios.create({
  baseURL: "http://localhost:3001/api",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Authorization":localStorage.getItem("tokenHoYo")
    
  },
});
export {API,APIWithToken};
