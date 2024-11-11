// prendo gli elementi del dom
const cardContainer = document.querySelector('.card-container')
const fragment = document.createDocumentFragment()
const overlay = document.querySelector('.overlay')
const bigImg = document.querySelector('.big-img')

// faccio una chiamata ajax
axios
    .get('https://jsonplaceholder.typicode.com/photos', {
        params: {
            _limit: 6,
        },
    })
    .then((res) => {
        console.log(res)
        const cards = res.data
        console.log(cards)
        cardGenerator(cards, fragment)
        cardContainer.append(fragment)
    })
    .catch((err) => {
        console.log(err)
    })


overlay.addEventListener('click', function (event) {

    if (event.target !== bigImg) {
        closeOverlay();
    }

})


// funzioni 


//              <div class="col">
//                 <div class="card">
//                     <img class="card-img" src="./img/1.webp" alt="">
//                     <p class="card-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem, beatae.</p>
//                     <img class="card-point" src="./img/pin.svg" alt="">
//                 </div>
//             </div>
function cardGenerator(array, root) {
    array.forEach(card => {
        const { title, url } = card
        const createdCard = myCreateElement4('div', ['col'], [
            myCreateElement4('div', ['card'], [
                myCreateElement4('img', ['card-img'], [], (el) => (el.src = url)),
                myCreateElement4('p', ['card-text'], [], (el) => { el.innerText = title }),
                myCreateElement4('img', ['card-point'], [], (el) => (el.src = "./img/pin.svg"))
            ])
        ])
        root.appendChild(createdCard)
        cardEvent(createdCard, card)
    });
}
function cardEvent(createdCard, card) {
    createdCard.addEventListener('click', function () {
        overlay.classList.add('display-on')
        bigImg.src = card.url
        document.body.classList.add('overflow-hidden');
    })
}
function closeOverlay (){
    overlay.classList.remove('display-on');
    document.body.classList.remove('overflow-hidden');
}

// utilities
function myCreateElement4(
    tagnName,
    classList = [],
    content = [],
    callback = false
) {
    // Creo l'elemento
    const el = document.createElement(tagnName);

    // Aggiungo le classi
    if (classList.length > 0) {
        el.classList.add(...classList);
    }

    // Esegui la callback passando l'elemento
    if (callback) {
        callback(el);
    }

    // Contenuto
    // if (Array.isArray(content)) {
    //     for (let i = 0; i < content.length; i++) {
    //         el.appendChild(content[i]);
    //     }
    // } else if (content instanceof HTMLElement) {
    //     el.appendChild(content);
    // } else if (typeof content === "string") {
    //     el.innerHTML = content;
    // } else {
    //     console.error("Non posso aggiungere l'elemento");
    // }
    if (Array.isArray(content)) {
        for (let i = 0; i < content.length; i++) {
            if (content[i] instanceof HTMLElement) {
                el.appendChild(content[i]);
            }
        }
    } else {
        console.error("Non posso aggiungere l'elemento");
    }
    return el;
}