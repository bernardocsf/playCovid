window.onload = function() {
    perfilDados()
    startGame()
    congratulations()
}

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

// EDITA A FOTO DE PERFIL
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

// EDITAR PERFIL
/* VAI GUARDAR OS USERNAMES NUMA LISTA NA LOCALSTORAGE */
let usersNames = []
if (localStorage.getItem("usernameList")) {
    usersNames = JSON.parse(localStorage.getItem("usernameList"))
}
/* VAI GUARDAR OS DADOS TODOS DE TODOS OS USERNAMES NUMA LISTA NA LOCALSTORAGE */
let utilizadores = []
if (localStorage.getItem("userList")) {
    utilizadores = JSON.parse(localStorage.getItem("userList"))
}

let x = usersNames.length
let y = x - 1

/* VAI BUSCAR OS DADOS REGISTADOS E MOSTRA-LOS AQUI */
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


// JOGO DA MEMÓRIA
let card = document.getElementsByClassName("card");
let cards = [...card];
const deck = document.getElementById("card-deck");
let moves = 0;
let counter = document.querySelector(".moves");
const stars = document.querySelectorAll(".fa-star");
let matchedCard = document.getElementsByClassName("match");
let starsList = document.querySelectorAll(".stars li");
let modaljogar = document.getElementById("popupjogar")
let modal = document.getElementById("popup1")
let modalEstatisticasJogo = document.getElementById("modalEstatisticasJogo")
var openedCards = [];

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

modaljogar.classList.add("show");

function startGame() {
    openedCards = [];
    cards = shuffle(cards);
    for (var i = 0; i < cards.length; i++) {
        deck.innerHTML = "";
        [].forEach.call(cards, function(item) {
            deck.appendChild(item);
        });
        cards[i].classList.remove("show", "open", "match", "disabled");
    }
    moves = 0;
    counter.innerHTML = moves;
    for (var i = 0; i < stars.length; i++) {
        stars[i].style.color = "#FFD700";
        stars[i].style.visibility = "visible";
    }

    second = 0;
    minute = 0;
    hour = 0;
    var timer = document.querySelector(".timer");
    timer.innerHTML = "0 minutos 0 segundos";
    clearInterval(interval);
}

var displayCard = function() {
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
};

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

function matched() {
    openedCards[0].classList.add("match", "disabled");
    openedCards[1].classList.add("match", "disabled");
    openedCards[0].classList.remove("show", "open", "no-event");
    openedCards[1].classList.remove("show", "open", "no-event");
    openedCards = [];
}

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

function disable() {
    Array.prototype.filter.call(cards, function(card) {
        card.classList.add('disabled');
    });
}

function enable() {
    Array.prototype.filter.call(cards, function(card) {
        card.classList.remove('disabled');
        for (var i = 0; i < matchedCard.length; i++) {
            matchedCard[i].classList.add("disabled");
        }
    });
}

function moveCounter() {
    moves++;
    counter.innerHTML = moves;

    if (moves == 1) {
        second = 0;
        minute = 0;
        hour = 0;
        startTimer();
    }

    if (moves > 8 && moves < 14) {
        for (i = 0; i < 3; i++) {
            if (i > 1) {
                stars[i].style.visibility = "collapse";
            }
        }
    } else if (moves >= 15) {
        for (i = 0; i < 3; i++) {
            if (i > 0) {
                stars[i].style.visibility = "collapse";
            }
        }
    }
}

var second = 0;
minute = 0;
hour = 0;
var timer = document.querySelector(".timer");
var interval;

function startTimer() {
    interval = setInterval(function() {
        timer.innerHTML = minute + " minutos " + second + " segundos";
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

for (var i = 0; i < cards.length; i++) {
    card = cards[i];
    card.addEventListener("click", displayCard);
    card.addEventListener("click", cardOpen);
    card.addEventListener("click", congratulations);
};
card.addEventListener("click", displayCard);
card.addEventListener("click", cardOpen);
card.addEventListener("click", congratulations);
card.addEventListener("click", congratulations);







































for (var i = 0; i < utilizadores.length; i++) {
    if (utilizadores[i].username == usersNames[y]) {
        utilizadores[i].qtdJogados
        utilizadores[i].umaEstrela
        utilizadores[i].duasEstrela
        utilizadores[i].tresEstrela
        utilizadores[i].tempoJogado
        utilizadores[i].react
        var qtdJogados0 = utilizadores[i].qtdJogados
    }
}

if (qtdJogados0 == undefined) {
    for (var i = 0; i < utilizadores.length; i++) {
        if (utilizadores[i].username == usersNames[y]) {
            utilizadores[i].qtdJogados = document.getElementById("qtdJogados").innerHTML
            utilizadores[i].umaEstrela = document.getElementById("umaEstrela").innerHTML
            utilizadores[i].duasEstrela = document.getElementById("duasEstrela").innerHTML
            utilizadores[i].tresEstrela = document.getElementById("tresEstrela").innerHTML
            utilizadores[i].tempoJogado = document.getElementById("tempoJogado").innerHTML
            utilizadores[i].react = document.getElementById("react").innerHTML
            localStorage.setItem("userList", JSON.stringify(utilizadores))
        }
    }
}

var reactV = document.getElementById("react").innerHTML

function gosto() {
    reactV = document.getElementById("react").innerHTML = "Gosto";
    for (var i = 0; i < utilizadores.length; i++) {
        if (utilizadores[i].username == usersNames[y]) {
            utilizadores[i].react = reactV
        }
    }
    localStorage.setItem("userList", JSON.stringify(utilizadores))
}

function naogosto() {
    reactV = document.getElementById("react").innerHTML = "Não gosto";
    for (var i = 0; i < utilizadores.length; i++) {
        if (utilizadores[i].username == usersNames[y]) {
            utilizadores[i].react = reactV
        }
    }
    localStorage.setItem("userList", JSON.stringify(utilizadores))
}

function congratulations() {
    if (matchedCard.length == 2) {
        /* VAI CONTAR O TEMPO QUE JÁ FOI JOGADO */
        var tempoUltimoJogo = hour + ":" + minute + ":" + second
        var tempoTotal = document.getElementById("tempoJogado").innerHTML

        var split1 = tempoUltimoJogo.split(':');
        var split2 = tempoTotal.split(':');

        hora = parseInt(split1[0]) + parseInt(split2[0])
        minuto = parseInt(split1[1]) + parseInt(split2[1])
        segundo = parseInt(split1[2]) + parseInt(split2[2])
        hora = hora + minuto / 60;
        minuto = minuto + segundo / 60;
        segundo = segundo % 60;

        var tempoJogadoV = parseInt(hora) + 'h: ' + parseInt(minuto) + 'm: ' + parseInt(segundo) + 's'

        var qtdJogadosV = parseInt(document.getElementById("qtdJogados").innerHTML)
        let umaEstrelaV = parseInt(document.getElementById("umaEstrela").innerHTML)
        let duasEstrelaV = parseInt(document.getElementById("duasEstrela").innerHTML)
        let tresEstrelaV = parseInt(document.getElementById("tresEstrela").innerHTML)

        /* VAI CONTAR AS VEZES JOGADAS */
        qtdJogadosV = parseInt(qtdJogadosV) + 1

        /* VAI CONTAR AS VEZES GANHADAS COM X ESTRELAS */
        if (moves >= 15) {
            umaEstrelaV++
        } else if (moves > 8 && moves <= 14) {
            duasEstrelaV++
        } else if (moves <= 8) {
            tresEstrelaV++
        }

        /* VAI GUARDAR OS DADOS NA LOCALSTORAGE */
        for (var i = 0; i < utilizadores.length; i++) {
            if (utilizadores[i].username == usersNames[y]) {
                utilizadores[i].qtdJogados = qtdJogadosV
                utilizadores[i].umaEstrela = umaEstrelaV
                utilizadores[i].duasEstrela = duasEstrelaV
                utilizadores[i].tresEstrela = tresEstrelaV
                utilizadores[i].tempoJogado = tempoJogadoV
            }
        }
        localStorage.setItem("userList", JSON.stringify(utilizadores))

        clearInterval(interval);
        finalTime = timer.innerHTML;

        modal.classList.add("show")

        var starRating = document.querySelector(".stars").innerHTML;
        document.getElementById("finalMove").innerHTML = moves;
        document.getElementById("starRating").innerHTML = starRating;
        document.getElementById("totalTime").innerHTML = finalTime;
    }
    /* VAI LER OS DADOS QUE ESTÃO NA LOCALSTORAGE E IMPRIMI-LOS */
    for (var i = 0; i < utilizadores.length; i++) {
        if (utilizadores[i].username == usersNames[y]) {
            document.getElementById("qtdJogados").innerHTML = utilizadores[i].qtdJogados
            document.getElementById("umaEstrela").innerHTML = utilizadores[i].umaEstrela
            document.getElementById("duasEstrela").innerHTML = utilizadores[i].duasEstrela
            document.getElementById("tresEstrela").innerHTML = utilizadores[i].tresEstrela
            document.getElementById("tempoJogado").innerHTML = utilizadores[i].tempoJogado
        }
    }
}

/* ESTATISTICAS DO JOGO */
function estatisticasJogo() {
    modalEstatisticasJogo.classList.add("show")
    let totalJogadoUtiV = 0
    var rating1V = 0
    var rating2V = 0
    var rating3V = 0
    var reactGosto = 0
    var reactNaoGosto = 0
    for (var i = 0; i < utilizadores.length; i++) {
        if (utilizadores[i].username == usersNames[y]) {
            document.getElementById("qtdJogados").innerHTML = utilizadores[i].qtdJogados
            document.getElementById("umaEstrela").innerHTML = utilizadores[i].umaEstrela
            document.getElementById("duasEstrela").innerHTML = utilizadores[i].duasEstrela
            document.getElementById("tresEstrela").innerHTML = utilizadores[i].tresEstrela
            document.getElementById("react").innerHTML = utilizadores[i].react
        }
        var utilizadoresQtdJogos = utilizadores[i].qtdJogados
        totalJogadoUtiV += parseInt(utilizadoresQtdJogos)
        var rating1s = utilizadores[i].umaEstrela
        rating1V += parseInt(rating1s)
        var rating2s = utilizadores[i].duasEstrela
        rating2V += parseInt(rating2s)
        var rating3s = utilizadores[i].tresEstrela
        rating3V += parseInt(rating3s)

        var reactVR = utilizadores[i].react
        if (reactVR == "Gosto") {
            reactGosto += 1
        }
        if (reactVR == "Não gosto") {
            reactNaoGosto += 1
        }
    }

    document.getElementById("reactGosto").innerHTML = reactGosto
    document.getElementById("reactNaoGosto").innerHTML = reactNaoGosto
    document.getElementById("totalQtdJogado").innerHTML = totalJogadoUtiV
    if (rating1V > rating2V && rating1V > rating3V) {
        document.getElementById("mediaRating").innerHTML = String.fromCodePoint(11088)
    } else if (rating2V > rating1V && rating2V > rating3V) {
        document.getElementById("mediaRating").innerHTML = String.fromCodePoint(11088, 11088)
    } else if (rating3V > rating1V && rating3V > rating2V) {
        document.getElementById("mediaRating").innerHTML = String.fromCodePoint(11088, 11088, 11088)
    }
}

/* BOTAO PARA COMEÇAR A JOGAR */
function jogar() {
    modaljogar.classList.remove("show")
    startGame()
}
/* BOTAO PARA COMEÇAR A JOGAR NAS ESTATISTICAS*/
function jogarE() {
    modaljogar.classList.remove("show")
    modalEstatisticasJogo.classList.remove("show")
    startGame()
}
/* BOTAO PARA JOGOR NOVAMENTE*/
function jogarNovamente() {
    modal.classList.remove("show")
    startGame()
}
/* BOTAO PARA FECHAR O JOGO*/
function fecharJogo() {
    modal.classList.remove("show")
    startGame();
    modaljogar.classList.add("show")
}
/* BOTAO PARA FECHAR O JOGO NAS ESTATISTICAS*/
function fecharJogoE() {
    modalEstatisticasJogo.classList.remove("show")
    modal.classList.remove("show")
    startGame();
    modaljogar.classList.add("show")
}