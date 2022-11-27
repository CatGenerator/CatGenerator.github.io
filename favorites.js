const querySP = '?sub_id='
var sub_id = ''
const apiKey = 'live_S0NCm99UWosceZI3TTlRZXCyaeNy2xUE8YS7tonrpZHPf2QkScSXFmh7qPe7xty9';
var favUrl = 'https://api.thecatapi.com/v1/favourites'
const fav = []
const passwords = ['limwv', 'tester', 'test']
var i = 0;

var password = prompt("What is the password?");
while(!passwords.includes(password)) {
    var password = prompt("Reenter password");
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
    
    // console.log(favourites[favourites.length-1].image.url);
    // console.log(favourites[0])

    let catsFavDiv = document.querySelector(".catsFavDiv")
    catsFavDiv.innerHTML = ''
        // var imgWidth = fav[i].naturalWidth
        // var imgHeight = fav[i].naturalHeight
        // var w = window.innerWidth
        // var h = window.innerHeight
        // while(imgWidth > w || imgHeight > h) {
        //     imgWidth = imgWidth*0.5;
        //     imgHeight = imgHeight*0.5;
        // }
    let catsImgEl = document.createElement("img")
    catsImgEl.setAttribute('src', `${favorites[i].image.url}`)
    console.log(favorites[i].image.url)
    // catsImgEl.setAttribute('width', imgWidth)
    // catsImgEl.setAttribute('height', imgHeight)
        
    catsFavDiv = document.querySelector(".catsFavDiv")
    catsFavDiv.appendChild(catsImgEl)
    i++
}