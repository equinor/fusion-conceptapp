import React from 'react'

import { ErrorBoundary } from '@equinor/fusion-components'

import { useCurrentContext, useCurrentUser } from '@equinor/fusion'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import DashboardView from './Views/DashboardView'
import CaseView from './Views/CaseView'
import ProjectView from './Views/ProjectView'
import { ViewsContainer } from './Views/ViewsContainer'
import SurfView from './Views/SurfView'
import DrainageStrategyView from './Views/DrainageStrategyView'
import TopsideView from './Views/TopsideView'
import SubstructureView from './Views/SubstructureView'
import TransportView from './Views/TransportView'
import WellProjectView from './Views/WellProjectView'
import ExplorationView from './Views/ExplorationView'


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
                <BrowserRouter>
                    <Switch>
                    {/* <Route path="/:fusionProjectId" exact={false} component={ViewsContainer}/> */}

                        <Route path="/:fusionProjectId" exact component={ProjectView}/>
                        <Route path="/:fusionProjectId/case/:caseId" exact component={CaseView} />
                        <Route path="/:fusionProjectId/case/:caseId/surf/:surfId" exact component={SurfView} />
                        <Route
                            path="/:fusionProjectId/case/:caseId/drainagestrategy/:drainageStrategyId" exact 
                            component={DrainageStrategyView}
                        />
                        <Route
                            path="/:fusionProjectId/case/:caseId/topside/:topsideId" exact 
                            component={TopsideView}
                        />
                        <Route
                            path="/:fusionProjectId/case/:caseId/substructure/:substructureId" exact 
                            component={SubstructureView}
                        />
                        <Route
                            path="/:fusionProjectId/case/:caseId/transport/:transportId" exact 
                            component={TransportView}
                        />
                        <Route
                            path="/:fusionProjectId/case/:caseId/wellproject/:wellProjectId" exact 
                            component={WellProjectView}
                        />
                        <Route
                            path="/:fusionProjectId/case/:caseId/exploration/:explorationId" exact 
                            component={ExplorationView}
                        />
                    </Switch>
                </BrowserRouter>
            </ErrorBoundary>
        </>
    )
}



export default App