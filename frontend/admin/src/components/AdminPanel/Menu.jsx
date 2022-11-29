import React from "react";
import {Link, Redirect} from "react-router-dom";
import {Tab, Tabs} from "react-bootstrap";
import User from "../User/User";
import Type from "../Type/Type";
import Review from "../Review/Review";
import Class from "../Class/Class";
import Visit from "../Visit/Visit";

const Menu = () => {        
    // const logout = () => {
    //     localStorage.removeItem("admin");
    // };
    
    return (
        <>
            <Tabs
                defaultActiveKey="home"
                transition={false}
                id="noanim-tab-example"
                className="mt-5 pt-3 w-100 mx-auto justify-content-center"
                defaultActiveKey="users"
            >
                <Tab eventKey="users" className="w-75 mx-auto pt-2" title="Користувачі">
                    <User />
                </Tab>
                <Tab eventKey="types" className="w-75 mx-auto pt-2" title="Види занять">
                    <Type />
                </Tab>
                <Tab eventKey="reviews" className="w-75 mx-auto pt-2" title="Відгуки">
                    <Review />
                </Tab>
                <Tab eventKey="classes" className="w-75 mx-auto pt-2" title="Заняття">
                    <Class />
                </Tab>
                <Tab eventKey="visits" className="w-75 mx-auto pt-2" title="Записи">
                    <Visit />
                </Tab>
            </Tabs>
        </>
    );
};

export default Menu;