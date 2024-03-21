import axios from "axios";

const  apiOlinda = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL_BACKEND,
    headers: {'Token-Access': process.env.REACT_APP_BACKEND_TOKEN },
})

export default apiOlinda;




