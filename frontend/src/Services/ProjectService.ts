/* eslint-disable max-len */
/* eslint-disable class-methods-use-this */
import axios from "axios"
import { Project } from "../models/Project"
import { config } from "./config"
import { __BaseService } from "./__BaseService"
import { getDefaultHeader } from "../api/common/defaultHeader"

import { LoginAccessTokenKey, GetToken } from "../Utils/common"
import apiConfig from "../api/apiConfig"

export class __ProjectService extends __BaseService {
    async getProjects() {
        const projects: Components.Schemas.ProjectDto[] = await this.get<Components.Schemas.ProjectDto[]>("")
        return projects.map(Project.fromJSON)
    }

    async getProjectByID(id: string) {
        // const project: Components.Schemas.ProjectDto = await this.get<Components.Schemas.ProjectDto>(`/${id}`)
        const configApi = apiConfig()
        const url = `${configApi.baseApiUrl}/projects/${id}`
        const scopes = ["api://9b125a0c-4907-43b9-8db2-ff405d6b0524/.default"]
        const project = await axios.get(url, await getDefaultHeader(scopes))
        return Project.fromJSON(project.data)
    }

    createProject(project: Components.Schemas.ProjectDto) {
        return this.post("", { body: project })
    }

    public async updateProject(body: Components.Schemas.ProjectDto): Promise<Project> {
        const res = await this.put("", { body })
        return Project.fromJSON(res)
    }
}

export async function GetProjectService() {
    return new __ProjectService({
        ...config.ProjectService,
        accessToken: await GetToken(LoginAccessTokenKey)!,
    })
}
