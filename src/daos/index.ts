const bookDaoPath = './Book/BookDao';
const authorDaoPath = './Author/AuthorDao';

// tslint:disable:no-var-requires
export const { BookDao } = require(bookDaoPath);
export const { AuthorDao } = require(authorDaoPath);
