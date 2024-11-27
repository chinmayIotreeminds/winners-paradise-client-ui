import React, { useEffect, useState } from "react";
import LoginContext from "./loginContext";

const LoginProvider = ({ children }) => {

    const [isLogedIn, setisLogedIn] = useState(false);

    const toggled = () => {
        setisLogedIn(!isLogedIn);
    };

    return (
        <LoginContext.Provider value={{ toggled, isLogedIn }}>
            {children}
        </LoginContext.Provider>
    );
};

export default LoginProvider;
