const querySP = '?sub_id='
var sub_id = ''
const apiKey = 'live_S0NCm99UWosceZI3TTlRZXCyaeNy2xUE8YS7tonrpZHPf2QkScSXFmh7qPe7xty9';
var favUrl = 'https://api.thecatapi.com/v1/favourites'
const fav = []
const passwords = ['limwv', 'tester', 'test']
var i = 0;

var password = prompt("What is the password?");
while(!passwords.includes(password)) {
    password = prompt("Reenter password");
}
sub_id = password

favUrl = `${favUrl}${querySP}${sub_id}`

let cycleFavorite_btn = document.querySelector(".cycleFavorite_btn");

cycleFavorite_btn.addEventListener("click", cycle);

var i = 0;

async function cycle() {
    
    const response = await fetch(favUrl, {
        headers:{
            "content-type": "application/json",
            'x-api-key': apiKey
        }
    });
    const favorites = await response.json();

    if(i > favorites.length - 1) {
        i = 0;
    }

    var favImg = favorites[i].image.url

    let catsFavDiv = document.querySelector(".catsFavDiv")
    catsFavDiv.innerHTML = ''
    let catsImgEl = document.createElement("img")
    catsImgEl.setAttribute('src', `${favImg}`)
        
    catsFavDiv = document.querySelector(".catsFavDiv")
    catsFavDiv.appendChild(catsImgEl)
    i++
}

let unFavorite_btn = document.querySelector(".unFavorite_btn")

unFavorite_btn.addEventListener("click", unFavorite)

async function unFavorite() {

    const favouriteId = favId
    var requestOptions = {
    method: 'DELETE',
    headers:{
        'x-api-key': apiKey,
        'content-type': 'application/json'
    }
};

await fetch(`https://api.thecatapi.com/v1/favourites/${favouriteId}`, requestOptions)

}
