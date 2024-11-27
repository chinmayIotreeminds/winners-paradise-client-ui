import axios from "axios";
import { axiosInstance, axiosInstanceWithoutToken } from "../../axiosInstance/AxiosConfig/page";


const createCustomer = async (payload) => {
    try {
        const res = await axiosInstanceWithoutToken.post("customer/create", payload);
        const data = res;
        return { data };
    } catch (err) {
        const errRes = (err && err.response) || "Network Error";
        return { ...errRes };
    }
};


const getCustomerById = async (id) => {
    try {
        const res = await axiosInstanceWithoutToken.post(`customer/get-my-account-details/${id}`);
        const data = res;
        return { data };
    } catch (err) {
        const errRes = (err && err.response) || "Network Error";
        return { ...errRes };
    }
};


const updatecustomer = async (payload, id) => {
    try {
        const res = await axiosInstanceWithoutToken.put(`customer/edit/${id}`, payload);
        const data = res;
        return { data };
    } catch (err) {
        const errRes = (err && err.response) || "Network Error";
        return { ...errRes };
    }
};


export { getCustomerById, updatecustomer, createCustomer };
