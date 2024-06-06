// import { useEffect, useState } from "react";
// import { Navigate, Outlet } from "react-router-dom";
// import axios from "../api/axios";
// import { useNavigate } from "react-router-dom";

// interface PrivateRouterProps {
//         roles: number[]
// }

// function PrivateRouter(props: PrivateRouterProps) {
//         return (
//                 <>
//                          {props.roles.includes(roleID) ? (
//                                  <Outlet />
//                         ) : (
//                                  <Navigate to="/products" />
//                         )}
//                 </>
//         )
// }

// export default PrivateRouter