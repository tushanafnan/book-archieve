//Common Function for Get Id and Add display Style.
const getIdAndSetStyle = (id, style) => {
  document.getElementById(id).style.display = style;
};
// Initially getting some Id.. to hide these by default..

getIdAndSetStyle("error-message", "none");
getIdAndSetStyle("noBooksFound", "none");
getIdAndSetStyle("totalBooksFound", "none");
getIdAndSetStyle("spinner", "none");

const loadBooks = () => {
  // onclick function

  const inputField = document.getElementById("search-field");
  const inputFieldText = inputField.value;
  if (inputFieldText === "") {
    //if input text empty .

    getIdAndSetStyle("error-message", "block");
    getIdAndSetStyle("noBooksFound", "none");
    getIdAndSetStyle("totalBooksFound", "none");
    getIdAndSetStyle("spinner", "none");
    document.getElementById("book-card-container").textContent = "";
  } else {
    getIdAndSetStyle("noBooksFound", "none");
    getIdAndSetStyle("spinner", "block");
    getIdAndSetStyle("error-message", "none");
    getIdAndSetStyle("totalBooksFound", "none");

    const url = `https://openlibrary.org/search.json?q=${inputFieldText}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => displayBooks(data.docs));

    inputField.value = "";
    document.getElementById("book-card-container").textContent = "";
  }
};

//------Display Books Card

const displayBooks = (books) => {
  if (books.length === 0) {
    //-----if searched book is  no available.

    getIdAndSetStyle("spinner", "none");
    getIdAndSetStyle("error-message", "none");
    getIdAndSetStyle("totalBooksFound", "none");
    getIdAndSetStyle("noBooksFound", "block");
  } else {
    getIdAndSetStyle("spinner", "none");
    getIdAndSetStyle("totalBooksFound", "block");
    getIdAndSetStyle("noBooksFound", "none");

    document.getElementById("booksFound").innerText = books.length; //---To show amount of books found.
    const booksContainer = document.getElementById("book-card-container");
    booksContainer.textContent = "";

    books.forEach((book) => {
      const div = document.createElement("div");

      div.className = "col";
      div.innerHTML = `
          <div class="card mb-3 bg-dark text-white shadow border border-info" style="max-width: 540px;">
          <div class="row g-0">
            <div class="col-md-4">
              <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="img-fluid rounded-start" alt="No Image Available">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h2 class="card-title title-color">${book.title}</h2>
                <div class="card-text text-color">
                   <h5> <span class=" text-info"> Author :</span> ${book.author_name}</h5>
                   <h5><span class=" text-info">First Published :</span> ${book.first_publish_year}</h5>
                   <h5><span class=" text-info"> Publisher :</span> ${book.publisher}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
          `;
      booksContainer.appendChild(div);
    });
  }
};
