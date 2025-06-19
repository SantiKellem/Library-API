export interface SanctionPolicy {
    idSanctionPolicy: number,
    daysLateFrom: number,
    daysLateTo: number,
    sanctionDays: number
}

/*
    {
        "idSanctionPolicy": 1,
        "daysLateFrom": 1,
        "daysLateTo": 3,
        "sanctionDays": 2
    }
*/