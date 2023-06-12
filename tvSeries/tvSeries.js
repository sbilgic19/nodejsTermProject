let tvSeriesArray = [];
let selectedFilters = {};


async function fetchingTVSeries() {
    const url = `http://localhost:3000/getAllTvSeries`;
    const response = await fetch(url);
    const jsonData = await response.json();

    return jsonData;    
}

function initialFillingTvSeriesToThePage() {

    clearAllFilters();
    fetchingTVSeries().then((jsonData) => {
        for(var i=0; i<jsonData.length; i++) {
            jsonData[i].genre = [jsonData[i].genre]
            if( i!=0 && (jsonData[i-1].tconst != jsonData[i].tconst)) {
                tvSeriesArray.push(jsonData[i]);
            }else if (i!=0 && ((jsonData[i-1].tconst == jsonData[i].tconst))) {
                jsonData[i-1].genre.push(...jsonData[i].genre);
            }
        }    
    }).then(() => {
        fillingTvSeriesFromArray();
    })
    
}
function addingFilters(filterCategory, filterName) {

    if (filterCategory == 'airtime') {
        if(filterName == '<5') {
            tvSeriesArray = tvSeriesArray.filter(item => {
                //console.log(item);
                return (parseInt(item.endYear) - parseInt(item.startYear)) < 5;
            } );
        }else if(filterName == '5-10') {
            tvSeriesArray = tvSeriesArray.filter(item => {
                var diff = parseInt(item.endYear) - parseInt(item.startYear);
                return (diff > 5 && diff < 10);
            } );
        }else if(filterName == '10-20') {
            tvSeriesArray = tvSeriesArray.filter(item => {
                var diff = parseInt(item.endYear) - parseInt(item.startYear);
                return (diff > 10 && diff < 20);
            } );
        }else{
            tvSeriesArray = tvSeriesArray.filter(item => {
                var diff = parseInt(item.endYear) - parseInt(item.startYear);
                return (diff > 20);
            } );
        }
    } else if(filterCategory == 'average-rating') {
        if(filterName == '6+') {
            tvSeriesArray = tvSeriesArray.filter(item => {
                return item.averageRating > 6.0;
            })    
        }else if(filterName == '7+') {
            tvSeriesArray = tvSeriesArray.filter(item => {
                return item.averageRating > 7.0;
            }) 
        }else if(filterName == '8+') {
            tvSeriesArray = tvSeriesArray.filter(item => {
                return item.averageRating > 8.0;
            }) 
        }else{
            tvSeriesArray = tvSeriesArray.filter(item => {
                return item.averageRating > 9.0;
            }) 
        }
    }else if(filterCategory == 'release-year') {
        if(filterName == '<1920') {
            tvSeriesArray = tvSeriesArray.filter(item => {
                return item.startYear < 1920;
            }) 
        }else if(filterName == '1920-1940') {
            tvSeriesArray = tvSeriesArray.filter(item => {
                return (item.startYear > 1920) && (item.startYear < 1940);
            }) 
        }else if(filterName == '1940-1960') {
            tvSeriesArray = tvSeriesArray.filter(item => {
                return (item.startYear > 1940) && (item.startYear < 1960);
            }) 
        }else if(filterName == '1960-1980') {
            tvSeriesArray = tvSeriesArray.filter(item => {
                return (item.startYear > 1960) && (item.startYear < 1980);
            }) 
        }else if(filterName == '1980-2000') {
            tvSeriesArray = tvSeriesArray.filter(item => {
                return (item.startYear > 1980) && (item.startYear < 2000);
            }) 
        }else if(filterName == '2000-2010') {
            tvSeriesArray = tvSeriesArray.filter(item => {
                return (item.startYear > 2000) && (item.startYear < 2010);
            }) 
        }else if(filterName == '2010-2020') {
            tvSeriesArray = tvSeriesArray.filter(item => {
                return (item.startYear > 2010) && (item.startYear < 2020);
            }) 
        }else if(filterName == '>2020') {
            tvSeriesArray = tvSeriesArray.filter(item => {
                return item.startYear > 2020;
            }) 
        }
    }else if(filterCategory == 'genre-filter') {
        if(filterName == 'drama') {
            tvSeriesArray = tvSeriesArray.filter(item => {
                return item.genre.includes('Drama');
            })
        }else if(filterName == 'family') {
            tvSeriesArray = tvSeriesArray.filter(item => {
                return item.genre.includes('Family');
            })
        }else if(filterName == 'western') {
            tvSeriesArray = tvSeriesArray.filter(item => {
                return item.genre.includes('Western');
            })
        }else if(filterName == 'comedy') {
            tvSeriesArray = tvSeriesArray.filter(item => {
                return item.genre.includes('Comedy');
            })
        }else if(filterName == 'romance') {
            tvSeriesArray = tvSeriesArray.filter(item => {
                return item.genre.includes('Romance');
            })
        }else if(filterName == 'adventure') {
            tvSeriesArray = tvSeriesArray.filter(item => {
                return item.genre.includes('Adventure');
            })
        }else if(filterName == 'crime') {
            tvSeriesArray = tvSeriesArray.filter(item => {
                return item.genre.includes('Crime');
            })
        }else if(filterName == 'action') {
            tvSeriesArray = tvSeriesArray.filter(item => {
                return item.genre.includes('Action');
            })
        }else if(filterName == 'horror') {
            tvSeriesArray = tvSeriesArray.filter(item => {
                return item.genre.includes('Horror');
            })
        }else if(filterName == 'mystery') {
            tvSeriesArray = tvSeriesArray.filter(item => {
                return item.genre.includes('Mystery');
            })
        }else if(filterName == 'scifi') {
            tvSeriesArray = tvSeriesArray.filter(item => {
                return item.genre.includes('Sci-Fi');
            })
        }else if(filterName == 'animation') {
            tvSeriesArray = tvSeriesArray.filter(item => {
                return item.genre.includes('Animation');
            })
        }else if(filterName == 'biography') {
            tvSeriesArray = tvSeriesArray.filter(item => {
                return item.genre.includes('Biography');
            })
        }else if(filterName == 'talk-show') {
            tvSeriesArray = tvSeriesArray.filter(item => {
                return item.genre.includes('Talk-Show');
            })
        }else if(filterName == 'fantasy') {
            tvSeriesArray = tvSeriesArray.filter(item => {
                return item.genre.includes('Fantasy');
            })
        }else if(filterName == 'history') {
            tvSeriesArray = tvSeriesArray.filter(item => {
                return item.genre.includes('History');
            })
        }else if(filterName == 'documentary') {
            tvSeriesArray = tvSeriesArray.filter(item => {
                return item.genre.includes('Documentary');
            })
        }else if(filterName == 'short') {
            tvSeriesArray = tvSeriesArray.filter(item => {
                return item.genre.includes('Short');
            })
        }
    }

    fillingTvSeriesFromArray();
}
function fillingTvSeriesFromArray() {

    var resultContainer = document.getElementById('results');
    while(resultContainer.firstChild) {
        resultContainer.removeChild(resultContainer.firstChild);
    }
    for(var i=0; i<tvSeriesArray.length; i++) {
        const tvDiv = document.createElement('div');
        tvDiv.id = `tvs-${i}`;
        tvDiv.classList.add('tvs-item');

        tvDiv.innerHTML = `
            <div class="tvs-image"><img src="${tvSeriesArray[i].imageUrl}" alt="${tvSeriesArray[i].imageUrl}"></div>
            <div class="tvs-title"><h2>${tvSeriesArray[i].primaryTitle}</h2></div>
            <div class="tvs-release-year"><p>Start Year: ${tvSeriesArray[i].startYear}</p></div>
            <div class="tvs-release-year"><p>End Year: ${tvSeriesArray[i].endYear}</p></div>
            <div class="tvs-average-rating"><p>Average Rating: ${tvSeriesArray[i].averageRating}</p></div>
            `;
        for (var k=0; k<tvSeriesArray[i].genre.length; k++) {
            tvDiv.innerHTML += `<div class="tvs-genres"><p>${tvSeriesArray[i].genre[k]}</p></div>`
        }
        tvDiv.innerHTML += `<div class="tvs-description"><p>${tvSeriesArray[i].description}</p></div>`
        resultContainer.appendChild(tvDiv);
    }
    console.log(tvSeriesArray.length);
}

function clearAllFilters() {
    
    tvSeriesArray = [];
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(function(radioButton) {
    radioButton.checked = false;
    });

    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(function(checkbox) {
    checkbox.checked = false;
    });
}

function toggleFilterMenu(filterId) {
    const filterList = document.getElementById(filterId);
    const isOpen = filterList.style.display === 'block';

    // Open or close the clicked filter menu
    filterList.style.display = isOpen ? 'none' : 'block';
}

function performSearch() {

    var resultContainer = document.getElementById('results');
    while(resultContainer.firstChild) {
        resultContainer.removeChild(resultContainer.firstChild);
    }

    let searchBar = document.getElementById('search-bar');
    let searchText = searchBar.value.trim();
    
    tvSeriesArray = tvSeriesArray.filter(item => {
        return (item.primaryTitle.indexOf(searchText) !== -1);
    })

    for(var i=0; i<tvSeriesArray.length; i++) {
        const tvDiv = document.createElement('div');
        tvDiv.id = `tvs-${i}`;
        tvDiv.classList.add('tvs-item');

        tvDiv.innerHTML = `
            <div class="tvs-image"><img src="${tvSeriesArray[i].imageUrl}" alt="${tvSeriesArray[i].imageUrl}"></div>
            <div class="tvs-title"><h2>${tvSeriesArray[i].primaryTitle}</h2></div>
            <div class="tvs-release-year"><p>Start Year: ${tvSeriesArray[i].startYear}</p></div>
            <div class="tvs-release-year"><p>End Year: ${tvSeriesArray[i].endYear}</p></div>
            <div class="tvs-average-rating"><p>Average Rating: ${tvSeriesArray[i].averageRating}</p></div>
            `;
        for (var k=0; k<tvSeriesArray[i].genre.length; k++) {
            tvDiv.innerHTML += `<div class="tvs-genres"><p>${tvSeriesArray[i].genre[k]}</p></div>`
        }
        tvDiv.innerHTML += `<div class="tvs-description"><p>${tvSeriesArray[i].description}</p></div>`
        resultContainer.appendChild(tvDiv);
    }

    console.log(searchText);
}