"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBook = exports.deleteBook = exports.createBook = exports.getBook = exports.getAllBooks = void 0;
const booksService_1 = require("./booksService");
const getAllBooks = async (c) => {
    const data = await (0, booksService_1.getAllBooksService)();
    return c.json(data);
};
exports.getAllBooks = getAllBooks;
const getBook = async (c) => {
    const id = parseInt(c.req.param("id"));
    console.log(id);
    const book = await (0, booksService_1.getBookByIdService)(id);
    if (!book) {
        return c.json({ error: "Book not found" }, 404);
    }
    return c.json(book, 200);
};
exports.getBook = getBook;
const createBook = async (c) => {
    try {
        const book = await c.req.json();
        console.log(book);
        const createdBook = await (0, booksService_1.createBookService)(book);
        if (!exports.createBook) {
            return c.text("Book not created");
        }
        return c.json({ msg: createdBook }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createBook = createBook;
const deleteBook = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid Id", 400);
        //search for the book
        const book = await (0, booksService_1.getBookByIdService)(id);
        if (book == undefined)
            return c.text("Book not found", 404);
        //deleting the book
        const res = await (0, booksService_1.deleteBookService)(id);
        if (!res)
            return c.text("Book not deleted", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message });
    }
};
exports.deleteBook = deleteBook;
const updateBook = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid ID", 400);
        const book = await c.req.json();
        // search for the book
        const searchedBook = await (0, booksService_1.getBookByIdService)(id);
        if (searchedBook == undefined)
            return c.text("Book not found", 404);
        // get the data and update it
        const res = await (0, booksService_1.updateBookService)(id, book);
        // return a success message
        if (!res)
            return c.text("Book not updated", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateBook = updateBook;
