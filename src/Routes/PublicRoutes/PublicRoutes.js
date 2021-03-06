import Blogs from '../../Pages/Blogs/Blogs';
import Home from '../../Pages/Home/Home';
import Login from '../../Pages/Login/Login';
import SignUp from '../../Pages/Login/SignUp';
import MyPortfolio from '../../Pages/MyPortfolio/MyPortfolio';
import Products from '../../Pages/Products/Products';

export const PublicRoutes = [
    { path: "/", name: "Home", Component: Home },
    { path: "/login", name: "Login", Component: Login },
    { path: "/signup", name: "SignUp", Component: SignUp },
    { path: "/products", name: "Products", Component: Products },
    { path: "/blogs", name: "Blogs", Component: Blogs },
    { path: "/portfolio", name: "Portfolio", Component: MyPortfolio }
]