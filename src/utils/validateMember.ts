import z from 'zod';

const MemberSchema = z.object({
    firstName: z.string().min(1).max(255),
    lastName: z.string().min(1).max(255),
    email: z.string().email().min(1).max(255),
    address: z.string().min(1).max(255),
    phone: z.string().min(1).max(255),
    memberStatus: z.enum(["Enabled", "Disabled", "Sanctioned"]).optional()
});

export type MemberSchemaType = z.infer<typeof MemberSchema>;

export function ValidateMember(data: MemberSchemaType) {
    return MemberSchema.safeParse(data)
}

const MemberPartialSchema = MemberSchema.partial();

export type MemberPartialSchemaType = z.infer<typeof MemberPartialSchema>;

export function ValidatePartialMember(data: MemberPartialSchemaType){
    return MemberSchema.partial().safeParse(data)
}