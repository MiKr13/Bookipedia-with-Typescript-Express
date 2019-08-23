
export interface IBook {
    id?: string;
    name: string;
    genre: string;
}

export class Book implements IBook {

    public id?: string;
    public name: string;
    public genre: string;

    constructor(nameorBook: string | IBook, genre?: string) {
        if (typeof nameorBook === 'string') {
            this.name = nameorBook;
            this.genre = genre || '';
        } else {
            this.name = nameorBook.name;
            this.genre = nameorBook.genre;
        }
    }
}
