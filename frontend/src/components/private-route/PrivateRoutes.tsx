import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
    let token = false;
    if (localStorage.getItem('token')) {
        console.log(localStorage.getItem('token'));
        token = true;
    }
    return (
        token ? <Outlet/> : <Navigate to='/login'/>
    )
}

export default PrivateRoutes;