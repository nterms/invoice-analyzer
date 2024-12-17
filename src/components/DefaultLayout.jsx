import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { useEffect } from "react";
import axiosClient from "../axios-client"

export default function DefaultLayout() {
    const {user, token, setUser, setToken} = useStateContext()

    if (!token) {
        return <Navigate to="/login"/>
    }

    const onLogout = (evt) => {
        evt.preventDefault()
        setToken(null)
    }

    useEffect(() => {
        axiosClient.get('/user')
            .then(({data}) => {
                console.log(data)
                setUser(data)
            })
            .catch(err => {
                console.log(err);
            })
    })

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
                    <li><Link to="/invoices"><i className="fas fa-file"></i> Invoices</Link></li>
                    <li><Link to="/users"><i className="fas fa-user"></i> Users</Link></li>
                </ul>
            </nav>
            <div id="body" className="active">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item active">
                                <span className="nav-link">{user.name}</span>
                            </li>
                            <li className="nav-item">
                                <a href="#" onClick={onLogout} className="nav-link">Logout</a>
                            </li>
                        </ul>
                    </div>
                </nav>
                <main>
                    <Outlet />
                </main>
            </div>
        </>
    )
}