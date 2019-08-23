
export interface IBook {
    id?: string;
    name: string;
    genre: string;
    authorID: string,
}

export class Book implements IBook {

    public id?: string;
    public name: string;
    public genre: string;
    public authorID: string;

    constructor(nameorBook: string | IBook, genre?: string, authorID?: string) {
        if (typeof nameorBook === 'string') {
            this.name = nameorBook;
            this.genre = genre || '';
            this.authorID = authorID || '';
        } else {
            this.name = nameorBook.name;
            this.genre = nameorBook.genre;
            this.authorID = nameorBook.authorID;
        }
    }
}
