/*

Rquirements

Book
 -ISBN          -String
 -Title         -String
 -Author        -[Numbers (auther id)]
 -Language      -String
 -Publication   -Number
 -NoOfPages     -Number
 -Categories    -[String]

Author
  -ID            -Number
  -Name          -String
  -Books         -[String]

 Publication
  -ID            -Number
  -Name          -String
  -Books         -[String]


  ---------API's------------

  Book
    -GET
       -to get all books        =
       -to get specific books   =
       -to get list of books based on category =
       -to get list of books based on author


    -POST
       -to add new book =


    -PUT
      -to update book title = 
      -to update or add new author to a book 

    -DELETE
      -to delete a book =
      -to delete an author from the book =

  Autors
    -GET
      -to get all authors       =
      -to get specific author   =
      -to get list of author based on book

    -POST
       -to add new author =

    -PUT
      -to update author details
      

    -DELETE
      -to delete an author =


  Publication
     -GET
      -to get all publications     =
      -to get specific publications =
      -to get list of publications based on book

    -POST
       -to add new publication =

    -PUT
      -to update publication details
      -to update/add new book

    -DELETE
      -to delete a book from publication
      -to delete a publication =


*/