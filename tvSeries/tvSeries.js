async function fetchingTVSeries() {
    const url = `http://localhost:3000/getAllTvSeries`;
    const response = await fetch(url);
    const jsonData = await response.json();

    return jsonData;    
}

function fillingTvSeriesToThePage() {
    var containerDiv = document.querySelector('#willbeFilled');
    var newStr = '';
    fetchingTVSeries().then((jsonData) => {
        for (var i = 0; i < jsonData.length; i++) {
            if (i % 4 == 0) {
                newStr += `<div class="row mt-4">
                                <div class="col-md-12 mt-5">
                                    <div class="row" id="cardRow">`
            }
            

            newStr += `<div class="col-md-3 card-col">
                            <div class="card" style="width: 20rem;">
                                <img src="../Desktop/image.jpeg" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">${jsonData[i].primaryTitle}</h5>
                                    <p class="card-text">Some quick example text to build on the card title and make up the
                                        bulk
                                        of the card's content.</p>
                                    <a href="#" class="btn btn-primary">Go somewhere</a>
                                </div>
                            </div>
                        </div>`
            
            if (i % 4 == 3) {
                newStr += `    </div>
                        </div>
                    </div>`
            }
        
      }
      //containerDiv.append(newStr);
      containerDiv.innerHTML = newStr;
    });
     
    
}