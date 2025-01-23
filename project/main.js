const dotenv = require("dotenv")
const colors= require("colors")
const figlet = require("figlet")
const {default:inquirer} = require("inquirer")
const { ConnectDB } = require("./src/db/config")
const { AddBook, ListBooks,ReadBook, DeleteBook, EditBook } = require("./src/books-controller")

dotenv.config()
// connect of database
ConnectDB()

let isAppShow = false

// console.log('Hello'.bgRed);
async function showAppName(){
    await figlet("Book Store","3D-ASCII",(err,data)=>{
        if(err){
            console.log("Error:",err)
            return;
        }
        console.log(data.red)
    })
    
}

async function main(){
    if(!isAppShow){
        await showAppName()
        isAppShow=true
    }
   const{choice} =await inquirer.prompt([
        {
            type:'list',
            choices:[
                "Add Book",
                "Read Book",
                "Edit Book",
                "Delete Book",
                "List All Books",
                "Exit",
            ],
            name:"choice",
            message:"What would you like to do?",
            theme:{
                helpMode:'auto'
            }
        }
    ])
            switch (choice) {
                case "Add Book":
                    await AddBook()
                    break; 

                case "List All Books":
                    // list all books
                   await ListBooks()
                    break;


                 case "Read Book":
                    await ReadBook();
                    break;
                case "Delete Book":
                    await DeleteBook()
                    break;
                case "Edit Book":
                    await EditBook()
                    break;
                case "Exit":
                    console.log("Thank you for using".red);
                    
                        process.exit(1)
                        break;
                default:
                    break;
            }



// console.log(choice);
main()
}
 
main()

