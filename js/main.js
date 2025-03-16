'use strict'

const list = document.querySelector(".js-list");
const searchButton = document.querySelector(".js-button");
const searchInput = document.querySelector(".js-search");
const resetButton = document.querySelector(".js-reset");
const containerFavoriteList = document.querySelector(".js-favorites-list");

let favoriteList = []; // este es el array que guarda los animes favoritos
let allAnimesData = []; // este es el array global que guarda todos los animes

// Función para pintar la lista de favoritos
const renderFavoriteList = () => {
    
    containerFavoriteList.innerHTML = "";
    for(const serie of favoriteList) {
   
        if (serie.images.jpg.image_url === "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png") { 
            containerFavoriteList.innerHTML += 
            `<li class="js-anime-img anime-fav" id=${serie.mal_id}>
                 <img class="img-fav"  src="https://www.svgrepo.com/show/508699/landscape-placeholder.svg">
                    <p class="title-fav">${serie.title}</p>
                   <i class="fa-solid fa-circle-xmark js-x" id="${serie.mal_id}"></i>
            </li>`
        } else {
            containerFavoriteList.innerHTML += 
            `<li class="js-anime-img anime-fav" id=${serie.mal_id}>
                <img class="img-fav"   src="${serie.images.jpg.image_url}">
                <p class="title-fav">${serie.title}</p> 
                <i class="fa-solid fa-circle-xmark js-x" id="${serie.mal_id}"></i>
            </li>`
        } 
        // (B.5-Fav)Traigo los iconos X y hago evento clic (handleXIcon) a todos los iconos X que lleven clase "js-x"
        const xIcon = document.querySelectorAll(".js-x");
        for (const closeIcon of xIcon) {
            closeIcon.addEventListener("click", handleXIcon);
        }
    }
};

// (B.5-Fav) Funcion eliminar favoritos
const handleXIcon = (event) => {
    event.preventDefault();
    const idfavAnimeClicked = parseInt(event.currentTarget.id);

    //busco el anime clickado (uso findIndex xq si no cuando use el splice me va a eliminar el primer elemento que cumple la condicion y lo que quiero es que me localice la posicion del elemento clickado en el array para eliminar ese en concreto
    const favAnimeSelected = favoriteList.findIndex((anime) => 
        anime.mal_id === idfavAnimeClicked
    );

    //entro en la lista de favoritos y elimino el anime clickado
        favoriteList.splice(favAnimeSelected, 1);
    

    //vuelvo a guardar la lista de favoritos actualizada
    localStorage.setItem("favoritesAnimes", JSON.stringify(favoriteList));

    //Pinto la lista de favoritos actualizada
    renderFavoriteList();
};



// Al cargar la página, obtener los favoritos del localStorage
const favoritesLocalStorage = localStorage.getItem("favoritesAnimes");
if (favoritesLocalStorage !== null) {
    favoriteList = JSON.parse(favoritesLocalStorage);
    renderFavoriteList();
}

//Pintar del servidor segun busqueda --> de lo pintado seleccionar fav
const renderLi = (animeData) => {
    allAnimesData = animeData;
    list.innerHTML = "";
    for(const serie of animeData) {
        if (serie.images.jpg.image_url === "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png") { 
            list.innerHTML += 
            `<li class="js-anime-img anime" id=${serie.mal_id}>
                <img class="img"  src="https://www.svgrepo.com/show/508699/landscape-placeholder.svg">
                <p class="title">${serie.title}</p>
             </li>`
        } else {
            list.innerHTML += 
            `<li class="js-anime-img anime" id=${serie.mal_id}>
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
        .then(patata /* ;-) */ => {
        renderLi (patata.data);   
        }
    )
}; 

searchButton.addEventListener("click", searchclick);

// Funcion seleccionar fav
const handleFavorite = (event) => {
    const idAnimeClicked = parseInt(event.currentTarget.id);

    //busco el anime clickado a partir de el id devuelto ---const idAnimeClicked---
    const animeSelected = allAnimesData.find((anime) => {
        return anime.mal_id === idAnimeClicked;
    })


    //añadir ese anime a la lista de favoritos ---let favoriteList = [];---
    favoriteList.push(animeSelected);

    //Cuando vaya añadiendo favoritas a mi lista, voy guardando la lista en el localStorage
    localStorage.setItem("favoritesAnimes", JSON.stringify(favoriteList));

    //Pinto la lista de favoritos
    renderFavoriteList();
};

//(B.5-Reset)Funcion Reset

const handleReset = () => {
    list.innerHTML = "";
    containerFavoriteList.innerHTML = "";
    localStorage.removeItem("favoritesAnimes"); 
};


resetButton.addEventListener("click", handleReset);