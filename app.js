const baseURL = "http://localhost:3000/";
const winesURL = `${baseURL}/wines`;

fetch(winesURL)
  .then((response) => response.json())
  .then(showWines);

const createWine = document.querySelector("#create-wine");
const winesContainer = document.querySelector("#wines-container");

createWine.addEventListener("submit", addWine);

function addWine(event) {
  event.preventDefault();

  const createWineFormData = new FormData(event.target);
  const variety = createWineFormData.get("variety");
  const producer = createWineFormData.get("producer");
  const region = createWineFormData.get("region");
  const vintage = createWineFormData.get("vintage");
  const notes = createWineFormData.get("notes");

  const wine = {
    variety: variety,
    producer: producer,
    region: region,
    vintage: vintage,
    notes: notes,
  };

  persistWine(wine);
}

function showWines(wines) {
  wines.forEach(displayWine);
}

// function displayWine(wine){
//     winesContainer.innerHTML += `<ul id="wine-list-item">
//         <li>${wine.variety}, ${wine.producer}, ${wine.region}, ${wine.vintage} ${wine.notes}</li>
//         <button onclick=${deleteWine}>Remove This Wine</button>
//     </ul>`
// }

function displayWine(wine) {
  const wineCard = document.createElement("div");
  wineCard.classList.add("wine-card");

  const wineVariety = document.createElement("h2");
  wineVariety.textContent = wine.variety;
  const wineProducer = document.createElement("p");
  wineProducer.textContent = wine.producer;
  const wineRegion = document.createElement("p");
  wineRegion.textContent = wine.region;
  const wineVintage = document.createElement("p");
  wineVintage.textContent = wine.vintage;
  const wineNotes = document.createElement("p");
  wineNotes.textContent = wine.notes;

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Remove Wine";
  deleteButton.addEventListener("click", ()=>deleteWine(wine.id, wineCard));

  wineCard.append(
    wineVariety,
    wineProducer,
    wineRegion,
    wineVintage,
    wineNotes,
    deleteButton
  );
  winesContainer.append(wineCard);
}

function deleteWine(wineId, wineCard) {
  wineCard.remove();
  fetch(`${baseURL}/wines/${wineId}`, { method: "DELETE" });
}

function persistWine(wine) {
  fetch(winesURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(wine),
  })
    .then((response) => response.json())
    .then((wine) => displayWine(wine));
}
