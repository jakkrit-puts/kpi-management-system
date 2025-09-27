import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { toast } from 'react-toastify'

import api from "../../api-intercepter";
import { AppData } from "../../context/AppContext";
import { PencilIcon, PlusIcon } from "@heroicons/react/24/outline";

const schemaAdd = yup
  .object({
    username: yup.string().required(),
    password: yup.string().required(),
    email: yup.string().required(),
    role_id: yup.string().required(),
  })

const schemaEdit = yup
  .object({
    password: yup.string().optional(),
    role_id: yup.string().required(),
  })

export default function UserAddEditModal({ action, id = "" }) {

  const schema = action === "Add" ? schemaAdd : schemaEdit;

  const [isOpen, setIsOpen] = useState(false);
  const { fetchUserList } = AppData()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(schema),
  })

  const roles = [
    { id: "64a123456789abcdef000001", name: "Admin" },
    { id: "64a123456789abcdef000002", name: "User" },
  ];

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  const onSubmit = async (data) => {
    try {

      let response;
      if (action === "Add") {
        response = await api.post(`/api/v1/users`, data);
      } else if (action === "Edit") {
        response = await api.put(`/api/v1/users/${id}`, data);
      }

      if (response) {
        toast.success(response?.data?.message);
      }

      close()
      fetchUserList()
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

        {action === "Add" ? (<PlusIcon width={15} />) : <PencilIcon width={15} />}
      </Button>

      {/* Add  */}
      {action === "Add" && (
        <Dialog open={isOpen} className="relative" onClose={close}>
          <div className="fixed inset-0 " />
          <div className="fixed inset-0 z-10 w-screen ">
            <div className="flex min-h-full items-center justify-center p-4">
              <DialogPanel className="w-full max-w-lg rounded-xl bg-white p-6 shadow-md">
                <DialogTitle
                  as="h3"
                  className="text-lg font-semibold leading-6 text-gray-900 border-b"
                >
                  Add User
                </DialogTitle>

                <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      {...register("username")}
                      className="block w-full rounded-md border-gray-300 px-3 py-1.5 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                    <p className='text-red-500'>{errors.username?.message}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      autoComplete=""
                      {...register("email")}
                      className="block w-full rounded-md border-gray-300 px-3 py-1.5 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                    <p className='text-red-500'>{errors.email?.message}</p>
                  </div>


                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      {...register("password")}
                      autoComplete="current-password"
                      className="block w-full rounded-md border-gray-300 px-3 py-1.5 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                    <p className='text-red-500'>{errors.password?.message}</p>
                  </div>


                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Role
                    </label>
                    <select
                      name="role_id"
                      {...register("role_id")}
                      className="block w-full rounded-md border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="">Select a role</option>
                      {roles.map((role) => (
                        <option key={role.id} value={role.id}>
                          {role.name}
                        </option>
                      ))}
                    </select>
                    <p className='text-red-500'>{errors.role_id?.message}</p>
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
      )}


      {/* Edit  */}
      {action === "Edit" && (
        <Dialog open={isOpen} className="relative" onClose={close}>
          <div className="fixed inset-0 " />
          <div className="fixed inset-0 z-10 w-screen ">
            <div className="flex min-h-full items-center justify-center p-4">
              <DialogPanel className="w-full max-w-lg rounded-xl bg-white p-6 shadow-md">
                <DialogTitle
                  as="h3"
                  className="text-lg font-semibold leading-6 text-gray-900 border-b"
                >
                  {action} User
                </DialogTitle>

                <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      {...register("password")}
                      autoComplete="current-password"
                      className="block w-full rounded-md border-gray-300 px-3 py-1.5 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                    <p className='text-red-500'>{errors.password?.message}</p>
                  </div>


                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Role
                    </label>
                    <select
                      name="role_id"
                      {...register("role_id")}
                      className="block w-full rounded-md border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="">Select a role</option>
                      {roles.map((role) => (
                        <option key={role.id} value={role.id}>
                          {role.name}
                        </option>
                      ))}
                    </select>
                    <p className='text-red-500'>{errors.role_id?.message}</p>
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
      )}
    </>
  );
}
