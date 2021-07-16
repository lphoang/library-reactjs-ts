import React from 'react';
import { IApiState } from 'utils/types';
import Loading from 'components/Global/Loading'

export default function ApiState({ isLoading, isSuccess, isError, errorMessage }: IApiState) {
    return <>
        {isLoading && <Loading/>}
        {isSuccess && <p style={{ "color": "white", "textAlign": "center", "margin": "1rem" }}>Done!</p>}
        {isError && <p style={{ "color": "white", "textAlign": "center", "margin": "1rem" }}>{errorMessage}</p>}
    </>;
}