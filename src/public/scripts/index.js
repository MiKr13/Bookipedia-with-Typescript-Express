/******************************************************************************
 *                          Fetch and display books
 ******************************************************************************/

displayBooks();


function displayBooks() {
    httpGet('/api/books/all')
        .then(response => response.json())
        .then((response) => {
            var allBooks = response.books;
            // Empty the anchor
            let allBooksAnchor = document.getElementById('all-books-anchor');
            allBooksAnchor.innerHTML = '';
            // Append books to anchor
            allBooks.forEach((book) => {
                allBooksAnchor.innerHTML += getBookDisplayEle(book);
            });
        });
};


function getBookDisplayEle(book) {
    return `<div class="book-display-ele">

        <div class="normal-view">
            <div>Name: ${book.name}</div>
            <div>Email: ${book.email}</div>
            <button class="edit-book-btn" data-book-id="${book.id}">
                Edit
            </button>
            <button class="delete-book-btn" data-book-id="${book.id}">
                Delete
            </button>
        </div>
        
        <div class="edit-view">
            <div>
                Name: <input class="name-edit-input" value="${book.name}">
            </div>
            <div>
                Email: <input class="email-edit-input" value="${book.email}">
            </div>
            <button class="submit-edit-btn" data-book-id="${book.id}">
                Submit
            </button>
            <button class="cancel-edit-btn" data-book-id="${book.id}">
                Cancel
            </button>
        </div>
    </div>`;
}


/******************************************************************************
 *                        Add, Edit, and Delete Books
 ******************************************************************************/

document.addEventListener('click', function (event) {
    event.preventDefault();
    if (event.target.matches('#add-book-btn')) {
        addBook();
    } else if (event.target.matches('.edit-book-btn')) {
        showEditView();
    } else if (event.target.matches('.cancel-edit-btn')) {
        cancelEdit();
    } else if (event.target.matches('.submit-edit-btn')) {
        submitEdit();
    } else if (event.target.matches('.delete-book-btn')) {
        deleteBook();
    }
}, false)


function addBook() {
    var nameInput = document.getElementById('name-input');
    var emailInput = document.getElementById('email-input');
    var data = {
        book: {
            name: nameInput.value,
            email: emailInput.value
        },
    };
    httpPost('/api/books/add', data)
        .then(() => {
            displayBooks();
        })
}


function showEditView() {
    var bookEle = event.target.parentNode.parentNode;
    var normalView = bookEle.getElementsByClassName('normal-view')[0];
    var editView = bookEle.getElementsByClassName('edit-view')[0];
    normalView.style.display = 'none';
    editView.style.display = 'block';
}


function cancelEdit() {
    var bookEle = event.target.parentNode.parentNode;
    var normalView = bookEle.getElementsByClassName('normal-view')[0];
    var editView = bookEle.getElementsByClassName('edit-view')[0];
    normalView.style.display = 'block';
    editView.style.display = 'none';
}


function submitEdit() {
    var bookEle = event.target.parentNode.parentNode;
    var nameInput = bookEle.getElementsByClassName('name-edit-input')[0];
    var emailInput = bookEle.getElementsByClassName('email-edit-input')[0];
    var id = event.target.getAttribute('data-book-id');
    var data = {
        book: {
            name: nameInput.value,
            email: emailInput.value,
            id: id
        }
    };
	httpPut('/api/books/update', data)
        .then(() => {
            displayBooks();
        })
}


function deleteBook() {
    var id = event.target.getAttribute('data-book-id');
	httpDelete('/api/books/delete/' + id)
        .then(() => {
            displayBooks();
        })
}


function httpGet(path) {
    return fetch(path, getOptions('GET'))
}


function httpPost(path, data) {
    return fetch(path, getOptions('POST', data));
}


function httpPut(path, data) {
    return fetch(path, getOptions('PUT', data));
}


function httpDelete(path) {
    return fetch(path, getOptions('DELETE'));
}


function getOptions(verb, data) {
    var options = {
        dataType: 'json',
        method: verb,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };
    if (data) {
        options.body = JSON.stringify(data);
    }
    return options;
}
