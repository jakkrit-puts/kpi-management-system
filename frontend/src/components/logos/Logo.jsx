import React from 'react'

export default function Logo() {
    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" width="210" height="48" viewBox="0 0 200 48">
                <g transform="translate(8,6)">
                    <rect x="0" y="18" width="6" height="24" rx="1" fill="#EF4444" />
                    <rect x="10" y="8" width="6" height="34" rx="1" fill="#FBBF24" />
                    <rect x="20" y="0" width="6" height="42" rx="1" fill="#10B981" />
                </g>
                <text x="48" y="35" fontFamily="Inter, Arial, sans-serif" fontSize="18" fontWeight="700" fill="#0F172A">KPI</text>
                <text x="92" y="40" fontFamily="Inter, Arial, sans-serif" fontSize="12" fill="#475569">Management System</text>
            </svg>
        </>
    )
}
