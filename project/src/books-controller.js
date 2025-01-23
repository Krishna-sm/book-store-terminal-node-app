const readline = require("readline-sync");
const { BooksModel } = require("./db/books.models");
const Table = require('cli-table3');
const { default: inquirer } = require("inquirer");






exports.EditBook=async()=>{
    const books = await BooksModel.find({})

    let list_arr = []

    books.forEach((cur)=>{
        list_arr.push(`${cur._id} - ${cur.title} || ${cur.author}`)
    })

   const {bookId,confirm} = await inquirer.prompt([
        {
            type: 'list',
            message: 'Select Book: ',
            choices: list_arr,
            filter:(data)=>data.split("-")[0].trim(),
            name: 'bookId'
        },
        {
            type:"confirm",
            message: 'Do you want to Publish this book?',
            name:"confirm"
        }
    ])
// console.log(bookId,confirm);
if(confirm){

     await BooksModel.findByIdAndUpdate(bookId,{
        isPublished: true
     })
     console.log("Book Published successfully".green)
     return
}

console.log("Book Not Published".red);


    


    // console.log(book);
 

    

}

exports.DeleteBook=async()=>{
    const books = await BooksModel.find({})

    let list_arr = []

    books.forEach((cur)=>{
        list_arr.push(`${cur._id} - ${cur.title} || ${cur.author}`)
    })

   const {bookId,confirm} = await inquirer.prompt([
        {
            type: 'list',
            message: 'Select Book: ',
            choices: list_arr,
            filter:(data)=>data.split("-")[0].trim(),
            name: 'bookId'
        },
        {
            type:"confirm",
            message: 'Do you want to delete this book?',
            name:"confirm"
        }
    ])
// console.log(bookId,confirm);
if(confirm){

     await BooksModel.findByIdAndDelete(bookId)
     console.log("Book deleted successfully".green)
     return
}



    


    // console.log(book);
 

    

}
exports.ReadBook=async()=>{
    const table2 = new Table();
    const books = await BooksModel.find({})

    let list_arr = []

    books.forEach((cur)=>{
        list_arr.push(`${cur._id} - ${cur.title} || ${cur.author}`)
    })

   const {bookId} = await inquirer.prompt([
        {
            type: 'list',
            message: 'Select Book: ',
            choices: list_arr,
            filter:(data)=>data.split("-")[0].trim(),
            name: 'bookId'
        }
    ])

    const book = await BooksModel.findById(bookId)
    // console.log(book);

        table2.push(
            {
                'ID': String(book._id),
                
            },
            {
                'Title': book.title,
               
            },
            {
                'Author': book.author,
               
            },
            {
                'content':book.content,
              
            },
            {
                'isPublished': book.isPublished? "Published".green : "Not Published".red
            }
        )
        console.log(table2.toString());

    

}

exports.AddBook=async()=>{
    // add book logic here
    // console.log("hello");
    const title = readline.question("Enter Book Title : ",)
    if(!title){
        console.log("title can not be empty".red);
        
        this.AddBook()
        return
    }
    const content = readline.question("Enter Book content : ")
    if(!content){
        console.log("content can not be empty".red);

        this.AddBook()
        return
    }
    const author = readline.question("Enter Book Author Name : ",{
        defaultInput:"admin"
    })
    
    await BooksModel.create({
        title,
        content,
        author
    })
    
    console.log("Book added successfully".green);
    
}


exports.ListBooks=async()=>{
    const table = new Table({
        head: ['ID', 'Title','Author',"isPublished"],
        colWidths: [30, 50,  20,25],
        style:{
            head: ['green'],
            border: {
                top: 'green',
                bottom: 'green',
                left: 'green',
                right: 'green',
                horizontal: 'green',
                vertical: 'green'
            }
        }
    })
    
    // list books logic here
    const books = await BooksModel.find({})
    // console.table(books.toString())
    books.forEach((cur)=>{
        table.push([String(cur._id),cur.title,cur.author,cur.isPublished?"Published".green:"Not Published".red])
    })
    console.log(table.toString());
}