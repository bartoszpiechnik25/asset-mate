import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
    let auth = {token: false};
    if (localStorage.getItem('token')) {
        auth.token = true;
        console.log(localStorage.getItem('token'));
    }
    return (
        auth.token ? <Outlet/> : <Navigate to='/login'/>
    )
}

export default PrivateRoutes;