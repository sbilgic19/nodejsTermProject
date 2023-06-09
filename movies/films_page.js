let selectedFilters = {};
let is_initial = true;


function toggleFilterMenu(filterId) {
    const filterList = document.getElementById(filterId);
    const isOpen = filterList.style.display === 'block';

    // Open or close the clicked filter menu
    filterList.style.display = isOpen ? 'none' : 'block';
}

function initialize_selectedFilters() {
    selectedFilters['primaryTitle'] = '';
    selectedFilters['releaseYear1920'] = false;
    selectedFilters['releaseYear2040'] = false;
    selectedFilters['releaseYear4060'] = false;
    selectedFilters['releaseYear6080'] = false;
    selectedFilters['releaseYear8000'] = false;
    selectedFilters['releaseYear0010'] = false;
    selectedFilters['releaseYear1020'] = false;
    selectedFilters['releaseYear2020'] = false;
    selectedFilters['releaseYear1920'] = false;
    selectedFilters['duration0040'] = false;
    selectedFilters['duration4070'] = false;
    selectedFilters['duration70150'] = false;
    selectedFilters['duration150'] = false;
    selectedFilters['averageRating'] = 0;
    selectedFilters['genreDrama'] = false;
    selectedFilters['genreHistory'] = false;
    selectedFilters['genreComedy'] = false;
    selectedFilters['genreRomance'] = false;
    selectedFilters['genreFamily'] = false;
    selectedFilters['genreWestern'] = false;
    selectedFilters['genreBiography'] = false;
    is_initial = false;
}


function applyFilter(filterType, filterValue) {

    if (is_initial == true) {
        // initialize the selectedFilters object
        initialize_selectedFilters();
    }



    if (filterType == 'averageRating') {
        // set all of other radio choices to false and set the selected one to true
        selectedFilters['averageRating'] = filterValue;
        const filterGroup = document.getElementsByName('averageRating');
        filterGroup.forEach(filter => {
            filter.checked = false;
        });
        document.getElementById(filterValue).checked = true;
        // set the selected filter to the selected value converting str to int
        selectedFilters['averageRating'] = parseInt(filterValue);

    }

    // Check the selected filter
    else if (filterType != 'primaryTitle') {
        const filterGroup = document.getElementsByName(filterType);
        // if selected filter is currently false set it true, otherwise set it false
        // note that filter value is irrelevant here
        if (selectedFilters[filterType] == true) {
            selectedFilters[filterType] = false;
        }
        else {
            selectedFilters[filterType] = true;
        }
    }


    // get the value of the search bar
    const searchBar = document.getElementById('search-bar');
    const searchText = searchBar.value;
    // set the selected filter to the selected value
    if (searchText.trim() !== '') {
        selectedFilters['primaryTitle'] = searchText.trim();
    }
    else {
        selectedFilters['primaryTitle'] = '';
    }


    // Send the selectedFilters object to the backend for processing
    // console.log(selectedFilters); for debug purposes
}

function performSearch() {

    let searchBar = document.getElementById('search-bar');
    let searchText = searchBar.value;

    if (searchText.trim() !== '') {
        applyFilter('primaryTitle', searchText);
    }

    else {
        delete selectedFilters['primaryTitle'];
    }
    // Make the request to the server with the selected filters
    submitSearchRequest(selectedFilters, (data) => {
        // Clear previous results
        document.getElementById('results').innerHTML = '';

        // Create a div for each movie in the results
        data.forEach((movie, index) => {
            const movieDiv = document.createElement('div');
            movieDiv.id = `movie-${index}`;
            movieDiv.classList.add('movie-item');

            // Add details about the movie to the div
            movieDiv.innerHTML = `
                <div class="movie-title"><h2>${movie.primaryTitle}</h2></div>
                <div class="movie-release-year"><p>Release Year: ${movie.releaseYear}</p></div>
                <div class="movie-average-rating"><p>Average Rating: ${movie.averageRating}</p></div>
                <div class="movie-duration"><p>Duration: ${movie.duration} minutes</p></div>
                <div class="movie-description"><p>Description: ${movie.description}</p></div>
                <div class="movie-image">${movie.imageURL ? `<img src="${movie.imageURL}" alt="${movie.primaryTitle}">` : `<img src="https://media.comicbook.com/files/img/default-movie.png" alt="No image available">`}</div>
            `;

            // Add the movie div to the results div
            document.getElementById('results').appendChild(movieDiv);
        });
    });
}

function randomLoad() {
    let randomFilters = {};
    initialize_selectedFilters()

    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
    });

    const averageRatingRadios = document.querySelectorAll('input[name="averageRating"]');
    averageRatingRadios.forEach((radio) => {
        radio.checked = false;
    });

    const searchInput = document.getElementById('search-bar');
    searchInput.value = '';


    randomFilters['primaryTitle'] = '';
    randomFilters['releaseYear1920'] = Math.random() < 0.2;
    randomFilters['releaseYear2040'] = Math.random() < 0.2;
    randomFilters['releaseYear4060'] = Math.random() < 0.2;
    randomFilters['releaseYear6080'] = Math.random() < 0.2;
    randomFilters['releaseYear8000'] = Math.random() < 0.2;
    randomFilters['releaseYear0010'] = Math.random() < 0.2;
    randomFilters['releaseYear1020'] = Math.random() < 0.2;
    randomFilters['releaseYear2020'] = Math.random() < 0.2;
    randomFilters['releaseYear1920'] = Math.random() < 0.2;
    randomFilters['duration0040'] = Math.random() < 0.5;
    randomFilters['duration4070'] = Math.random() < 0.5;
    randomFilters['duration70150'] = Math.random() < 0.5;
    randomFilters['duration150'] = Math.random() < 0.5;
    randomFilters['averageRating'] = 0;
    randomFilters['genreDrama'] = Math.random() < 0.3;
    randomFilters['genreHistory'] = Math.random() < 0.5;
    randomFilters['genreComedy'] = Math.random() < 0.3;
    randomFilters['genreRomance'] = Math.random() < 0.3;
    randomFilters['genreFamily'] = Math.random() < 0.3;
    randomFilters['genreWestern'] = Math.random() < 0.3;
    randomFilters['genreBiography'] = Math.random() < 0.3;

    submitSearchRequest(randomFilters, (data) => {
        // Clear previous results
        document.getElementById('results').innerHTML = '';

        // Create a div for each movie in the results
        data.forEach((movie, index) => {
            const movieDiv = document.createElement('div');
            movieDiv.id = `movie-${index}`;
            movieDiv.classList.add('movie-item');

            // Add details about the movie to the div
            movieDiv.innerHTML = `
                <div class="movie-title"><h2>${movie.primaryTitle}</h2></div>
                <div class="movie-release-year"><p>Release Year: ${movie.releaseYear}</p></div>
                <div class="movie-average-rating"><p>Average Rating: ${movie.averageRating}</p></div>
                <div class="movie-duration"><p>Duration: ${movie.duration} minutes</p></div>
                <div class="movie-description"><p>Description: ${movie.description}</p></div>
                <div class="movie-image">${movie.imageURL ? `<img src="${movie.imageURL}" alt="${movie.primaryTitle}">` : `<img src="https://media.comicbook.com/files/img/default-movie.png" alt="No image available">`}</div>
            `;

            // Add the movie div to the results div
            document.getElementById('results').appendChild(movieDiv);
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    randomLoad();
});