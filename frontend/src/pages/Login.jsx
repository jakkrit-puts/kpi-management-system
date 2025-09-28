import axios from 'axios'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import { server } from '../App'

import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { AppData } from '../context/AppContext';
import Logo from '../components/logos/Logo';

const schema = yup
    .object({
        username: yup.string().required(),
        password: yup.string().required(),
    })
    .required()

export default function Login() {

    const [btnLoading, setBtnLoading] = useState(false);
    const navigate = useNavigate()
    const { setIsAuth, setUserData, setRole } = AppData()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })

    const onSubmit = async (data) => {
        try {

            setBtnLoading(true);

            const loginReq = {
                username: data.username,
                password: data.password
            }

            const response = await axios.post(`${server}/api/v1/auth/login`, loginReq)

            if (response) {

                localStorage.setItem("accessToken", response?.data.accessToken);
                localStorage.setItem("userData", JSON.stringify(response?.data.user));

                toast.success(response?.data?.message);

                setIsAuth(true)
                setRole(response.data?.user?.role)
                setUserData(response?.data.user)
                navigate("/dashboard");
            }


        } catch (error) {
            console.log(error);

            const message = error.response?.data?.message || "Something went wrong";
            toast.error(message);
        } finally {
            setBtnLoading(false);
        }
    }

    return (
        <>
            <div className="min-h-screen flex flex-col justify-center sm:px-6 lg:px-4">
                <div className="mx-auto">
                    <Logo />
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px] p-4">
                    <div className="bg-white px-6 py-12 shadow-sm sm:rounded-lg sm:px-12">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div>
                                <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                                    Username
                                </label>
                                <div className="mt-2">
                                    <input
                                        {...register("username")}
                                        id="username"
                                        name="username"
                                        type="username"
                                        autoComplete="username"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                                    />
                                    <p className='text-red-500'>{errors.username?.message}</p>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                    Password
                                </label>
                                <div className="mt-2">
                                    <input
                                        {...register("password")}
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                                    />
                                    <p className='text-red-500'>{errors.password?.message}</p>
                                </div>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                >
                                    {btnLoading ? "Submiting..." : " Sign in"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="sm:mx-auto sm:w-full sm:max-w-[480px] p-4">
                    <div className="bg-blue-400 text-white px-4 py-4 shadow-sm sm:rounded-lg sm:px-12">
                        <h1 className='text-center'>-- User Test --</h1>
                        <p><b>Admin</b> Username: admin01, Password: Aa112233</p>
                        <p><b>User</b>  Username: user01, Password: Aa111222</p>
                    </div>
                </div>
            </div>
        </>
    )
}
