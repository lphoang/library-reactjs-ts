import { useAppDispatch } from "app/hooks";
import { authLogout } from "features/slices/authSlice";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

function Logout() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(authLogout);
        
    }, []);

    let history = useHistory();
    setTimeout(() => {
        history.push("/");
    }, 3000);
    return(
        <div>
            <h1>LOGGING OUT</h1>
        </div>
    )
}

export default Logout;
