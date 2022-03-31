import React from 'react'
import { Provider as ReduxProvider } from 'react-redux';

import App from './App';
import store from './store'

function Root() {
    return (
        <ReduxProvider store={store}>
            <App />
        </ReduxProvider>
    )
}

export default Root
