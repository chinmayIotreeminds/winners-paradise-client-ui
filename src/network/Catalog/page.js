import axios from "axios";
import { axiosInstance, axiosInstanceWithoutToken } from "../../axiosInstance/AxiosConfig/page";


const getAllCatalogByCustomerId = async (id) => {
    try {
        const res = await axiosInstanceWithoutToken.post(`catalogs/list/${id}`);
        const data = res.data;
        return { data };
    } catch (err) {
        const errRes = (err && err.response) || "Network Error";
        return { ...errRes };
    }
};

export { getAllCatalogByCustomerId };
