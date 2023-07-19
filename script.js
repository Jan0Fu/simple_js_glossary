const contentDiv = document.getElementById("content");
const buttonRandom = document.getElementById("button-random-dog");
const buttonBreed = document.getElementById("button-show-breed");

let dogImage = document.createElement("img");
buttonRandom.addEventListener("click", randomImg);
buttonBreed.addEventListener("click", getBreed);

async function randomImg() {
    const response = await fetch("https://dog.ceo/api/breeds/image/random");
    const dog = await response.json();
    dogImage.setAttribute("src", dog.message);
    contentDiv.replaceChildren(dogImage);
}

async function getBreed() {
    const breed = document.getElementById("input-breed").value.toLowerCase();
    const response = await fetch("https://dog.ceo/api/breed/" + breed + "/images/random")
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
