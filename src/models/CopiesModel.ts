import { Book } from '../interfaces/books.js';
import { Copy } from '../interfaces/copies.js';
import { getNewId } from '../utils/getNewId.js';
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const Copies: Copy[] = require("../mocks/copies.json");

export class CopiesModel {

    static getCopies(): Copy[] {
        return Copies;
    }

    static getCopyById(id: number): Copy | undefined {
        const copy = Copies.find(c => c.copyId == id);
        return copy;
    }

    static createCopy(book: Book): Copy {
        const copyId = getNewId(Copies, "copyId");
        const newCopy = {
            copyId,
            book: book
        }
        Copies.push(newCopy);
        return newCopy;
    }   

    static updateCopy(book: Book, id: number): Copy | undefined {
        const i = Copies.findIndex(c => c.copyId == id);
        
        if (i !== -1) {
            Copies[i].book = book;
            return Copies[i];
        }

        return undefined
    }

    static deleteCopy(id: number): Copy | undefined {
        const i = Copies.findIndex(c => c.copyId == id);

        if (i !== -1) {
            const oldCopy = Copies[i];
            Copies.splice(i, 1);
            return oldCopy;
        }

        return undefined
    }

}