
const Router = require("express").Router();
const BookModel = require("../Schema/book");
const AuthorModel = require("../Schema/author");

// Route   - /book
// Des     - To get all the BookModels
// Access  - Public
// Method  - GET
// Params  - none
// Body     -none
Router.get("/book", async(req,res) => {
    console.log("ji");
    const getAllBooks = await BookModel.find();
    return res.json(getAllBooks);
  });
  
  
  // Route   - /book/:bookID
  // Des     - To get book based on ISNB
  // Access  - Public
  // Method  - GET
  // Params  - bookID
  // Body     -none
  Router.get("/book/:bookID", async(req,res) => {
  
    const getSpecificBook = await BookModel.findOne({ISBN: req.params.bookID});
  
    if(!getSpecificBook)
    {
      return res.json({
        error: `No book found for the ISBN ${req.params.ID}`
      });
   }
  
    return res.json(getSpecificBook);
  });
  
  // Route   - /book/c/:category
  // Des     - To get book based on Category
  // Access  - Public
  // Method  - GET
  // Params  - category
  // Body     -none
  Router.get("/book/c/:category", async (req,res) => {
  
    const getSpecificBook = await BookModel.findOne({category : req.params.category});
     
    if(!getSpecificBook)
    {
      return res.json({error : `No book found for the category ${req.params.category}`});
    }
    return res.json(getSpecificBook);
  });
  
  Router.get("/book/a/:author", (req,res) => {
  
    const getBook = Database.BookModel.filter(
      (book) => book.authors.includes(parseInt(req.params.author))
       
      );
      
        return res.json({ Authors : getBook});
  });
// Route  -  /book/new
// Des    -  to add new book
// Access -  public
// Params -  none
// Method -  POST


Router.post("/book/new" ,async (req,res) =>
{
  try
  {
    const {newBook} = req.body;
    await BookModel.create(newBook);
    return res.json({message:  'Book added to the database'});
  }
  catch(error){
    return res.json({error: error.message});
  }

});

// Route  -  /book/update
// Des    -  to update book title
// Access -  public
// Params -  isbn
// Method -  PUT

Router.put("/book/update/:isbn", async(req,res) =>
{
  const {title} = req.body.title;
  const updatedBook =await BookModel.findOneAndUpdate(
    {
      ISBN: req.params.isbn,
    },
    {
      title: title,
    },
    {
      new : true,
    }
  );
   
  return res.json({books : updatedBook});

});
// Route  -  /bookAuthor/update/:isbn
// Des    -  to update/add new author to a book
// Access -  public
// Params -  isbn
// Method -  PUT

Router.put("/book/update/author/:isbn" , async(req,res) =>
{
  const {newAuthor} = req.body;
  const {isbn} = req.params;

  const updatedBook= await BookModel.findOneAndUpdate(
    {
      ISBN : isbn,
    },
    {
      $addToSet: {
        authors : newAuthor
      }
    },
    {
      new: true,
    }
  );
  const updatedAuthor= await AuthorModel.findOneAndUpdate(
    {
      id: newAuthor,
    },
    {
      $addToSet: {
        books: isbn,
      }
    },
    {
      new : true,
    },
  );

  return res.json({
        book :updatedBook, 
        authors : updatedAuthor,
        message : "New author was added into the database"});
});
// Route  -  /book/delete/:isbn
// Des    -  to delete a book 
// Access -  public
// Params -  isbn
// Method -  DELETE
Router.delete("/book/delete/:isbn",async (req,res) => 
{
  const {isbn} = req.params;
  const updateBookDatabse = await BookModel.findOneAndDelete({

    ISBN : isbn,

  },
  {
    new: true,
  }); 
  return res.json(updateBookDatabse);
});

// Route  -  /book/delete/author/:isbn/:id
// Des    -  to delete an author from the book 
// Access -  public
// Params -  isbn, id
// Method -  DELETE

Router.delete("/book/delete/author/:isbn/:id", async(req,res) =>
{
  const {isbn,id} = req.params;

  const updateBook = await BookModel.findOneAndUpdate(
    {
      ISBN : isbn,
    },
    {
      $pull:
      {
        authors: parseInt(id),
      }
    },
    {
      new : true,
    });
  
  const updateAuthor = await AuthorModel.findOneAndUpdate(
    {
      id : parseInt(id),
    },
    {
      $pull :
      {
        books: isbn,
      }
    },
    {
      new:true,
    });  
  
  return res.json({message : "Author was deleted", book : updateBook, author : updateAuthor});
});

module.exports = Router;