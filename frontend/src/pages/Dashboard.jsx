import React, { useEffect, useState } from 'react';
import { Doughnut, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from 'chart.js';
import MainLayout from '../layouts/MainLayout'
import { AppData } from '../context/AppContext';
import api from '../api-intercepter';
import { server } from '../App';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

const lineOptions = {
  responsive: true,
  plugins: { legend: { display: true } },
  scales: { y: { beginAtZero: true, max: 100 } },
}

const doughnutOptions = { responsive: true, maintainAspectRatio: false };

export default function Dashboard() {
  const [filterUser, setFilterUser] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [kpiStatusData, setKpiStatusData] = useState(null)
  const [achievementData, setAchievementData] = useState(null)


  const { fetchUserList, userList, role } = AppData()


  const analyzeStatus = async (filterUser, filterStatus) => {

    let response;

    if (filterUser === "All" && filterStatus === "All") {
      response = await api.get(`${server}/api/v1/dashboard/analytics/status`);
    } else {
      const params = new URLSearchParams();

      if (filterUser !== "All") params.append("userId", filterUser);
      if (filterStatus !== "All") params.append("status", filterStatus);

      response = await api.get(
        `${server}/api/v1/dashboard/analytics/status?${params.toString()}`
      );
    }

    setKpiStatusData(response?.data)
  }

  const analyzeAchievementTrends = async (filterUser, filterStatus) => {

    let response;

    if (filterUser === "All" && filterStatus === "All") {
      response = await api.get(`${server}/api/v1/dashboard/analytics/trends`);
    } else {
      const params = new URLSearchParams();

      if (filterUser !== "All") params.append("userId", filterUser);
      if (filterStatus !== "All") params.append("status", filterStatus);

      response = await api.get(
        `${server}/api/v1/dashboard/analytics/trends?${params.toString()}`
      );
    }

    setAchievementData(response?.data)
  }

  const doughnutData = {
    labels: kpiStatusData?.map(item => item.status),
    datasets: [
      {
        label: 'KPI Status',
        data: kpiStatusData?.map(item => item.count),
        backgroundColor: ['#10B981', '#FBBF24', '#EF4444'],
        borderColor: ['#047857', '#B45309', '#B91C1C'],
        borderWidth: 1,
      },
    ],
  };


  const lineData = {
    labels: achievementData?.map(item => item.month),
    datasets: [
      {
        label: 'KPI Achievement %',
        data: achievementData?.map(item => item.avgProgress),
        fill: false,
        borderColor: '#3B82F6',
        backgroundColor: '#3B82F6',
        tension: 0.2,
      },
    ],
  };


  useEffect(() => {
    fetchUserList()

    analyzeStatus(filterUser, filterStatus)
    analyzeAchievementTrends(filterUser, filterStatus)
  }, [filterUser, filterStatus])

  return (
    <MainLayout>
      <div className="px-6 py-2 sm:px-6">
        <h3 className="text-base/7 font-semibold text-gray-900 border-b pb-1">KPI Information</h3>
      </div>
      <div className="p-6 space-y-6">
        <div className="flex gap-4">

          {role && role === "admin" && (
            <select className="border rounded px-2 py-1" value={filterUser} onChange={e => setFilterUser(e.target.value)}>
              <option value="All">All Users</option>
              {userList && userList.map((u) => (
                <option key={u._id} value={u._id}>
                  {u.username}
                </option>
              ))}
            </select>
          )}

          <select className="border rounded px-2 py-1" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
            <option value="All">All Status</option>
            <option>On Track</option>
            <option>At Risk</option>
            <option>Off Track</option>
          </select>
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded shadow space-y-4">
            <h2 className="font-semibold">KPI Overview</h2>
            <div className="w-full h-64">
              <Doughnut data={doughnutData} options={doughnutOptions} />
            </div>
            <div className="flex gap-4">
              {kpiStatusData && kpiStatusData.map(item => {
                let color = '';
                if (item.status === 'Off Track') color = 'bg-red-500';
                else if (item.status === 'At Risk') color = 'bg-yellow-400';
                else if (item.status === 'On Track') color = 'bg-green-500';

                return (
                  <div key={item.status} className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${color}`}></span>
                    <span>{item.status}: {item.count}</span>
                  </div>
                );
              })}
            </div>
            {/* <div className="mt-2">
              <span className="text-sm font-medium">Total Achieved: {totalAchieved}%</span>
              <div className="w-full bg-gray-200 rounded-full h-4 mt-1">
                <div className="bg-blue-500 h-4 rounded-full" style={{ width: `${totalAchieved}%` }}></div>
              </div>
            </div> */}
          </div>

          <div className="bg-white p-4 rounded shadow space-y-4">
            <h2 className="font-semibold">KPI Achievement Over Time</h2>
            <div className="w-full h-64">
              <Line data={lineData} options={lineOptions} />
            </div>
            {/* <div className="text-gray-700">
              Latest Achievement: {achievementData[achievementData.length - 1].percent}%
            </div> */}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
