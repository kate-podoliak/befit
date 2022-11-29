import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import User from "./components/User/User.jsx";
import Type from "./components/Type/Type.jsx";
import Review from "./components/Review/Review.jsx";
import Class from "./components/Class/Class.jsx";
import Visit from "./components/Visit/Visit.jsx";
import NotFound from "./components/NotFound/NotFound.jsx";

const Layout = () => {          
    return (
        <>
            <Switch>
                <Route path="/admin/home" component={Home} exact />
                <Route path="/admin/users" component={User} exact />
                <Route path="/admin/types" component={Type} exact />
                <Route path="/admin/reviews" component={Review} exact />
                <Route path="/admin/classes" component={Class} exact />
                <Route path="/admin/visits" component={Visit} exact />
                <Route path="*">
                    <NotFound />
                </Route>
            </Switch>
        </>
    );
};

export default Layout;