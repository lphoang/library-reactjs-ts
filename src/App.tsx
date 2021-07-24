import React, { Suspense } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import Loading from "components/Global/Loading";
import { Redirect } from "react-router-dom";

const Home = React.lazy(() => import(`components/Home`));
const Login = React.lazy(() => import(`components/Login/Login`));
const Register = React.lazy(() => import(`components/Login/Register`));
const VerifyEmail = React.lazy(() => import(`components/Login/VerifyEmail`));
const User = React.lazy(() => import(`components/UserDashboard/UserProfile`));
const Book = React.lazy(() => import(`components/Book`));
const Genre = React.lazy(() => import(`components/Genre`));
const Author = React.lazy(() => import(`components/Author`));
const BooksByTitle = React.lazy(() => import(`components/Global/SearchResult`));
const Logout = React.lazy(() => import(`components/Logout`))
const Cart = React.lazy(() => import(`components/UserDashboard/Cart`))

function App() {
    return (
        <div>
            <Suspense fallback={<Loading />}>
                <Router>
                    <Switch>
                        <Redirect exact from="/" to={`/page=0&size=15`}/>
                        <Route exact path={`/page=:page?&size=:size?`} component={Home} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/logout" component={Logout} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/verify-email" component={VerifyEmail} />

                        <Route path="/user/:id" component={User}/>
                        <Route path="/cart/:id" component={Cart}/>
                        <Route path="/books/:id" component={Book} />
                        <Route path="/genres/:id" component={Genre} />
                        <Route path="/authors/:id" component={Author} />
                        <Route path={["/search/t=:t?", "search"]} component={BooksByTitle} />
                    </Switch>
                </Router>
            </Suspense>
        </div>
    );
}

export default App;

