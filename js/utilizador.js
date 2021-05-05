// MODAL DE EDITAR PERFIL
var modalEditarPerfil = document.getElementById('modalEditarPerfil');
var btnEditarPerfil = document.getElementById("btnEditarPerfil");
var closeEditarPerfil = document.getElementById("closeEditarPerfil")
btnEditarPerfil.onclick = function() {
    modalEditarPerfil.classList.add('show');
}
closeEditarPerfil.onclick = function() {
    modalEditarPerfil.classList.remove('show');
}
modalEditarPerfil.onclick = function(event) {
    if (event.target == modalEditarPerfil) {
        modalEditarPerfil.classList.remove('show');
    }
}

// MODAL DE VER ESTATÍSTICAS
var modalEstatisticas = document.getElementById('modalEstatisticas');
var btnEstatisticas = document.getElementById("btnEstatisticas");
var closeEstatisticas = document.getElementById("closeEstatisticas")
btnEstatisticas.onclick = function() {
    modalEstatisticas.classList.add('show');
}
closeEstatisticas.onclick = function() {
    modalEstatisticas.classList.remove('show');
}
modalEstatisticas.onclick = function(event) {
    if (event.target == modalEstatisticas) {
        modalEstatisticas.classList.remove('show');
    }
}

// MODAL DE VER CONQUISTAS
var modalConquistas = document.getElementById("modalConquistas");
var btnConquistas = document.getElementById("btnConquistas");
var closeConquistas = document.getElementById("closeConquistas")
btnConquistas.onclick = function() {
    modalConquistas.classList.add('show');
}
closeConquistas.onclick = function() {
    modalConquistas.classList.remove('show');
}
modalConquistas.onclick = function(event) {
    if (event.target == modalConquistas) {
        modalConquistas.classList.remove('show');
    }
}

// MODAL DA FOTO
var modalfoto = document.getElementById("modalfoto");
var img = document.getElementById("output");
var modalImg = document.getElementById("img01");
img.onclick = function() {
    modalfoto.style.display = "block";
    modalImg.src = this.src;
}
var span = document.getElementsByClassName("closefoto")[0];
span.onclick = function() {
    modalfoto.style.display = "none";
}
modalfoto.onclick = function(event) {
    if (event.target == modalfoto) {
        modalfoto.style.display = "none";
    }
}




function editarFotoPerfil() {
    let editarfoto = document.getElementById('editarfoto');
    let filefoto = document.querySelector('input[type=file]').files[0];
    let readerfoto = new FileReader();

    readerfoto.addEventListener("load", function() {
        editarfoto.src = readerfoto.result;
    }, false);

    if (filefoto) {
        readerfoto.readAsDataURL(filefoto);
    }
}


let usersNames = []
if (localStorage.getItem("usernameList")) {
    usersNames = JSON.parse(localStorage.getItem("usernameList"))
}

let utilizadores = []
if (localStorage.getItem("userList")) {
    utilizadores = JSON.parse(localStorage.getItem("userList"))
}

let x = usersNames.length
let y = x - 1

function perfilDados() {
    for (var i = 0; i < utilizadores.length; i++) {
        if (utilizadores[i].username == usersNames[y]) {
            let editarUsername = utilizadores[i].username
            let editarName = utilizadores[i].name
            let editarEmail = utilizadores[i].email
            let editarData = utilizadores[i].data
            let editarGenero = utilizadores[i].genero
            let editarPassword = utilizadores[i].password
            let editarPasswordConf = utilizadores[i].passwordConf
            let editarPerfil = utilizadores[i].fotoperfil
            document.getElementById("editarUtilizador").value = editarUsername
            document.getElementById("editarNome").value = editarName
            document.getElementById("editarEmail").value = editarEmail
            document.getElementById("editarData").value = editarData
            if (editarGenero == "Masculino") {
                document.getElementById("editarMasculino").checked = true
            } else {
                document.getElementById("editarFeminino").checked = true
            }
            document.getElementById("editarPassword").value = editarPassword
            document.getElementById("editarPasswordConf").value = editarPasswordConf
            document.getElementById("output").src = editarPerfil
            document.getElementById("editarfoto").src = editarPerfil
            break
        }
    }
}

let contaRegistada = false

function perfilEditado() {
    let editadoUtilizador = document.getElementById("editarUtilizador").value
    let editadoNome = document.getElementById("editarNome").value
    let editadoEmail = document.getElementById("editarEmail").value
    let editadoData = document.getElementById("editarData").value
    let editadoGenero = ""
    if (document.getElementById("editarMasculino").checked == true) {
        editadoGenero = "Masculino"
    } else {
        editadoGenero = "Feminino"
    }
    let editadoPassword = document.getElementById("editarPassword").value
    let editadoPasswordConf = document.getElementById("editarPasswordConf").value
    let editadoPerfil = document.getElementById("editarfoto").src
    for (var i = 0; i < utilizadores.length; i++) {
        if (utilizadores[i].username == usersNames[y]) {
            utilizadores[i].username = editadoUtilizador
            utilizadores[i].name = editadoNome
            utilizadores[i].email = editadoEmail
            utilizadores[i].data = editadoData
            utilizadores[i].genero = editadoGenero
            utilizadores[i].password = editadoPassword
            utilizadores[i].passwordConf = editadoPasswordConf
            utilizadores[i].fotoperfil = editadoPerfil
            if (editadoPassword != editadoPasswordConf) {
                alert("Passwords não coincidem!")
            } else {
                localStorage.setItem("userList", JSON.stringify(utilizadores))
                alert("Vais ter que reinicar sessão!")
                document.getElementById("editadoForm").onsubmit = function() {
                    window.location.replace("index.html")
                    return false
                }
            }
        }
    }
}






// cards array holds all cards
let card = document.getElementsByClassName("card");
let cards = [...card];

// deck of all cards in game
const deck = document.getElementById("card-deck");

// declaring move variable
let moves = 0;
let counter = document.querySelector(".moves");

// declare variables for star icons
const stars = document.querySelectorAll(".fa-star");

// declaring variable of matchedCards
let matchedCard = document.getElementsByClassName("match");

// stars list
let starsList = document.querySelectorAll(".stars li");

// close icon in modal
let closeicon = document.querySelector(".close");

// declare modal
let modal = document.getElementById("popup1")

// array for opened cards
var openedCards = [];


// @description shuffles cards
// @param {array}
// @returns shuffledarray
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
};




// @description function to start a new play 
function startGame() {

    // empty the openCards array
    openedCards = [];

    // shuffle deck
    cards = shuffle(cards);
    // remove all exisiting classes from each card
    for (var i = 0; i < cards.length; i++) {
        deck.innerHTML = "";
        [].forEach.call(cards, function(item) {
            deck.appendChild(item);
        });
        cards[i].classList.remove("show", "open", "match", "disabled");
    }
    // reset moves
    moves = 0;
    counter.innerHTML = moves;
    // reset rating
    for (var i = 0; i < stars.length; i++) {
        stars[i].style.color = "#FFD700";
        stars[i].style.visibility = "visible";
    }
    //reset timer
    second = 0;
    minute = 0;
    hour = 0;
    var timer = document.querySelector(".timer");
    timer.innerHTML = "0 minutos 0 segundos";
    clearInterval(interval);
}


// @description toggles open and show class to display cards
var displayCard = function() {
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
};


// @description add opened cards to OpenedCards list and check if cards are match or not
function cardOpen() {
    openedCards.push(this);
    var len = openedCards.length;
    if (len === 2) {
        moveCounter();
        if (openedCards[0].type === openedCards[1].type) {
            matched();
        } else {
            unmatched();
        }
    }
};


// @description when cards match
function matched() {
    openedCards[0].classList.add("match", "disabled");
    openedCards[1].classList.add("match", "disabled");
    openedCards[0].classList.remove("show", "open", "no-event");
    openedCards[1].classList.remove("show", "open", "no-event");
    openedCards = [];
}


// description when cards don't match
function unmatched() {
    openedCards[0].classList.add("unmatched");
    openedCards[1].classList.add("unmatched");
    disable();
    setTimeout(function() {
        openedCards[0].classList.remove("show", "open", "no-event", "unmatched");
        openedCards[1].classList.remove("show", "open", "no-event", "unmatched");
        enable();
        openedCards = [];
    }, 1100);
}


// @description disable cards temporarily
function disable() {
    Array.prototype.filter.call(cards, function(card) {
        card.classList.add('disabled');
    });
}


// @description enable cards and disable matched cards
function enable() {
    Array.prototype.filter.call(cards, function(card) {
        card.classList.remove('disabled');
        for (var i = 0; i < matchedCard.length; i++) {
            matchedCard[i].classList.add("disabled");
        }
    });
}


// @description count player's moves
function moveCounter() {
    moves++;
    counter.innerHTML = moves;
    //start timer on first click
    if (moves == 1) {
        second = 0;
        minute = 0;
        hour = 0;
        startTimer();
    }
    // setting rates based on moves
    if (moves > 8 && moves < 12) {
        for (i = 0; i < 3; i++) {
            if (i > 1) {
                stars[i].style.visibility = "collapse";
            }
        }
    } else if (moves > 13) {
        for (i = 0; i < 3; i++) {
            if (i > 0) {
                stars[i].style.visibility = "collapse";
            }
        }
    }
}


// @description game timer
var second = 0;
minute = 0;
hour = 0;
var timer = document.querySelector(".timer");
var interval;

function startTimer() {
    interval = setInterval(function() {
        timer.innerHTML = minute + "minutos " + second + "segundos";
        second++;
        if (second == 60) {
            minute++;
            second = 0;
        }
        if (minute == 60) {
            hour++;
            minute = 0;
        }
    }, 1000);
}


// @description congratulations when all cards match, show modal and moves, time and rating
function congratulations() {
    if (matchedCard.length == 16) {
        clearInterval(interval);
        finalTime = timer.innerHTML;

        // show congratulations modal
        modal.classList.add("show");

        // declare star rating variable
        var starRating = document.querySelector(".stars").innerHTML;

        //showing move, rating, time on modal
        document.getElementById("finalMove").innerHTML = moves;
        document.getElementById("starRating").innerHTML = starRating;
        document.getElementById("totalTime").innerHTML = finalTime;

        //closeicon on modal
        closeModal();
    };
}


// @description close icon on modal
function closeModal() {
    closeicon.addEventListener("click", function(e) {
        modal.classList.remove("show");
        startGame();
    });
}


// @desciption for user to play Again 
function playAgain() {
    modal.classList.remove("show");
    startGame();
}


// loop to add event listeners to each card
for (var i = 0; i < cards.length; i++) {
    card = cards[i];
    card.addEventListener("click", displayCard);
    card.addEventListener("click", cardOpen);
    card.addEventListener("click", congratulations);
};
card.addEventListener("click", displayCard);
card.addEventListener("click", cardOpen);
card.addEventListener("click", congratulations);