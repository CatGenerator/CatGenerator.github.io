let rows = 10;
let columns = 10;

var currTile;
var otherTile;

var turns = 0;

// let next_btn = document.querySelector(".next_btn")

// next_btn.addEventListener("click", cycle)

// var str = ""
// let i = 0;

// function cycle() {

//     const img = ["5bv.jpg", "7ad.png", "60q.jpg", "746.jpg", "ab3.jpg", "cat.jpg", 
//                  "cer.jpg", "cn5.jpg", "cs9.jpg", "EkrAonYdt.jpg", "MjAzMDk0Mw.jpg"]

//     if(i == img.length) {
//         i = 0;
//     }
//     else {
//         i++;
//     }
//     str = '/images/' + img[i];

// }

var image = new Image();
image.src = "/images/cat.jpg";

const puzzlePieces = [];

image.onload = function () {

    const pieceWidth = image.width / 10;
    const pieceHeight = image.height / 10;

    for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 10; x++) {
            const canvas = document.createElement('canvas');
            canvas.width = pieceWidth;
            canvas.height = pieceHeight;
            const context = canvas.getContext('2d');
            context.drawImage(image, x * pieceWidth, y * pieceHeight, pieceWidth, pieceHeight, 0, 0, pieceWidth, pieceHeight);
            const imageData = canvas.toDataURL();
            puzzlePieces.push(imageData);
        }
    }

}

window.onload = function() {
    
    let board = document.getElementById('board');
    let width = image.width;
    let height = image.height;
    board.style.width = width.toString() + "px";
    board.style.height = height.toString() + "px";

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            //<img>
            let tile = document.createElement("img");
            tile.src = "/blank.jpg";

            //DRAG FUNCTIONALITY
            tile.addEventListener("dragstart", dragStart); //click on image to drag
            tile.addEventListener("dragover", dragOver);   //drag an image
            tile.addEventListener("dragenter", dragEnter); //dragging an image into another one
            tile.addEventListener("dragleave", dragLeave); //dragging an image away from another one
            tile.addEventListener("drop", dragDrop);       //drop an image onto another one
            tile.addEventListener("dragend", dragEnd);     //after you completed dragDrop

            document.getElementById("board").append(tile);
        }
    }

    //pieces
    let pieces = [];
    for (let i = 0; i < rows*columns; i++) {
        pieces.push(i.toString()); //put "1" to "25" into the array (puzzle images names)
    }
    pieces.reverse();
    for (let i = 0; i < pieces.length; i++) {
        let j = Math.floor(Math.random() * pieces.length);

        //swap
        let tmp = pieces[i];
        pieces[i] = pieces[j];
        pieces[j] = tmp;
    }

    for (let i = 0; i < pieces.length; i++) {
        let tile = document.createElement("img");
        tile.src = puzzlePieces[pieces[i]];

        //DRAG FUNCTIONALITY
        tile.addEventListener("dragstart", dragStart); //click on image to drag
        tile.addEventListener("dragover", dragOver);   //drag an image
        tile.addEventListener("dragenter", dragEnter); //dragging an image into another one
        tile.addEventListener("dragleave", dragLeave); //dragging an image away from another one
        tile.addEventListener("drop", dragDrop);       //drop an image onto another one
        tile.addEventListener("dragend", dragEnd);     //after you completed dragDrop

        document.getElementById("pieces").append(tile);
    }
}

//DRAG TILES
function dragStart() {
    currTile = this; //this refers to image that was clicked on for dragging
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {

}

function dragDrop() {
    otherTile = this; //this refers to image that is being dropped on
}

function dragEnd() {
    if (currTile.src.includes("blank")) {
        return;
    }
    let currImg = currTile.src;
    let otherImg = otherTile.src;
    currTile.src = otherImg;
    otherTile.src = currImg;

    turns++;
    document.getElementById("turns").innerText = turns;
}