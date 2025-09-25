import { PlusIcon } from "@heroicons/react/24/outline";
import MainLayout from "../layouts/MainLayout";

const users = [
  { username: 'Lindsay Walton', email: 'lindsay.walton@example.com', role: 'Member' },
  { username: 'Courtney Henry', email: 'courtney.henry@example.com', role: 'Admin' },
  { username: 'Tom Cook', email: 'tom.cook@example.com', role: 'Member' },
  { username: 'Whitney Francis', email: 'whitney.francis@example.com', role: 'Admin' },
  { username: 'Leonard Krasner', email: 'leonard.krasner@example.com', role: 'Owner' },
  { username: 'Floyd Miles', email: 'floyd.miles@example.com', role: 'Member' },
]

export default function KPI() {



  return (
    <MainLayout>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center border-b pb-1">
          <div className="sm:flex-auto ">
            <h1 className="text-base font-semibold text-gray-900">KPI List</h1>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              className="flex items-center justify-between gap-2 rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              <PlusIcon width={15} height={15} />
              Add
            </button>
          </div>
        </div>
        <div className="mt-2 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="relative min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th scope="col" className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Email
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Role
                    </th>
                    <th scope="col" className="py-3.5 pr-4 pl-3 sm:pr-0">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.map((u) => (
                    <tr key={u.email}>
                      <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-0">
                        {u.username}
                      </td>
                      <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">{u.email}</td>
                      <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">{u.role}</td>
                      <td className="py-4 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pr-0">
                        <a href="#" className="text-blue-600 hover:text-blue-900">
                          Edit<span className="sr-only">, {u.name}</span>
                        </a>
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
