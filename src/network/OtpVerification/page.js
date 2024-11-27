import { axiosInstanceWithoutToken } from "../../axiosInstance/AxiosConfig/page";

const SendOtp = async (payload) => {
    try {
        const res = await axiosInstanceWithoutToken.post("auth/send-otp", payload);
        const data = res;
        return { data };
    } catch (err) {
        const errRes = (err && err.response) || "Network Error";
        return { ...errRes };
    }
};
const VerifyOtp = async (payload) => {
    try {
        const res = await axiosInstanceWithoutToken.post("auth/verify-otp", payload);
        const data = res;
        return { data };
    } catch (err) {
        const errRes = (err && err.response) || "Network Error";
        return { ...errRes };
    }
};

export { SendOtp, VerifyOtp };

