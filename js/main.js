'use strict'

const list = document.querySelector(".js-list");
const searchButton = document.querySelector(".js-button");
const searchInput = document.querySelector(".js-search")

const renderLi = (animeData) => {
    list.innerHTML = "";
    for(const serie of animeData) {
        if (serie.images.jpg.image_url === "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png") {
            `<li>
        <img class="img" src="https://www.svgrepo.com/show/508699/landscape-placeholder.svg">
        <p class="title">${serie.title}</p>
        </li>`
        } else {
        list.innerHTML += 
        `<li>
        <img class="img" src="${serie.images.jpg.image_url}">
        <p class="title">${serie.title}</p>
        </li>`
    }}

}


const handleclick = (ev) => {
    ev.preventDefault();
    const searchValue = searchInput.value;
    fetch(`https://api.jikan.moe/v4/anime?q=${searchValue}`)
.then(response => response.json())
.then(patata => {
    console.log(patata);
    renderLi (patata.data);

   
})

  
};

searchButton.addEventListener("click", handleclick);