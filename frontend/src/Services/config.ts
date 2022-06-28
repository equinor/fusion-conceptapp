export type ServiceConfig = {
    BASE_URL: string
    accessToken?: string
    headers?: Record<string, string>
}

const tempConfig = {
    CaseService: {
        BASE_URL: "",
    },
    CommonLibraryService: {
        BASE_URL: "",
    },
    FusionService: {
        BASE_URL: "https://pro-s-context-fprd.azurewebsites.net",
    },
    ProjectService: {
        BASE_URL: "",
    },
    DrainageStrategyService: {
        BASE_URL: "",
    },
    ExplorationService: {
        BASE_URL: "",
    },
    WellProjectService: {
        BASE_URL: "",
    },
    SurfService: {
        BASE_URL: "",
    },
    TopsideService: {
        BASE_URL: "",
    },
    SubstructureService: {
        BASE_URL: "",
    },
    TransportService: {
        BASE_URL: "",
    },
    STEAService: {
        BASE_URL: "",
    },
    UploadService: {
        BASE_URL: "",
    },
}

export const buildConfig = (baseUrl: string) => {
    tempConfig.CaseService.BASE_URL = `${baseUrl}cases`
    tempConfig.CommonLibraryService.BASE_URL = `${baseUrl}common-library`
    tempConfig.ProjectService.BASE_URL = `${baseUrl}projects`
    tempConfig.DrainageStrategyService.BASE_URL = `${baseUrl}drainage-strategies`
    tempConfig.ExplorationService.BASE_URL = `${baseUrl}explorations`
    tempConfig.WellProjectService.BASE_URL = `${baseUrl}well-projects`
    tempConfig.SurfService.BASE_URL = `${baseUrl}surfs`
    tempConfig.TopsideService.BASE_URL = `${baseUrl}topsides`
    tempConfig.SubstructureService.BASE_URL = `${baseUrl}substructures`
    tempConfig.TransportService.BASE_URL = `${baseUrl}transports`
    tempConfig.STEAService.BASE_URL = `${baseUrl}stea`
    tempConfig.UploadService.BASE_URL = `${baseUrl}Upload`
}

export const config = tempConfig
