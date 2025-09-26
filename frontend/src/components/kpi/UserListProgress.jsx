import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useEffect, useState } from "react";
import { ListBulletIcon } from "@heroicons/react/24/outline";
import api from "../../api-intercepter";
import { server } from "../../App";

export default function UserListProgress({ id }) {

    const [isOpen, setIsOpen] = useState(false);
    const [progressList, setProgressList] = useState(null);

    useEffect(() => {
        if (isOpen && id) {
            fetchProgressList(id);
        }
    }, [isOpen, id]);


    function open() {
        setIsOpen(true);
    }

    function close() {
        setIsOpen(false);
    }

    async function fetchProgressList(id) {
        try {
            if (!id) return;

            const response = await api.get(`${server}/api/v1/kpis/${id}/updates`);

            setProgressList(response.data?.kpis_progress);
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            <Button
                onClick={open}
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white 
                   hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
                <ListBulletIcon width={15} />
            </Button>

            <Dialog open={isOpen} className="relative" onClose={close}>

                <div className="fixed inset-0 z-10 w-screen ">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel className="w-full max-w-lg rounded-xl bg-white p-6 shadow-md">
                            <DialogTitle
                                as="h3"
                                className="text-lg font-semibold leading-6 text-gray-900 border-b"
                            >
                                Progress List
                            </DialogTitle>
                            <table className="relative min-w-full divide-y divide-gray-300">
                                <thead>
                                    <tr>
                                        <th scope="col" className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                            #
                                        </th>
                                        <th scope="col" className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                            Value
                                        </th>
                                         <th scope="col" className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                            Comment
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {progressList && progressList.map((k, index) => (
                                        <tr key={k._id}>
                                            <td className="text-left text-sm font-semibold">
                                                {index + 1}
                                            </td>
                                            <td className="px-3 py-4 text-sm  text-gray-500">{k.updated_value}</td>
                                            <td className="px-3 py-4 text-sm  text-gray-500">{k.comment}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    );
}
