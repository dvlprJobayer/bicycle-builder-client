import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './Components/Footer/Footer';
import Navbar from './Components/Navbar/Navbar';
import { PublicRoutes } from './Routes/PublicRoutes/PublicRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './Pages/Dashboard/Dashboard';
import RequireAuth from './Pages/Login/RequireAuth';
import MyProfile from './Pages/Dashboard/MyProfile';

function App() {
    return (
        <Navbar>
            <Routes>
                {
                    PublicRoutes.map(({ path, Component }, index) => <Route key={index} path={path} element={<Component />} />)
                }
                <Route
                    path='/dashboard'
                    element={<RequireAuth>
                        <Dashboard />
                    </RequireAuth>}>
                    <Route index element={<MyProfile />} />
                </Route>
            </Routes>
            <Footer />
            <ToastContainer />
        </Navbar>
    );
}

export default App;
