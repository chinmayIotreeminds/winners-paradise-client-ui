import { useNavigate } from "react-router-dom";
import { SendOtp, VerifyOtp } from "../../network/OtpVerification/page";
import { useContext, useEffect, useState } from "react";
import NavBar from "../../components/Navbar/page";
import WidgetButton from "../../widgets/Button/page";
import FormattedJsonViewer from "../../widgets/JsonView/page";
import Button from '@mui/material/Button';
import { useForm, Controller } from 'react-hook-form';
import imageLogo from "../../assets/Logos/logo1.png";
import image1 from "../../assets/Images/robo 1 (3).png";
import image3 from "../../assets/Images/sideImage.png";
import image2 from "../../assets/Images/robo 1 (1).png";
import { Radio, FormControlLabel, FormControl, FormLabel, RadioGroup, InputAdornment } from '@mui/material';
import TextField from '@mui/material/TextField';
import { PwaContext } from "../../context/PwaContext/page";
import { useLanguage } from "../../context/Language/loginContext";
import translations from "../../utils/Json/translation.json"
import { useToast } from "../../context/Toast/toastHook";
import { getAllInvestments } from "../../network/Investments/page";
import { saveTokenForFcm } from "../../network/Fcm/saveToken";
import SplashScreen from "../Splash/page";
import { motion } from "framer-motion";

const OtpVerification = () => {

    const { language, setLanguage } = useLanguage();

    const {
        control,
        watch,
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [isLoading, setisLoading] = useState(false)
    const [selectedValue, setSelectedValue] = useState(language);
    const [ErrorMessage, setErrorMessage] = useState("");
    const [mobileNumber, setmobileNumber] = useState()
    const watchOtp = watch("enteredOtp");

    const handleChange = (event) => {
        setLanguage(event.target.value);
        localStorage.setItem("language", event.target.value);
        setSelectedValue(event.target.value);
    };

    const { deferredPrompt, isInstalled, handleInstallClick } = useContext(PwaContext);

    const [otp, setOtp] = useState();
    const [ShowotpField, setShowotpField] = useState(false);
    const [ShowPhoneField, setShowPhoneField] = useState(true);

    const [token, setToken] = useState();
    const [inputValue, setInputValue] = useState();
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();
    const { addToast } = useToast();

    const handleSuccessClick = (SuccessMessage) => {
        addToast(SuccessMessage, 'success');
    };

    const onSubmit = async (data) => {

        setisLoading(true);

        const payload = {
            mobileNumber: data.phoneNumber,
        };

        let resp;

        try {
            resp = await SendOtp(payload);

            if (resp.data.status === 200) {
                setErrorMessage("");
                handleSuccessClick(resp.data.data.message);
                setShowotpField(true);
                setShowPhoneField(false);
                setOtp(resp.data.data.otp);
                setToken(resp.data.data.token);
                setisLoading(false);
                localStorage.setItem("tempMobileNumber", data.phoneNumber)
                setmobileNumber(data.phoneNumber)
            }
            else {
                setErrorMessage("Something Went Wrong");
                setisLoading(false);
            }

        } catch (error) {
            setErrorMessage(resp.data.data.message);
            setisLoading(false);
        }
    };

    const handeChangePhoneNumber = () => {
        setShowotpField(false);
        setShowPhoneField(true);
        setmobileNumber();
        setValue("enteredOtp", "")
    }

    const resendOTP = async () => {

        const mobile = localStorage.getItem("tempMobileNumber");
        const payload = {
            mobileNumber: mobile,
        };

        let resp;

        resp = await SendOtp(payload);
        if (resp.data.status === 200) {
            handleSuccessClick(resp.data.data.message);
            setOtp(resp.data.data.otp);
            setToken(resp.data.data.token);
        }
        else {
            setErrorMessage("Something Went Wrong");
        }
    }

    const verifyOtp = async (data) => {

        setisLoading(true);

        const payload = {
            otp: data.enteredOtp,
            token,
        };

        try {
            const resp = await VerifyOtp(payload);
            console.log(resp.data.data.customer, "resp.data.data.customer");

            if (resp.data.status === 200) {
                setErrorMessage("");

                const customer = resp.data.data.customer;

                localStorage.setItem("tokenDetails", resp.data.data.token);

                const fcmToken = localStorage.getItem("fcmToken")
                if (fcmToken) {
                    const data = {
                        fcmData: fcmToken
                    }
                    const saveToken = await saveTokenForFcm(data);
                    console.log(saveToken);
                }

                if (customer) {
                    setLanguage(customer.language_preference);
                    await localStorage.setItem("customerDetails", JSON.stringify(customer));

                    const investmentsResp = await getAllInvestments(customer._id);
                    console.log(investmentsResp, "Resp")
                    if (investmentsResp.data.status === 200) {
                        const investments = investmentsResp.data.data.data;

                        if (investments.length === 0) {
                            setisLoading(false); // Stop loading spinner
                            navigate("/catalogs");
                        } else {
                            navigate("/dashboard");
                        }
                    }
                    handleSuccessClick(resp.data.data.message);
                } else {
                    setisLoading(false); // Stop loading spinner
                    navigate("/register");
                    handleSuccessClick(resp.data.data.message);
                }
            } else {
                setErrorMessage(resp.data.message || "An unexpected error occurred.");
                setisLoading(false);
            }
        } catch (error) {
            // Log and handle errors
            console.error("Error during OTP verification:", error);

            // Display a more user-friendly error message
            const errorMessage =
                error?.response?.data?.message || "Failed to verify OTP. Please try again.";
            setErrorMessage(errorMessage);
            setisLoading(false);
        }
    };

    const [showSplashScreen, setShowSplashScreen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        console.log(isMobile);
        if (isMobile) {
            setShowSplashScreen(true);
            console.log(isMobile, "helllo")
            const timer = setTimeout(() => setShowSplashScreen(false), 3000);
            return () => clearTimeout(timer); // Cleanup timer
        }
    }, [isMobile]);



    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);



    return (
        <>
            {showSplashScreen ? (
                <motion.div
                    key="splash"
                    initial={{ x: "100%" }} // Start from off-screen (right side)
                    animate={{ x: 0 }} // Slide to the center
                    exit={{ x: "-100%" }} // Slide out to the left
                    transition={{ duration: 0.7, ease: "easeInOut" }} // Smooth transition
                    className="h-screen"
                >
                    <SplashScreen />
                </motion.div>
            ) : (

                <div className="h-screen flex flex-col">
                    <div className="h-1/2 sm:hidden bg-gradient-to-l from-[#020065] to-[#0400CB] flex flex-col justify-center md:justify-start items-center md:items-start">

                        <img
                            className="h-auto md:hidden w-1/2 p-3 md:mt-0 sm:mt-20 mt-10 text-start"
                            src={imageLogo}
                            alt="Logo"
                        />

                        <div className="p-2 sm:hidden">
                            <h1 className="text-2xl text-white font-semibold"> {translations.loginScreen.sendOtpScreen.heading1[language]}</h1>
                        </div>

                        <div className="sm:hidden">
                            <h1 className="text-4xl mt-2 text-white font-bold pb-6"> {translations.loginScreen.sendOtpScreen.heading2[language]}</h1>
                        </div>

                    </div>


                    <div className="h-full bg-white grid grid-cols-12 md:grid-cols-12 ">
                        {/* Content Section */}
                        <div className=" col-span-12 md:col-span-6 w-full order-1 md:order-2 md:mt-10 mt-0 p-0 md:p-20 ">
                            <p style={{ color: '#020065' }} className="hidden sm:block text-center mx-5 font-semibold text-3xl ">{translations.loginScreen.sendOtpScreen.login[language]}</p>
                            <div
                                className="text-start mt-10 mx-5 rounded-lg p-4 "
                                style={{ backgroundColor: 'rgba(245, 245, 245, 1)' }}
                            >
                                <p style={{ color: 'rgba(0, 0, 148, 1)', fontWeight: '500', fontSize: '14px' }}>
                                    {translations.loginScreen.sendOtpScreen.preference[language]}
                                </p>

                                <FormControl component="fieldset" style={{ marginTop: '16px' }}>
                                    <RadioGroup
                                        row
                                        aria-label="language"
                                        name="language-group"
                                        value={selectedValue}
                                        onChange={handleChange}
                                        className="gap-4 sm:gap-6"
                                    >
                                        <FormControlLabel
                                            value="english"
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
                                            value="kannada"
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

                            {ShowPhoneField && (
                                <div
                                    className="text-start mt-5 mx-5 rounded-lg p-5 mt-5 lg:mt-10 "
                                    style={{ backgroundColor: 'rgba(245, 245, 245, 1)' }}
                                >
                                    <p style={{ color: 'rgba(0, 0, 148, 1)', fontWeight: '500', fontSize: '14px' }}>
                                        {translations.loginScreen.sendOtpScreen.loginOrRegister[language]}
                                    </p>
                                    <div className="grid grid-cols-1 md:grid-cols-1 mt-3">
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <div className="grid grid-cols-1 md:grid-cols-1 mt-3">
                                                <TextField
                                                    label={translations.loginScreen.sendOtpScreen.phoneField[language]}
                                                    variant="outlined"
                                                    size="medium"
                                                    type="number"
                                                    fullWidth
                                                    error={!!errors.phoneNumber}
                                                    helperText={errors.phoneNumber ? errors.phoneNumber.message : ''}
                                                    {...register('phoneNumber', {
                                                        required: 'Phone number is required',
                                                        pattern: {
                                                            value: /^[0-9]{10}$/,
                                                            message: 'Please enter a valid 10-digit phone number',
                                                        },
                                                        pattern: {
                                                            value: /^[9876][0-9]{9}$/,
                                                            message: `Invalid Phone Number`,
                                                        },
                                                    })}
                                                    InputProps={{
                                                        inputProps: {
                                                            style: {
                                                                MozAppearance: "textfield", // Removes spinner in Firefox
                                                            },
                                                        },
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <span style={{ fontWeight: 'medium', color: "#1D1B20" }}>+91</span>
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                    onInput={(e) => {
                                                        if (e.target.value.length > 10) {
                                                            e.target.value = e.target.value.slice(0, 10); // Truncate input to 12 digits
                                                        }
                                                    }}
                                                    sx={{
                                                        "& input[type=number]": {
                                                            MozAppearance: "textfield", // Removes spinner in Firefox
                                                        },
                                                        "& input[type=number]::-webkit-inner-spin-button, & input[type=number]::-webkit-outer-spin-button": {
                                                            WebkitAppearance: "none", // Removes spinner in Chrome, Safari
                                                            margin: 0,
                                                        },
                                                    }}
                                                />
                                            </div>
                                            <div className="mt-5">
                                                <button
                                                    type="submit"
                                                    className="md:w-full w-full p-3 rounded-full text-white bg-gradient-to-l from-[#020065] to-[#0400CB] flex items-center justify-center"
                                                >
                                                    {isLoading ? (
                                                        <svg
                                                            aria-hidden="true"
                                                            className="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                                            viewBox="0 0 100 101"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                                fill="currentColor"
                                                            />
                                                            <path
                                                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                                fill="currentFill"
                                                            />
                                                        </svg>
                                                    ) : (
                                                        `${translations.loginScreen.sendOtpScreen.getOTPButton[language]}`
                                                    )}
                                                </button>
                                                <div className="text-start">
                                                    {ErrorMessage && (
                                                        <span style={{ fontSize: '14px' }} className="text-red-400 text-xs text-start">
                                                            {ErrorMessage}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                        </form>
                                    </div>

                                </div>
                            )}

                            {ShowotpField && (
                                <div
                                    className="text-start mt-5 mx-5 rounded-lg p-5 mt-5 lg:mt-10 "
                                    style={{ backgroundColor: 'rgba(245, 245, 245, 1)' }}
                                >
                                    <div className="flex justify justify-between">
                                        <p style={{ color: 'rgba(0, 0, 148, 1)', fontWeight: '500', fontSize: '14px' }}>
                                            Confirm +91{" "}{mobileNumber}
                                        </p>
                                        <p style={{ color: 'rgba(0, 0, 148, 1)', fontWeight: '500', textDecoration: "underline", fontSize: '14px' }} className="cursor-pointer" onClick={resendOTP}>
                                            {translations.loginScreen.otpConfirmation.resendOTPLink[language]}
                                        </p>
                                    </div>
                                    <div className="md:grid grid-cols-1 mt-3">
                                        <form onSubmit={handleSubmit(verifyOtp)}>
                                            <div className="grid grid-cols-1 md:grid-cols-1 mt-3">
                                                <TextField
                                                    value={watchOtp}
                                                    label={translations.loginScreen.otpConfirmation.OtpField[language]}
                                                    variant="outlined"
                                                    size="medium"
                                                    type="number"
                                                    fullWidth
                                                    error={!!errors.enteredOtp}
                                                    helperText={errors.enteredOtp ? errors.enteredOtp.message : ''}
                                                    {...register('enteredOtp', {
                                                        required: 'OTP is required',
                                                    })}
                                                    onInput={(e) => {
                                                        if (e.target.value.length > 6) {
                                                            e.target.value = e.target.value.slice(0, 6); // Truncate input to 12 digits
                                                        }
                                                    }}
                                                    sx={{
                                                        "& input[type=number]": {
                                                            MozAppearance: "textfield", // Removes spinner in Firefox
                                                        },
                                                        "& input[type=number]::-webkit-inner-spin-button, & input[type=number]::-webkit-outer-spin-button": {
                                                            WebkitAppearance: "none", // Removes spinner in Chrome, Safari
                                                            margin: 0,
                                                        },
                                                    }}
                                                />
                                            </div>
                                            <p className="text-centerlg:text-start  text-sm mt-2" style={{ color: "#49454F" }}>
                                                {translations.loginScreen.otpConfirmation.heading2[language]}
                                            </p>
                                            <div className="mt-5">
                                                <button
                                                    type="submit"
                                                    className="md:w-full w-full p-3 rounded-full text-white bg-gradient-to-l from-[#020065] to-[#0400CB] flex items-center justify-center"
                                                >
                                                    {isLoading ? (
                                                        <svg
                                                            aria-hidden="true"
                                                            className="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                                            viewBox="0 0 100 101"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                                fill="currentColor"
                                                            />
                                                            <path
                                                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                                fill="currentFill"
                                                            />
                                                        </svg>
                                                    ) : (
                                                        `Verify OTP`
                                                    )}
                                                </button>
                                                <div className="text-start">
                                                    {ErrorMessage && (
                                                        <span style={{ fontSize: '14px' }} className="text-red-400 text-xs text-satrt">
                                                            {ErrorMessage}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            )}
                            {ShowotpField && (
                                <p onClick={handeChangePhoneNumber} className="py-3 underline cursor-pointer" style={{ color: 'rgba(0, 0, 148, 1)' }}>Change Phone Number</p>
                            )}
                        </div>

                        <div className="col-span-12 hidden sm:block overflow-hidden md:col-span-6 w-full max-h-[100vh] order-2 md:order-1 responsive relative">
                            {/* Image */}
                            <img src={image3} alt="Image description" className="w-full h-auto object-cover" />

                            {/* Centered Content */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <h1 className="text-white text-2xl md:text-4xl font-bold bg-opacity-75 p-4 rounded-lg flex flex-col justify-center items-center">
                                    <img
                                        className="h-auto w-1/2 p-3 md:mt-0 sm:mt-20 mt-10 text-start"
                                        src={imageLogo}
                                        alt="Logo"
                                    />
                                    <div className="p-2 ">
                                        <h1 className="text-3xl text-white font-semibold"> {translations.loginScreen.sendOtpScreen.heading1[language]}</h1>
                                    </div>

                                    <div className="">
                                        <h1 className="text-4xl mt-2 text-white font-bold pt-4"> {translations.loginScreen.sendOtpScreen.heading2[language]}</h1>
                                    </div>
                                </h1>
                            </div>
                        </div>


                        <div className="col-span-12 md:col-span-6 sm:hidden w-full h-full order-2 md:order-1 responsive">
                            <img src={image2} alt="Image description" className="w-full h-full object-contain" />
                        </div>
                    </div>

                </div>
            )}
        </>
    );
};

export default OtpVerification;
