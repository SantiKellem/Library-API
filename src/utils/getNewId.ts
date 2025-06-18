import { Book } from '../interfaces/books.js';
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const Books: Book[]  = require("../mocks/books.json");

export function getNewId(): number {
    return Books[Books.length - 1].bookId + 1;
}