import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './Components/Footer/Footer';
import Navbar from './Components/Navbar/Navbar';
import { PublicRoutes } from './Routes/PublicRoutes/PublicRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './Pages/Dashboard/Dashboard';
import RequireAuth from './Authentication/RequireAuth';
import MyProfile from './Pages/Dashboard/MyProfile';
import Users from './Pages/Dashboard/Admin/Users';
import RequireAdmin from './Authentication/RequireAdmin';
import AddProduct from './Pages/Dashboard/Admin/AddProduct';
import ManageProduct from './Pages/Dashboard/Admin/ManageProduct';

function App() {
    return (
        <Navbar>
            <Routes>
                {
                    PublicRoutes.map(({ path, Component }, index) => <Route key={index} path={path} element={<Component />} />)
                }
                <Route path='/dashboard' element={<RequireAuth><Dashboard /></RequireAuth>}>
                    <Route index element={<RequireAuth><MyProfile /></RequireAuth>} />
                    <Route path='users' element={<RequireAdmin><Users /></RequireAdmin>} />
                    <Route path='add-product' element={<RequireAdmin><AddProduct /></RequireAdmin>} />
                    <Route path='manage' element={<RequireAdmin><ManageProduct /></RequireAdmin>} />
                </Route>
            </Routes>
            <Footer />
            <ToastContainer />
        </Navbar>
    );
}

export default App;
