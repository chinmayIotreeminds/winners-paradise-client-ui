import { useNavigate } from "react-router-dom";
import { SendOtp, VerifyOtp } from "../../network/OtpVerification/page";
import { useContext, useState } from "react";
import NavBar from "../../components/Navbar/page";
import WidgetButton from "../../widgets/Button/page";
import FormattedJsonViewer from "../../widgets/JsonView/page";
import Button from '@mui/material/Button';
import imageLogo from "../../assets/Logos/logo.png";
import image1 from "../../assets/Images/robo 1.png";
import { Radio, FormControlLabel, FormControl, FormLabel, RadioGroup, TextField } from '@mui/material';
import { PwaContext } from "../../context/PwaContext/page";

const OtpVerification = () => {
    const [response, setResponse] = useState([]);
    const [otp, setOtp] = useState();
    const [token, setToken] = useState();
    const [inputValue, setInputValue] = useState();
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();

    const { deferredPrompt, isInstalled, handleInstallClick } = useContext(PwaContext);

    const sendOtp = async () => {
        const payload = {
            mobileNumber: inputValue,
        };
        let resp;
        try {
            resp = await SendOtp(payload);
            setOtp(resp.data.data.otp);
            setToken(resp.data.data.token);
            setResponse(resp.data.data);
            setIsError(false);
        } catch (error) {
            setResponse(`Error: ${error.message}`);
            setIsError(true);
        }
    };

    const verifyOtp = async () => {
        const payload = {
            otp,
            token
        };
        try {
            const resp = await VerifyOtp(payload);
            setResponse(resp.data.data);
            setIsError(false);
            if (resp.data.data?.customer) {
                localStorage.setItem("customerDetails", JSON.stringify(resp.data.data.customer));
                setTimeout(() => {
                    navigate("/homepage");
                }, 3000);
            } else {
                setTimeout(() => {
                    navigate("/register");
                }, 3000);
            }
            localStorage.setItem("tokenDetails", resp.data.data.token);
        } catch (error) {
            setResponse(`Error: ${error.message}`);
            setIsError(true);
        }
    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    return (
        <>
            <div className="h-screen flex flex-col">
                {/* Top Half with Gradient */}
                <div className="h-1/2  bg-gradient-to-l from-[#020065] to-[#0400CB] flex flex-col justify-center items-center">
                    <img
                        className="w-1/2 sm:w-1/2 md:w-1/6 lg:w-1/4 h-auto sm:mt-20 md:mt-20"
                        src={imageLogo}
                        alt="Logo"
                    />
                    <div>
                        <h1 className="text-2xl mt-5 text-white font-semibold">Welcome to</h1>
                    </div>
                    <div>
                        <h1 className="text-4xl mt-2 text-white font-bold pb-6">Algo Achievers </h1>
                    </div>
                </div>

                {/* Bottom Half with White Background */}
                <div className="h-full bg-white grid grid-cols-12 md:grid-cols-12 lg:pb-10">
                    {/* Content Section */}
                    <div className=" col-span-12 md:col-span-7 w-full order-1 md:order-2 ">
                        <div
                            className="text-start mt-5 mx-5 rounded-lg p-4"
                            style={{ backgroundColor: 'rgba(245, 245, 245, 1)' }}
                        >
                            <p style={{ color: 'rgba(0, 0, 148, 1)', fontWeight: '500', fontSize: '14px' }}>
                                Select preferred language
                            </p>
                            <FormControl component="fieldset" style={{ marginTop: '16px' }}>
                                <RadioGroup row aria-label="language" name="language-group" defaultValue="English">
                                    <FormControlLabel
                                        value="English"
                                        control={
                                            <Radio
                                                sx={{
                                                    color: 'rgba(2, 0, 101, 1)',
                                                    '&.Mui-checked': {
                                                        color: 'rgba(2, 0, 101, 1)',
                                                    },
                                                }}
                                            />
                                        }
                                        label="English"
                                        style={{ color: 'rgba(2, 0, 101, 1)', fontWeight: 'bold' }}
                                    />
                                    <FormControlLabel
                                        value="Kannada"
                                        control={
                                            <Radio
                                                sx={{
                                                    color: 'rgba(2, 0, 101, 1)',
                                                    '&.Mui-checked': {
                                                        color: 'rgba(2, 0, 101, 1)',
                                                    },
                                                }}
                                            />
                                        }
                                        label="ಕನ್ನಡ"
                                        style={{ color: 'rgba(2, 0, 101, 1)', fontWeight: 'bold' }}
                                    />
                                </RadioGroup>
                            </FormControl>
                        </div>

                        {/* Login/Register Form */}
                        <div
                            className="text-start mt-5 mx-5 rounded-lg p-5 mt-0 lg:mt-10"
                            style={{ backgroundColor: 'rgba(245, 245, 245, 1)' }}
                        >
                            <p style={{ color: 'rgba(0, 0, 148, 1)', fontWeight: '500', fontSize: '14px' }}>
                                Login/Register to continue
                            </p>
                            <div className="md:grid grid-cols-2 mt-3">
                                <TextField
                                    label="Phone Number"
                                    variant="outlined"
                                    size="medium"
                                    fullWidth
                                    value={inputValue}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mt-5">
                                <button
                                    onClick={sendOtp}
                                    className="md:w-1/2 w-full p-3 rounded-full text-white bg-gradient-to-l from-[#020065] to-[#0400CB]"
                                >
                                    Get Otp
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Image Section */}
                    <div className="p-0 col-span-12 md:col-span-5  mt-10 order-2 md:order-1 responive flex justify justify-center items-center">
                        <img src={image1} alt="Image description" style={{ width: "550px" }} className="p-0 lg:p-5" />
                    </div>
                </div>

            </div>
        </>
    );
};

export default OtpVerification;
