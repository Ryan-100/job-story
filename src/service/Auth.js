import CryptoJS from "crypto-js";
import Cookies from "js-cookie";
import {useRouter} from 'next/router';
import {useEffect} from 'react';

export const setToken = ({j_token}) => {
    const copherAccessToken = CryptoJS.AES.encrypt(
        JSON.stringify(j_token),
        "juncture_portal_j_token"
    );
    const rememberMe = getRememberMe();
    Cookies.set("juncture_portal_j_token", copherAccessToken.toString(), {
        expires: rememberMe ? 30 : 1,
    });
};

export const getToken = () => {
    const sessi = Cookies.get("juncture_portal_j_token");
    if (!sessi) return false;
    const bytes = CryptoJS.AES.decrypt(sessi, "juncture_portal_j_token");
    try {
        const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        return decryptedData;
    } catch (err) {
        console.log("error", err);
    }
};

export const setUserInfo = ({user_data}) => {
    const cipherUserInfo = CryptoJS.AES.encrypt(
        JSON.stringify(user_data),
        "user_info"
    );
    const rememberMe = getRememberMe();
    Cookies.set("user_info", cipherUserInfo.toString(), {
        expires: rememberMe ? 30 : 1,
    });
};

export const getUserInfo = () => {
    const sessi = Cookies.get("user_info");
    if (!sessi) return false;
    const bytes = CryptoJS.AES.decrypt(sessi, "user_info");
    try {
        const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        return decryptedData;
    } catch (err) {
        console.log("error", err);
    }
};

export const setJobId = ({job_id}) => {
    const cipherUserInfo = CryptoJS.AES.encrypt(JSON.stringify(job_id), "JOB_ID");
    Cookies.set("JOB_ID", cipherUserInfo.toString(), {expires: 7});
};

export const getJobId = () => {
    const sessi = Cookies.get("JOB_ID");
    if (!sessi) return false;
    const bytes = CryptoJS.AES.decrypt(sessi, "JOB_ID");
    try {
        const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        return decryptedData;
    } catch (err) {
        console.log("error", err);
    }
};

export const setRememberMe = (data) => {
    localStorage.setItem("remember_me", JSON.stringify(data));
};

export const getRememberMe = () => {
    return JSON.parse(localStorage.getItem("remember_me"));
};

export const setLocalStorage = (name, data) => {
    localStorage.setItem(name, JSON.stringify(data));
};

export const getLocalStorageData = (name) => {
    return JSON.parse(localStorage.getItem(name));
};

export const removeLocalStorage = (name) => {
    localStorage.removeItem(name);
};

export const logout = () => {
    setRememberMe(false);
    Cookies.remove("user_info");
    Cookies.remove("juncture_portal_j_token");
    Cookies.remove("refresh");
    Cookies.remove("JOB_ID");
    localStorage.removeItem("juncture_portal_j_token");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user_info");
};

export const isAuthenticated = () => {
    const token = getToken();
    return token ? true : false;
}

const PrivateRoute = ({token, children}) => {
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated()) {
            router.push('/login');
        }
    }, []);

    return isAuthenticated() ? children : null;
}

export default PrivateRoute;
