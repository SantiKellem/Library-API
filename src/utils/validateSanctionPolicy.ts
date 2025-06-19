import z from 'zod';

const SanctionPolicySchema = z.object({
    daysLateFrom: z.number(),
    daysLateTo: z.number(),
    sanctionDays: z.number()
});

export type SanctionPolicySchemaType = z.infer<typeof SanctionPolicySchema>;

export function ValidateSanctionPolicy(data: SanctionPolicySchemaType) {
    return SanctionPolicySchema.safeParse(data)
}

const SanctionPolicyPartialSchema = SanctionPolicySchema.partial();

export type SanctionPolicyPartialSchemaType = z.infer<typeof SanctionPolicyPartialSchema>;

export function ValidatePartialSanctionPolicy(data: SanctionPolicyPartialSchemaType){
    return SanctionPolicySchema.partial().safeParse(data)
}