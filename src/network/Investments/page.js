import { axiosInstance, axiosInstanceWithoutToken } from "../../axiosInstance/AxiosConfig/page";

const getAllInvestments = async (id) => {
    try {
        const res = await axiosInstanceWithoutToken.get(`investments/list-my-investments/${id}`);
        const data = res;
        return { data };
    } catch (err) {
        const errRes = (err && err.response) || "Network Error";
        return { ...errRes };
    }
};

export { getAllInvestments };
