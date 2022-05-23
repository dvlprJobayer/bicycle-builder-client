import axios from "axios";

const axiosBicycle = axios.create({
    baseURL: 'http://localhost:5000'
});

export default axiosBicycle;