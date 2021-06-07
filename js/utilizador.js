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
            var lol = (("userList", JSON.stringify(utilizadores[i])))
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

function perfilApagar() {
    for (var i = 0; i < utilizadores.length; i++) {
        if (utilizadores[i].username == usersNames[y]) {
            utilizadores[i].username
            utilizadores[i].name
            utilizadores[i].email
            utilizadores[i].data
            utilizadores[i].genero
            utilizadores[i].password
            utilizadores[i].passwordConf
            utilizadores[i].fotoperfil
            localStorage.removeItem("userList", JSON.stringify(utilizadores[i]))
            document.getElementById("editadoForm").onsubmit = function() {
                window.location.replace("index.html")
                return false
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
let modalObterEmojiNauseas = document.getElementById("modalObterEmojiNauseas")
let modalObterEmojiHouse = document.getElementById("modalObterEmojiHouse")
let modalObterEmojiMicrobe = document.getElementById("modalObterEmojiMicrobe")
let modalObterEmojiSneezing = document.getElementById("modalObterEmojiSneezing")
let modalObterEmojiMask = document.getElementById("modalObterEmojiMask")
let modalObterEmojiSaop = document.getElementById("modalObterEmojiSaop")
let modalObterEmojiSyring = document.getElementById("modalObterEmojiSyring")
let modalObterEmojiAmbulancia = document.getElementById("modalObterEmojiAmbulancia")

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

/* CRIA OS VALORES */
for (var i = 0; i < utilizadores.length; i++) {
    if (utilizadores[i].username == usersNames[y]) {
        utilizadores[i].qtdJogados
        utilizadores[i].tempoJogado
        utilizadores[i].umaEstrela
        utilizadores[i].duasEstrela
        utilizadores[i].tresEstrela
        utilizadores[i].totalXp
        utilizadores[i].totalCoroa
        utilizadores[i].totalConquistas
        utilizadores[i].xpBar
        document.getElementById("xpBar").style.width = utilizadores[i].xpBar
        document.getElementById("metaxp").innerHTML = utilizadores[i].totalCoroa
        utilizadores[i].react
        if (document.getElementById("metaxp").innerHTML >= 5) {
            quiz()
        }
        var qtdJogados0 = utilizadores[i].qtdJogados
    }
}


/* IMPRIME OS VALORES INICIAIS CASO A QUANTIDADE DE JOGADORES FOR 0 = UNDEFINED */
if (qtdJogados0 == undefined) {
    for (var i = 0; i < utilizadores.length; i++) {
        if (utilizadores[i].username == usersNames[y]) {
            utilizadores[i].qtdJogados = document.getElementById("qtdJogados").innerHTML
            utilizadores[i].tempoJogado = document.getElementById("tempoJogado").innerHTML
            utilizadores[i].umaEstrela = document.getElementById("umaEstrela").innerHTML
            utilizadores[i].duasEstrela = document.getElementById("duasEstrela").innerHTML
            utilizadores[i].tresEstrela = document.getElementById("tresEstrela").innerHTML
            utilizadores[i].totalXp = document.getElementById("totalXp").innerHTML
            utilizadores[i].totalCoroa = document.getElementById("totalCoroa").innerHTML
            utilizadores[i].totalConquistas = document.getElementById("totalConquistas").innerHTML
            utilizadores[i].xpBar = document.getElementById("xpBar").innerHTML
            document.getElementById("metaxp").innerHTML = utilizadores[i].totalCoroa
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
        modal.classList.add("show")
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
        var tempoJogadoV = parseInt(hora) + 'h: ' + parseInt(minuto) + 'm: ' + parseInt(segundo - 1) + 's'

        var qtdJogadosV = parseInt(document.getElementById("qtdJogados").innerHTML)
        var umaEstrelaV = parseInt(document.getElementById("umaEstrela").innerHTML)
        var duasEstrelaV = parseInt(document.getElementById("duasEstrela").innerHTML)
        var tresEstrelaV = parseInt(document.getElementById("tresEstrela").innerHTML)

        var xp1V = 5
        var xp2V = 10
        var xp3V = 120
        var totalXpV = document.getElementById("totalXp").innerHTML
        var totalCoroaV = parseInt(document.getElementById("totalCoroa").innerHTML)
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

        var xp1 = xp1V *= umaEstrelaV
        var xp2 = xp2V *= duasEstrelaV
        var xp3 = xp3V *= tresEstrelaV
        totalXpV = xp1 + xp2 + xp3

        var totalCoroaV = totalXpV * (totalXpV / 100)
        totalCoroaV = totalCoroaV / totalXpV
        var totalCoroaVv = parseInt(totalCoroaV)
        var xpBarV1 = totalCoroaV - totalCoroaVv
        var xpBarV2 = xpBarV1 * 100
        var xpBarV3 = Math.round(xpBarV2) + "%"

        var totalConquistasV = 0
        if (totalCoroaV >= 5) {
            totalConquistasV += 1
            quiz()
        }



        /* QUANDO APARECE A CONGRATULAÇÃO VAI GUARDAR/ATUALIZAR OS DADOS NA LOCALSTORAGE */
        for (var i = 0; i < utilizadores.length; i++) {
            if (utilizadores[i].username == usersNames[y]) {
                utilizadores[i].qtdJogados = qtdJogadosV
                utilizadores[i].umaEstrela = umaEstrelaV
                utilizadores[i].duasEstrela = duasEstrelaV
                utilizadores[i].tresEstrela = tresEstrelaV
                utilizadores[i].tempoJogado = tempoJogadoV
                utilizadores[i].totalXp = totalXpV
                utilizadores[i].totalCoroa = totalCoroaVv
                utilizadores[i].totalConquistas = totalConquistasV
                utilizadores[i].xpBar = xpBarV3
            }
        }
        localStorage.setItem("userList", JSON.stringify(utilizadores))

        clearInterval(interval);
        finalTime = timer.innerHTML;

        var starRating = document.querySelector(".stars").innerHTML;
        document.getElementById("finalMove").innerHTML = moves;
        document.getElementById("starRating").innerHTML = starRating;
        document.getElementById("totalTime").innerHTML = finalTime;
    }

    /* QUANDO APARECE A CONGRATULAÇÃO VAI LER/ATUALIZAR OS DADOS QUE ESTÃO NA LOCALSTORAGE E IMPRIMI-LOS */
    for (var i = 0; i < utilizadores.length; i++) {
        if (utilizadores[i].username == usersNames[y]) {
            document.getElementById("qtdJogados").innerHTML = utilizadores[i].qtdJogados
            document.getElementById("umaEstrela").innerHTML = utilizadores[i].umaEstrela
            document.getElementById("duasEstrela").innerHTML = utilizadores[i].duasEstrela
            document.getElementById("tresEstrela").innerHTML = utilizadores[i].tresEstrela
            document.getElementById("tempoJogado").innerHTML = utilizadores[i].tempoJogado
            document.getElementById("totalXp").innerHTML = utilizadores[i].totalXp
            document.getElementById("totalCoroa").innerHTML = utilizadores[i].totalCoroa
            document.getElementById("totalConquistas").innerHTML = utilizadores[i].totalConquistas
            document.getElementById("xpBar").innerHTML = utilizadores[i].xpBar
            document.getElementById("xpBar").style.width = xpBarV3
            document.getElementById("metaxp").innerHTML = utilizadores[i].totalCoroa
            document.getElementById("metaxpEmoji").innerHTML = utilizadores[i].totalCoroa
            if (utilizadores[i].totalCoroa >= 5) {
                document.getElementById("xpBar").style.width = "100%"
                document.getElementById("xpBar").innerHTML = "100%"
                document.getElementById("metaxp").innerHTML = 5
            }
            document.getElementById("totalConquistas").innerHTML = utilizadores[i].totalConquistas
            document.getElementById("react").innerHTML = utilizadores[i].react
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
        };
    }

    document.getElementById("totalQtdJogado").innerHTML = totalJogadoUtiV
    let mrating1 = (rating1V * 100) / totalJogadoUtiV
    let mrating2 = (rating2V * 100) / totalJogadoUtiV
    let mrating3 = (rating3V * 100) / totalJogadoUtiV
    if (mrating1 > mrating2 && mrating1 > mrating3) {
        document.getElementById("mratingtotal").style.width = Math.round(mrating1) + "%"
    } else if (mrating2 > mrating1 && mrating2 > mrating3) {
        document.getElementById("mratingtotal").style.width = Math.round(mrating2) + "%"
    } else if (mrating3 > mrating1 && mrating3 > mrating2) {
        document.getElementById("mratingtotal").style.width = Math.round(mrating3) + "%"
    } else if (mrating1 == mrating2) {
        document.getElementById("mratingtotal").style.width = Math.round(mrating1) + "%"
    } else if (mrating1 == mrating3) {
        document.getElementById("mratingtotal").style.width = Math.round(mrating1) + "%"
    } else if (mrating2 == mrating3) {
        document.getElementById("mratingtotal").style.width = Math.round(mrating2) + "%"

    }
    document.getElementById("reactGosto").innerHTML = reactGosto
    document.getElementById("reactNaoGosto").innerHTML = reactNaoGosto
    console.log(document.getElementById("mratingtotal").style.width);
}

/* PARTE DOS EMOJIS */
for (var i = 0; i < utilizadores.length; i++) {
    if (utilizadores[i].username == usersNames[y]) {
        document.getElementById("totalXp").innerHTML = utilizadores[i].totalXp
    }
}
var totalXp1V = document.getElementById("totalXp").innerHTML
console.log(totalXp1V);

/* EMOJI ("NAUSEAS") */
function cardNauseas() {
    if (document.getElementById("cardNauseas").style.fontSize == "60px") {
        alert("este emoji é do hwwwwe")
    } else {
        modalObterEmojiNauseas.classList.add("show")
    }
}

function getcardNauseas() {
    if (totalXp1V < 115) {
        alert("nao tens dinheiro")
    } else {
        var cardNauseasBKV = document.getElementById("cardNauseas").style.backgroundImage = "url(' ')"
        var cardNauseasFSV = document.getElementById("cardNauseas").style.fontSize = "60px"
        totalXp1V -= 115
        for (var i = 0; i < utilizadores.length; i++) {
            if (utilizadores[i].username == usersNames[y]) {
                utilizadores[i].cardNauseasBK = cardNauseasBKV
                utilizadores[i].cardNauseasFS = cardNauseasFSV
                utilizadores[i].totalXp1 = totalXp1V
            }
        }
        localStorage.setItem("userList", JSON.stringify(utilizadores))
    }
    modalObterEmojiNauseas.classList.remove("show")
}

/* EMOJI ("HOUSE") */

function cardHouse() {
    if (document.getElementById("cardHouse").style.fontSize == "60px") {
        alert("este emoji é do house")
    } else {
        modalObterEmojiHouse.classList.add("show")
    }
}

function getcardHouse() {
    var cardHouseBKV = document.getElementById("cardHouse").style.backgroundImage = "url(' ')"
    var cardHouseFSV = document.getElementById("cardHouse").style.fontSize = "60px"
    totalXp1V -= 115
    for (var i = 0; i < utilizadores.length; i++) {
        if (utilizadores[i].username == usersNames[y]) {
            utilizadores[i].cardHouseBK = cardHouseBKV
            utilizadores[i].cardHouseFS = cardHouseFSV
            utilizadores[i].totalXp1 = totalXp1V
        }
    }
    localStorage.setItem("userList", JSON.stringify(utilizadores))
    modalObterEmojiHouse.classList.remove("show")
}



/* EMOJI ("MICROBE") */

function cardMicrobe() {
    if (document.getElementById("cardMicrobe").style.fontSize == "60px") {
        alert("este emoji é do house")
    } else {
        modalObterEmojiMicrobe.classList.add("show")
    }
}

function getcardMicrobe() {
    if (totalXp1V < 115) {
        alert("nao tens dinheiro")
    } else {
        var cardMicrobeBKV = document.getElementById("cardMicrobe").style.backgroundImage = "url(' ')"
        var cardMicrobeFSV = document.getElementById("cardMicrobe").style.fontSize = "60px"
        totalXp1V -= 115
        for (var i = 0; i < utilizadores.length; i++) {
            if (utilizadores[i].username == usersNames[y]) {
                utilizadores[i].cardMicrobeBK = cardMicrobeBKV
                utilizadores[i].cardMicrobeFS = cardMicrobeFSV
                utilizadores[i].totalXp1 = totalXp1V
            }
        }
        localStorage.setItem("userList", JSON.stringify(utilizadores))
    }
    modalObterEmojiMicrobe.classList.remove("show")
}


/* EMOJI ("SNEEZING") */

function cardSneezing() {
    if (document.getElementById("cardSneezing").style.fontSize == "60px") {
        alert("este emoji é do house")
    } else {
        modalObterEmojiSneezing.classList.add("show")
    }
}

function getcardSneezing() {
    if (totalXp1V < 115) {
        alert("nao tens dinheiro")
    } else {
        var cardSneezingBKV = document.getElementById("cardSneezing").style.backgroundImage = "url(' ')"
        var cardSneezingFSV = document.getElementById("cardSneezing").style.fontSize = "60px"
        totalXp1V -= 115
        for (var i = 0; i < utilizadores.length; i++) {
            if (utilizadores[i].username == usersNames[y]) {
                utilizadores[i].cardSneezingBK = cardSneezingBKV
                utilizadores[i].cardSneezingFS = cardSneezingFSV
                utilizadores[i].totalXp1 = totalXp1V
            }
        }
        localStorage.setItem("userList", JSON.stringify(utilizadores))
    }
    modalObterEmojiSneezing.classList.remove("show")
}

/* EMOJI ("MASK") */

function cardMask() {
    if (document.getElementById("cardMask").style.fontSize == "60px") {
        alert("este emoji é do house")
    } else {
        modalObterEmojiMask.classList.add("show")
    }
}

function getcardMask() {
    if (totalXp1V < 115) {
        alert("nao tens dinheiro")
    } else {
        var cardMaskBKV = document.getElementById("cardMask").style.backgroundImage = "url(' ')"
        var cardMaskFSV = document.getElementById("cardMask").style.fontSize = "60px"
        totalXp1V -= 115
        for (var i = 0; i < utilizadores.length; i++) {
            if (utilizadores[i].username == usersNames[y]) {
                utilizadores[i].cardMaskBK = cardMaskBKV
                utilizadores[i].cardMaskFS = cardMaskFSV
                utilizadores[i].totalXp1 = totalXp1V
            }
        }
        localStorage.setItem("userList", JSON.stringify(utilizadores))
    }
    modalObterEmojiMask.classList.remove("show")
}

/* EMOJI ("SAOP") */

function cardSaop() {
    if (document.getElementById("cardSaop").style.fontSize == "60px") {
        alert("este emoji é do house")
    } else {
        modalObterEmojiSaop.classList.add("show")
    }
}

function getcardSaop() {
    if (totalXp1V < 115) {
        alert("nao tens dinheiro")
    } else {
        var cardSaopBKV = document.getElementById("cardSaop").style.backgroundImage = "url(' ')"
        var cardSaopFSV = document.getElementById("cardSaop").style.fontSize = "60px"
        totalXp1V -= 115
        for (var i = 0; i < utilizadores.length; i++) {
            if (utilizadores[i].username == usersNames[y]) {
                utilizadores[i].cardSaopBK = cardSaopBKV
                utilizadores[i].cardSaopFS = cardSaopFSV
                utilizadores[i].totalXp1 = totalXp1V
            }
        }
        localStorage.setItem("userList", JSON.stringify(utilizadores))
    }
    modalObterEmojiSaop.classList.remove("show")
}

/* EMOJI ("SYRING") */

function cardSyring() {
    if (document.getElementById("cardSyring").style.fontSize == "60px") {
        alert("este emoji é do house")
    } else {
        modalObterEmojiSyring.classList.add("show")
    }
}

function getcardSyring() {
    if (totalXp1V < 115) {
        alert("nao tens dinheiro")
    } else {
        var cardSyringBKV = document.getElementById("cardSyring").style.backgroundImage = "url(' ')"
        var cardSyringFSV = document.getElementById("cardSyring").style.fontSize = "60px"
        totalXp1V -= 115
        for (var i = 0; i < utilizadores.length; i++) {
            if (utilizadores[i].username == usersNames[y]) {
                utilizadores[i].cardSyringBK = cardSyringBKV
                utilizadores[i].cardSyringFS = cardSyringFSV
                utilizadores[i].totalXp1 = totalXp1V
            }
        }
        localStorage.setItem("userList", JSON.stringify(utilizadores))
    }
    modalObterEmojiSyring.classList.remove("show")
}

/* EMOJI ("AMBULANCIA") */

function cardAmbulancia() {
    if (document.getElementById("cardAmbulancia").style.fontSize == "60px") {
        alert("este emoji é do house")
    } else {
        modalObterEmojiAmbulancia.classList.add("show")
    }
}

function getcardAmbulancia() {
    if (totalXp1V < 115) {
        alert("nao tens dinheiro")
    } else {
        var cardAmbulanciaBKV = document.getElementById("cardAmbulancia").style.backgroundImage = "url(' ')"
        var cardAmbulanciaFSV = document.getElementById("cardAmbulancia").style.fontSize = "60px"
        totalXp1V -= 115
        for (var i = 0; i < utilizadores.length; i++) {
            if (utilizadores[i].username == usersNames[y]) {
                utilizadores[i].cardAmbulanciaBK = cardAmbulanciaBKV
                utilizadores[i].cardAmbulanciaFS = cardAmbulanciaFSV
                utilizadores[i].totalXp1 = totalXp1V
            }
        }
        localStorage.setItem("userList", JSON.stringify(utilizadores))
    }
    modalObterEmojiAmbulancia.classList.remove("show")
}





for (var i = 0; i < utilizadores.length; i++) {
    if (utilizadores[i].username == usersNames[y]) {
        document.getElementById("cardNauseas").style.backgroundImage = utilizadores[i].cardNauseasBK
        document.getElementById("cardNauseas").style.fontSize = utilizadores[i].cardNauseasFS
        document.getElementById("cardHouse").style.backgroundImage = utilizadores[i].cardHouseBK
        document.getElementById("cardHouse").style.fontSize = utilizadores[i].cardHouseFS
        document.getElementById("cardMicrobe").style.backgroundImage = utilizadores[i].cardMicrobeBK
        document.getElementById("cardMicrobe").style.fontSize = utilizadores[i].cardMicrobeFS
        document.getElementById("cardSneezing").style.backgroundImage = utilizadores[i].cardSneezingBK
        document.getElementById("cardSneezing").style.fontSize = utilizadores[i].cardSneezingFS
        document.getElementById("cardMask").style.backgroundImage = utilizadores[i].cardMaskBK
        document.getElementById("cardMask").style.fontSize = utilizadores[i].cardMaskFS
        document.getElementById("cardSaop").style.backgroundImage = utilizadores[i].cardSaopBK
        document.getElementById("cardSaop").style.fontSize = utilizadores[i].cardSaopFS
        document.getElementById("cardSyring").style.backgroundImage = utilizadores[i].cardSyringBK
        document.getElementById("cardSyring").style.fontSize = utilizadores[i].cardSyringFS
        document.getElementById("cardAmbulancia").style.backgroundImage = utilizadores[i].cardAmbulanciaBK
        document.getElementById("cardAmbulancia").style.fontSize = utilizadores[i].cardAmbulanciaFS
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
/* BOTAO PARA FECHAR O MODAL DE COMPRAR EMOJI*/
function fecharNauseas() {
    modalObterEmojiNauseas.classList.remove("show")
}

function fecharHouse() {
    modalObterEmojiHouse.classList.remove("show")
}

function fecharMicrobe() {
    modalObterEmojiMicrobe.classList.remove("show")
}

function fecharSneezing() {
    modalObterEmojiSneezing.classList.remove("show")
}

function fecharMask() {
    modalObterEmojiMask.classList.remove("show")
}

function fecharSaop() {
    modalObterEmojiSaop.classList.remove("show")
}

function fecharSyring() {
    modalObterEmojiSyring.classList.remove("show")
}

function fecharAmbulancia() {
    modalObterEmojiAmbulancia.classList.remove("show")
}




























































































































































































































// QUIZ
function quiz() {
    var myQuestions = [{
            question: "O que devo fazer se sentir sintomas de Covid-19?",
            answers: {
                A: 'Ficar em casa',
                B: 'Continuar a sair de casa',
                C: 'Ir para o hospital sem aviso'
            },
            correctAnswer: 'A'
        },
        {
            question: "O que devo fazer se sentir sintomas de Covid-19?",
            answers: {
                A: 'Ficar em casa',
                B: 'Continuar a sair de casa',
                C: 'Ir para o hospital sem aviso'
            },
            correctAnswer: 'A'
        }
    ];

    var quizContainer = document.getElementById('quiz');
    var resultsContainer = document.getElementById('results');
    var submitButton = document.getElementById('submitQuiz');

    generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton);

    function generateQuiz(questions, quizContainer, resultsContainer, submitButton) {

        function showQuestions(questions, quizContainer) {
            // we'll need a place to store the output and the answer choices
            var output = [];
            var answers;

            // for each question...
            for (var i = 0; i < questions.length; i++) {

                // first reset the list of answers
                answers = [];

                // for each available answer...
                for (letter in questions[i].answers) {

                    // ...add an html radio button
                    answers.push(
                        '<label>' +
                        '<input type="radio" name="question' + i + '" value="' + letter + '">' +
                        letter + ': ' +
                        questions[i].answers[letter] +
                        '</label>'
                    );
                }

                // add this question and its answers to the output
                output.push(
                    '<div class="question">' + questions[i].question + '</div>' +
                    '<div class="answers">' + answers.join('') + '</div>'
                );
            }

            // finally combine our output list into one string of html and put it on the page
            quizContainer.innerHTML = output.join('');
        }


        function showResults(questions, quizContainer, resultsContainer) {

            // gather answer containers from our quiz
            var answerContainers = quizContainer.querySelectorAll('.answers');

            // keep track of user's answers
            var userAnswer = '';
            var numCorrect = 0;

            // for each question...
            for (var i = 0; i < questions.length; i++) {

                // find selected answer
                userAnswer = (answerContainers[i].querySelector('input[name=question' + i + ']:checked') || {}).value;

                // if answer is correct
                if (userAnswer === questions[i].correctAnswer) {
                    // add to the number of correct answers
                    numCorrect++;

                    // color the answers green
                    answerContainers[i].style.color = 'lightgreen';
                }
                // if answer is wrong or blank
                else {
                    // color the answers red
                    answerContainers[i].style.color = 'red';
                }
            }

            // show number of correct answers out of total
            resultsContainer.innerHTML = numCorrect + ' out of ' + questions.length;
        }

        // show questions right away
        showQuestions(questions, quizContainer);

        // on submit, show results
        submitButton.onclick = function() {
            showResults(questions, quizContainer, resultsContainer);
        }

    }
}