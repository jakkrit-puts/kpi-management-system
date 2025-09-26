import React, { useState } from 'react';
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

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

const kpiStatusData = [
  { _id: "Off Track", count: 6 },
  { _id: "At Risk", count: 1 },
  { _id: "On Track", count: 18 },
];

const achievementData = [
  { month: "Jan", percent: 50 },
  { month: "Feb", percent: 65 },
  { month: "Mar", percent: 48 },
  { month: "Apr", percent: 70 },
];


const totalAchieved = Math.round(
  (kpiStatusData.find(k => k._id === "On Track")?.count || 0) /
  kpiStatusData.reduce((sum, k) => sum + k.count, 0) * 100
);

export default function Dashboard() {
  const [filterUser, setFilterUser] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  const doughnutData = {
    labels: kpiStatusData.map(item => item._id),
    datasets: [
      {
        label: 'KPI Status',
        data: kpiStatusData.map(item => item.count),
        backgroundColor: ['#EF4444', '#FBBF24', '#10B981'],
        borderColor: ['#B91C1C', '#B45309', '#047857'],
        borderWidth: 1,
      },
    ],
  };

  const doughnutOptions = { responsive: true, maintainAspectRatio: false };

  const lineData = {
    labels: achievementData.map(item => item.month),
    datasets: [
      {
        label: 'KPI Achievement %',
        data: achievementData.map(item => item.percent),
        fill: false,
        borderColor: '#3B82F6',
        backgroundColor: '#3B82F6',
        tension: 0.2,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    plugins: { legend: { display: true } },
    scales: { y: { beginAtZero: true, max: 100 } },
  };

  return (
    <MainLayout>
      <div className="px-6 py-2 sm:px-6">
        <h3 className="text-base/7 font-semibold text-gray-900 border-b pb-1">KPI Information</h3>
      </div>
      <div className="p-6 space-y-6">
        <div className="flex gap-4">
          <select className="border rounded px-2 py-1" value={filterUser} onChange={e => setFilterUser(e.target.value)}>
            <option>All Users</option>
            <option>User A</option>
            <option>User B</option>
          </select>
          <select className="border rounded px-2 py-1" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
            <option>All Status</option>
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
              {kpiStatusData.map(item => {
                let color = '';
                if (item._id === 'Off Track') color = 'bg-red-500';
                else if (item._id === 'At Risk') color = 'bg-yellow-400';
                else if (item._id === 'On Track') color = 'bg-green-500';

                return (
                  <div key={item._id} className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${color}`}></span>
                    <span>{item._id}: {item.count}</span>
                  </div>
                );
              })}
            </div>
            <div className="mt-2">
              <span className="text-sm font-medium">Total Achieved: {totalAchieved}%</span>
              <div className="w-full bg-gray-200 rounded-full h-4 mt-1">
                <div className="bg-blue-500 h-4 rounded-full" style={{ width: `${totalAchieved}%` }}></div>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded shadow space-y-4">
            <h2 className="font-semibold">KPI Achievement Over Time</h2>
            <div className="w-full h-64">
              <Line data={lineData} options={lineOptions} />
            </div>
            <div className="text-gray-700">
              Latest Achievement: {achievementData[achievementData.length - 1].percent}%
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
