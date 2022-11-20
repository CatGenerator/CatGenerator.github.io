let generate_btn = document.querySelector(".generate_btn");

generate_btn.addEventListener("click", fetchPics);

var catsImgUrl = ''
var z = 0;

function fetchPics() {
    let catsImgDiv = document.querySelector(".catsImgDiv")
    catsImgDiv.innerHTML = ''
    fetch('https://api.thecatapi.com/v1/images/search')
    .then(response => response.json())
    .then((data) => {
        catsImgUrl = data[0].url
        var imgWidth = data[0].width
        var imgHeight = data[0].height
        var w = window.innerWidth
        var h = window.innerHeight
        while(imgWidth>w || imgHeight>h) {
            imgWidth = imgWidth*0.5;
            imgHeight = imgHeight*0.5;
        }

        let catsImgEl = document.createElement("img")
        catsImgEl.setAttribute('src', `${catsImgUrl}`)
        catsImgEl.setAttribute('width', imgWidth)
        catsImgEl.setAttribute('height', imgHeight)
        
        let catsImgDiv = document.querySelector(".catsImgDiv")
        catsImgDiv.appendChild(catsImgEl)

    })
    .catch(err => console.log(err))
}
