// Variables //

const posters = document.getElementById("posters");
const radioButton = document.getElementsByName("moviefilter");
const date = new Date().getFullYear();
const searchInput = document.querySelector('.input');
const clearButton = document.getElementById('clear');
const backButton = document.getElementById("buttonBack");
const targetBlank = document.querySelector("a");


// Target blank

targetBlank.addEventListener("click", function (e) {
    if (e.target.tagName == "A" && !e.target.hasAttribute("target")) {
        e.target.setAttribute("target", "_blank");
    };
}); 



// Clear //

function clearList(){
    while (posters.firstChild){
        posters.removeChild(posters.firstChild);
    };
};


// Add movies to Dom //

function addMoviesToDom(allMovies) {
    allMovies.forEach(movie => {
        const link = document.createElement("A");
        link.setAttribute("href", "https://www.imdb.com/title/" + movie.imdbID);
        link.setAttribute("target", "_blank");
        const resultItem = document.createElement('li');
        resultItem.classList.add('all-movies');
        const image = document.createElement('IMG');
        image.setAttribute("src", movie.poster);
        resultItem.appendChild(link);
        link.appendChild(image);
        posters.appendChild(resultItem);
    }); 
}; 

addMoviesToDom(movies);


// Filter movies //

function filterMovies(wordInMovie) {
    searchInput.value='';
    clearList()
    wordInMovie.forEach(filter => {
        targetBlank;
        const link = document.createElement("A");
        link.setAttribute("href", "https://www.imdb.com/title/" + filter.imdbID);
        link.setAttribute("target", "_blank");
        const resultItem = document.createElement('li');
        resultItem.classList.add('filter-movies');
        const image = document.createElement('IMG');
        image.setAttribute("src", filter.poster);
        resultItem.appendChild(link);
        link.appendChild(image);
        posters.appendChild(resultItem);
    }); 
};   


// Radio button on chanche //

radioButton.forEach( function (radio){
    radio.addEventListener('change', function handleOnChangeEvent(event) {
    console.log(event.target);
    switch(event.target.value) {

        case "latest-movies":
            filterMovies(movies.filter(((latest) => latest.year >= 2014 )));
            break;
        
        case "avenger-movies":
            filterMovies(movies.filter(movie => movie.title.toLowerCase().includes("avenger"))); 
            break;

        case "x-men-movies":
            filterMovies(movies.filter(movie => movie.title.toLowerCase().includes("x-men")));
            break;

        case "princess-movies":  
            filterMovies(movies.filter(movie => movie.title.toLowerCase().includes("princess")));
            break;

        case "batman-movies":   
            filterMovies(movies.filter(movie => movie.title.toLowerCase().includes("batman")));
            break;

        default:
            addMoviesToDom(movies);
            break;
        };
    });
});


// Copyright //

document.getElementById("year").innerHTML = date;


// Search //

searchInput.addEventListener("input", (e) => {
    let value = e.target.value;

    if (value && value.trim().length > 0){
        value = value.trim().toLowerCase();

        setList(movies.filter(movie => movie.title.toLowerCase().includes(value)));
    } else {
        clearList();
    };
});

function noResults(){
    const error = document.createElement('li')
    error.classList.add('error-message')
    const text = document.createTextNode('No results found. Sorry!')
    error.appendChild(text)
    posters.appendChild(error)
}

function setList(results){
    clearList()
    results.forEach(result => {
        const link = document.createElement("A");
        link.setAttribute("href", "https://www.imdb.com/title/" + result.imdbID);
        link.setAttribute("target", "_blank");
        const resultItem = document.createElement('li');
        resultItem.classList.add('result-item');
        const image = document.createElement('IMG');
        image.setAttribute("src", result.poster);
        resultItem.appendChild(link);
        link.appendChild(image);
        posters.appendChild(resultItem);
    }); 

    if (results.length === 0 ){
        noResults();
    };
};


// Back button //

backButton.addEventListener("click", () => {
    searchInput.value='';
    addMoviesToDom(movies);
});

