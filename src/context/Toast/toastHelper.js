const getToastColorClass = (type) => {
    switch (type) {
        case "success":
            return "bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200";
        case "danger":
            return "bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200";
        case "warning":
            return "bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200";
        default:
            return "";
    }
};

const getToastIconBgClass = (type) => {
    switch (type) {
        case "success":
            return "bg-green-100 dark:bg-green-800";
        case "danger":
            return "bg-red-100 dark:bg-red-800";
        case "warning":
            return "bg-orange-100 dark:bg-orange-700";
        default:
            return "";
    }
};

const getToastIcon = (type) => {
    switch (type) {
        case "success":
            return (
                <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
            );
        case "danger":
            return (
                <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
                </svg>
            );
        case "warning":
            return (
                <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
                </svg>
            );
        default:
            return null;
    }
};

const getToastAriaLabel = (type) => {
    switch (type) {
        case "success":
            return "Check icon";
        case "danger":
            return "Error icon";
        case "warning":
            return "Warning icon";
        default:
            return "";
    }
};

export {
    getToastAriaLabel,
    getToastIcon,
    getToastIconBgClass,
    getToastColorClass,
};
