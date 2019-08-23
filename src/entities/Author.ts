
export interface IAuthor {
    id?: string;
    name: string;
    age: number;
    favouriteGenre: string;
}

export class Author implements IAuthor {

    public id?: string;
    public name: string;
    public age: number;
    public favouriteGenre: string;

    constructor(nameorAuthor: string | IAuthor, age?: number, favouriteGenre?: string) {
        if (typeof nameorAuthor === 'string') {
            this.name = nameorAuthor;
            this.age = age || 0;
            this.favouriteGenre = favouriteGenre || '';
        } else {
            this.name = nameorAuthor.name;
            this.favouriteGenre = nameorAuthor.favouriteGenre;
            this.age = nameorAuthor.age;
            this.favouriteGenre = nameorAuthor.favouriteGenre;
        }
    }
}
