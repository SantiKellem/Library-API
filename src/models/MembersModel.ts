import { Member } from '../interfaces/members.js';
import { Sanction } from '../interfaces/sanctions.js';
import { getNewId } from '../utils/getNewId.js';
import { MemberSchemaType, MemberPartialSchemaType } from '../utils/validateMember.js';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const Members: Member[] = require("../mocks/members.json");

export class MembersModel {

    static getAll(): Member[] {
        return Members;
    }

    static getById(id: number): Member | undefined {
        const member = Members.find(m => m.memberId == id);
        return member;
    }

    static create(data: MemberSchemaType): Member {
        const memberId = getNewId(Members, "memberId");
        const sanctions: Sanction[] = [];
        const newMember: Member = {
            memberId,
            ...data,
            memberStatus: "Enabled",
            sanctions: sanctions
        }
        Members.push(newMember);
        return newMember;
    }

    static update(data: MemberPartialSchemaType, id: number): Member | undefined {
        const i = Members.findIndex(m => m.memberId == id);

        if (i !== -1) {
            const member: Member = {
                ...Members[i],
                ...data
            }
            Members[i] = member;
            return member;
        }

        return undefined;
    }

    static delete(id: number): Member | undefined {
        const i = Members.findIndex(m => m.memberId == id);

        if (i !== -1) {
            const oldMember = Members[i];
            Members.splice(i, 1);
            return oldMember;
        }

        return undefined;
    }
}