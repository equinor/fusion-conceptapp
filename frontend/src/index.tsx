import { FC, useEffect } from 'react';
import { Button, usePopoverRef } from '@equinor/fusion-components';
import React, { VoidFunctionComponent } from 'react';
import { registerApp, ContextTypes, Context, useAppConfig, useFusionContext, useCurrentUser, useNotificationCenter } from '@equinor/fusion'
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

const Start: FC = () => {
    const currentUser = useCurrentUser();
    const sendNotification = useNotificationCenter();
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


if (!currentUser) {
    return null;
}

return (
    <App/>)
};

registerApp('dcd', {
    AppComponent: Start,
    name: 'DCD Concept App',
    context: {
        types: [ContextTypes.ProjectMaster],
        buildUrl: (context: Context | null, url: string) => {
            console.log("Context: ", context)
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
