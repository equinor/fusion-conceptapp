/* eslint-disable max-len */
import {
    Input, Typography,
} from "@equinor/eds-core-react"
import { useEffect, useState } from "react"
import {
    useParams,
} from "react-router"
import styled from "styled-components"
import TimeSeries from "../Components/TimeSeries"
import { Substructure } from "../models/assets/substructure/Substructure"
import { Case } from "../models/Case"
import { Project } from "../models/Project"
import { GetProjectService } from "../Services/ProjectService"
import { GetSubstructureService } from "../Services/SubstructureService"
import {
    AssetViewDiv, Dg4Field, Wrapper,
} from "./Asset/StyledAssetComponents"
import Save from "../Components/Save"
import AssetName from "../Components/AssetName"
import { unwrapCase, unwrapProjectId } from "../Utils/common"
import AssetTypeEnum from "../models/assets/AssetTypeEnum"
import { initializeFirstAndLastYear } from "./Asset/AssetHelper"
import Maturity from "../Components/Maturity"
import NumberInput from "../Components/NumberInput"
import { SubstructureCostProfile } from "../models/assets/substructure/SubstructureCostProfile"
import { SubstructureCessationCostProfile } from "../models/assets/substructure/SubstructureCessationCostProfile"
import AssetCurrency from "../Components/AssetCurrency"
import SideMenu from "../Components/SideMenu/SideMenu"
import { IAssetService } from "../Services/IAssetService"

const ProjectWrapper = styled.div`
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
const SubstructureView = () => {
    const [project, setProject] = useState<Project>()
    const [caseItem, setCase] = useState<Case>()
    const [substructure, setSubstructure] = useState<Substructure>()

    const [hasChanges, setHasChanges] = useState(false)
    const [substructureName, setSubstructureName] = useState<string>("")
    const { fusionProjectId, caseId, substructureId } = useParams<Record<string, string | undefined>>()
    const [firstTSYear, setFirstTSYear] = useState<number>()
    const [lastTSYear, setLastTSYear] = useState<number>()
    const [maturity, setMaturity] = useState<Components.Schemas.Maturity | undefined>()
    const [dryWeight, setDryWeight] = useState<number | undefined>()
    const [costProfile, setCostProfile] = useState<SubstructureCostProfile>()
    const [cessationCostProfile, setCessationCostProfile] = useState<SubstructureCessationCostProfile>()
    const [currency, setCurrency] = useState<Components.Schemas.Currency>(0)

    const [substructureService, setSubstructureService] = useState<IAssetService>()

    useEffect(() => {
        (async () => {
            try {
                const projectId: string = unwrapProjectId(fusionProjectId)
                const projectResult: Project = await (await GetProjectService()).getProjectByID(projectId)
                setProject(projectResult)
            } catch (error) {
                console.error(`[CaseView] Error while fetching project ${fusionProjectId}`, error)
            }
        })()
    }, [])

    useEffect(() => {
        (async () => {
            if (project !== undefined) {
                const caseResult: Case = unwrapCase(project.cases.find((o) => o.id === caseId))
                setCase(caseResult)
                // eslint-disable-next-line max-len
                let newSubstructure: Substructure | undefined = project.substructures.find((s) => s.id === substructureId)
                if (newSubstructure !== undefined) {
                    setSubstructure(newSubstructure)
                } else {
                    newSubstructure = new Substructure()
                    newSubstructure.currency = project.currency
                    setSubstructure(newSubstructure)
                }
                setSubstructureName(newSubstructure?.name!)
                setMaturity(newSubstructure.maturity)
                setDryWeight(newSubstructure.dryweight)
                setCurrency(newSubstructure.currency ?? 0)

                setCostProfile(newSubstructure.costProfile)
                setCessationCostProfile(newSubstructure.cessationCostProfile)

                if (caseResult?.DG4Date) {
                    initializeFirstAndLastYear(
                        caseResult?.DG4Date?.getFullYear(),
                        [newSubstructure.costProfile, newSubstructure.cessationCostProfile],
                        setFirstTSYear,
                        setLastTSYear,
                    )
                }
                const service = await GetSubstructureService()
                setSubstructureService(service)
            }
        })()
    }, [project])

    useEffect(() => {
        if (substructure !== undefined) {
            const newSubstructure: Substructure = { ...substructure }
            newSubstructure.maturity = maturity
            newSubstructure.dryweight = dryWeight
            newSubstructure.costProfile = costProfile
            newSubstructure.cessationCostProfile = cessationCostProfile
            newSubstructure.currency = currency

            if (caseItem?.DG4Date) {
                initializeFirstAndLastYear(
                    caseItem?.DG4Date?.getFullYear(),
                    [costProfile, cessationCostProfile],
                    setFirstTSYear,
                    setLastTSYear,
                )
            }
            setSubstructure(newSubstructure)
        }
    }, [maturity, dryWeight, costProfile, cessationCostProfile, currency])

    return (
        <ProjectWrapper>
            <Body>
                <SideMenu />
                <MainView>
                    <AssetViewDiv>
                        <Wrapper>
                            <Typography variant="h2">Substructure</Typography>
                            <Save
                                name={substructureName}
                                setHasChanges={setHasChanges}
                                hasChanges={hasChanges}
                                setAsset={setSubstructure}
                                setProject={setProject}
                                asset={substructure!}
                                assetService={substructureService!}
                                assetType={AssetTypeEnum.substructures}
                            />
                        </Wrapper>
                        <AssetName
                            setName={setSubstructureName}
                            name={substructureName}
                            setHasChanges={setHasChanges}
                        />
                        <Wrapper>
                            <Typography variant="h4">DG3</Typography>
                            <Dg4Field>
                                <Input disabled defaultValue={caseItem?.DG3Date?.toLocaleDateString("en-CA")} type="date" />
                            </Dg4Field>
                            <Typography variant="h4">DG4</Typography>
                            <Dg4Field>
                                <Input disabled defaultValue={caseItem?.DG4Date?.toLocaleDateString("en-CA")} type="date" />
                            </Dg4Field>
                        </Wrapper>
                        <AssetCurrency
                            setCurrency={setCurrency}
                            setHasChanges={setHasChanges}
                            currentValue={currency}
                        />
                        <Wrapper>
                            <NumberInput
                                setHasChanges={setHasChanges}
                                setValue={setDryWeight}
                                value={dryWeight ?? 0}
                                integer={false}
                                label={`Substructure dry weight ${project?.physUnit === 0 ? "(tonnes)" : "(Oilfield)"}`}
                            />
                        </Wrapper>
                        <Maturity
                            setMaturity={setMaturity}
                            currentValue={maturity}
                            setHasChanges={setHasChanges}
                        />
                        <TimeSeries
                            dG4Year={caseItem?.DG4Date?.getFullYear()}
                            setTimeSeries={setCostProfile}
                            setHasChanges={setHasChanges}
                            timeSeries={costProfile}
                            timeSeriesTitle={`Cost profile ${currency === 0 ? "(MUSD)" : "(MNOK)"}`}
                            firstYear={firstTSYear!}
                            lastYear={lastTSYear!}
                            setFirstYear={setFirstTSYear!}
                            setLastYear={setLastTSYear}
                        />
                        <TimeSeries
                            dG4Year={caseItem?.DG4Date?.getFullYear()}
                            setTimeSeries={setCessationCostProfile}
                            setHasChanges={setHasChanges}
                            timeSeries={cessationCostProfile}
                            timeSeriesTitle={`Cessation cost profile ${currency === 0 ? "(MUSD)" : "(MNOK)"}`}
                            firstYear={firstTSYear!}
                            lastYear={lastTSYear!}
                            setFirstYear={setFirstTSYear!}
                            setLastYear={setLastTSYear}
                        />
                    </AssetViewDiv>
                </MainView>
            </Body>
        </ProjectWrapper>
    )
}

export default SubstructureView
