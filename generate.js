const apiKey = 'live_S0NCm99UWosceZI3TTlRZXCyaeNy2xUE8YS7tonrpZHPf2QkScSXFmh7qPe7xty9'
const randUrl = 'https://api.thecatapi.com/v1/images/search'
const breedUrl = 'https://api.thecatapi.com/v1/breeds'
const favUrl = 'https://api.thecatapi.com/v1/favourites'
const querySP = '?breed_ids='
var breedName = []
var breedId = []
var sub_id = ''
var image_id = ''
const passwords = ['limwv', 'tester', 'test', 'msb', 'naodao']
var storedBreeds = []
let option;

var password = prompt("What is the password?")
while(!passwords.includes(password)) {
    password = prompt("Reenter password")
}
sub_id = password

fetch(breedUrl, {
    headers: {
        'x-api-key': apiKey
    }
})
    .then((response) => {
        return response.json();
    })
    .then((data) => {

        storedBreeds = data;

        option = document.createElement('option');
        option.innerHTML = 'All';
        document.getElementById('breed_selector').appendChild(option);

        for (let i = 0; i < storedBreeds.length; i++) {
            breedName.push(storedBreeds[i].name);
            breedId.push(storedBreeds[i].id);

            option = document.createElement('option');

            option.value = i;
            option.innerHTML = `${breedName[i]}`;
            document.getElementById('breed_selector').appendChild(option);
        }

    })
    .catch(function (error) {
        console.log(error);
    });

function randOrBreed() {

    if (document.getElementById('breed_selector').value == 'All') {
        return randUrl
    }
    return `${randUrl}${querySP}${breedId[document.getElementById('breed_selector').value]}`

}

let generate_btn = document.querySelector(".generate_btn")

generate_btn.addEventListener("click", fetchPics)

var catImgUrl = ''

function fetchPics() {
    let catsImgDiv = document.querySelector(".catsImgDiv")
    catsImgDiv.innerHTML = ''
    fetch(randOrBreed(),
        {
            headers: {
                'x-api-key': apiKey
            }
        })
        .then(response => response.json())
        .then((data) => {
            catImgUrl = data[0].url
            image_id = data[0].id
            var imgWidth = data[0].width
            var imgHeight = data[0].height
            var w = window.innerWidth
            var h = window.innerHeight
            while (imgWidth >= w || imgHeight >= h) {
                imgWidth = imgWidth * 0.5
                imgHeight = imgHeight * 0.5
            }

            let catsImgEl = document.createElement("img")
            catsImgEl.setAttribute('src', `${catImgUrl}`)
            catsImgEl.setAttribute('width', `${imgWidth}`)
            catsImgEl.setAttribute('height', `${imgHeight}`)

            let catsImgDiv = document.querySelector(".catsImgDiv")
            catsImgDiv.appendChild(catsImgEl)

        })
        .catch(err => console.log(err))
}

let favorite_btn = document.querySelector(".favorite_btn")

favorite_btn.addEventListener("click", favorite)

async function favorite() {

        var rawBody = JSON.stringify({
            "image_id": image_id,
            "sub_id": sub_id
        })

        const newFavorite = await fetch(
            favUrl,
            {
                method: 'POST',
                headers: {
                    'x-api-key': apiKey,
                    'content-type': 'application/json'
                },
                body: rawBody
            }
        )

}
