import { useEffect, useState } from "react";
import NavBar from "../../components/Navbar/page";
import { getAllPayouts, getAllReferralPayouts } from "../../network/Payouts/page";
import WidgetButton from "../../widgets/Button/page";
import FormattedJsonViewer from "../../widgets/JsonView/page";

const Payouts = () => {
    const [response, setResponse] = useState([]);

    const onformSubmit = async () => {
        const id = "673b19d8175d733ba756d211";
        const resp = await getAllPayouts(id);
        setResponse(resp.data.data);
    };

    const onformSubmit2 = async () => {
        const id = "673b19d8175d733ba756d211";
        const resp = await getAllReferralPayouts(id);
        setResponse(resp.data.data);
    };

    return (
        <>
            <NavBar />
            <div className="mt-10">
                <h1 className="text-3xl font-bold">My Payouts</h1> <br />
                <WidgetButton label="Payouts" onClick={onformSubmit} />
                <WidgetButton label="Referral Payouts" onClick={onformSubmit2} />
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

export default Payouts;
