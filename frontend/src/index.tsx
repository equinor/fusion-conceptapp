import { FC, useEffect } from 'react';
import { Button, usePopoverRef } from '@equinor/fusion-components';
import React, { VoidFunctionComponent } from 'react';
import { registerApp, ContextTypes, Context, useAppConfig, useFusionContext, useCurrentUser } from '@equinor/fusion'
import { ApplicationInsights } from "@microsoft/applicationinsights-web"
import { ReactPlugin } from '@microsoft/applicationinsights-react-js'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { ErrorBoundary } from '@equinor/fusion-components'

import * as styles from './styles.less';
import { RetrieveConfigFromAzure } from './config';
import { createBrowserHistory } from 'history';
import App from './App';

const browserHistory = createBrowserHistory()
const reactPlugin = new ReactPlugin()

const Start: VoidFunctionComponent = () => {
    const fusionContext = useFusionContext()
    const currentUser = useCurrentUser()
    const runtimeConfig = useAppConfig()
    const [hasLoggedIn, setHasLoggedIn] = React.useState(false)
    const [apiUrl, setApiUrl] = React.useState('')
    const [manniAppConfig, setManniAppConfig] = React.useState<any>()

    React.useEffect(() => {
        (async () => {
            try {
                console.log("1")
                const appConfig = await RetrieveConfigFromAzure()
                
                console.log("2")
                //setManniAppConfig(appConfig)

               
                console.log("3")

                const asd = ""
            } catch (error) {
                console.error("[App] Error while retreiving AppConfig from Azure", error)
            }
        })()
    }, [])

    return (
        <App />
    );
};

registerApp('dcd', {
    AppComponent: Start,
});

if (module.hot) {
    module.hot.accept();
}
