import React, { useState } from 'react';
import { signOut } from 'firebase/auth';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import axiosBicycle from '../../../api/axiosBicycle';
import Loading from '../../../Components/Loading/Loading';
import auth from '../../../Firebase/firebase.init';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';

const Users = () => {

    const location = useLocation();

    const [user] = useAuthState(auth);

    const { data, isLoading, refetch, error } = useQuery(['users', user], () => axiosBicycle('/user'));

    if (error?.response?.status === 403 || error?.response?.status === 401) {
        signOut(auth);
        <Navigate to="/login" state={{ from: location }} replace />;
    }

    const users = data?.data;

    const makeAdmin = id => {
        axiosBicycle.patch(`/user/${id}`).then(res => {
            refetch();
            toast.success('Successfully made admin');
        })
    }

    const [id, setId] = useState('');

    const removeUser = id => {
        axiosBicycle.delete(`/user/${id}`).then(res => {
            refetch();
            toast.success('Successfully user deleted');
        })
    }

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className='mx-4'>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users?.map((user, index) => <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.admin ? 'Admin' : 'User'}</td>
                                <td>{!user.admin && <button onClick={() => makeAdmin(user._id)} className="btn btn-primary btn-xs">Make Admin</button>}</td>
                                <td>{!user.admin && <label onClick={() => setId(user._id)} htmlFor="delete-user-modal" className="btn modal-button btn-sm text-white btn-error"><RiDeleteBin6Fill className='text-xl' /></label>}</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>

            {/* <!-- Put this part before </body> tag-- > */}
            <input type="checkbox" id="delete-user-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box max-w-md">
                    <h3 className="font-bold text-lg text-error">Are you sure you want to delete the user!</h3>
                    <div className='flex mt-4 gap-x-4 justify-center'>
                        <label htmlFor="delete-user-modal" onClick={() => removeUser(id)} className="btn btn-error text-white">Delete!</label>
                        <label htmlFor="delete-user-modal" className="btn">Cancel!</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Users;