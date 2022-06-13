import { useEffect, useState, VoidFunctionComponent } from "react"
import styled from "styled-components"

import { useMsal } from "@azure/msal-react"
import Header from "../Components/Header"
import SideMenu from "../Components/SideMenu/SideMenu"

import { fusionApiScope } from "../config"
import { loginRequest } from "../auth/authContextProvider"
import { LoginAccessTokenKey, FusionAccessTokenKey, StoreToken } from "../Utils/common"

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
`

const Body = styled.div`
    display: flex;
    flex-direction: row;
    flex-row: 1;
    width: 100%;
    height: 100%;
`

const MainView = styled.div`
    width: calc(100% - 15rem);
    overflow: scroll;
`

interface AuthHandlerProps {
    children: JSX.Element;
}

export const AuthenticatedViewContainer: React.FC<AuthHandlerProps> = () => {
    const { instance, accounts } = useMsal()
    const [haveLoginToken, setHaveLoginToken] = useState<boolean>(false)
    const [haveFusionToken, setHaveFusionToken] = useState<boolean>(false)

    useEffect(() => {
        if (instance && accounts) {
            (async () => {
                // Silently acquires an access token
                try {
                    const { accessToken } = await instance.acquireTokenSilent({
                        ...loginRequest,
                        account: accounts[0],
                    })
                    StoreToken(LoginAccessTokenKey, accessToken)
                    setHaveLoginToken(true)
                } catch (error) {
                    console.error("[AuthenticatedViewContainer] Login failed", error)
                }

                try {
                    const { accessToken } = await instance.acquireTokenSilent({
                        scopes: fusionApiScope,
                        account: accounts[0],
                    })
                    StoreToken(FusionAccessTokenKey, accessToken)
                    setHaveFusionToken(true)
                } catch (error) {
                    console.error("[AuthenticatedViewContainer] Failed to get fusion token", error)
                }
            })()
        }
    }, [instance, accounts])

    if (!haveLoginToken || !haveFusionToken) {
        return (<p>waiting on token...</p>)
    }

    return (
        <Wrapper>
            <Body>
                <SideMenu />
                <MainView />
            </Body>
        </Wrapper>
    )
}
