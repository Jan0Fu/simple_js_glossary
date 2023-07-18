const contentDiv = document.getElementById("content");
const buttonImg = document.getElementById("button-random-dog");

let randomImage = document.createElement("img");
contentDiv.appendChild(randomImage);
buttonImg.addEventListener("click", randomImg);
 
async function randomImg() {
    const response = await fetch("https://dog.ceo/api/breeds/image/random");
    const dog = await response.json();
    randomImage.setAttribute("src", dog.message);
}
