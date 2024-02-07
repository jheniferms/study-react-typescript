import { Link } from "react-router-dom"
import { useLoggedUser } from "../../shared/hooks";

export const Dashboard = () => {
    const { userName, logout } = useLoggedUser();

    return (
        <div>
            <p>Dashboard</p>
            <p>Logged user {userName}</p>

            <button onClick={logout}>Logout</button>
            <Link to="/login">Login</Link>
        </div>
    )
}