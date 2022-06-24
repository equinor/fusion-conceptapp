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

export const ViewsContainer: VoidFunctionComponent = () => (
    <Wrapper>
        <Body>
            <SideMenu />
            <MainView />
        </Body>
    </Wrapper>
    )
