const cancelButton = document.querySelector(".cancel-button");
const contents = document.querySelectorAll(".popup-form div input");
const newBookButton = document.querySelector("#new-book-button");
const bookForm = document.querySelector(".popup-form");
const card = document.querySelector(".card");
const main = document.querySelector("main");

let currentPopup = document.querySelector(".bg-popup");
let bookArray = [];
let bookOnEdit;
let cardOnEdit;

function Book(title, author, pages, read, unique) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.unique = unique;
}

function saveBook(event) {
  event.preventDefault();
  const forms = [];
  contents.forEach((content) => {
    if (content.tagName == "INPUT") {
      forms.push(content);
    }
  });
  let title, author, pages, read, unique;
  for (let i = 0; i < forms.length; i++) {
    title = forms[0].value;
    author = forms[1].value;
    pages = forms[2].value;
    read = forms[3].checked;
    unique =
      title.charAt(0) +
      author.charAt(0) +
      (title.length + author.length) +
      pages;
  }
  const newBook = new Book(title, author, pages, read, unique);
  bookArray.push(newBook);
  let newCard = card.cloneNode(true);
  newCard.style.display = "flex";
  newCard.querySelector(".delete-button").addEventListener("click", removeBook);
  newCard
    .querySelector(".edit-button")
    .addEventListener("click", openEditBookPopup);
  newCard.querySelector(".checkbox").addEventListener("click",readCheckbox);
  newCard.setAttribute("data-unique", unique);
  newCard.querySelector(".card-title").textContent += " " + title;
  newCard.querySelector(".card-author").textContent += " " + author;
  newCard.querySelector(".card-pages").textContent += " " + pages;
  newCard.querySelector(".checkbox").checked = read;

  main.appendChild(newCard);
  currentPopup.style.display = "none";
}

function closePopup() {
  currentPopup.style.display = "none";
}

function openNewBookPopup() {
  bookForm.removeEventListener("submit", editBook);
  bookForm.addEventListener("submit", saveBook);
  const header = document.querySelector(".popup-content .header");
  header.textContent = "Add a new book";
  currentPopup.style.display = "flex";
  contents.forEach((content) => {
    if (content.tagName == "INPUT" && content.value != "Save") {
      content.value = "";
      content.checked = false;
    }
  });
}

function openEditBookPopup(event) {
  cardOnEdit = event.target.parentNode.parentNode;
  let unique = cardOnEdit.getAttribute("data-unique");
  bookArray.forEach((book) => {
    if (book.unique == unique) {
      bookOnEdit = bookArray[bookArray.indexOf(book)];
    }
  });

  bookForm.removeEventListener("submit", saveBook);
  bookForm.addEventListener("submit", editBook);
  const header = document.querySelector(".popup-content .header");
  header.textContent = "Edit a book";
  currentPopup.style.display = "flex";
  const forms = [];
  contents.forEach((content) => {
    if (content.tagName == "INPUT" && content.value != "Save") {
      forms.push(content);
    }
  });

  for (let i = 0; i < forms.length; i++) {
    forms[0].value = bookOnEdit.title;
    forms[1].value = bookOnEdit.author;
    forms[2].value = bookOnEdit.pages;
    forms[3].checked = bookOnEdit.read;
  }
}

function editBook(event) {
  event.preventDefault();

  let book = bookOnEdit;

  const forms = [];
  contents.forEach((content) => {
    if (content.tagName == "INPUT") {
      forms.push(content);
    }
  });
  for (let i = 0; i < forms.length; i++) {
    book.title = forms[0].value;
    book.author = forms[1].value;
    book.pages = forms[2].value;
    book.read = forms[3].checked;
    book.unique =
      book.title.charAt(0) +
      book.author.charAt(0) +
      (book.title.length + book.author.length) +
      book.pages;
  }

  cardOnEdit.setAttribute("data-unique", book.unique);
  cardOnEdit.querySelector(".card-title").textContent = "Title: " + book.title;
  cardOnEdit.querySelector(".card-author").textContent =
    "Author " + book.author;
  cardOnEdit.querySelector(".card-pages").textContent = "Pages " + book.pages;
  cardOnEdit.querySelector(".checkbox").checked = book.read;
  currentPopup.style.display = "none";
}

function removeBook(event) {
  let removalCard = event.target.parentNode.parentNode;
  let unique = removalCard.getAttribute("data-unique");
  bookArray.forEach((book) => {
    if (book.unique == unique) {
      bookArray.splice(bookArray.indexOf(book), 1);
    }
  });
  removalCard.remove();
}

function readCheckbox(event) {
    let unique = event.target.parentNode.parentNode.parentNode.getAttribute("data-unique");;
    let checkboxBook;
    bookArray.forEach((book) => {
        if (book.unique == unique) {
          checkboxBook = bookArray[bookArray.indexOf(book)];
        }
      });
    
  if(event.target.checked){
    checkboxBook.read = true;
  }
  else{
    checkboxBook.read=false;
  }
}

cancelButton.addEventListener("click", closePopup);

newBookButton.addEventListener("click", openNewBookPopup);
