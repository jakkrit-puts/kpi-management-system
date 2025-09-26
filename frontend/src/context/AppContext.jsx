import { createContext, useContext, useEffect, useState } from "react";
import { server } from "../App";
import api from "../api-intercepter";
import { toast } from "react-toastify";

const AppContext = createContext(null)

export const AppProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuth, setIsAuth] = useState(false)

    const [userList, setUserList] = useState(null);


    async function fetchUser() {
        setLoading(true)
        try {
            const { data } = await api.get(`${server}/api/v1/auth/profile`);

            setUserData(data.user);
            setIsAuth(true);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    async function fetchUserList() {
        try {
            const { data } = await api.get(`${server}/api/v1/users`);

            setUserList(data?.users);
        } catch (error) {
            console.log(error);
        }
    }

    async function removeUser(id) {
        try {

            if(!id) return;

            const response = await api.delete(`${server}/api/v1/users/${id}`);

            console.log({response});
            

            if (response) {
                toast.success(response?.data?.message);
            }

            fetchUserList()
        } catch (error) {
            console.log(error);
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
        fetchUserList()
    }, []);

    return <AppContext.Provider value={{ setIsAuth, isAuth, userData, setUserData, loading, logoutUser, userList, fetchUserList, removeUser }}>
        {children}
    </AppContext.Provider>
}

export const AppData = () => {
    const context = useContext(AppContext)

    if (!context) throw new Error("AppData must be used within an AppProvider");

    return context;
}