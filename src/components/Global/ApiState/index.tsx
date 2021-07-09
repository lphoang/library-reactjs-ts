import React from 'react';
import { IApiState } from 'utils/types';

export default function ApiState({isLoading, isSuccess, isError, errorMessage} : IApiState) {
    return <>
        {isLoading && <p style={{"color":"white"}}>....Loading</p>}
        {isSuccess && <p style={{"color":"white"}}>Done!</p>}
        {isError && <p style={{"color":"white"}}>{errorMessage}</p>}
    </>;
}