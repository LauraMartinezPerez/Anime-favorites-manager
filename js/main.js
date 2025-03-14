'use strict'

const list = document.querySelector(".js-list");
const searchButton = document.querySelector(".js-button");
const searchValue = document.querySelector(".js-search")

fetch("https://api.jikan.moe/v4/anime?q=naruto")
.then(response => response.json())
.then(data => {
   
})

