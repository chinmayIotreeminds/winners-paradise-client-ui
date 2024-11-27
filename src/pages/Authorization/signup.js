import { useState } from "react";
import { createCustomer } from "../../network/Customer/page";
import WidgetButton from "../../widgets/Button/page";
import FormattedJsonViewer from "../../widgets/JsonView/page";
import NavBar from "../../components/Navbar/page";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
    const tokenDetails = localStorage.getItem("tokenDetails");
    const [response, setResponse] = useState([]);
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();
    const onformSubmit = async () => {
        const payload = {
            name: "CUS 1",
            dob: "10-10-1000",
            email_id: "cus3@gmail.com",
            mobile_no: "9922129050",
            state: "KA",
            district: "KLR",
            city: "BNG",
            address: "BNG",
            language_preference: "kannada",
            nominee: {
                nominee_name: "venkanna",
                nominee_aadhar_no: "123412341234",
                nominee_dob: "01-10-1230",
                nominee_aadhar_file: "dfsjfshffjshfjsfj",
                nominee_pan_file: "sdfsfsfjsfsjfsjf",
                nominee_photo: "sdfksfkjsffjksdf",
                nominee_pan_no: "sfsfsjkfsfjk",
                nominee_cancelled_cheque: "sfsfsfsf",
                nominee_bank_acc_no: "sfsfsfdsf",
                nominee_bank_ifsc_code: "sdfsfsfdsfd",
                nominee_bank_branch: "sfdsfsf",
            },
            token: tokenDetails,
        };
        try {
            const resp = await createCustomer(payload);
            localStorage.setItem("customerDetails", JSON.stringify(resp.data.data.customer));
            localStorage.setItem("tokenDetails", resp.data.data.token);
            setResponse(resp.data.data);
            setIsError(false);
            setTimeout(() => {
                navigate("/homepage")
            }, 3000);
        } catch (error) {
            setResponse(`Error: ${error.message}`);
            setIsError(true);
        }
    };

    return (
        <>
            <NavBar></NavBar>
            <div className="mt-10">
                <h1 className="text-3xl font-bold">Register Now</h1> <br />
                <WidgetButton
                    label="Create Customer"
                    onClick={onformSubmit}
                />
            </div>
            <div className="response-container mt-10 p-5 border border-gray-300 rounded-md bg-gray-100">
                <h3 className="text-lg font-bold mb-4">Response:</h3>
                <div className={`p-4 rounded-md bg-white border border-gray-200 ${isError ? "text-red-600" : ""}`}>
                    {response && Object.keys(response).length > 0 ? (
                        isError ? (
                            <span>{response}</span>
                        ) : (
                            <FormattedJsonViewer data={response} />
                        )
                    ) : (
                        <span>No response yet</span>
                    )}
                </div>
            </div>
        </>
    );
};

export default SignupPage;
