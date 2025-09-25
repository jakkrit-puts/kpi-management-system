import { createContext, useContext, useEffect, useState } from "react";
import { server } from "../App";
import axios from "axios";

const AppContext = createContext(null)

export const AppProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuth, setIsAuth] = useState(false)

    async function fetchUser() {
        setLoading(true)
        try {

            const token = localStorage.getItem("accessToken");

            const { data } = await axios.get(`${server}/api/v1/auth/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setUserData(data.user);
            setIsAuth(true);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    async function logoutUser() {
        try {
            setIsAuth(false);
            setUserData(null)
            localStorage.clear()
        } catch (error) {

        }
    }

    useEffect(() => {
        fetchUser();
    }, []);

    return <AppContext.Provider value={{ setIsAuth, isAuth, userData, setUserData, loading, logoutUser }}>
        {children}
    </AppContext.Provider>
}

export const AppData = () => {
    const context = useContext(AppContext)

    if (!context) throw new Error("AppData must be used within an AppProvider");

    return context;
}