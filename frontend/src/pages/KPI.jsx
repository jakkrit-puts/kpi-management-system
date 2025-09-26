import MainLayout from "../layouts/MainLayout";
import { AppData } from "../context/AppContext";
import { useEffect } from "react";
import { formatDate } from '../utils/utils'
import KPIAddEditModal from "../components/kpi/KPIAddEditModal";
import { Button } from "@headlessui/react";
import { TrashIcon } from "@heroicons/react/24/outline";

export default function KPI() {

  const { fetchKpiList, kpiList, removeKPI } = AppData()

  useEffect(() => {
    fetchKpiList()
  }, [])

  return (
    <MainLayout>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center border-b pb-1">
          <div className="sm:flex-auto ">
            <h1 className="text-base font-semibold text-gray-900">KPI List</h1>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <KPIAddEditModal action={"Add"} />
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
                      Title
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Description
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Target Value
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Actual Value
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Assigned
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Start & End Date
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                      Action
                    </th>
                    <th scope="col" className="py-3.5 pr-4 pl-3 sm:pr-0">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {kpiList && kpiList.map((k, index) => (
                    <tr key={k._id}>
                      <td className="text-left text-sm font-semibold">
                        {index + 1}
                      </td>
                      <td className="py-4 pr-1 pl-4 text-sm font-medium  text-gray-900 sm:pl-0">
                        {k.title}
                      </td>
                      <td className="px-3 py-4 text-sm  text-gray-500">{k.description}</td>
                      <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">{k.target_value}</td>
                      <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">{k.actual_value}</td>
                      <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">{k.status}</td>
                      <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">{k.assigned_user?.username}</td>
                      <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">{formatDate(k.start_date)} - {formatDate(k.end_date)}</td>
                      <td className="py-4 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pr-0 space-x-1">
                        <KPIAddEditModal action={"Edit"} data={k} id={k._id} />
                        <Button
                          onClick={() => removeKPI(k._id)}
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
