import MainLayout from "../layouts/MainLayout";
import UserAddEditModal from "../components/users/UserAddEditModal";
import { AppData } from "../context/AppContext";
import { useEffect } from "react";
import { Button } from "@headlessui/react";
import { TrashIcon } from "@heroicons/react/24/outline";


export default function User() {

  const { userList, fetchUserList, removeUser } = AppData()

  useEffect(() => {
    fetchUserList()
  }, [])


  return (
    <MainLayout>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center border-b pb-1">
          <div className="sm:flex-auto ">
            <h1 className="text-base font-semibold text-gray-900">Users List</h1>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <UserAddEditModal action={"Add"} />
          </div>
        </div>
        <div className="mt-2 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="relative min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th scope="col" className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                      #
                    </th>
                    <th scope="col" className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Email
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Role
                    </th>
                    <th scope="col" className="text-center text-sm font-semibold text-gray-900">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {userList && userList.map((u, index) => (
                    <tr key={u._id}>
                       <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-0">
                        {index + 1}
                      </td>
                      <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-0">
                        {u.username}
                      </td>
                      <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">{u.email}</td>
                      <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">{u.role_id?.name}</td>
                      <td className=" text-center text-sm font-medium whitespace-nowrap sm:pr-0 space-x-1">
                        <UserAddEditModal action={"Edit"} id={u._id} />
                        <Button
                          onClick={() => removeUser(u._id)}
                          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white 
                          hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                          <TrashIcon width={15} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
