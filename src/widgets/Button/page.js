import React from "react";

const WidgetButton = ({ label, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="p-4 mx-2 hover:shadow-xl bg-blue-100 text-blue-900 hover:bg-blue-700 hover:text-white rounded-xl transition duration-300 ease-in-out"
        >
            {label}
        </button>
    );
};

export default WidgetButton;
