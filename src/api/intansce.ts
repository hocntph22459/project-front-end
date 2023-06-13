import axios from "axios";

const intansce = axios.create({
    baseURL:"http://localhost:8080/api"
})

export default intansce