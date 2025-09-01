import { Navigate } from "react-router";
import { useAuthContext } from "../context/AuthContext.jsx";

const AdminPage = ({ children }) => {
  const { user } = useAuthContext();
  if (!user) {
    return <Navigate to="/login" />;
  }
  if (user.authorities.includes("ROLE_ADMIN")) {
    return children;
  }
  return <Navigate to="/notallowed" />;
};

export default AdminPage;
