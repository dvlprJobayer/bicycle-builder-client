import { useEffect, useState } from "react"
import axiosBicycle from "../api/axiosBicycle";

const useToken = user => {
    const [token, setToken] = useState('');
    const email = user?.user?.email;
    useEffect(() => {
        if (email) {
            axiosBicycle(`/get-token?email=${email}`).then(res => {
                localStorage.setItem('accessToken', res.data.accessToken);
                setToken(res.data.accessToken);
            });
            axiosBicycle.put(`/user?email=${email}`, {
                email
            });
        }
    }, [email]);
    return [token];
}

export default useToken;