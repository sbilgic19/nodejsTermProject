let selectedFilters = {};
let is_initial = true;

async function submitSearchRequest(filters, callback) {
    var url = new URL("http://localhost:3000/retrieveActors");

    Object.keys(filters).forEach(key => url.searchParams.append(key, filters[key]));

    const response = await fetch(url);
    const data = await response.json();
    callback(data);
}


function toggleFilterMenu(filterId) {
    const filterList = document.getElementById(filterId);
    const isOpen = filterList.style.display === 'block';

    // Open or close the clicked filter menu
    filterList.style.display = isOpen ? 'none' : 'block';
}

function applyFilter(filterType, filterValue) {
/*
    if (is_initial == true) {
        // initialize the selectedFilters object
        initialize_selectedFilters();
    }

*/

    if (filterType == 'age') {
        // set all of other radio choices to false and set the selected one to true
        selectedFilters['age'] = filterValue;
        const filterGroup = document.getElementsByName('age');
        filterGroup.forEach(filter => {
            filter.checked = false;
        });
        document.getElementById(filterValue).checked = true;
        // set the selected filter to the selected value converting str to int

    }
    if (filterType == 'firstname') {
        // set all of other radio choices to false and set the selected one to true
        selectedFilters['firstname'] = filterValue;

    }
    if (filterType == 'genres') {
        // set all of other radio choices to false and set the selected one to true
        selectedFilters['genres'] = filterValue;
        const filterGroup = document.getElementsByName('genres');
        filterGroup.forEach(filter => {
            filter.checked = false;
        });
        document.getElementById(filterValue).checked = true;
        // set the selected filter to the selected value converting str to int
    }

    // get the value of the search bar
    const searchBar = document.getElementById('search-bar');
    const searchText = searchBar.value;
    // set the selected filter to the selected value
    /*if (searchText.trim() !== '') {
        selectedFilters['age'] = searchText.trim();
    }
    else {
        selectedFilters['age'] = '';
    }*/


    // Send the selectedFilters object to the backend for processing
    // console.log(selectedFilters); for debug purposes
}
function performSearch() {

    let searchBar = document.getElementById('search-bar');
    let searchText = searchBar.value;
    
    if (searchText.trim() !== '') {
        applyFilter('firstname', searchText);
    }

    else {
        delete selectedFilters['firstname'];
    }

    // Make the request to the server with the selected filters
    console.log(selectedFilters);
    submitSearchRequest(selectedFilters, (data) => {
        // Clear previous results
        document.getElementById('results').innerHTML = '';

        // Create a div for each actor in the results
        data.forEach((actor, index) => {
            const actorDiv = document.createElement('div');
            actorDiv.id = `actor-${index}`;
            actorDiv.classList.add('actor-item');
            if (actor.deathYear == 0){
                actor.deathYear = "Alive";
            }
            // Add details about the actor to the div
            actorDiv.innerHTML = `
                <div class="actor-fname"><h2>${actor.firstName}</h2></div>
		<div class="actor-lname"><h2>${actor.lastName}</h2></div>
                <div class="actor-birth-date"><p>Birth Date: ${actor.birthYear}</p></div>
                <div class="actor-death-date"><p>Death Date: ${actor.deathYear}</p></div>
                <div class="actor-image">${actor.imageURL ? `<img src="${actor.imageURL}" alt="${actor.firstName}">` : `<img src="https://media.comicbook.com/files/img/default-actor.png" alt="No image available">`}</div>
            `;

            // Add the actor div to the results div
            document.getElementById('results').appendChild(actorDiv);
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    performSearch();
});