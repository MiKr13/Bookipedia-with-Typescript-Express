const usingMockDb = (process.env.USE_MOCK_DB || '').toLowerCase();
let bookDaoPath = './Book/BookDao';
let authorDaoPath = './Author/AuthorDao';

if (usingMockDb === 'true') {
    bookDaoPath += '.mock';
    authorDaoPath += '.mock';
}

// tslint:disable:no-var-requires
export const { BookDao } = require(bookDaoPath);
export const { AuthorDao } = require(authorDaoPath);
