import Home from '../../Pages/Home/Home';
import Login from '../../Pages/Login/Login';
import SignUp from '../../Pages/Login/SignUp';

export const PublicRoutes = [
    { path: "/", name: "Home", Component: Home },
    { path: "/login", name: "Login", Component: Login },
    { path: "/signup", name: "SignUp", Component: SignUp },
]