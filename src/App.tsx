import React from "react";
import "./App.scss"
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import Home from "./components/Home";
import Login from "./components/Login/Login"
import Register from "./components/Login/Register";


function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/register" component={Register}/>
                </Switch>
            </Router>
        </div>
    );
}

export default App;

