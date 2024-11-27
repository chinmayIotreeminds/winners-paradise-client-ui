import axios from "axios";
import { axiosInstance, axiosInstanceWithoutToken } from "../../axiosInstance/AxiosConfig/page";


const getCustomersNotifications = async (id) => {
    try {
        const res = await axiosInstanceWithoutToken.get(`notifications/list-notifications/${id}`);
        const data = res;
        return { data };
    } catch (err) {
        const errRes = (err && err.response) || "Network Error";
        return { ...errRes };
    }
};


export { getCustomersNotifications };
