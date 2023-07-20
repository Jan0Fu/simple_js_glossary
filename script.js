const contentDiv = document.getElementById("content");
const buttonRandom = document.getElementById("button-random-dog");
const buttonBreed = document.getElementById("button-show-breed");
const buttonSubBreed = document.getElementById("button-show-sub-breed");
const buttonShowAll = document.getElementById("button-show-all");

let dogImage = document.createElement("img");
buttonRandom.addEventListener("click", randomImg);
buttonBreed.addEventListener("click", getBreed);
buttonSubBreed.addEventListener("click", getSubBreed);
buttonShowAll.addEventListener("click", showAll);

async function randomImg() {
    const response = await fetch("https://dog.ceo/api/breeds/image/random");
    const dog = await response.json();
    dogImage.setAttribute("src", dog.message);
    contentDiv.replaceChildren(dogImage);
}

async function getBreed() {
    const breed = document.getElementById("input-breed").value.toLowerCase();
    const response = await fetch("https://dog.ceo/api/breed/" + breed + "/images/random");
    const dog = await response.json();

    if (!response.ok) {
        const errorText = document.createElement("p");
        errorText.textContent = "Breed not found!";
        contentDiv.replaceChildren(errorText);
        return;
    }
    dogImage.setAttribute("src", dog.message);
    contentDiv.replaceChildren(dogImage);
}

async function getSubBreed() {
    const breed = document.getElementById("input-breed").value.toLowerCase();
    const response = await fetch("https://dog.ceo/api/breed/" + breed + "/list");
    const breeds = await response.json();

    if (!response.ok) {
        const errorText = document.createElement("p");
        errorText.textContent = "No sub-breeds found!";
        contentDiv.replaceChildren(errorText);
        return;
    }
    
    const breedList = document.createElement("ol");
    for (const i of breeds.message) {
        const listItem = document.createElement("li");
        listItem.innerHTML = i;
        breedList.appendChild(listItem);
    }
    contentDiv.replaceChildren(breedList);
}

async function showAll() {
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    const allBreeds = await response.json();

    const breedList = document.createElement("ol");
    
    for (const i in allBreeds.message) {
        const listItem = document.createElement("li");
        const subList = document.createElement("ul");
        const subListItem = document.createElement("li");
        listItem.innerHTML = i;

        if (allBreeds.message[i].length != 0) {
            subListItem.innerHTML = allBreeds.message[i];
            subList.appendChild(subListItem);
        }
        breedList.appendChild(listItem);
        listItem.appendChild(subList);
    }
    contentDiv.replaceChildren(breedList);
}
