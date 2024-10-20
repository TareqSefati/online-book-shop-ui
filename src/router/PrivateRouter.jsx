import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import { ROUTES } from "../routes/Routes";
import Loader from "../components/shared/Loader";

export default function PrivateRouter({ children }) {
	const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    console.log(location.pathname);

	if (loading) {
		return <Loader></Loader>;
	}

	if (user) {
		return children;
	}
	return <Navigate state={location.pathname} to={ROUTES.LOGIN}></Navigate>;
}
