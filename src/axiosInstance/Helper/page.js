import cookie from "js-cookie";

export const setCookie = (key, value, options = {}) => {
    if (typeof window !== "undefined") {
        cookie.set(key, value, { expires: 1, ...options });
    }
};

export const removeCookie = (key) => {
    if (typeof window !== "undefined") {
        cookie.remove(key);
    }
};

export const getCookie = (key, req) => {
    return typeof window !== "undefined" ? getCookieFromBrowser(key) : getCookieFromServer(key, req);
};

export const getCookieFromBrowser = (key) => {
    return cookie.get(key);
};

export const getCookieFromServer = (key, req) => {
    if (!req.headers.cookie) {
        return undefined;
    }

    const token = req.headers.cookie.split(";").find((c) => c.trim().startsWith(`${key}=`));
    return token ? token.split("=")[1] : undefined;
};

export const setLocalStorage = (key, value) => {
    if (typeof window !== "undefined") {
        localStorage.setItem(key, JSON.stringify(value));
    }
};

export const getLocalStorage = (key) => {
    if (typeof window !== "undefined") {
        const storedValue = localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : false;
    }
};

export const removeLocalStorage = (key) => {
    if (typeof window !== "undefined") {
        localStorage.removeItem(key);
    }
};

export const authenticate = (response, next) => {
    setCookie("token", response.data.token);
    setLocalStorage("user", response.data);
    next();
};

export const isAuth = () => {
    if (typeof window !== "undefined") {
        const cookieChecked = getCookie("token", null);
        return cookieChecked && getLocalStorage("user");
    }
};

export const logout = () => {
    removeCookie("token");
    removeLocalStorage("user");
    removeLocalStorage("user_details");
};

export const updateUser = (user, next) => {
    if (typeof window !== "undefined") {
        const storedUser = getLocalStorage("user");
        if (storedUser) {
            setLocalStorage("user", user);
            next();
        }
    }
};