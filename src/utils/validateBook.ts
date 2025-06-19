import z from 'zod';

const BookSchema = z.object({
    isbn: z.string().nonempty({message: "ISBN is required"}).min(13).max(13),
    title: z.string().nonempty({message: "Book name is required"}).min(1).max(255),
    editionNumber: z.string().nonempty({ message: "Edition number is required" }).min(1).max(255),
    editionDate: z.coerce.date(),
    maxLoanDays: z.number()
});

export type BookSchemaType = z.infer<typeof BookSchema>;

export function ValidateBook(data: BookSchemaType) {
    return BookSchema.safeParse(data)
}

const BookPartialSchema = BookSchema.partial();

export type BookPartialSchemaType = z.infer<typeof BookPartialSchema>;

export function ValidatePartialBook(data: BookPartialSchemaType){
    return BookSchema.partial().safeParse(data)
}