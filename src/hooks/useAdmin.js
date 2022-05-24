import { signOut } from "firebase/auth";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";
import axiosBicycle from "../api/axiosBicycle";
import Loading from "../Components/Loading/Loading";
import auth from "../Firebase/firebase.init";

const useAdmin = () => {
    const location = useLocation();
    const [user, loading] = useAuthState(auth);
    const [admin, setAdmin] = useState(true);

    if (loading) {
        return <Loading></Loading>
    }

    axiosBicycle(`/user/${user.email}`).then(res => {
        if (!res.data.admin) {
            setAdmin(false);
        }
    }).catch(err => {
        if (err?.response?.status === 403 || err?.response?.status === 401) {
            signOut(auth);
            <Navigate to="/login" state={{ from: location }} replace />;
        }
    })

    return admin;
};

export default useAdmin;