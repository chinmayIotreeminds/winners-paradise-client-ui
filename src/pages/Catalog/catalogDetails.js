import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import backImage from "../../assets/Images/backImage.jpg";
import backButton from "../../assets/Logos/backButton.png";
import { goBack } from "../../utils/Functions/goBackScreen";
import { getCustomersNotifications } from "../../network/Notifications/page";
import image from "../../assets/Images/53a655a3da5282a37b6bc80af6360316.jpg";
import { AddCircleOutline, CheckCircleOutlineRounded } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import { createEnquiry } from "../../network/Enquiry/page";
import toast from "react-hot-toast";
import { useToast } from "../../context/Toast/toastHook";
const CatalogDetails = () => {

    const [expandedCard, setExpandedCard] = useState(null);
    const [isModalOpen, setisModalOpen] = useState(false);
    const navigate = useNavigate();
    const [notificationData, setnotificationData] = useState([])
    const location = useLocation();
    const [SelectedCatalogDetails, setSelectedCatalogDetails] = useState({});
    const [totalReturn, settotalReturn] = useState(0);
    const [isLoading, setisLoading] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState("");
    const [enquirySent, setEnquirySent] = useState(false);
    const [enquirySubmitedSuccessfully, setenquirySubmitedSuccessfully] = useState(false);

    useEffect(() => {
        setSelectedCatalogDetails(location.state?.item)
        console.log(location.state?.item, "location.state?.item")
    }, [location.state]);

    useEffect(() => {
        const totalReturn =
            SelectedCatalogDetails.min_amt *
            (SelectedCatalogDetails.int_percent_per_month / 100) *
            SelectedCatalogDetails.no_of_months;
        settotalReturn(totalReturn);
    }, [SelectedCatalogDetails])

    const toggleModal = () => {
        setisModalOpen(!isModalOpen);
    };
    const { addToast } = useToast();

    const handleSuccessClick = (SuccessMessage) => {
        addToast(SuccessMessage, 'success');
    };

    const handleFailedToast = (SuccessMessage) => {
        addToast(SuccessMessage, 'failed');
    };

    const sendResponse = async () => {
        setisLoading(true);

        const formatDate = (date) => {
            const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Get month (1-based) with leading zero
            const day = date.getDate().toString().padStart(2, "0"); // Get day with leading zero
            const year = date.getFullYear();
            return `${month}-${day}-${year}`;
        };

        const payload = {
            catalog_id: SelectedCatalogDetails._id,
            investment_amount: SelectedCatalogDetails.min_amt,
            starting_date: formatDate(new Date()),
        }

        const resp = await createEnquiry(payload, SelectedCatalogDetails._id);

        if (resp) {
            setEnquirySent(true);
            handleSuccessClick("Enquiry Sent Successfully");
            setisLoading(false);
            setenquirySubmitedSuccessfully(true);
        }
        else {
            handleFailedToast("Failed to send Enquiry");
            setisLoading(false);
            setenquirySubmitedSuccessfully(false);
        }
    }

    useEffect(() => {
        const data = localStorage.getItem("customerDetails");
        const customer = JSON.parse(data);
        getAllNotifications(customer._id);
    }, []);

    const getAllNotifications = async (id) => {
        const resp = await getCustomersNotifications(id);
        setnotificationData(resp.data.data.payoutsNotifications.notifications)
    }


    const toggleCard = (id) => {
        setExpandedCard(expandedCard === id ? null : id);
    };

    const yesLogout = () => {
        localStorage.removeItem("customerDetails");
        localStorage.removeItem("tokenDetails");
        navigate("/");
    };

    return (
        <>
            <div className="sm:ml-72 relative bg-white">
                <img
                    src={backImage}
                    className="opacity-30 hidden md:block absolute inset-0 object-cover z-0 w-full"
                    alt="Background"
                />
                <div className="relative z-10">
                    <div className="h-[60px] sm:hidden bg-gradient-to-l from-[#020065] to-[#0400CB] flex flex-row justify-between p-4">
                        <div className="flex flex-row">
                            <img src={backButton} onClick={goBack} className="w-8 h-8" alt="Back" />
                            <p className="text-white font-semibold my-1">{SelectedCatalogDetails?.name} </p>
                        </div>

                    </div>
                    <div className="flex justify-between">
                        <h1 className="text-start font-bold text-2xl p-4 text-black hidden md:block mt-10">
                            {SelectedCatalogDetails?.name}
                        </h1>
                        <p
                            className="text-start font-bold text-xl p-4 text-black hidden md:block mt-10 cursor-pointer"
                            onClick={toggleModal}
                        >
                            Logout
                        </p>
                    </div>

                    <div className=" text-start rounded-lg px-4 mt-4 grid md:grid-cols-3 grid-cols-1 gap-4">
                        <div className="flex flex-row  ">
                            <p style={{ color: "#020065" }} className="text-md font-semibold">Investment Description </p>
                            {/* <div className="flex justify-center text-center items-center hidden md:flex">
                                <button
                                    type="submit"
                                    className=""
                                >
                                    {isLoading ? (
                                        <CircularProgress size={13} className="mx-2" style={{ color: 'blue' }} />
                                    ) : (
                                        <>

                                            {enquirySent ? (

                                                <CheckCircleOutlineRounded className="text-green-400 mx-2" />
                                            ) : (
                                                <AddCircleOutline size={13} onClick={sendResponse} className="text-blue-600 mx-2" />
                                            )}
                                        </>
                                    )}
                                </button>
                            </div> */}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <p className="text-md px-4 mt-3 text-start font-medium">Lorem Ipsum is simply dummy text of the printing and  typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of  type and scrambled it to make a type specimen book. It has survived not  only five centuries,</p>
                    </div>
                    <div className="grid grid-cols-1 px-4 mt-4 md:grid-cols-2 gap-4 text-start">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4"  >
                            <div style={{ background: "#F5F5F5" }} className="p-3">
                                <p>Investment Amount</p>
                                <p
                                    className="text-md font-bold my-2"
                                    style={{ color: 'rgba(0, 0, 148, 1)' }}
                                >
                                    ₹{SelectedCatalogDetails.min_amt}

                                </p>
                            </div>
                            <div style={{ background: "#F5F5F5" }} className="p-4">
                                <p>Returns</p>
                                <p></p>
                                <p
                                    className="text-md font-bold my-2"
                                    style={{ color: 'rgba(0, 0, 148, 1)' }}
                                >
                                    {SelectedCatalogDetails.int_percent_per_month}%
                                </p>
                            </div>
                            <div style={{ background: "#F5F5F5" }} className="p-4">
                                <p>Duration</p>
                                <p
                                    className="text-md font-bold my-2"
                                    style={{ color: 'rgba(0, 0, 148, 1)' }}
                                >
                                    {SelectedCatalogDetails.no_of_months} Months
                                </p>
                            </div>
                            <div style={{ background: "#F5F5F5" }} className="p-4">
                                <p>Returns per month</p>
                                <p></p>
                                <p
                                    className="text-md font-bold my-2"
                                    style={{ color: 'rgba(0, 0, 148, 1)' }}
                                >
                                    ₹{SelectedCatalogDetails.returns_per_month}
                                </p>
                            </div>


                        </div>
                    </div>
                    <div className="grid grid-cols-1 px-4 mt-4 md:grid-cols-2 gap-4 text-start mb-10">
                        <img className="rounded-2xl" src={image}></img>
                    </div>

                    {enquirySubmitedSuccessfully ? (
                        <>
                            <div style={{ background: "#F1F1FF" }} className="p-4 mx-5 md:w-1/2 text-start rounded-xl">
                                <p style={{ color: "#020065" }} className="text-sm">Interest Submitted</p>
                                <p style={{ color: "#020065" }} className="text-md font-medium mt-2">
                                    You submitted interest towards this investment on {new Date().toLocaleDateString('en-GB')}
                                </p>
                            </div>
                        </>
                    ) : (
                        <>

                            <div className="p-3 ">
                                <button
                                    onClick={sendResponse}
                                    type="submit"
                                    className="mb-4  md:w-1/2 w-full p-3 rounded-full text-white bg-gradient-to-l from-[#020065] to-[#0400CB] flex items-center justify-center"
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
                                        "Submit Interest"
                                    )}
                                </button>
                            </div>
                            <div className="text-start">
                                {ErrorMessage && (
                                    <span style={{ fontSize: '14px' }} className="text-red-400 text-xs text-start">
                                        {ErrorMessage}
                                    </span>
                                )}
                            </div>
                        </>

                    )}


                </div>
                {isModalOpen && (
                    <div
                        id="popup-modal"
                        tabIndex="-1"
                        className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-gray-800 bg-opacity-50"
                        data-modal-target="popup-modal"
                    >
                        <div className="relative p-4 w-full max-w-md max-h-full">
                            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                <button
                                    type="button"
                                    onClick={toggleModal}
                                    className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                    data-modal-hide="popup-modal"
                                >
                                    <svg
                                        className="w-3 h-3"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 14 14"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                        />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                                <div className="p-4 md:p-5 text-center">
                                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                        Are you sure you want to Logout?
                                    </h3>
                                    <button
                                        type="button"
                                        className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                                        onClick={yesLogout}
                                    >
                                        Yes, I'm sure
                                    </button>
                                    <button
                                        type="button"
                                        className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 bg-white rounded-lg border hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                        onClick={toggleModal}
                                    >
                                        No, cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </div >
        </>
    );
};

export default CatalogDetails;