import axios from "axios";

const instance = axios.create({
  baseURL: 'http://localhost:3010/',
  timeout: 5000,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
  },
});


export default instance;