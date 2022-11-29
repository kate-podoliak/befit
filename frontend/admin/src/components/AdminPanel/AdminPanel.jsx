import React, { useState, useEffect } from "react";
import Layout from "../../Layout.jsx";
import Menu from "./Menu.jsx";
import {Link} from "react-router-dom";

const AdminPanel = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [name, setName] = useState([]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("admin"));
        if (user !== null) {
            if (user.role === "ADMIN") {
                setName(user.name);
                setIsAdmin(true);
            } else {
                setIsAdmin(false);
            }
        }
	}, []);
    const logout = () => {
        localStorage.removeItem("admin");
    };

    return (
        <>

                <div className="w-75 mx-auto mt-3 mb-3">
                    <p className="float-start text-22 pt-3 mb-0">{`Вітаємо, ${name}!🖐️`}</p>
                    <Link className="float-end text-20 border p-2 btn btn-danger" to="/admin/login" onClick={logout}>Вийти</Link>
                </div>
                <Menu /> <Layout />

        </>
    );
};

export default AdminPanel;