import z from 'zod';

const SanctionSchema = z.object({
    sanctionDate: z.coerce.date(),
    sanctionDays: z.number()
});

export type SanctionSchemaType = z.infer<typeof SanctionSchema>;

export function ValidateSanction(data: SanctionSchemaType) {
    return SanctionSchema.safeParse(data)
}

const SanctionPartialSchema = SanctionSchema.partial();

export type SanctionPartialSchemaType = z.infer<typeof SanctionPartialSchema>;

export function ValidatePartialSanction(data: SanctionPartialSchemaType){
    return SanctionSchema.partial().safeParse(data)
}