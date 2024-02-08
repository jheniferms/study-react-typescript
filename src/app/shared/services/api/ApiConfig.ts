import axios from "axios";

export const API = () => {
    return axios.create({
        baseURL:"http:\\localhost:3001"
    });
}