// here are the known bugs as of this commit
// genre selection is causing database related query generation problems.
// name search frontent-backend interaction is problematic


let selectedFilters = {};



function toggleFilterMenu(filterId) {
    const filterList = document.getElementById(filterId);
    const isOpen = filterList.style.display === 'block';

    // Open or close the clicked filter menu
    filterList.style.display = isOpen ? 'none' : 'block';
}


function applyFilter(filterType, filterValue) {
    selectedFilters[filterType] = filterValue;

    // Deselect all other filters in the same group
    const filterGroup = document.getElementsByName(filterType);
    filterGroup.forEach(filter => {
        filter.checked = false;
    });

    // Check the selected filter
    if (filterType != 'primaryTitle') {
        const selectedFilter = document.getElementById(`${filterType}-${filterValue}`);
        if (filterValue != "")
            selectedFilter.checked = true;
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

