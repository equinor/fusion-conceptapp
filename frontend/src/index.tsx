import { FC, useEffect } from 'react';
import { Button, usePopoverRef } from '@equinor/fusion-components';
import React, { VoidFunctionComponent } from 'react';
import { registerApp, ContextTypes, Context, useAppConfig, useFusionContext, useCurrentUser } from '@equinor/fusion'


import * as styles from './styles.less';
import { RetrieveConfigFromAzure } from './config';

const App: VoidFunctionComponent = () => {
    const fusionContext = useFusionContext()
    const currentUser = useCurrentUser()
    const runtimeConfig = useAppConfig()
    const [hasLoggedIn, setHasLoggedIn] = React.useState(false)
    const [apiUrl, setApiUrl] = React.useState('')

    React.useEffect(() => {
        (async () => {
            try {
                console.log("Hei 1")
                const appConfig = await RetrieveConfigFromAzure()
                console.log("Hei 2")
            } catch (error) {
                console.error("[App] Error while retreiving AppConfig from Azure", error)
            }
        })()
    }, [])

    return (
    <p> Hehe</p>
    );
};

registerApp('dcd', {
    AppComponent: App,
});

if (module.hot) {
    module.hot.accept();
}
