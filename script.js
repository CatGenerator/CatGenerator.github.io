const apiKey = 'live_S0NCm99UWosceZI3TTlRZXCyaeNy2xUE8YS7tonrpZHPf2QkScSXFmh7qPe7xty9'
const url = 'https://api.thecatapi.com/v1/images/search'
var sub_id = ''
var image_id = ''
const passwords = ['LIMWV', 'limwv', 'tester']
var i = 0;

var password = prompt("What is the password?");
        if (passwords.includes(password)) {
            if(password == 'LIMWV' && password == 'limwv') {
                sub_id = 'jess'
            }
            else if (password == 'tester') {
                sub_id = 'test'
            }
        }
        else {
            while(!passwords.includes(password)) {
                var password = prompt("Reenter password");
            }
        }

let generate_btn = document.querySelector(".generate_btn");

generate_btn.addEventListener("click", fetchPics);

var catImgUrl = ''

function fetchPics() {
    let catsImgDiv = document.querySelector(".catsImgDiv")
    catsImgDiv.innerHTML = ''
    fetch(url,
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
        catsImgEl.setAttribute('width', imgWidth)
        catsImgEl.setAttribute('height', imgHeight)
        
        let catsImgDiv = document.querySelector(".catsImgDiv")
        catsImgDiv.appendChild(catsImgEl)

    })
    .catch(err => console.log(err))
    i = 0;
    console.log(i);
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
            "https://api.thecatapi.com/v1/favourites", 
                {
                    method: 'POST',
                    headers: { 
                        'x-api-key': apiKey,
                        'content-type':"application/json"} ,
                    body: rawBody
                }
            )
        i = 1;
        console.log(i);
    }

}
