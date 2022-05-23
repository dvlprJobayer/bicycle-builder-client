import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div>
            <div className="drawer drawer-mobile">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content mt-2">
                    {/* <!-- Page content here --> */}
                    <div className='text-center mb-4 lg:hidden'>
                        <label for="my-drawer-2" className="btn btn-primary drawer-button">Dashboard Menu</label>
                    </div>

                    <Outlet />

                </div>
                <div className="drawer-side">
                    <label for="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 overflow-y-auto w-64 bg-base-100 text-base-content">
                        {/* <!-- Sidebar content here --> */}
                        <li><NavLink to="/dashboard">My Profile</NavLink></li>
                        <li><NavLink to="/dashboard/my-orders">My Orders</NavLink></li>
                        <li><NavLink to="/dashboard/add-review">Add Review</NavLink></li>
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;