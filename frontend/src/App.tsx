import React from 'react'

import { ErrorBoundary } from '@equinor/fusion-components'

import { useCurrentContext } from '@equinor/fusion'
import { Switch, Route } from 'react-router-dom'
import DashboardView from './Views/DashboardView'

const App = () => {
    const currentProject = useCurrentContext()

    if (!currentProject) {
        return (
            <>
                <p>Please select a project.</p>
            </>
        )
    }

    return (
        <>
            <ErrorBoundary>
                <Switch>
                    <Route path="/" exact component={DashboardView}/>
                </Switch>
            </ErrorBoundary>
        </>
    )
}

export default App
