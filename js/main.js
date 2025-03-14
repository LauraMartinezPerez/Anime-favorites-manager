'use strict'

const list = document.querySelector(".js-list");
const searchButton = document.querySelector(".js-button");
const searchInput = document.querySelector(".js-search");
const favoriteList = document.querySelector(".js-favorites-list");

//Pintar del servidor segun busqueda --> de lo pintado seleccionar fav
const renderLi = (animeData) => {
    list.innerHTML = "";
    for(const serie of animeData) {
        if (serie.images.jpg.image_url === "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png") { 
            list.innerHTML += 
            `<li class="js-anime-img" id=${serie.mal_id}>
                <img class="img"  src="https://www.svgrepo.com/show/508699/landscape-placeholder.svg">
                <p class="title">${serie.title}</p>
             </li>`
        } else {
            list.innerHTML += 
            `<li class="js-anime-img" id=${serie.mal_id}>
                <img class="img"   src="${serie.images.jpg.image_url}">
                <p class="title">${serie.title}</p>
            </li>`

    } 
}
const allAnimes = document.querySelectorAll(".js-anime-img");
for (const anime of allAnimes) {
    anime.addEventListener("click", handleFavorite);
}
}

// Buscar y llamar al servidor
const searchclick = (ev) => {
    ev.preventDefault();
    const searchValue = searchInput.value;
    fetch(`https://api.jikan.moe/v4/anime?q=${searchValue}`)
        .then(response => response.json())
        .then(patata /* ;) */ => {
        renderLi (patata.data);   
        }
    )
}; 

searchButton.addEventListener("click", searchclick);

// Funcion seleccionar fav

const handleFavorite = (event) => {
    console.log(event.currentTarget.id);

    
};