const cardContainer = document.querySelector('.card-container')
const pattern = document.querySelector('.pattern')
const closedBtn = document.querySelector('.closed-btn')
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
        cardGenerator(cards, cardContainer)
    })
    .catch((err) => {
        console.log(err)
    })

closedBtn.addEventListener('click',function(){
    pattern.classList.add('display')
})

//              <div class="col-4">
//                 <div class="card">
//                     <img class="card-img" src="./img/1.webp" alt="">
//                     <p class="card-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem, beatae.</p>
//                     <img class="card-point" src="./img/pin.svg" alt="">
//                 </div>
//             </div>
function cardGenerator(array, root) {
    array.forEach(card => {
        const { title, thumbnailUrl , url } = card
        const createdCard = myCreateElement4('div', ['col'], [
                myCreateElement4('div', ['card'], [
                    myCreateElement4('img', ['card-img'], [], (el) => (el.src = thumbnailUrl)),
                    myCreateElement4('p', ['card-text'], [], (el) => {el.innerHTML = title}),
                    myCreateElement4('img', ['card-point'], [], (el) => (el.src = "./img/pin.svg"))
                ])
            ])
        root.appendChild(createdCard)
        createdCard.addEventListener('click',function(){
            
        })
    });
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