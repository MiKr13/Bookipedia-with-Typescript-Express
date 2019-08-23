const usingMockDb = (process.env.USE_MOCK_DB || '').toLowerCase();
let bookDaoPath = './Book/BookDao';

if (usingMockDb === 'true') {
    bookDaoPath += '.mock';
}

// tslint:disable:no-var-requires
export const { BookDao } = require(bookDaoPath);
