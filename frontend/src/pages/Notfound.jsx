import { NavLink } from 'react-router-dom'

export default function Notfound() {
    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold">404</h1>
            <p className="mt-2 text-lg">Page not found...</p>
            <NavLink to="/" className="flex items-center justify-between hover:text-blue-400 border-b">Back</NavLink>
        </div>
    )
}
