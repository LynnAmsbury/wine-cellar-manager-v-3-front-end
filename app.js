const baseURL = "http://localhost:3000/";
const winesURL = `${baseURL}/wines`;

fetch(winesURL)
    .then((response) => response.json())
    .then(showWines);

const createWineForm = document.querySelector("#create-wine-form");
const winesContainer = document.querySelector("#wines-container");

createWineForm.addEventListener("submit", addWine);

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
    event.target.reset();
}

function showWines(wines) {
    wines.forEach(displayWine);
}

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

    const updateButton = document.createElement("button");
    updateButton.textContent = "Update Wine";
    updateButton.addEventListener("click", ()=>{
        document.querySelector(`#edit-form-${wine.id}`).classList.remove("hidden");
    })

    const editForm = document.createElement("form");
    editForm.id =`edit-form-${wine.id}`;
    editForm.classList.add("hidden");

    let editVariety = document.createElement("input");
    editVariety.type = "text";
    editVariety.name = "variety";
    editVariety.placeholder = "Variety Name";
    editVariety.value = wine.variety;

    let editProducer = document.createElement("input");
    editProducer.type = "text";
    editProducer.name = "producer";
    editProducer.placeholder = "Producer";
    editProducer.value = wine.producer;

    let editRegion = document.createElement("input");
    editRegion.type = "text";
    editRegion.name = "region";
    editRegion.placeholder = "Region";
    editRegion.value = wine.region;

    let editVintage = document.createElement("input");
    editVintage.type = "number";
    editVintage.name = "vintage";
    editVintage.placeholder = "Vintage Year";
    editVintage.value = wine.vintage;

    let editNotes = document.createElement("input");
    editNotes.type = "text";
    editNotes.name = "notes";
    editNotes.placeholder = "Notes";
    editNotes.value = wine.notes;

    const editFormSubmitButton = document.createElement("input");
    editFormSubmitButton.type = "submit";
    editFormSubmitButton.value = "Update Entry";

    editForm.addEventListener("submit", (event)=>{
        event.preventDefault();
        const editFormData = new FormData(event.target);
        const variety = editFormData.get("variety");
        const producer =  editFormData.get("producer");
        const region =  editFormData.get("region");
        const vintage = editFormData.get("vintage");
        const notes = editFormData.get("notes");

        const updatedWine = { variety, producer, region, vintage, notes };

        wineVariety.textContent = variety;
        wineProducer.textContent = producer;
        wineRegion.textContent = region;
        wineVintage.textContent = vintage;
        wineNotes.textContent = notes;
        
        fetch(`${winesURL}/${wine.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedWine)
        })
        // console.log(event.target)
        event.target.classList.add("hidden");
    });

    editForm.append(editVariety, editProducer, editRegion, editVintage, editNotes, editFormSubmitButton);
    wineCard.append(
    wineVariety,
    wineProducer,
    wineRegion,
    wineVintage,
    wineNotes,
    deleteButton,
    updateButton,
    editForm
    );
    winesContainer.append(wineCard);
}

function deleteWine(wineId, wineCard) {
    wineCard.remove();
    fetch(`${winesURL}/${wineId}`, { method: "DELETE" });
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
