import { useNavigate } from "react-router-dom";
import { SendOtp, VerifyOtp } from "../../network/OtpVerification/page";
import { useContext, useState } from "react";
import NavBar from "../../components/Navbar/page";
import WidgetButton from "../../widgets/Button/page";
import FormattedJsonViewer from "../../widgets/JsonView/page";
import Button from '@mui/material/Button';
import imageLogo from "../../assets/Logos/logo.png";
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
            <div className="h-screen">
                <div className="h-1/2 bg-gradient-to-l from-[#020065] to-[#0400CB]">
                    <div className="h-full  flex flex-col justify justify-center items-center">
                        <img className="w-auto h-1/3 md:mt-5" src={imageLogo}></img>
                        <div>
                            <h1 className="text-2xl mt-5 text-white font-semibold">Welcome to</h1>
                        </div>
                        <div>
                            <h1 className="text-4xl mt-5 text-white font-bold">Algo Achievers </h1>
                        </div>
                    </div>
                </div>
                <div className="text-start mt-5 mx-5 rounded-lg" style={{ backgroundColor: 'rgba(245, 245, 245, 1)' }}>
                    <div className="p-5 ">
                        <p style={{ color: 'rgba(0, 0, 148, 1)', fontWeight: '500px', fontSize: '14px' }}>Select preferred language</p>
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
                </div>
                <div className="text-start mt-5 mx-5 rounded-lg" style={{ backgroundColor: 'rgba(245, 245, 245, 1)' }}>
                    <div className="p-5 ">
                        <p style={{ color: 'rgba(0, 0, 148, 1)', fontWeight: '500px', fontSize: '14px' }}>Login/Register to continue</p>
                        <div className="md:grid grid-cols-2 mt-3">
                            <TextField
                                label="Phone Number"
                                variant="outlined"
                                size="medium"
                                fullWidth
                            />
                        </div>
                        <div className="mt-5">
                            <button className="md:w-1/5 w-full p-3 rounded-full text-white bg-gradient-to-l from-[#020065] to-[#0400CB]">Get Otp</button>
                        </div>
                        {!isInstalled && deferredPrompt && (
                            <button onClick={handleInstallClick} className="mt-10 md:w-1/5 w-full p-3 rounded-full text-white bg-gradient-to-l from-[#020065] to-[#0400CB]">
                                Install App
                            </button>
                        )}
                    </div>
                </div>
            </div >
        </>
    );
};

export default OtpVerification;
