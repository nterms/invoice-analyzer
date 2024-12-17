import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

export default function DefaultLayout() {
    const {user, token} = useStateContext()

    if (!token) {
        return <Navigate to="/login"/>
    }

    const onLogout = (evt) => {
        evt.preventDefault()
    }

    return (
        <>
            <nav id="sidebar" className="">
                <div className="sidebar-header">
                    <div className="text-center mx-auto pb-3">
                        <strong>INVOICE ANALYZER</strong>
                    </div>
                </div>
                <ul className="components text-secondary">
                    <li><Link to="/dashboard"><i className="fas fa-home"></i> Dashboard</Link></li>
                    <li><Link to="/users"><i class="fas fa-user"></i> Users</Link></li>
                </ul>
            </nav>
            <div id="body" className="active">
                <header>
                    <div>
                        Header
                    </div>
                    <div>
                        {user.name}
                        <a href="#" onClick={onLogout} className="btn-logout">Logout</a>
                    </div>
                </header>
                <main>
                    <Outlet />
                </main>
            </div>
        </>
    )
}