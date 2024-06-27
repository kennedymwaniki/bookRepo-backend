"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBookService = exports.getBookByIdService = exports.updateBookService = exports.createBookService = exports.getAllBooksService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const getAllBooksService = async () => {
    return await db_1.default.query.booksTable.findMany();
};
exports.getAllBooksService = getAllBooksService;
const createBookService = async (book) => {
    return await db_1.default.insert(schema_1.booksTable).values(book);
};
exports.createBookService = createBookService;
const updateBookService = async (id, user) => {
    await db_1.default.update(schema_1.booksTable).set(user).where((0, drizzle_orm_1.eq)(schema_1.booksTable.id, id));
    return "Book updated successfully";
};
exports.updateBookService = updateBookService;
const getBookByIdService = async (id) => {
    return await db_1.default.query.booksTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.booksTable.id, id),
    });
};
exports.getBookByIdService = getBookByIdService;
const deleteBookService = async (id) => {
    await db_1.default.delete(schema_1.booksTable).where((0, drizzle_orm_1.eq)(schema_1.booksTable.id, id));
    return "Books deleted successfully";
};
exports.deleteBookService = deleteBookService;
