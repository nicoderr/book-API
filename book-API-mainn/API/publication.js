const Router = require("express").Router();
const BookModel = require("../Schema/book");
const PublicationModel = require("../Schema/publication");


Router.get("/publication/", (req, res) =>{
  
    return res.json({ Publication : Database.Publication})
  
  });
  
  Router.get("/publication/:id", (req,res) =>{
  
    const getPublication= Database.Publication.filter(
      (publish) => publish.id == req.params.id
    );
  
    return res.json({ Publication : getPublication});
  });
  
  
  // Route  -  /publication/new
  // Des    -  to add new publication
  // Access -  public
  // Params -  none
  // Method -  POST
  
  Router.post("/publication/new",async (req,res) => 
  {
    try
    {
      const {newPublication} = req.body;
      await Publication.create(newPublication);
      return res.json({message: "Publication added"});
    }
    catch(error)
    {
      return res.json({error :error.message});
    }    
    
  });
  
  
  
  
  // Route  -  /publishment/delete/:id
  // Des    -  to delete an author 
  // Access -  public
  // Params -  id
  // Method -  DELETE
  
  Router.delete("/publication/delete/:id", async(req,res) =>
  {
    const {id} = req.params;
    const updatePublication = await Publication.findOneAndDelete(
      {
  
        id : parseInt(id),
      }
    );
    return res.json(updatePublication);
  });
  
  // Route  -  /book/delete/author/:id/:isbn
  // Des    -  to delete a book from publication
  // Access -  public
  // Params -  id,isbn
  // Method -  DELETE
  
  Router.delete("/publication/delete/book/:id/:isbn", (req,res) =>
  {
    const {id, isbn} = req.params;
  
    Database.Publication.forEach((publication) => 
    {
      if(publication.id === parseInt(id))
      {
        if(!publication.books.includes(isbn))
        {
          return;
        }
        publication.books = publication.books.filter((bookISBN) => bookISBN !== isbn);
        return publication;
  
      }
      return publication;
    });
  
    Database.Book.forEach((book) =>
    {
      if(book.ISBN === isbn)
      {
        if(!book.publication === parseInt(id))
        {
          return;
        }
        book.publication = 0;
        return book;
      }
      return book;
    })
    return res.json({publication : Database.Publication, book : Database.Book});
  });
  module.exports = Router;
