const baseURL = 'http://localhost:3000/'
const winesURL = `${baseURL}/wines`

fetch(winesURL)
    .then(response => response.json())
    .then(showWines)

const createWine = document.querySelector('#create-wine')
const winesContainer = document.querySelector('#wines-container')

createWine.addEventListener('submit', addWine);

function addWine(event){
    event.preventDefault();
    
    const createFormData = new FormData(event.target);
    const variety = createFormData.get('variety');
    const producer = createFormData.get('producer');
    const region = createFormData.get('region');
    const vintage = createFormData.get('vintage');
    const notes = createFormData.get('notes');

    const wine = {
        variety: variety,
        producer: producer,
        region: region,
        vintage: vintage,
        notes: notes
    }

    displayWine(wine);
}

function displayWine(wine){
    winesContainer.innerHTML += `
    <div>
      <h2>${wine.variety}</h2>
      <h3>${wine.producer}</h3>
      <h3>${wine.region}</h3>
      <h3>${wine.vintage}</h3>
      <h3>${wine.notes}</h3>
    </div>
  `
}

function showWines(wines){
    wines.forEach(displayWine);
}