const querySP = '?sub_id='
var sub_id = 'test'
const apiKey = 'live_S0NCm99UWosceZI3TTlRZXCyaeNy2xUE8YS7tonrpZHPf2QkScSXFmh7qPe7xty9'
var favUrl = 'https://api.thecatapi.com/v1/favourites'
const fav = []
var nameCycle = []
const passwords = ['limwv', 'tester', 'test', 'msb', 'naodao']
var i = 0
var favImg = ''
var favId = ''

var password = prompt("What is the password?")
while(!passwords.includes(password)) {
    password = prompt("Reenter password")
}
sub_id = password

favUrl = `${favUrl}${querySP}${sub_id}`

function getMeta(url) {
    return new Promise((resolve, reject) => {
        let img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject();
        img.src = url;
    });
}

let cycleFavorite_btn = document.querySelector(".cycleFavorite_btn")

cycleFavorite_btn.addEventListener("click", cycle)

async function cycle() {

    const response = await fetch(favUrl, {
        headers: {
            'x-api-key': apiKey,
            'content-type': 'application/json'
        }
    })
    const favorites = await response.json()

    if (i > favorites.length - 1) {
        i = 0
    }

    favImg = favorites[i].image.url
    favId = favorites[i].id

    let catsFavDiv = document.querySelector(".catsFavDiv")
    catsFavDiv.innerHTML = ''
    
    let catsImgEl = document.createElement("img")

    var w = window.innerWidth
    var h = window.innerHeight

    let img = await getMeta(favImg);

    let imgWidth = img.width;
    let imgHeight = img.height;

    while(imgWidth > w || imgHeight > h) {

        imgWidth = imgWidth/2
        imgHeight = imgHeight/2

    }
    
    catsImgEl.setAttribute('src', `${favImg}`)
    catsImgEl.setAttribute('width', imgWidth)
    catsImgEl.setAttribute('height', imgHeight)

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
        headers: {
            'x-api-key': apiKey,
            'content-type': 'application/json'
        }
    };

    await fetch(`https://api.thecatapi.com/v1/favourites/${favouriteId}`, requestOptions)

    cycle()

}
