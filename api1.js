let baseURL = 'https://picsum.photos/v2/list';

let row = document.querySelector('.row');
console.log(row);

let button = document.getElementById('startGame');
button.addEventListener('click', fetchImages);

let hitButton = document.querySelector('.hitButton');
hitButton.style.display = 'none';

let total = 0

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function fetchImages () {
    let pageNumber = getRandomInt(1,20);
    fetch(`${baseURL}?page=${pageNumber}&limit=50`)
    .then(response => response.json())
    .then(json => displayImages(json))
}

function displayImages(json) {
    console.log(json);

        let card = document.createElement('div');
        card.className = 'card col-3';

        let image = document.createElement('img');
        image.className = 'card-img-top';

        let randomImage = getRandomInt(1,50)
        image.src = json[randomImage].download_url;

        let cardBody = document.createElement('div');
        cardBody.className = 'card-body'

        let randomNumber = getRandomInt(1,11);
        total += randomNumber
        console.log(total);
        
        let cardText = document.createElement('p');
        cardText.className = 'card-text';
        cardText.innerText = randomNumber;

        hitButton.style.display = 'block';
        
        hitButton.addEventListener('click', () => {
            fetchImages ()
        })

        cardBody.appendChild(cardText);
        card.appendChild(image);
        card.appendChild(cardBody);
        row.appendChild(card);

        let gameScore = document.getElementById('totalScore');
        gameScore.innerText = ` Total score: ${total}`;

        if (total >= 21) {
            endGame(total);
        }
}

function endGame(total) {
    let lastMessage = document.getElementsByClassName('finalMessage')[0];
    //lastMessage.innerText = endGame( );

    const row = document.querySelector('.row');
    //row.removeChild(card);
    //row.removeChild(hitButton);

    while (row.firstChild) {
        row.removeChild(row.firstChild);
    }

    document.getElementById('totalScore').innerText = "";

    if (total == 21){
    lastMessage.innerText = "Congratulations, you win!";
} else if (total > 21) {
    lastMessage.innerText = "Bust!";
    }
}







