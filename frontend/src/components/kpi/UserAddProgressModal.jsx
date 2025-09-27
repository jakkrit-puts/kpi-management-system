import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { toast } from 'react-toastify'

import api from "../../api-intercepter";
import { AppData } from "../../context/AppContext";
import { PlusIcon } from "@heroicons/react/24/outline";

const schemaAdd = yup
    .object({
        comment: yup.string().nullable(),
        updated_value: yup
            .number()
            .transform((value, originalValue) =>
                originalValue === "" ? undefined : value
            )
            .required(),
    })

export default function UserAddProgressModal({ id }) {


    const [isOpen, setIsOpen] = useState(false);
    const { fetchKpiList } = AppData()

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schemaAdd),
    })

    function open() {
        setIsOpen(true);
    }

    function close() {
        setIsOpen(false);
        reset()
    }

    const onSubmit = async (data) => {
        try {

            const response = await api.post(`/api/v1/kpis/${id}/updates`, data);

            if (response) {
                toast.success(response?.data?.message);
            }

            close()
            fetchKpiList()
            reset()
        } catch (error) {
            const message = error.response?.data?.message || "Something went wrong";
            toast.error(message);
        }
    }

    return (
        <>
            <Button
                onClick={open}
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white 
                   hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
                <PlusIcon width={15} />
            </Button>

            <Dialog open={isOpen} className="relative" onClose={close}>
                <div className="fixed inset-0 z-10 w-screen ">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel className="w-full max-w-lg rounded-xl bg-white p-6 shadow-md">
                            <DialogTitle
                                as="h3"
                                className="text-lg font-semibold leading-6 text-gray-900 border-b"
                            >
                                Update Progress KPI
                            </DialogTitle>

                            <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Actual Value
                                    </label>
                                    <input
                                        type="number"
                                        name="updated_value"
                                        autoComplete=""
                                        {...register("updated_value")}
                                        className="block w-full rounded-md border-gray-300 px-3 py-1.5 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                    <p className='text-red-500'>{errors.updated_value?.message}</p>
                                </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Comment
                                    </label>
                                    <input
                                        type="text"
                                        name="comment"
                                        autoComplete=""
                                        {...register("comment")}
                                        className="block w-full rounded-md border-gray-300 px-3 py-1.5 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                    <p className='text-red-500'>{errors.comment?.message}</p>
                                </div>

                                <div className="mt-6 flex justify-end gap-2">
                                    <Button
                                        type="button"
                                        onClick={close}
                                        className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-300 focus:outline-none"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    >
                                        Save
                                    </Button>
                                </div>
                            </form>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    );
}
