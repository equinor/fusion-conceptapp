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
/*
    const login = async () => {
        const isLoggedIn = await fusionContext.auth.container.registerAppAsync(config.AD_APP_ID, [])

        if (!isLoggedIn) {
            await fusionContext.auth.container.loginAsync(config.AD_APP_ID)
            return
        }

        setHasLoggedIn(true)
    }

    React.useEffect(() => {
        login()
    }, [])
*/

    React.useEffect(() => {
        (async () => {
            try {
                console.log("1")
                const appConfig = await RetrieveConfigFromAzure()
                const isLoggedIn = await fusionContext.auth.container.registerAppAsync(appConfig.azureAd.clientId, [])
                if (!isLoggedIn) {
                    await fusionContext.auth.container.loginAsync(appConfig.azureAd.clientId)
                    return
                }
                
                var b = 2
                var a = b
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
    name: 'DCD Concept App',
    context: {
        types: [ContextTypes.ProjectMaster],
        buildUrl: (context: Context | null, url: string) => {
            if (!context) return ''
            return `/${context.id}`
        },
        getContextFromUrl: (url: string) => {
            return url.split('/')[1]
        },
    },
})

if (module.hot) {
    module.hot.accept();
}
