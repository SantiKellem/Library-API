import { Book } from "./books.js";

export interface Copy {
    copyId: number,
    book: Book
}

/*
    {
        "copyId": 1,
        "book": {        
            "bookId": 2,
            "isbn": "9789500720020",
            "title": "Rayuela",
            "editionNumber": "2nd",
            "editionDate": "2001-11-03T00:00:00Z",
            "maxLoanDays": 10
        }
    }
*/