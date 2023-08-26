const express = require("express");
let bodyParser = require("body-parser");  // Helps in post request
// body-parser will change the entire body to convert it into json format so that machine can read that .

// Database
const database = require("./database");

// Initialise Express 
// Here booky is a Book Management Project
const booky = express();

booky.use(bodyParser.urlencoded({extended: true}));
booky.use(bodyParser.json());// To ensure the work of body-parser .

//  GET REQUESTS

// 01 >> BOOKS
// To get all the books ->

/*
Route               /
Description         Get all the books
Parameter           none
Methods             GET
*/

booky.get("/",(req,res) => {
    return res.json({books: database.books});
})

// To get a specific book ->

/*
Route               /is
Description         Get a specific book
Parameter           isbn
Methods             GET
*/

booky.get("/is/:isbn",(req,res) => {
    const getSpecificBook = database.books.filter(
        (books) => books.ISBN === req.params.isbn 
    );
    
    if(getSpecificBook.length === 0){
        return res.json({error: `No book found as ${req.params.isbn}`});
    }
    return res.json({books: getSpecificBook});
})

// To get a list of books based on a category ->

/*
Route               /c
Description         Get specific book on category
Parameter           category
Methods             GET
*/

booky.get("/c/:category",(req,res) => {
    const getSpecificCategory = database.books.filter(
        (books) => books.category.includes(req.params.category)
    );

    if(getSpecificCategory.length === 0){
        return res.json({error: `No book found with the category ${req.params.category}`});
    }
    return res.json({books: getSpecificCategory});
})

// To get a list of books based on a language ->

/*
Route               /l
Description         Get specific book on language
Parameter           language
Methods             GET
*/

booky.get("/l/:language",(req,res) => {
    const getSpecificLanguage = database.books.filter(
        (books) => books.language === req.params.language
    );
    if(getSpecificLanguage.length === 0){
        return res.json({error: `No specific book found  of the language ${req.params.language}`});
    }
    return res.json({books: getSpecificLanguage});
})


// 02 >>  AUTHORS

// To get all the authors ->

/*
Route               /author
Description         Get all authors;
Parameter           none
Methods             GET
*/

booky.get("/authors",(req,res) => {
    return res.json({authors: database.authors});
})

// To get a specific author ->

/*
Route               /author
Description         Get specific author
Parameter           name
Methods             GET
*/

booky.get("/authors/:name",(req,res) => {
    const getSpecificAuthor = database.authors.filter(
        (authors) => authors.name === req.params.name
    )
    if(getSpecificAuthor.length === 0){
        return res.json({error: `No author found named as ${req.params.name}`});
    }
    return res.json({authors: getSpecificAuthor});
})

// To get a list of authors based on a book ->

/*
Route               /authors/books
Description         Get list of author of a book
Parameter           isbn
Methods             GET
*/

booky.get("/authors/books/:isbn",(req,res) => {
    const getSpecificAuthor = database.authors.filter(
        (authors) => authors.books.includes(req.params.isbn)
    );
    if(getSpecificAuthor.length === 0){
        return res.json({error: `No author found for the book ${req.params.isbn}`});
    }
    return res.json({authors: getSpecificAuthor});
})

// 03 >> PUBLICATION ->

// To get all the publication

/*
Route               /pub
Description         Get all publication
Parameter           none
Methods             GET
*/

booky.get("/pub",(req,res) => {
    return res.json({publications: database.publications})
})

// To get a specific publication ->

/*
Route               /pub
Description         Get a specific publication
Parameter           pubName
Methods             GET
*/

booky.get("/pub/:pubName",(req,res) => {
    const getSpecificPub = database.publications.filter(
        (publications) => publications.pubName === req.params.pubName
    )
    if(getSpecificPub.length === 0){
        return res.json({error: `No specific publication found named as ${req.params.pubName}`});
    }
    return res.json({publications: getSpecificPub});
})

// To get the publication based on a book ->

/*
Route               /pub/books
Description         Get the publication of a book
Parameter           isbn
Methods             GET
*/

booky.get("/pub/books/:isbn",(req,res) => {
    const getSpecificPub = database.publications.filter(
        (publications) => publications.books.includes(req.params.isbn)
    );
    if(getSpecificPub.length === 0){
        return res.json({error: `No list found for the book ${req.params.isbn}`})
    }
    return res.json({publications: getSpecificPub});
}
)

// GET REQUESTS COMPLETED HERE //

// POST REQUESTS //

/*
Route               /books/new
Description         Add new books
Parameter           none
Methods             POST
*/

booky.post("/books/new",(req,res) => {
    const newBook = req.body;
    database.books.push(newBook);
    return res.json({updatedBooks: database.books});  
})

/*
Route               /authors/new
Description         Add new authors
Parameter           none
Methods             POST
*/

booky.post("/authors/new",(req,res) => {
    const newAuthor = req.body;
    database.authors.push(newAuthor);
    return res.json({updatedAuthors: database.authors});
})

/*
Route               /pub/new
Description         Add new publication
Parameter           none
Methods             POST
*/

booky.post("/pub/new",(req,res) => {
    const newPub = req.body;
    database.publications.push(newPub);
    return res.json({updatedPublications: database.publications});
})

// PUSH REQUEST 

/*
Route               /pub/new
Description         Add new publication
Parameter           none
Methods             POST
*/

booky.put("/pub/update/book/:isbn", (req,res) => {
    // Update the publication database
    database.publications.forEach((publications) => {
        if(publications.id === req.body.publicationsId){
            return publications.books.push(req.params.isbn);
        }
    })

    // Update the book database
    database.books.forEach((books) => {
        if(books.ISBN === req.params.isbn){
            books.publications = req.body.publicationsId;
           return;
        }
    });

    return res.json(
        {
            books: database.books,
            publications: database.publications,
            message: "Successfully updated publications !"
        }
    )

})
    
// DELETE REQUEST 

    // Delete a book ->

    booky.delete("/books/delete/:isbn",(req,res) => {
        const updatedBooks = database.books.filter(
           (books) => books.ISBN !== req.params.isbn 
        )
// Since there was no book that doesn't match the  isbn "gita" , an emptu array of books will be returned in the console .
        return res.json({books: updatedBooks})
    }
    );

    // Delete author from book ->
    // is it right ?
    booky.delete("/books/authors/delete/:isbn",(req,res) => {
       const updatedBooks = database.books.forEach((books) => {
        if(books.ISBN === req.params.isbn){
            books.authors = books.authors.filter((authors) => authors.id !== req.body.authorId);
        }
       })

       return res.json({books: updatedBooks})
    })

    // Delete author from book and related book from author ->

/*
Route               /book/delete/author
Description         Delete an author from a book and vice versa
Parameter           none
Methods             Get
*/

booky.delete("/books/delete/authors/:isbn/:authorId", (req,res) => {
    // Delete an author from a book
    database.books.forEach((books) => {
        if(books.ISBN === req.params.isbn){
            const newAuthorsList = books.authors.filter(
                (eachAuthor) => eachAuthor !== parseInt(req.params.authorId)
            );
              books.authors = newAuthorsList ;
              return;
        }
    });
    // Delete the book from the author
    database.authors.forEach((authors) => {
        if(authors.id === parseInt(req.params.authorId)){
            const newBooksList = authors.books.filter(
                (eachBook) => eachBook !== (req.params.isbn)
            );
            authors.books = newBooksList;
            return;
        }
    });

    return res.json({
        books: database.books,
        authors: database.authors,
        message: "Database updated of books and authors !"
    })
})

// The running port of the server ->

booky.listen(3000, () => {
    console.log("Server is running on the port -->>");
})
