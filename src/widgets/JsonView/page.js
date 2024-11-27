import React, { useEffect, useState } from "react";

const FormattedJsonViewer = ({ data, indent = 4 }) => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (data && Object.keys(data).length > 0) {
            setLoading(true);

            const timeout = setTimeout(() => {
                setLoading(false);
            }, 500);
            return () => clearTimeout(timeout);
        }
    }, [data]);

    const renderFormattedJson = (data, indent) => {
        if (typeof data !== "object" || data === null) {
            return <span className="text-blue-700">{data}</span>;
        }

        const space = " ".repeat(indent);
        return (
            <div className="text-sm font-mono text-gray-800 whitespace-pre">
                {"{"}
                {Object.entries(data).map(([key, value], index) => (
                    <div key={index} className="ml-4">
                        <span className="text-red-600">
                            {space}"{key}"
                        </span>
                        :{" "}
                        <span className="text-green-600">
                            {typeof value === "object" ? (
                                renderFormattedJson(value, indent + 4)
                            ) : (
                                `"${value}"`
                            )}
                        </span>
                        {index < Object.entries(data).length - 1 ? "," : ""}
                    </div>
                ))}
                {"}"}
            </div>
        );
    };

    return (
        <div className="flex justify-center items-center">
            {loading ? (
                <div className="flex justify-center items-center">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
                </div>
            ) : (
                renderFormattedJson(data, indent)
            )}
        </div>
    );
};

export default FormattedJsonViewer;
