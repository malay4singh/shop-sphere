import { Navigate, Outlet } from "react-router-dom";

interface PrivateRouterProps {
        roles: number[]
}

function PrivateRouter(props: PrivateRouterProps) {
        const roleID = JSON.parse(localStorage.getItem('roleID') as string);

        return (
                <>
                        {props.roles.includes(roleID) ? (
                                <Outlet />
                        ) : (
                                <Navigate to="/products" />
                        )}
                </>
        )
}

export default PrivateRouter