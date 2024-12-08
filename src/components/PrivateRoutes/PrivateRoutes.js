import React, { useContext } from 'react';
import { UserContext } from '../../App';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PrivateRoutes = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const location = useLocation();
    return (
        loggedInUser.email ? <Outlet /> : (
            <Navigate to='/login' replace state={{from: location}} />
        )
    );
};

export default PrivateRoutes;