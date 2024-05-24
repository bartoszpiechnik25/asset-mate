import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
    const token: string|null = localStorage.getItem('token');
    let inStorage: boolean = false;
    let expired: boolean = false;

    if (token !== null) {
        inStorage = true;
        console.log(token)
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.exp < Date.now() / 1000) {
            expired = true;
        }
    }

    return (
        (token && !expired) ? <Outlet/> : <Navigate to='/login'/>
    )
}

export default PrivateRoutes;