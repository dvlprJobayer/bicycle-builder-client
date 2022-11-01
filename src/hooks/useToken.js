import { useEffect, useState } from "react"
import axiosBicycle from "../api/axiosBicycle";

const useToken = user => {
    const [tokenLoading, setTokenLoading] = useState(false);
    const [token, setToken] = useState('');
    const email = user?.user?.email;
    useEffect(() => {
        if (email) {
            setTokenLoading(true);
            axiosBicycle(`/get-token?email=${email}`).then(res => {
                localStorage.setItem('accessToken', res.data.accessToken);
                setToken(res.data.accessToken);
                setTokenLoading(false);
            }).catch(err => setTokenLoading(false));
            axiosBicycle.put(`/user?email=${email}`, {
                email
            });
        }
    }, [email]);
    return [token, tokenLoading];
}

export default useToken;