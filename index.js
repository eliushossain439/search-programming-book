// loading function
const loadingToggle = displayToggle => {
    document.getElementById('loading').style.display = displayToggle
}
// errorr massg function
const errorToggle = somthingWrong => {
    document.getElementById('erorr').style.display = somthingWrong
}
// show card details function
const cardDeatails = bookDetails => {
    document.getElementById('bookDetails').style.display = bookDetails
}

// search box function
const searchBook = () => {
    const inputID = document.getElementById('searchText')
    if (inputID.value === '') {
        errorToggle('block')
        loadingToggle('none')

    } else {
        errorToggle('none')
        loadingToggle('block')
    }

    cardDeatails('none')
    const searchText = inputID.value
    inputID.textContent = ''
    inputID.value = ''
    const url = `https://openlibrary.org/search.json?q=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => getBook(data.docs))
}

// card set function
const getBook = data => {
    data.forEach(book => {
        const bookDetails = document.getElementById('bookDetails')
        const div = document.createElement('div')
        div.innerHTML = `
        <div class="col">
            <div class="card">
            <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
                <div class="card-body text-center text-light bg-secondary">
                    <h5 class="text-white">Book-Name : ${book.title}</h5>
                    <p class="text-info">Author : ${book.author_name}</p>
                    <p class="card-title">First-pulish : ${book.first_publish_year}</p>
                    <p class="card-title">publisher : ${book.publisher}</p>
                </div>
            </div>
        </div>
        `
        bookDetails.appendChild(div)
        loadingToggle('none')
        cardDeatails('block')

    });
}
