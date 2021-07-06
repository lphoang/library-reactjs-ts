import React from 'react';
import { IApiState } from 'utils/types';

export default function ApiState({isLoading, isSuccess, isError, errorMessage} : IApiState) {
    return <>
        {isLoading && 'Подождите...'}
        {isSuccess && 'Успех!'}
        {isError && errorMessage}
    </>;
}