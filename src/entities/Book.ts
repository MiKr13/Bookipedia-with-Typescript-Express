
export interface IBook {
    id?: number;
    name: string;
    email: string;
}

export class User implements IBook {

    public id?: number;
    public name: string;
    public email: string;

    constructor(nameOrUser: string | IBook, email?: string) {
        if (typeof nameOrUser === 'string') {
            this.name = nameOrUser;
            this.email = email || '';
        } else {
            this.name = nameOrUser.name;
            this.email = nameOrUser.email;
        }
    }
}
