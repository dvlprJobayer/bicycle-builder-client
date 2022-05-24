import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, NavLink } from 'react-router-dom';
import auth from '../../Firebase/firebase.init';

const Navbar = ({ children }) => {

    const [user] = useAuthState(auth);

    const menuItem = <>
        <li><NavLink className="rounded-lg" to="/">Home</NavLink></li>
        {
            user ?
                <>
                    <li><NavLink className="rounded-lg" to="/dashboard">Dashboard</NavLink></li>
                    <button onClick={() => signOut(auth)} className='btn btn-primary btn-outline'>Logout</button>
                </>
                :
                <li><NavLink className="rounded-lg" to="/login">Login</NavLink></li>
        }
    </>

    return (
        <div className="drawer drawer-end">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                {/* <!-- Navbar --> */}
                <div className="w-full navbar">
                    <div className="container mx-auto">
                        <div className="flex-1 px-2 mx-2"><Link to="/" className="text-2xl">Bicycle Builder</Link></div>
                        <div className="flex-none lg:hidden">
                            <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                            </label>
                        </div>
                        <div className="flex-none hidden lg:block">
                            <ul className="menu menu-horizontal gap-x-2">
                                {/* Navbar menu content here */}
                                {menuItem}
                            </ul>
                        </div>
                    </div>
                </div>
                {/* <!-- Page content here --> */}
                {children}
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
                <ul className="menu p-4 overflow-y-auto w-64 bg-base-100">
                    {/* <!-- Sidebar content here --> */}
                    {menuItem}
                </ul>

            </div>
        </div>
    );
};

export default Navbar;