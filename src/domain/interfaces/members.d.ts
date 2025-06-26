import { Sanction } from "./sanctions.js";
import { memberstatus_enum } from "@prisma/client";

export type MemberStatus = "Enabled" | "Disabled" | "Sanctioned";

export interface IMember {
    memberId: string,
    firstName: string,
    lastName: string,
    email: string,
    address: string,
    phone: string,
    memberStatus: memberstatus_enum,
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