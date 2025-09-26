import React from 'react'
import { NavLink } from 'react-router-dom'

export default function NotAllow() {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center sm:px-6 lg:px-4">
            <div className="mx-auto text-center">
                <h1 className="text-4xl font-bold">403</h1>
                <p>Not Allow Access, Admin Only.</p>
                <NavLink to="/" className="hover:text-blue-400 border-b">Go Back</NavLink>
            </div>
        </div>
    )
}
