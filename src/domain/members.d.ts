import { Sanction } from "./sanctions.js";

type MemberStatus = "Enabled" | "Disabled" | "Sanctioned";

export interface Member {
    memberId: Uuid,
    firstName: string,
    lastName: string,
    email: string,
    address: string,
    phone: string,
    memberStatus: MemberStatus,
    sanctions: Sanction[]
}

/*
    {
        "idMember": 4,
        "firstName": "Valentina",
        "lastName": "Perez",
        "email": "valentina.perez@example.com",
        "address": "321 San Juan St, Rosario",
        "phone": "+54 341 4567890",
        "memberStatus": "Enabled",
        "sanctions": [
            {
              "idSanction": 3,
              "sanctionDate": "2025-04-15T00:00:00Z",
              "sanctionDays": 10
            }
        ]
    }  
*/