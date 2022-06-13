// eslint-disable-next-line camelcase
import { chevron_left } from "@equinor/eds-icons"
import { Divider, Icon, Typography } from "@equinor/eds-core-react"
import { useParams } from "react-router-dom"

import { useEffect, useState } from "react"
import styled from "styled-components"

import ProjectMenu from "./ProjectMenu"
import { Project } from "../../models/Project"
import { GetProjectService } from "../../Services/ProjectService"
import { unwrapProjectId } from "../../Utils/common"

const SidebarDiv = styled.div`
    width: 15rem;
    display: flex;
    border-right: 1px solid lightgrey;
    display: flex;
    flex-direction: column;
`

const ReturnToSearch = styled.div`
    display: flex;
    align-items: center;
    padding: 1rem 1rem 0 1rem;
    cursor: pointer;
`

const StyledDivider = styled(Divider)`
    width: 80%;
`

function SideMenu() {
    const [project, setProject] = useState<Project>()
    // const navigate = useNavigate()

    const { fusionProjectId } = useParams<Record<string, string | undefined>>()

    useEffect(() => {
        if (fusionProjectId) {
            (async () => {
                try {
                    const projectId = unwrapProjectId(fusionProjectId)
                    const fetchedProject = await (await GetProjectService()).getProjectByID(projectId)
                    setProject(fetchedProject)
                } catch (error) {
                    console.error()
                }
            })()
        }
    }, [])

    console.log("fusionProjectId: ", fusionProjectId)
    console.log("SideMenu > project: ", project)
    if (project) {
        return (
            <SidebarDiv>
                <StyledDivider />
                <ProjectMenu project={project} />
            </SidebarDiv>
        )
    }
    return null
}

export default SideMenu
