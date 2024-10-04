var modal = document.getElementById('modal');
var btn = document.getElementById("btnNBR");
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


let modalPreencher = document.getElementById("modalPreencher")
modalPreencher.onclick = function(event) {
    if (event.target == modalPreencher) {
        modalPreencher.classList.remove('show');
    }
}

let modalUserExiste = document.getElementById("modalUserExiste")
modalUserExiste.onclick = function(event) {
    if (event.target == modalUserExiste) {
        modalUserExiste.classList.remove('show');
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

function login() {
    let iniciarUtilizador = document.getElementById("iniciarUtilizador").value
    let iniciarPassword = document.getElementById("iniciarPassword").value

    for (var i = 0; i < utilizadores.length; i++) {
        if (utilizadores[i].username == iniciarUtilizador &&
            utilizadores[i].password == iniciarPassword) {
            contaRegistada = true
            break
        }
    }
    if (iniciarUtilizador == "") {
        return false
    }
    if (iniciarPassword == "") {
        return false
    }
    if (contaRegistada == true || iniciarUtilizador == "admin") {
        if (iniciarUtilizador == "admin") {
            document.getElementById("formis").onsubmit = function() {
                window.location.replace("admin.html")
                return false
            }
        } else {
            let usernameIniciou = document.getElementById("iniciarUtilizador").value
            usersNames.push(usernameIniciou)
            localStorage.setItem("usernameList", JSON.stringify(usersNames))
            document.getElementById("formis").onsubmit = function() {
                window.location.replace("utilizador.html")
                return false
            }
        }
    } else {
        alert("Dados errados")
    }
    if (iniciarUtilizador == "admin" && iniciarPassword == "admin") {
        localStorage.setItem("usernameList", JSON.stringify(usersNames))
        document.getElementById("formis").onsubmit = function() {
            window.location.replace("admin.html")
            return false
        }
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
        document.getElementById("registarForm").onsubmit = function() {
            window.location.replace("index.html")
            return false
        }
    } else {
        modalUserExiste.classList.add("show")
        return false
    }
}