import { useState, useCallback } from "react";
import ToastContext from "./toastContext";
import {
    getToastAriaLabel,
    getToastIcon,
    getToastIconBgClass,
    getToastColorClass,
} from "./toastHelper";

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((content, type) => {
        const newToast = { content, type, id: Date.now() };
        setToasts((prevToasts) => [...prevToasts, newToast]);
        setTimeout(() => removeToast(newToast.id), 2000);
    }, []);

    const removeToast = useCallback((id) => {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <div className="fixed top-4 right-4 z-50 flex flex-col items-end space-y-2">
                {toasts.map((toast, index) => (
                    <div
                        key={toast.id}
                        className={`toast-item animate-toast flex items-center w-full max-w-xs p-4 mb-2 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 ${getToastColorClass(
                            toast.type
                        )}`}
                        role="alert"
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                        <div
                            className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 ${getToastIconBgClass(
                                toast.type
                            )} rounded-lg`}
                        >
                            {getToastIcon(toast.type)}
                            <span className="sr-only">{getToastAriaLabel(toast.type)}</span>
                        </div>
                        <div className="ml-3 text-sm font-normal">{toast.content}</div>
                        <button
                            type="button"
                            onClick={() => removeToast(toast.id)}
                            className="ml-auto -mx-1.5 -my-1.5 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                            aria-label="Close"
                        >
                            <span className="sr-only">Close</span>
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
                                    d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13"
                                />
                            </svg>
                        </button>
                    </div>
                ))}
            </div>
            <style jsx>{`
                @keyframes slideInRight {
                    0% {
                        transform: translateX(100%);
                    }
                    100% {
                        transform: translateX(0);
                    }
                }

                .animate-toast {
                    animation: slideInRight 0.5s ease forwards;
                }
            `}</style>
        </ToastContext.Provider>
    );
};
