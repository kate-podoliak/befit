import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/Login/Login.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminPanel from "./components/AdminPanel/AdminPanel.jsx";
import NotFound from "./components/NotFound/NotFound.jsx";
import "./App.scss"

function App() {
  return (
      <>
        <BrowserRouter>
          <Switch>
            <Route path="/admin/login" component={Login} />
            <Route path="/admin/home" component={AdminPanel} />
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </BrowserRouter>
      </>
  );
}

export default App;