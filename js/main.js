'use strict'

const list = document.querySelector(".js-list");
const searchButton = document.querySelector(".js-button");
const searchInput = document.querySelector(".js-search");
const containerFavoriteList = document.querySelector(".js-favorites-list");
let favoriteList = []; // este es el array que guarda los animes favoritos
let allAnimesData = []; // este es el array global que guarda todos los animes

//Pintar del servidor segun busqueda --> de lo pintado seleccionar fav
const renderLi = (animeData) => {
    allAnimesData = animeData;
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
    const idAnimeClicked = parseInt(event.currentTarget.id);
/*     console.log(idAnimeClicked); */

    //busco el anime clickado a partir de el id devuelto ---const idAnimeClicked---
const animeSelected = allAnimesData.find((anime) => {
    return anime.mal_id === idAnimeClicked;
})

/* console.log(animeSelected); */

    //añadir ese anime a la lista de favoritos ---let favoriteList = [];---

   favoriteList.push(animeSelected);
   /* console.log(favoriteList); */
   containerFavoriteList.innerHTML = "";
   for(const serie of favoriteList) {
   
        if (serie.images.jpg.image_url === "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png") { 
            containerFavoriteList.innerHTML += 
            `<li class="js-anime-img" id=${serie.mal_id}>
                <img class="img"  src="https://www.svgrepo.com/show/508699/landscape-placeholder.svg">
                <p class="title">${serie.title}</p>
            </li>`
        } else {
            containerFavoriteList.innerHTML += 
            `<li class="js-anime-img" id=${serie.mal_id}>
                <img class="img"   src="${serie.images.jpg.image_url}">
                <p class="title">${serie.title}</p>
            </li>`

        } 
    }
};