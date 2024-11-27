import { useEffect, useState } from "react";
import NavBar from "../../components/Navbar/page";
import { getCustomersNotifications } from "../../network/Notifications/page";
import WidgetButton from "../../widgets/Button/page";
import FormattedJsonViewer from "../../widgets/JsonView/page";

const Notifications = () => {
    const [response, setResponse] = useState([]);
    const [customerDetails, setCustomerDetails] = useState([]);

    useEffect(() => {
        const data = localStorage.getItem("customerDetails");
        const customer = JSON.parse(data);
        setCustomerDetails(customer);
    }, []);

    const onformSubmit = async () => {
        if (customerDetails && customerDetails._id) {
            const resp = await getCustomersNotifications(customerDetails._id);
            setResponse(resp.data.data);
        }
    };

    return (
        <>
            <NavBar />
            <div className="mt-10">
                <h1 className="text-3xl font-bold">My Notifications</h1>
                <br />
                <WidgetButton label="Get Notifications" onClick={onformSubmit} />
            </div>
            <div className="response-container mt-10 p-5 border border-gray-300 rounded-md bg-gray-100">
                <h3 className="text-lg font-bold mb-4">Response:</h3>
                <div className="p-4 rounded-md bg-white border border-gray-200">
                    {response && Object.keys(response).length > 0 ? (
                        <FormattedJsonViewer data={response} />
                    ) : (
                        <span>No response yet</span>
                    )}
                </div>
            </div>
        </>
    );
};

export default Notifications;
