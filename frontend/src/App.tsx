import React from 'react'

import { ErrorBoundary } from '@equinor/fusion-components'

import { useCurrentContext, useCurrentUser } from '@equinor/fusion'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import DashboardView from './Views/DashboardView'


const App = () => {
    const currentUser = useCurrentUser()


    if (!currentUser) {
        return (
            <>
                <p>Du ekke logget inn</p>
            </>
        )
    }

    return (
        <>
            <ErrorBoundary>
                <BrowserRouter>
                    <Switch>
                        <Route path="/" exact component={DashboardView}/>
                    </Switch>
                </BrowserRouter>
            </ErrorBoundary>
        </>
    )
}



export default App