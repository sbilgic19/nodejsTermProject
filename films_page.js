// here are the known bugs as of this commit
// genre selection is causing database related query generation problems.
// name search frontent-backend interaction is problematic


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
    console.log(selectedFilters);
    // TODO: Implement the actual filtering and display the results
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
                <div class="movie-image"><img src="${movie.imageURL}" alt="${movie.primaryTitle}"></div>
            `;

            // Add the movie div to the results div
            document.getElementById('results').appendChild(movieDiv);
        });
    });
}


