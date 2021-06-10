window.onload = function() {
    perfilDados()
    startGame()
    congratulations()
    this.randomQuestion();
    this.answersTracker();
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

let modalPassDif = document.getElementById("modalPassDif")

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
                alert("Passwords não coincidem")
            } else {
                localStorage.setItem("userList", JSON.stringify(utilizadores))
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
let modalInfoEmojiNauseas = document.getElementById("modalInfoEmojiNauseas")
let modalObterEmojiHouse = document.getElementById("modalObterEmojiHouse")
let modalInfoEmojiHouse = document.getElementById("modalInfoEmojiHouse")
let modalObterEmojiMicrobe = document.getElementById("modalObterEmojiMicrobe")
let modalInfoEmojiMicrobe = document.getElementById("modalInfoEmojiMicrobe")
let modalObterEmojiSneezing = document.getElementById("modalObterEmojiSneezing")
let modalInfoEmojiSneezing = document.getElementById("modalInfoEmojiSneezing")
let modalObterEmojiMask = document.getElementById("modalObterEmojiMask")
let modalInfoEmojiMask = document.getElementById("modalInfoEmojiMask")
let modalObterEmojiSaop = document.getElementById("modalObterEmojiSaop")
let modalInfoEmojiSaop = document.getElementById("modalInfoEmojiSaop")
let modalObterEmojiSyring = document.getElementById("modalObterEmojiSyring")
let modalInfoEmojiSyring = document.getElementById("modalInfoEmojiSyring")
let modalObterEmojiAmbulancia = document.getElementById("modalObterEmojiAmbulancia")
let modalInfoEmojiAmbulancia = document.getElementById("modalInfoEmojiAmbulancia")
let modalInfoEmojiGeral = document.getElementById("modalInfoEmojiGeral")

modalInfoEmojiNauseas.onclick = function(event) {
    if (event.target == modalInfoEmojiNauseas) {
        modalInfoEmojiNauseas.classList.remove('show');
    }
}
modalInfoEmojiHouse.onclick = function(event) {
    if (event.target == modalInfoEmojiHouse) {
        modalInfoEmojiHouse.classList.remove('show');
    }
}
modalInfoEmojiMicrobe.onclick = function(event) {
    if (event.target == modalInfoEmojiMicrobe) {
        modalInfoEmojiMicrobe.classList.remove('show');
    }
}
modalInfoEmojiSneezing.onclick = function(event) {
    if (event.target == modalInfoEmojiSneezing) {
        modalInfoEmojiSneezing.classList.remove('show');
    }
}
modalInfoEmojiMask.onclick = function(event) {
    if (event.target == modalInfoEmojiMask) {
        modalInfoEmojiMask.classList.remove('show');
    }
}
modalInfoEmojiSaop.onclick = function(event) {
    if (event.target == modalInfoEmojiSaop) {
        modalInfoEmojiSaop.classList.remove('show');
    }
}
modalInfoEmojiSyring.onclick = function(event) {
    if (event.target == modalInfoEmojiSyring) {
        modalInfoEmojiSyring.classList.remove('show');
    }
}
modalInfoEmojiAmbulancia.onclick = function(event) {
    if (event.target == modalInfoEmojiAmbulancia) {
        modalInfoEmojiAmbulancia.classList.remove('show');
    }
}

modalInfoEmojiGeral.onclick = function(event) {
    if (event.target == modalInfoEmojiGeral) {
        modalInfoEmojiGeral.classList.remove('show');
    }
}

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
        utilizadores[i].totalXpEmoji
        utilizadores[i].totalCoroa
        utilizadores[i].totalConquistas
        utilizadores[i].xpBar
        document.getElementById("xpBar").style.width = utilizadores[i].xpBar
        document.getElementById("metaxp").innerHTML = utilizadores[i].totalCoroa
        utilizadores[i].emojiBarN
        utilizadores[i].react
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
            utilizadores[i].totalXpEmoji = document.getElementById("totalXpEmoji").innerHTML
            utilizadores[i].totalCoroa = document.getElementById("totalCoroa").innerHTML
            utilizadores[i].totalConquistas = document.getElementById("totalConquistas").innerHTML
            utilizadores[i].xpBar = document.getElementById("xpBar").innerHTML
            document.getElementById("metaxp").innerHTML = utilizadores[i].totalCoroa
            utilizadores[i].metaEmoji = document.getElementById("metaEmoji").innerHTML
            var emojiBarInt = parseInt(document.getElementById("emojiBar").innerHTML)
            utilizadores[i].emojiBarN = emojiBarInt
            var emojiBar = document.getElementById("emojiBar").innerHTML.toString()
            document.getElementById("emojiBar").style.width = emojiBar
            utilizadores[i].react = document.getElementById("react").innerHTML
            localStorage.setItem("userList", JSON.stringify(utilizadores))
        }
    }
}

var reactV = document.getElementById("react").innerHTML

function gosto() {
    reactV = document.getElementById("react").innerHTML = "Gosto"
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
    if (matchedCard.length == 16) {
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

        /* VAI CONTAR AS VEZES JOGADAS */
        var qtdJogadosV = parseInt(document.getElementById("qtdJogados").innerHTML)
        qtdJogadosV = parseInt(qtdJogadosV) + 1

        /* VAI CONTAR A VEZES GANHAS COM X ESTRELAS */
        var umaEstrelaV = parseInt(document.getElementById("umaEstrela").innerHTML)
        var duasEstrelaV = parseInt(document.getElementById("duasEstrela").innerHTML)
        var tresEstrelaV = parseInt(document.getElementById("tresEstrela").innerHTML)

        if (moves >= 15) {
            /* VAI CONTAR AS VEZES GANHAS COM UMA ESTRELA */
            umaEstrelaV++
        } else if (moves > 8 && moves <= 14) {
            /* VAI CONTAR AS VEZES GANHADAS COM DUAS ESTRELAS */
            duasEstrelaV++
        } else if (moves <= 8) {
            /* VAI CONTAR AS VEZES GANHADAS COM TRES ESTRELAS */
            tresEstrelaV++
        }

        /* VAI SOMAR A PONTUAÇÃO COM UMA ESTRELA */
        var xp1V = 5
        var xp1 = xp1V *= umaEstrelaV;
        /* VAI SOMAR A PONTUAÇÃO COM DUAS ESTRELAS */
        var xp2V = 10
        var xp2 = xp2V *= duasEstrelaV;
        /* VAI SOMAR A PONTUAÇÃO COM TRES ESTRELAS */
        var xp3V = 15
        var xp3 = xp3V *= tresEstrelaV;
        /* VAI SOMAR A PONTUAÇÃO TOTAL */
        var totalXpV = document.getElementById("totalXp").innerHTML
        totalXpV = xp1 + xp2 + xp3

        /* VAI SOMAR A PONTUAÇÃO TOTAL PARA COMPRAR EMOJIS */
        var totalXpEmojiV = parseInt(document.getElementById("totalXpEmoji").innerHTML)
        if (moves >= 15) {
            /* VAI CONTAR AS VEZES GANHAS COM UMA ESTRELA */
            totalXpEmojiV += 5
        } else if (moves > 8 && moves <= 14) {
            /* VAI CONTAR AS VEZES GANHADAS COM DUAS ESTRELAS */
            totalXpEmojiV += 10
        } else if (moves <= 8) {
            /* VAI CONTAR AS VEZES GANHADAS COM TRES ESTRELAS */
            totalXpEmojiV += 15
        }

        /* VAI CONVERTER A STRING PARA NUMERO DE INTEIRO DE COROAS */
        var totalCoroaV = parseInt(document.getElementById("totalCoroa").innerHTML);
        /* VAI SOMAR O TOTAL DE COROAS */
        var totalCoroaV = totalXpV * (totalXpV / 100)
        totalCoroaV = totalCoroaV / totalXpV

        /* VAI CONVERTER O NUMERO DE COROAS EM NUMERO INTEIRO */
        var totalCoroaVv = parseInt(totalCoroaV);
        /* VAI DEIXAR O NUMERO SEM UNIDADES */
        var xpBarV1 = totalCoroaV - totalCoroaVv;
        /* VAI CONVERTER O NUMERO EM UNIDADE */
        var xpBarV2 = xpBarV1 * 100;
        /* VAI ARREDONDAR O NUMERO DE COROAS */
        var xpBarV3 = Math.round(xpBarV2) + "%"

        /* VAI SOMAR O TOTAL DE CONQUISTAS */
        var totalConquistasV = 0
        if (totalCoroaV >= 5) {
            totalConquistasV += 1
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
                utilizadores[i].totalXpEmoji = totalXpEmojiV
                utilizadores[i].totalCoroa = totalCoroaVv
                utilizadores[i].xpBar = xpBarV3
                localStorage.setItem("userList", JSON.stringify(utilizadores))
            }
        }

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
            document.getElementById("totalXpEmoji").innerHTML = utilizadores[i].totalXpEmoji
            if (utilizadores[i].emojiBarN == 100) {
                document.getElementById("xpD").innerHTML = ""
                document.getElementById("totalXpEmoji").innerHTML = "Parabéns, colecionas-te todos os Emojis!"
                document.getElementById("dd").innerHTML = ""
            }
            document.getElementById("totalCoroa").innerHTML = utilizadores[i].totalCoroa
            document.getElementById("totalConquistas").innerHTML = utilizadores[i].totalConquistas
            document.getElementById("xpBar").innerHTML = utilizadores[i].xpBar
            document.getElementById("xpBar").style.width = xpBarV3
            document.getElementById("metaxp").innerHTML = utilizadores[i].totalCoroa
            if (utilizadores[i].totalCoroa >= 5) {
                document.getElementById("xpBar").style.width = "100%"
                document.getElementById("xpBar").innerHTML = "100%"
                document.getElementById("metaxp").innerHTML = 5
            }
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

    /* VAI BUSCAR OS DADOS DA QUANTIDADES DE JOGOS E ETC.. DE CADA UTILIZADOR PARA SOMAR */
    for (var i = 0; i < utilizadores.length; i++) {
        if (utilizadores[i].username == usersNames[y]) {
            document.getElementById("qtdJogados").innerHTML = utilizadores[i].qtdJogados
            document.getElementById("umaEstrela").innerHTML = utilizadores[i].umaEstrela
            document.getElementById("duasEstrela").innerHTML = utilizadores[i].duasEstrela
            document.getElementById("tresEstrela").innerHTML = utilizadores[i].tresEstrela
        }

        /* VAI SOMAR A QUANTIDADE DE JOGOS DE TODOS OS UTILIZADORES */
        var utilizadoresQtdJogos = utilizadores[i].qtdJogados
        totalJogadoUtiV += parseInt(utilizadoresQtdJogos);

        /* VAI SOMAR A QUANTIDADE DE JOGOS DE TODOS OS UTILIZADORES COM UMA ESTRELA */
        var rating1s = utilizadores[i].umaEstrela
        rating1V += parseInt(rating1s);

        /* VAI SOMAR A QUANTIDADE DE JOGOS DE TODOS OS UTILIZADORES COM DUAS ESTRELAS */
        var rating2s = utilizadores[i].duasEstrela
        rating2V += parseInt(rating2s);

        /* VAI SOMAR A QUANTIDADE DE JOGOS DE TODOS OS UTILIZADORES COM TRES ESTRELAS */
        var rating3s = utilizadores[i].tresEstrela
        rating3V += parseInt(rating3s)

        /* VAI SOMAR A QUANTIDADE DE GOSTOS / NAO GOSTOS DE TODOS OS UTILIZADORES */
        var reactVR = utilizadores[i].react
        if (reactVR == "Gosto") {
            reactGosto += 1
        }
        if (reactVR == "Não gosto") {
            reactNaoGosto += 1
        };
    }

    /* VAI IMPRIMIR A QUANTIDADE DE JOGOS DE TODOS OS UTILIZADORES */
    document.getElementById("totalQtdJogado").innerHTML = totalJogadoUtiV

    /* VAI CALCULAR A MÉDIA DE RATING */
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
    /* VAI IMPRIMIR A QUANTIDADE DE GOSTOS */
    document.getElementById("reactGosto").innerHTML = reactGosto;
    /* VAI IMPRIMIR A QUANTIDADE DE NAO GOSTOS */
    document.getElementById("reactNaoGosto").innerHTML = reactNaoGosto
}

let overlayQuiz = document.getElementById("overlayQuiz")

for (var i = 0; i < utilizadores.length; i++) {
    if (utilizadores[i].username == usersNames[y]) {
        document.getElementById("totalXpEmoji").innerHTML = utilizadores[i].totalXpEmoji
        document.getElementById("totalConquistas").innerHTML = utilizadores[i].totalConquistas
        document.getElementById("emojiBar").innerHTML = utilizadores[i].emojiBarN + "%"
        var emojiBar = document.getElementById("emojiBar").innerHTML.toString()
        document.getElementById("emojiBar").style.width = emojiBar
        document.getElementById("metaEmoji").innerHTML = utilizadores[i].metaEmoji
        if (utilizadores[i].emojiBarN == 100) {
            overlayQuiz.classList.remove("show")
        } else {
            overlayQuiz.classList.add("show")
        }
    }
}

var totalXpEmojiVInt = parseInt(document.getElementById("totalXpEmoji").innerHTML)
var totalXpEmojiV = totalXpEmojiVInt
let modalDinheiro = document.getElementById("modalDinheiro")
modalDinheiro.onclick = function(event) {
    if (event.target == modalDinheiro) {
        modalDinheiro.classList.remove('show');
    }
}

/* EMOJI ("NAUSEAS") */
function cardNauseas() {
    if (document.getElementById("cardNauseas").style.fontSize == "60px") {
        modalInfoEmojiNauseas.classList.add("show")
    } else {
        modalObterEmojiNauseas.classList.add("show")
    }
}

function getcardNauseas() {
    totalXpEmojiVInt = parseInt(document.getElementById("totalXpEmoji").innerHTML)
    totalXpEmojiV = totalXpEmojiVInt
    if (totalXpEmojiV < 15) {
        modalDinheiro.classList.add("show")
    } else {
        var cardNauseasBKV = document.getElementById("cardNauseas").style.backgroundImage = "url(' ')"
        var cardNauseasFSV = document.getElementById("cardNauseas").style.fontSize = "60px"
        totalXpEmojiV -= 15
        for (var i = 0; i < utilizadores.length; i++) {
            if (utilizadores[i].username == usersNames[y]) {
                utilizadores[i].cardNauseasBK = cardNauseasBKV
                utilizadores[i].cardNauseasFS = cardNauseasFSV
                utilizadores[i].totalXpEmoji = totalXpEmojiV
                utilizadores[i].emojiBarN += 12.50
                if (utilizadores[i].emojiBarN >= 100) {
                    utilizadores[i].metaEmoji = 1
                    utilizadores[i].totalConquistas++;
                }
                localStorage.setItem("userList", JSON.stringify(utilizadores))
            }
        }

        for (var i = 0; i < utilizadores.length; i++) {
            if (utilizadores[i].username == usersNames[y]) {
                document.getElementById("totalXpEmoji").innerHTML = utilizadores[i].totalXpEmoji
                document.getElementById("emojiBar").innerHTML = utilizadores[i].emojiBarN + "%"
                var emojiBar = document.getElementById("emojiBar").innerHTML.toString()
                document.getElementById("emojiBar").style.width = emojiBar
                document.getElementById("metaEmoji").innerHTML = utilizadores[i].metaEmoji
                document.getElementById("totalConquistas").innerHTML = utilizadores[i].totalConquistas
                if (utilizadores[i].emojiBarN == 100) {
                    document.getElementById("xpD").innerHTML = ""
                    document.getElementById("totalXpEmoji").innerHTML = "Parabéns, colecionas-te todos os Emojis!"
                    document.getElementById("dd").innerHTML = ""
                    modalInfoEmojiGeral.classList.add("show")
                    overlayQuiz.classList.remove("show")
                }
            }
        }
    }
    modalObterEmojiNauseas.classList.remove("show")
}

/* EMOJI ("HOUSE") */
function cardHouse() {
    if (document.getElementById("cardHouse").style.fontSize == "60px") {
        modalInfoEmojiHouse.classList.add("show")
    } else {
        modalObterEmojiHouse.classList.add("show")
    }
}

function getcardHouse() {
    totalXpEmojiVInt = parseInt(document.getElementById("totalXpEmoji").innerHTML)
    totalXpEmojiV = totalXpEmojiVInt
    if (totalXpEmojiV < 15) {
        modalDinheiro.classList.add("show")
    } else {
        var cardHouseBKV = document.getElementById("cardHouse").style.backgroundImage = "url(' ')"
        var cardHouseFSV = document.getElementById("cardHouse").style.fontSize = "60px"
        totalXpEmojiV -= 15
        for (var i = 0; i < utilizadores.length; i++) {
            if (utilizadores[i].username == usersNames[y]) {
                utilizadores[i].cardHouseBK = cardHouseBKV
                utilizadores[i].cardHouseFS = cardHouseFSV
                utilizadores[i].totalXpEmoji = totalXpEmojiV
                utilizadores[i].emojiBarN += 12.50
                if (utilizadores[i].emojiBarN >= 100) {
                    utilizadores[i].metaEmoji = 1
                    utilizadores[i].totalConquistas++;
                }
                localStorage.setItem("userList", JSON.stringify(utilizadores))
            }
        }
        for (var i = 0; i < utilizadores.length; i++) {
            if (utilizadores[i].username == usersNames[y]) {
                document.getElementById("totalXpEmoji").innerHTML = utilizadores[i].totalXpEmoji
                document.getElementById("emojiBar").innerHTML = utilizadores[i].emojiBarN + "%"
                var emojiBar = document.getElementById("emojiBar").innerHTML.toString()
                document.getElementById("emojiBar").style.width = emojiBar
                document.getElementById("metaEmoji").innerHTML = utilizadores[i].metaEmoji
                document.getElementById("totalConquistas").innerHTML = utilizadores[i].totalConquistas
                if (utilizadores[i].emojiBarN == 100) {
                    document.getElementById("xpD").innerHTML = ""
                    document.getElementById("totalXpEmoji").innerHTML = "Parabéns, colecionas-te todos os Emojis!"
                    document.getElementById("dd").innerHTML = ""
                    modalInfoEmojiGeral.classList.add("show")
                    overlayQuiz.classList.remove("show")
                }
            }
        }
    }
    modalObterEmojiHouse.classList.remove("show")
}


/* EMOJI ("MICROBE") */
function cardMicrobe() {
    if (document.getElementById("cardMicrobe").style.fontSize == "60px") {
        modalInfoEmojiMicrobe.classList.add("show")
    } else {
        modalObterEmojiMicrobe.classList.add("show")
    }
}

function getcardMicrobe() {
    totalXpEmojiVInt = parseInt(document.getElementById("totalXpEmoji").innerHTML)
    totalXpEmojiV = totalXpEmojiVInt
    if (totalXpEmojiV < 15) {
        modalDinheiro.classList.add("show")
    } else {
        var cardMicrobeBKV = document.getElementById("cardMicrobe").style.backgroundImage = "url(' ')"
        var cardMicrobeFSV = document.getElementById("cardMicrobe").style.fontSize = "60px"
        totalXpEmojiV -= 15
        for (var i = 0; i < utilizadores.length; i++) {
            if (utilizadores[i].username == usersNames[y]) {
                utilizadores[i].cardMicrobeBK = cardMicrobeBKV
                utilizadores[i].cardMicrobeFS = cardMicrobeFSV
                utilizadores[i].totalXpEmoji = totalXpEmojiV
                utilizadores[i].emojiBarN += 12.50
                if (utilizadores[i].emojiBarN >= 100) {
                    utilizadores[i].metaEmoji = 1
                    utilizadores[i].totalConquistas++;
                }
                localStorage.setItem("userList", JSON.stringify(utilizadores))
            }
        }
        for (var i = 0; i < utilizadores.length; i++) {
            if (utilizadores[i].username == usersNames[y]) {
                document.getElementById("totalXpEmoji").innerHTML = utilizadores[i].totalXpEmoji
                document.getElementById("emojiBar").innerHTML = utilizadores[i].emojiBarN + "%"
                var emojiBar = document.getElementById("emojiBar").innerHTML.toString()
                document.getElementById("emojiBar").style.width = emojiBar
                document.getElementById("metaEmoji").innerHTML = utilizadores[i].metaEmoji
                document.getElementById("totalConquistas").innerHTML = utilizadores[i].totalConquistas
                if (utilizadores[i].emojiBarN == 100) {
                    document.getElementById("xpD").innerHTML = ""
                    document.getElementById("totalXpEmoji").innerHTML = "Parabéns, colecionas-te todos os Emojis!"
                    document.getElementById("dd").innerHTML = ""
                    modalInfoEmojiGeral.classList.add("show")
                    overlayQuiz.classList.remove("show")
                }
            }
        }
    }
    modalObterEmojiMicrobe.classList.remove("show")
}


/* EMOJI ("SNEEZING") */
function cardSneezing() {
    if (document.getElementById("cardSneezing").style.fontSize == "60px") {
        modalInfoEmojiSneezing.classList.add("show")
    } else {
        modalObterEmojiSneezing.classList.add("show")
    }
}

function getcardSneezing() {
    totalXpEmojiVInt = parseInt(document.getElementById("totalXpEmoji").innerHTML)
    totalXpEmojiV = totalXpEmojiVInt
    if (totalXpEmojiV < 15) {
        modalDinheiro.classList.add("show")
    } else {
        var cardSneezingBKV = document.getElementById("cardSneezing").style.backgroundImage = "url(' ')"
        var cardSneezingFSV = document.getElementById("cardSneezing").style.fontSize = "60px"
        totalXpEmojiV -= 15
        for (var i = 0; i < utilizadores.length; i++) {
            if (utilizadores[i].username == usersNames[y]) {
                utilizadores[i].cardSneezingBK = cardSneezingBKV
                utilizadores[i].cardSneezingFS = cardSneezingFSV
                utilizadores[i].totalXpEmoji = totalXpEmojiV
                utilizadores[i].emojiBarN += 12.50
                if (utilizadores[i].emojiBarN >= 100) {
                    utilizadores[i].metaEmoji = 1
                    utilizadores[i].totalConquistas++;
                }
                localStorage.setItem("userList", JSON.stringify(utilizadores))
            }
        }
        for (var i = 0; i < utilizadores.length; i++) {
            if (utilizadores[i].username == usersNames[y]) {
                document.getElementById("totalXpEmoji").innerHTML = utilizadores[i].totalXpEmoji
                document.getElementById("emojiBar").innerHTML = utilizadores[i].emojiBarN + "%"
                var emojiBar = document.getElementById("emojiBar").innerHTML.toString()
                document.getElementById("emojiBar").style.width = emojiBar
                document.getElementById("metaEmoji").innerHTML = utilizadores[i].metaEmoji
                document.getElementById("totalConquistas").innerHTML = utilizadores[i].totalConquistas
                if (utilizadores[i].emojiBarN == 100) {
                    document.getElementById("xpD").innerHTML = ""
                    document.getElementById("totalXpEmoji").innerHTML = "Parabéns, colecionas-te todos os Emojis!"
                    document.getElementById("dd").innerHTML = ""
                    modalInfoEmojiGeral.classList.add("show")
                    overlayQuiz.classList.remove("show")
                }
            }
        }
    }
    modalObterEmojiSneezing.classList.remove("show")
}

/* EMOJI ("MASK") */
function cardMask() {
    if (document.getElementById("cardMask").style.fontSize == "60px") {
        modalInfoEmojiMask.classList.add("show")
    } else {
        modalObterEmojiMask.classList.add("show")
    }
}

function getcardMask() {
    totalXpEmojiVInt = parseInt(document.getElementById("totalXpEmoji").innerHTML)
    totalXpEmojiV = totalXpEmojiVInt
    if (totalXpEmojiV < 15) {
        modalDinheiro.classList.add("show")
    } else {
        var cardMaskBKV = document.getElementById("cardMask").style.backgroundImage = "url(' ')"
        var cardMaskFSV = document.getElementById("cardMask").style.fontSize = "60px"
        totalXpEmojiV -= 15
        for (var i = 0; i < utilizadores.length; i++) {
            if (utilizadores[i].username == usersNames[y]) {
                utilizadores[i].cardMaskBK = cardMaskBKV
                utilizadores[i].cardMaskFS = cardMaskFSV
                utilizadores[i].totalXpEmoji = totalXpEmojiV
                utilizadores[i].emojiBarN += 12.50
                if (utilizadores[i].emojiBarN >= 100) {
                    utilizadores[i].metaEmoji = 1
                    utilizadores[i].totalConquistas++;
                }
                localStorage.setItem("userList", JSON.stringify(utilizadores))
            }
        }
        for (var i = 0; i < utilizadores.length; i++) {
            if (utilizadores[i].username == usersNames[y]) {
                document.getElementById("totalXpEmoji").innerHTML = utilizadores[i].totalXpEmoji
                document.getElementById("emojiBar").innerHTML = utilizadores[i].emojiBarN + "%"
                var emojiBar = document.getElementById("emojiBar").innerHTML.toString()
                document.getElementById("emojiBar").style.width = emojiBar
                document.getElementById("metaEmoji").innerHTML = utilizadores[i].metaEmoji
                if (utilizadores[i].emojiBarN == 100) {
                    document.getElementById("xpD").innerHTML = ""
                    document.getElementById("totalXpEmoji").innerHTML = "Parabéns, colecionas-te todos os Emojis!"
                    document.getElementById("dd").innerHTML = ""
                    modalInfoEmojiGeral.classList.add("show")
                    overlayQuiz.classList.remove("show")
                }
            }
        }
    }
    modalObterEmojiMask.classList.remove("show")
}

/* EMOJI ("SAOP") */
function cardSaop() {
    if (document.getElementById("cardSaop").style.fontSize == "60px") {
        modalInfoEmojiSaop.classList.add("show")
    } else {
        modalObterEmojiSaop.classList.add("show")
    }
}

function getcardSaop() {
    totalXpEmojiVInt = parseInt(document.getElementById("totalXpEmoji").innerHTML)
    totalXpEmojiV = totalXpEmojiVInt
    if (totalXpEmojiV < 15) {
        modalDinheiro.classList.add("show")
    } else {
        var cardSaopBKV = document.getElementById("cardSaop").style.backgroundImage = "url(' ')"
        var cardSaopFSV = document.getElementById("cardSaop").style.fontSize = "60px"
        totalXpEmojiV -= 15
        for (var i = 0; i < utilizadores.length; i++) {
            if (utilizadores[i].username == usersNames[y]) {
                utilizadores[i].cardSaopBK = cardSaopBKV
                utilizadores[i].cardSaopFS = cardSaopFSV
                utilizadores[i].totalXpEmoji = totalXpEmojiV
                utilizadores[i].emojiBarN += 12.50
                if (utilizadores[i].emojiBarN >= 100) {
                    utilizadores[i].metaEmoji = 1
                    utilizadores[i].totalConquistas++;
                }
                localStorage.setItem("userList", JSON.stringify(utilizadores))
            }
        }
        for (var i = 0; i < utilizadores.length; i++) {
            if (utilizadores[i].username == usersNames[y]) {
                document.getElementById("totalXpEmoji").innerHTML = utilizadores[i].totalXpEmoji
                document.getElementById("emojiBar").innerHTML = utilizadores[i].emojiBarN + "%"
                var emojiBar = document.getElementById("emojiBar").innerHTML.toString()
                document.getElementById("emojiBar").style.width = emojiBar
                document.getElementById("metaEmoji").innerHTML = utilizadores[i].metaEmoji
                document.getElementById("totalConquistas").innerHTML = utilizadores[i].totalConquistas
                if (utilizadores[i].emojiBarN == 100) {
                    document.getElementById("xpD").innerHTML = ""
                    document.getElementById("totalXpEmoji").innerHTML = "Parabéns, colecionas-te todos os Emojis!"
                    document.getElementById("dd").innerHTML = ""
                    modalInfoEmojiGeral.classList.add("show")
                    overlayQuiz.classList.remove("show")
                }
            }
        }
    }
    modalObterEmojiSaop.classList.remove("show")
}

/* EMOJI ("SYRING") */
function cardSyring() {
    if (document.getElementById("cardSyring").style.fontSize == "60px") {
        modalInfoEmojiSyring.classList.add("show")
    } else {
        modalObterEmojiSyring.classList.add("show")
    }
}

function getcardSyring() {
    totalXpEmojiVInt = parseInt(document.getElementById("totalXpEmoji").innerHTML)
    totalXpEmojiV = totalXpEmojiVInt
    if (totalXpEmojiV < 15) {
        modalDinheiro.classList.add("show")
    } else {
        var cardSyringBKV = document.getElementById("cardSyring").style.backgroundImage = "url(' ')"
        var cardSyringFSV = document.getElementById("cardSyring").style.fontSize = "60px"
        totalXpEmojiV -= 15
        for (var i = 0; i < utilizadores.length; i++) {
            if (utilizadores[i].username == usersNames[y]) {
                utilizadores[i].cardSyringBK = cardSyringBKV
                utilizadores[i].cardSyringFS = cardSyringFSV
                utilizadores[i].totalXpEmoji = totalXpEmojiV
                utilizadores[i].emojiBarN += 12.50
                if (utilizadores[i].emojiBarN >= 100) {
                    utilizadores[i].metaEmoji = 1
                    utilizadores[i].totalConquistas++;
                }
                localStorage.setItem("userList", JSON.stringify(utilizadores))
            }
        }
        for (var i = 0; i < utilizadores.length; i++) {
            if (utilizadores[i].username == usersNames[y]) {
                document.getElementById("totalXpEmoji").innerHTML = utilizadores[i].totalXpEmoji
                document.getElementById("emojiBar").innerHTML = utilizadores[i].emojiBarN + "%"
                var emojiBar = document.getElementById("emojiBar").innerHTML.toString()
                document.getElementById("emojiBar").style.width = emojiBar
                document.getElementById("metaEmoji").innerHTML = utilizadores[i].metaEmoji
                document.getElementById("totalConquistas").innerHTML = utilizadores[i].totalConquistas
                if (utilizadores[i].emojiBarN == 100) {
                    document.getElementById("xpD").innerHTML = ""
                    document.getElementById("totalXpEmoji").innerHTML = "Parabéns, colecionas-te todos os Emojis!"
                    document.getElementById("dd").innerHTML = ""
                    modalInfoEmojiGeral.classList.add("show")
                    overlayQuiz.classList.remove("show")
                }
            }
        }
    }
    modalObterEmojiSyring.classList.remove("show")
}

/* EMOJI ("AMBULANCIA") */
function cardAmbulancia() {
    if (document.getElementById("cardAmbulancia").style.fontSize == "60px") {
        modalInfoEmojiAmbulancia.classList.add("show")
    } else {
        modalObterEmojiAmbulancia.classList.add("show")
    }
}

function getcardAmbulancia() {
    totalXpEmojiVInt = parseInt(document.getElementById("totalXpEmoji").innerHTML)
    totalXpEmojiV = totalXpEmojiVInt
    if (totalXpEmojiV < 15) {
        modalDinheiro.classList.add("show")
    } else {
        var cardAmbulanciaBKV = document.getElementById("cardAmbulancia").style.backgroundImage = "url(' ')"
        var cardAmbulanciaFSV = document.getElementById("cardAmbulancia").style.fontSize = "60px"
        totalXpEmojiV -= 15
        for (var i = 0; i < utilizadores.length; i++) {
            if (utilizadores[i].username == usersNames[y]) {
                utilizadores[i].cardAmbulanciaBK = cardAmbulanciaBKV
                utilizadores[i].cardAmbulanciaFS = cardAmbulanciaFSV
                utilizadores[i].totalXpEmoji = totalXpEmojiV
                utilizadores[i].emojiBarN += 12.50
                if (utilizadores[i].emojiBarN >= 100) {
                    utilizadores[i].metaEmoji = 1
                    utilizadores[i].totalConquistas++;
                }
                localStorage.setItem("userList", JSON.stringify(utilizadores))
            }
        }
        for (var i = 0; i < utilizadores.length; i++) {
            if (utilizadores[i].username == usersNames[y]) {
                document.getElementById("totalXpEmoji").innerHTML = utilizadores[i].totalXpEmoji
                document.getElementById("emojiBar").innerHTML = utilizadores[i].emojiBarN + "%"
                var emojiBar = document.getElementById("emojiBar").innerHTML.toString()
                document.getElementById("emojiBar").style.width = emojiBar
                document.getElementById("metaEmoji").innerHTML = utilizadores[i].metaEmoji
                document.getElementById("totalConquistas").innerHTML = utilizadores[i].totalConquistas
                if (utilizadores[i].emojiBarN == 100) {
                    document.getElementById("xpD").innerHTML = ""
                    document.getElementById("totalXpEmoji").innerHTML = "Parabéns, colecionas-te todos os Emojis!"
                    document.getElementById("dd").innerHTML = ""
                    modalInfoEmojiGeral.classList.add("show")
                    overlayQuiz.classList.remove("show")
                }
            }
        }
    }
    modalObterEmojiAmbulancia.classList.remove("show")
}

/* IMPRIME OS VALORES DOS EMOJIS GUARDADOS */
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
/* BOTAO PARA FECHAR O MODAL DE COMPRAR O EMOJI ("NAUSEAS") */
function fecharNauseas() {
    modalObterEmojiNauseas.classList.remove("show")
}
/* BOTAO PARA FECHAR O MODAL DE COMPRAR O EMOJI ("HOUSE") */
function fecharHouse() {
    modalObterEmojiHouse.classList.remove("show")
}
/* BOTAO PARA FECHAR O MODAL DE COMPRAR O EMOJI ("MICROBE") */
function fecharMicrobe() {
    modalObterEmojiMicrobe.classList.remove("show")
}
/* BOTAO PARA FECHAR O MODAL DE COMPRAR O EMOJI ("SNEEZING") */
function fecharSneezing() {
    modalObterEmojiSneezing.classList.remove("show")
}
/* BOTAO PARA FECHAR O MODAL DE COMPRAR O EMOJI ("MASK") */
function fecharMask() {
    modalObterEmojiMask.classList.remove("show")
}
/* BOTAO PARA FECHAR O MODAL DE COMPRAR O EMOJI ("SAOP") */
function fecharSaop() {
    modalObterEmojiSaop.classList.remove("show")
}
/* BOTAO PARA FECHAR O MODAL DE COMPRAR O EMOJI ("SYRING") */
function fecharSyring() {
    modalObterEmojiSyring.classList.remove("show")
}
/* BOTAO PARA FECHAR O MODAL DE COMPRAR O EMOJI ("AMBULANCIA") */
function fecharAmbulancia() {
    modalObterEmojiAmbulancia.classList.remove("show")
}

function fecharModalDinheiro() {
    modalDinheiro.classList.remove("show")
}

const answersTrackerContainer = document.querySelector(".answers-tracker")
const options = document.querySelector(".options").children
const questionNumberSpan = document.querySelector(".question-num-value")
const question = document.querySelector(".question")
const totalQuestionsSpan = document.querySelector(".total-questions")
const correctAnswersSpan = document.querySelector(".correct-answers")
const totalQuestionsSpan2 = document.querySelector(".total-questions2")
const percentageSpan = document.querySelector(".percentage")

let currentIndex;
let index = 0;
let answeredQuestions = []; // array of anwered question indexes
let score = 0;

const opt1 = document.querySelector(".option1")
const opt2 = document.querySelector(".option2")
const opt3 = document.querySelector(".option3")
const opt4 = document.querySelector(".option4")

const questions = [{
        q: 'Deves partilhar os teus objetos com os teus amigos?',
        options: ['Sim, sem desinfetar antes', 'Não, mesmo que estejam desinfetados', 'Sim, se desinfetar antes', 'Não'],
        answer: 2
    },
    {
        q: 'Náuseas ou vómitos é um sintoma...',
        options: ['Grave', 'Ligeiro', 'Grave ao ponto de ir para o hospital', 'Não é sintoma Covid19'],
        answer: 1
    },
    {
        q: 'Qual é a importância de usar máscara?',
        options: ['Não transmite o vírus pela saliva', 'Não serve para nada', 'Serve para conter o mau hálito', 'Para evitar cheirar os maus odores'],
        answer: 0
    },
    {
        q: 'Devo lavar as mãos...',
        options: ['antes de meter a máscara', 'depois de tirar a máscara', 'nunca', 'antes e depois de mexer na máscara'],
        answer: 3
    },
    {
        q: 'Se sentir algum sintomo devo...',
        options: ['ficar em casa', 'ir para o hospital', 'fingir que não tenho nada', 'ir para casa de amigos'],
        answer: 0
    }

]

totalQuestionsSpan.innerHTML = questions.length

function load() {
    questionNumberSpan.innerHTML = index + 1
    question.innerHTML = questions[currentIndex].q;
    opt1.innerHTML = questions[currentIndex].options[0]
    opt2.innerHTML = questions[currentIndex].options[1]
    opt3.innerHTML = questions[currentIndex].options[2]
    opt4.innerHTML = questions[currentIndex].options[3]
    index++
}


//Check if selected answer is correct or wrong
function check(element) {
    if (element.id == questions[currentIndex].answer) {
        element.className = "correct"
        updateAnswersTracker("correct")
        score++
    } else {
        element.className = "wrong"
        updateAnswersTracker("wrong")
    }
    disableClick();
}

let modalResponderQuiz = document.getElementById("modalResponderQuiz")

//Make sure the user selected an item before clicking on the Next button
function validate() {
    if (!options[0].classList.contains("disabled")) {
        modalResponderQuiz.classList.add("show")
    } else {
        randomQuestion();
        enableClick();
    }
}

modalResponderQuiz.onclick = function(event) {
    if (event.target == modalResponderQuiz) {
        modalResponderQuiz.classList.remove('show');
    }
}


//Listener function for click event on Next button
function next() {
    validate();
}

//Function to disable click for the options
function disableClick() {
    for (let i = 0; i < options.length; i++) {
        options[i].classList.add("disabled")

        if (options[i].id == questions[currentIndex].answer) {
            options[i].classList.add('correct');
        }
    }
}

//Function to reanable click in the options
function enableClick() {
    for (let i = 0; i < options.length; i++) {
        options[i].classList.remove("disabled", "correct", "wrong")

    }
}

//Function to select a random question
function randomQuestion() {
    let randomNumber = Math.floor(Math.random() * questions.length);
    if (index == questions.length) {
        quizOver();
    } else {
        if (answeredQuestions.length > 0) {
            if (answeredQuestions.includes(randomNumber)) {
                randomQuestion();
            } else {
                currentIndex = randomNumber;
                load();
            }
        }
        if (answeredQuestions.length == 0) {
            currentIndex = randomNumber
            load()
        }
        //add the question to list of anwered questions
        answeredQuestions.push(randomNumber)
    }
}

//Set up answers tracker elements
function answersTracker() {
    for (let i = 0; i < questions.length; i++) {
        const div = document.createElement("div")
        answersTrackerContainer.appendChild(div);
    }
}

//Update the answers tracker elements
function updateAnswersTracker(newClass) {
    answersTrackerContainer.children[index - 1].classList.add(newClass)
}

//Displays the quiz-over page if quiz is over
function quizOver() {
    document.querySelector(".quiz-overQuiz").classList.add("showQuiz")
    correctAnswersSpan.innerHTML = score;
    totalQuestionsSpan2.innerHTML = questions.length
    percentageSpan.innerHTML = Math.round((score / questions.length) * 100) + "%"
}

function quizNovamente() {
    window.location.reload();
}