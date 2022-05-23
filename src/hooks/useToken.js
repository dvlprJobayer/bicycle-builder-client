import { useEffect, useState } from "react"
import axiosBicycle from "../api/axiosBicycle";

const useToken = user => {
    const [token, setToken] = useState('');
    useEffect(() => {
        if (user) {
            axiosBicycle.post('/user', {
                email: user.user.email,
                role: 'admin'
            });
            axiosBicycle('/get-token').then(res => {
                localStorage.setItem('accessToken', res.data.accessToken);
                setToken(res.data.accessToken);
            });
        }
    }, [user]);
    return [token];
}

export default useToken;