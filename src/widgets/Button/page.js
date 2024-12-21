import React from "react";

const WidgetButton = ({ label, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="md:w-1/2 w-full p-3 rounded-full text-white bg-gradient-to-l from-[#020065] to-[#0400CB]"
        >
            {label}
        </button>
    );
};

export default WidgetButton;
