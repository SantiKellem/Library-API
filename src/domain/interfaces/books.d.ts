export interface IBook {
    bookId: number,
    isbn: string,
    title: string,
    editionNumber: string,
    editionDate: Date,
    maxLoanDays: number
}

/*
  {
    "bookId": 1,
    "isbn": "9789870435662",
    "title": "Cien años de soledad",
    "editionNumber": "3rd",
    "editionDate": "2007-05-12T00:00:00Z",
    "maxLoanDays": 15
  }
*/