import zod from 'zod';

const BookSchema = zod.object({
    isbn: zod.string().nonempty({message: "ISBN is required"}).min(13).max(13),
    title: zod.string().nonempty({message: "Book name is required"}).min(1).max(255),
    editionNumber: zod.string().nonempty({ message: "Edition number is required" }).min(1).max(255),
    editionDate: zod.date(),
    maxLoanDays: zod.number()
});

export type BookSchemaType = zod.infer<typeof BookSchema>;

export function ValidateBook (data: BookSchemaType) {
    return BookSchema.safeParse(data)
}

const BookPartialSchema = BookSchema.partial();

export type BookPartialSchemaType = zod.infer<typeof BookPartialSchema>;

export function ValidatePartialBook(data: BookPartialSchemaType){
    return BookSchema.partial().safeParse(data)
}