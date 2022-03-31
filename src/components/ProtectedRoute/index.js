import React from 'react'
import { Redirect, Route } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import { getLocalStorage } from '../../utility/shared';
import { CONSTANTS } from '../../utility/constants';

function ProtectedRoute({ component: Component, ...rest }) {
    const { use: { token = '' } = {} } = useSelector((state) => state?.auth);
    let isAuthenticated = getLocalStorage(CONSTANTS.LOCAL_STORAGE_KEYS.USER)

    return <Route {...rest} render={(props) => {
        return (
            isAuthenticated ?
                <Component {...props} />
                :
                <Redirect to={{
                    pathname: '/login',
                    state: { from: props?.location }
                }} />
        )
    }} />
}

export default React.memo(ProtectedRoute)

