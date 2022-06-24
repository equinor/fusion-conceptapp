import { useCurrentUser, useFusionEnvironment } from "@equinor/fusion"
import { ErrorBoundary } from "@equinor/fusion-components"
import { FUSION_ENV_LOCAL_CACHE_KEY } from "../api/apiConfig"
import ConceptAppAuthProvider from "../auth/ConceptAppAuthProvider"
import { AppRouter } from "./AppRouter"
import { FusionRouterBootstrap } from "./FusionRouterBootstrap"

const setEnvironment = (): void => {
    const fusionEnv = useFusionEnvironment()
    localStorage.setItem(FUSION_ENV_LOCAL_CACHE_KEY, fusionEnv.env)
}

/**
 * Renders the appropriate view based on user authentication and matching application routes.
 * @returns {*} {JSX.Element}
 */
function App(): JSX.Element {
    setEnvironment()
    const user = useCurrentUser()
    return (
        <ErrorBoundary>
            <ConceptAppAuthProvider>
                {(() => {
                    if (!user) {
                        console.log("User not logged")
                        return <p>pls login</p>
                    }
                    console.log("User logged in")
                    return (
                        <FusionRouterBootstrap>
                            <AppRouter />
                        </FusionRouterBootstrap>
                    )
                })()}
            </ConceptAppAuthProvider>
        </ErrorBoundary>
    )
}

export default App
