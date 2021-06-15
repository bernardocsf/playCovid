var modal = document.getElementById('modal');
var btn = document.getElementById("btnNavRegistate");
var span = document.getElementsByClassName("close")[0];
btn.onclick = function() {
    modal.classList.add('show');
}
span.onclick = function() {
    modal.classList.remove('show');
}
window.onclick = function(event) {
    if (event.target == modal) {
        modal.classList.remove('show');
    }
}

function registarFotoPerfil() {
    const preview = document.getElementById('registarFoto');
    const file = document.querySelector('input[type=file]').files[0];
    const reader = new FileReader();
    reader.addEventListener("load", function() {
        preview.src = reader.result;
    }, false);
    if (file) {
        reader.readAsDataURL(file);
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
let contaRegistada = false
class userName {
    constructor(username) {
        this.username = username
    }
}
class User {
    constructor(username, name, email, data, genero, password, passwordConf, fotoperfil) {
        this.username = username
        this.name = name
        this.email = email
        this.data = data
        this.genero = genero
        this.password = password
        this.passwordConf = passwordConf
        this.fotoperfil = fotoperfil
    }
}

let modalUserExiste = document.getElementById("modalUserExiste")
modalUserExiste.onclick = function(event) {
    if (event.target == modalUserExiste) {
        modalUserExiste.classList.remove('show');
    }
}

let modalPreencher = document.getElementById("modalPreencher")
modalPreencher.onclick = function(event) {
    if (event.target == modalPreencher) {
        modalPreencher.classList.remove('show');
    }
}

let modalPassDif = document.getElementById("modalPassDif")
modalPassDif.onclick = function(event) {
    if (event.target == modalPassDif) {
        modalPassDif.classList.remove('show');
    }
}

let modalPassCurta = document.getElementById("modalPassCurta")
modalPassCurta.onclick = function(event) {
    if (event.target == modalPassCurta) {
        modalPassCurta.classList.remove('show');
    }
}

function registar() {
    let registarUtilizador = document.getElementById("registarUtilizador").value
    let registarNome = document.getElementById("registarNome").value
    let registarEmail = document.getElementById("registarEmail").value
    let registarData = document.getElementById("registarData").value
    let registarGenero = ""
    if (document.getElementById("registarMasculino").checked == true) {
        registarGenero = "Masculino"
    } else {
        registarGenero = "Feminino"
    }
    let registarPassword = document.getElementById("registarPassword").value
    let registarPasswordConf = document.getElementById("registarPasswordConf").value
    let registarPerfil = document.getElementById("registarFoto").src
    for (var i = 0; i < utilizadores.length; i++) {
        if (utilizadores[i].username == registarUtilizador) {
            contaRegistada = true
            break
        }
        if (registarUtilizador == "" || registarNome == "" || registarEmail == "" || registarPassword == "" || registarPasswordConf == "") {
            modalPreencher.classList.add("show")
            return false;
        }
        if (registarPassword != registarPasswordConf) {
            modalPassDif.classList.add("show")
            return false
        }
        if (registarPassword.length < 4 && registarPasswordConf.length < 4) {
            modalPassCurta.classList.add("show")
            return false
        }
    }
    if (contaRegistada == false) {
        const utilizador = new User(registarUtilizador, registarNome, registarEmail, registarData, registarGenero, registarPassword, registarPasswordConf, registarPerfil)
        utilizadores.push(utilizador)
        localStorage.setItem("userList", JSON.stringify(utilizadores))
        window.location.reload()
    } else {
        modalUserExiste.classList.add("show")
        return false
    }
}


let linha = 0;
var table = document.getElementById("tabela");
let j = 0;
for (var i = utilizadores.length - 1; i >= 0; i--) {
    if (j % 3 == 0) {
        j = 0;
        var row = table.insertRow(linha);
        linha++;
    }

    j++;

    let foto = utilizadores[i].fotoperfil;
    let nome = utilizadores[i].name;
    let email = utilizadores[i].email;
    let tempoJogado = utilizadores[i].tempoJogado;
    let totalConquistas = utilizadores[i].totalConquistas;
    let username = utilizadores[i].username;

    var cell = row.insertCell(-1);
    cell.innerHTML =
        '<div class="flip-card">' +
        '<div class="flip-card-inner">' +
        '<div class="flip-card-front">' +
        "<img src=" +
        foto +
        ' class="imgProfil">' +
        '</div>' +
        '<div class="flip-card-back">' +
        '<br>' +
        '<h2 class="nome" id="nome">' +
        nome +
        "</h2>" +
        '<p id="email">' +
        email +
        "</p>" +
        '<div>Tempo Jogado: <strong id="tempoJogado">' +
        tempoJogado +
        "</strong>" +
        "<p>" +
        'Conquistas: <strong id="totalConquistas">' +
        totalConquistas +
        "</strong>" +
        "<p>" +
        "</div>" +
        '<button type="submit" value="Remover" class="btnApagarPerfil" onclick="remover(\'' + username +
        '\'), window.location.reload()">Apagar</button>' +
        "</div>" +
        "</div>" +
        "</div>";
}

function remover(nome) {
    for (var i = 0; i < utilizadores.length; i++) {
        if (utilizadores[i].username == nome) {
            utilizadores.splice(i, 1)
            localStorage.setItem("userList", JSON.stringify(utilizadores))
            break;
        }
    }
}

if (utilizadores.length == 1) {
    document.getElementById("nUtilizadores").innerHTML = utilizadores.length + " utilizador registado"
} else {
    document.getElementById("nUtilizadores").innerHTML = utilizadores.length + " utilizadores registados"
}