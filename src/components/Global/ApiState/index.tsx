import React from 'react';
import { IApiState } from 'utils/types';

export default function ApiState({isLoading, isSuccess, isError, errorMessage} : IApiState) {
    return <>
        {isLoading && 'Loading...'}
        {isSuccess && 'Done!'}
        {isError && errorMessage}
    </>;
}