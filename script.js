const saveButton = document.querySelector(".save-button");
const cancelButton = document.querySelector(".cancel-button");
const contents = document.querySelectorAll(".popup-form div input");
const newBookButton = document.querySelector("#new-book-button");

let currentPopup = document.querySelector(".bg-popup");
let bookArray = [];

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function saveBook(event){
    event.preventDefault();
    const forms = [];
    contents.forEach(content => {
        if(content.tagName == "INPUT"){
            forms.push(content);
        }
    })
    let title, author, pages, read;
    for(let i = 0; i < forms.length; i++){
        title = forms[0].value;
        author = forms[1].value;
        pages = forms[2].value;
        read = forms[3].checked;
    }
    const newBook = new Book(title, author, pages, read);
    bookArray.push(newBook);
    console.log(newBook);
    currentPopup.style.display = "none";
}

function closePopup(){
    currentPopup.style.display = "none";
}

function openNewBookPopup(){
    currentPopup.style.display = "flex";
}

saveButton.addEventListener("submit",(event) => {saveBook(event);});

cancelButton.addEventListener("click", closePopup);
newBookButton.addEventListener("click", openNewBookPopup)