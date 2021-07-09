import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import Home from "./components/Home";
import Login from "./components/Login/Login"
import Register from "./components/Login/Register";
import VerifyEmail from "components/Login/VerifyEmail";

function App() {
    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/register" component={Register}/>
                    <Route exact path="/verify-email" component={VerifyEmail}/>
                </Switch>
            </Router>
        </div>
    );
}

export default App;

