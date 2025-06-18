import { Book } from '../interfaces/books';
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const Books: Book[]  = require("../mocks/books.json");

export function getNewId(): number {
    return Books.length + 1;
}