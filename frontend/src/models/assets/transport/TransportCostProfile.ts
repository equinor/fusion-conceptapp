import { ITimeSeries } from "../../ITimeSeries"

export class TransportCostProfile implements Components.Schemas.TransportCostProfileDto, ITimeSeries {
    id?: string | undefined
    startYear?: number
    values?: number []
    epaVersion?: string | null
    currency?: Components.Schemas.Currency | undefined
    sum?: number | undefined

    constructor(data?: Components.Schemas.TransportCostProfileDto) {
        if (data !== undefined && data !== null) {
            this.id = data.id
            this.startYear = data.startYear ?? 0
            this.values = data.values ?? []
            this.epaVersion = data.epaVersion ?? null
            this.currency = data.currency
            this.sum = data.sum
        } else {
            this.id = "00000000-0000-0000-0000-000000000000"
            this.startYear = 0
            this.values = []
            this.epaVersion = ""
        }
    }

    static fromJSON(data?: Components.Schemas.TransportCostProfileDto): TransportCostProfile | undefined {
        if (data === undefined || data === null) {
            return undefined
        }
        return new TransportCostProfile(data)
    }
}
