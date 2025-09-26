'use client'

import { useState } from 'react'
import {
    Dialog, DialogBackdrop, DialogPanel,
    Menu, MenuButton, MenuItem, MenuItems, TransitionChild
} from '@headlessui/react'
import {
    Bars3Icon, FolderIcon, HomeIcon, UsersIcon, XMarkIcon
} from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { AppData } from '../context/AppContext'
import { NavLink } from 'react-router-dom'
import Logo from '../components/logos/Logo'

const navigationAdmin = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon, current: true },
    { name: 'Users', href: '/user', icon: UsersIcon, current: false },
    { name: 'KPIs', href: '/kpi', icon: FolderIcon, current: false },
]

const navigationUser = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon, current: true },
    { name: 'KPIs', href: '/user/kpi', icon: FolderIcon, current: false },
]


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function MainLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const { userData, logoutUser, role } = AppData()    

    return (
        <div className=''>
            {/* Mobile sidebar */}
            <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden ">
                <DialogBackdrop className="fixed inset-0 bg-gray-900/80" />
                <div className="fixed inset-0 flex">
                    <DialogPanel className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-closed:-translate-x-full">
                        <TransitionChild>
                            <div className="absolute top-0 left-full flex w-16 justify-center pt-5">
                                <button onClick={() => setSidebarOpen(false)} className="-m-2.5 p-2.5">
                                    <XMarkIcon className="h-6 w-6 text-white" />
                                </button>
                            </div>
                        </TransitionChild>

                        {/* Sidebar */}
                        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                            <div className="flex h-16 items-center justify-evenly">
                                <Logo />
                            </div>
                            <nav>
                                <ul className="space-y-1">
                                    {role === "admin" && navigationAdmin.map((item) => (
                                        <li key={item.name}>
                                            <NavLink
                                                to={item.href}
                                                className={({ isActive }) =>
                                                    classNames(
                                                        isActive
                                                            ? 'bg-gray-50 text-blue-600'
                                                            : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600',
                                                        'group flex gap-x-3 rounded-md p-2 text-sm font-semibold',
                                                    )
                                                }
                                            >
                                                <item.icon className="h-6 w-6 shrink-0" />
                                                {item.name}
                                            </NavLink>
                                        </li>
                                    ))}

                                     {role === "user" && navigationUser.map((item) => (
                                        <li key={item.name}>
                                            <NavLink
                                                to={item.href}
                                                className={({ isActive }) =>
                                                    classNames(
                                                        isActive
                                                            ? 'bg-gray-50 text-blue-600'
                                                            : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600',
                                                        'group flex gap-x-3 rounded-md p-2 text-sm font-semibold',
                                                    )
                                                }
                                            >
                                                <item.icon className="h-6 w-6 shrink-0" />
                                                {item.name}
                                            </NavLink>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>

            {/* Desktop sidebar */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col bg-white border-r border-gray-200">
                <div className="flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-4">
                    <div className="flex h-16 items-center justify-evenly">
                        <Logo />
                    </div>
                    <nav>
                        <ul className="space-y-1">
                            {role === "admin" && navigationAdmin.map((item) => (
                                <li key={item.name}>
                                    <NavLink
                                        to={item.href}
                                        className={({ isActive }) =>
                                            classNames(
                                                isActive
                                                    ? 'bg-gray-50 text-blue-600'
                                                    : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600',
                                                'group flex gap-x-3 rounded-md p-2 text-sm font-semibold',
                                            )
                                        }
                                    >
                                        <item.icon className="h-6 w-6 shrink-0" />
                                        {item.name}
                                    </NavLink>
                                </li>
                            ))}

                             {role === "user" && navigationUser.map((item) => (
                                <li key={item.name}>
                                    <NavLink
                                        to={item.href}
                                        className={({ isActive }) =>
                                            classNames(
                                                isActive
                                                    ? 'bg-gray-50 text-blue-600'
                                                    : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600',
                                                'group flex gap-x-3 rounded-md p-2 text-sm font-semibold',
                                            )
                                        }
                                    >
                                        <item.icon className="h-6 w-6 shrink-0" />
                                        {item.name}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>

            {/* Content area */}
            <div className="lg:pl-72">
                {/* Top bar */}
                <div className="sticky top-0 z-40 flex h-16 items-center justify-between lg:justify-end gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:px-6 lg:px-8">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="-m-2.5 p-2.5 text-gray-700 hover:text-gray-900 lg:hidden"
                    >
                        <Bars3Icon className="h-6 w-6" />
                    </button>

                    {/* Profile dropdown */}
                    <Menu as="div" className="relative">
                        <MenuButton className="flex items-center">
                            <img
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                                className="h-8 w-8 rounded-full bg-gray-50"
                                alt="User"
                            />
                            <span className="hidden lg:flex lg:items-center ml-4 text-sm font-semibold text-gray-900">
                                {userData?.username}
                                <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-400" />
                            </span>
                        </MenuButton>
                        <MenuItems className="absolute right-0 mt-2.5 w-32 rounded-md bg-white py-2 shadow-lg">
                            <MenuItem>
                                <a onClick={logoutUser} className="block px-3 py-1 text-sm text-gray-900 hover:bg-gray-50">
                                    Logout
                                </a>
                            </MenuItem>
                        </MenuItems>
                    </Menu>
                </div>

                {/* Page content */}
                <main className="py-10 px-4 sm:px-6 lg:px-8">
                    {children}
                </main>
            </div>
        </div>
    )
}
