import React, { Suspense } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import Loading from "components/Global/Loading";

const Home = React.lazy(() => import(`components/Home`));
const Login = React.lazy(() => import(`components/Login/Login`));
const Register = React.lazy(() => import(`components/Login/Register`));
const VerifyEmail = React.lazy(() => import(`components/Login/VerifyEmail`));
const Book = React.lazy(() => import(`components/Book`));
const Genre = React.lazy(() => import(`components/Genre`));
const Author = React.lazy(() => import(`components/Author`));

function App() {
    return (
        <div>
            <Suspense fallback={<Loading />}>
                <Router>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/verify-email" component={VerifyEmail} />


                        <Route path="/books/:id" component={Book} />
                        <Route path="/genres/:id" component={Genre} />
                        <Route path="/authors/:id" component={Author} />
                    </Switch>
                </Router>
            </Suspense>
        </div>
    );
}

export default App;

