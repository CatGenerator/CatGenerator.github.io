const apiKey = 'live_S0NCm99UWosceZI3TTlRZXCyaeNy2xUE8YS7tonrpZHPf2QkScSXFmh7qPe7xty9'
const randUrl = 'https://api.thecatapi.com/v1/images/search'
const favUrl = 'https://api.thecatapi.com/v1/favourites'
var sub_id = ''
var image_id = ''
const passwords = ['limwv', 'tester', 'test']
var i = 0;

var password = prompt("What is the password?");
while(!passwords.includes(password)) {
    password = prompt("Reenter password");
}
sub_id = password

let generate_btn = document.querySelector(".generate_btn");

generate_btn.addEventListener("click", fetchPics);

var catImgUrl = ''

function fetchPics() {
    let catsImgDiv = document.querySelector(".catsImgDiv")
    catsImgDiv.innerHTML = ''
    fetch(randUrl,
        {headers: {
            'x-api-key': apiKey
        }})
    .then(response => response.json())
    .then((data) => {
        catImgUrl = data[0].url
        image_id = data[0].id
        var imgWidth = data[0].width
        var imgHeight = data[0].height
        var w = window.innerWidth
        var h = window.innerHeight
        while(imgWidth > w || imgHeight > h) {
            imgWidth = imgWidth*0.5;
            imgHeight = imgHeight*0.5;
        }

        let catsImgEl = document.createElement("img")
        catsImgEl.setAttribute('src', `${catImgUrl}`)
        catsImgEl.setAttribute('width', `${imgWidth}`)
        catsImgEl.setAttribute('height', `${imgHeight}`)
        
        let catsImgDiv = document.querySelector(".catsImgDiv")
        catsImgDiv.appendChild(catsImgEl)

    })
    .catch(err => console.log(err))
    i = 0;
}

let favorite_btn = document.querySelector(".favorite_btn");

favorite_btn.addEventListener("click", favorite);

async function favorite() {

    if(i == 0) {
        var rawBody = JSON.stringify({
            "image_id": image_id,
            "sub_id": sub_id
             });
            
            
            const newFavorite = await fetch(
            favUrl, 
                {
                    method: 'POST',
                    headers: { 
                        'x-api-key': apiKey,
                        'content-type': 'application/json'},
                    body: rawBody
                }
            )
        i = 1;
    }

}
