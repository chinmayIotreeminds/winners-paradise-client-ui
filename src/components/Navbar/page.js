import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const NavBar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const location = useLocation(); // Hook to get the current location
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("tokenDetails");
        const customer = localStorage.getItem("customerDetails");
        if (token && customer) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("tokenDetails");
        localStorage.removeItem("customerDetails");
        navigate("/")
        setIsLoggedIn(false);
    };

    const getLinkClass = (path) => {
        return location.pathname === path
            ? "block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500 "
            : "block py-2 px-3 text-black rounded md:bg-transparent md:text-black md:p-0 dark:text-white md:dark:text-blue-500 hover:text-blue-700";
    };

    return (
        <>
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a href="*" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Winners Paradise</span>
                    </a>
                    <button
                        data-collapse-toggle="navbar-default"
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="navbar-default"
                        aria-expanded="false"
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 17 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 1h15M1 7h15M1 13h15"
                            />
                        </svg>
                    </button>
                    {isLoggedIn && (
                        <div className="hidden w-full md:block md:w-auto mr-10" id="navbar-default">
                            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                                <li>
                                    <Link
                                        to="/my-profile"
                                        className={getLinkClass("/my-profile")}
                                        aria-current="page"
                                    >
                                        My Profile
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/homepage"
                                        className={getLinkClass("/homepage")}
                                        aria-current="page"
                                    >
                                        Home Page
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/notifications"
                                        className={getLinkClass("/notifications")}
                                        aria-current="page"
                                    >
                                        Notifications
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/my-investments"
                                        className={getLinkClass("/my-investments")}
                                        aria-current="page"
                                    >
                                        Investments
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/payouts"
                                        className={getLinkClass("/payouts")}
                                        aria-current="page"
                                    >
                                        Payouts
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/enquiry"
                                        className={getLinkClass("/enquiry")}
                                        aria-current="page"
                                    >
                                        Enquiry
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/catalogs"
                                        className={getLinkClass("/catalogs")}
                                        aria-current="page"
                                    >
                                        Catalogs
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/kyc"
                                        className={getLinkClass("/kyc")}
                                        aria-current="page"
                                    >
                                        Kyc
                                    </Link>
                                </li>
                                <li onClick={handleLogout}>
                                    <Link
                                        to="/"
                                        className="block py-2 px-3 text-white bg-red-500 rounded md:bg-transparent md:text-red-600 md:p-0 dark:text-white md:dark:text-red-600  hover:text-red-600"
                                        aria-current="page"
                                    >
                                        Logout
                                    </Link>
                                </li>

                            </ul>
                        </div>
                    )}
                </div>
            </nav>
        </>
    );
};

export default NavBar;
