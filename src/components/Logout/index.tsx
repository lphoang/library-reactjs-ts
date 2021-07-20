import { useAppDispatch } from "app/hooks";
import Loading from "components/Global/Loading";
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
            <Loading/>
        </div>
    )
}

export default Logout;
