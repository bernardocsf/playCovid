var modal = document.getElementById("modal");
var btn = document.getElementById("btnNBR");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
  modal.classList.add("show");
};
span.onclick = function () {
  modal.classList.remove("show");
};
window.onclick = function (event) {
  if (event.target == modal) {
    modal.classList.remove("show");
  }
};

function registarFotoPerfil() {
  const preview = document.getElementById("registarFoto");
  const file = document.querySelector("input[type=file]").files[0];
  const reader = new FileReader();

  reader.addEventListener(
    "load",
    function () {
      preview.src = reader.result;
    },
    false
  );

  if (file) {
    reader.readAsDataURL(file);
  }
}

let usersNames = [];
if (localStorage.getItem("usernameList")) {
  usersNames = JSON.parse(localStorage.getItem("usernameList"));
}

let utilizadores = [];
if (localStorage.getItem("userList")) {
  utilizadores = JSON.parse(localStorage.getItem("userList"));
}

let contaRegistada = false;

class userName {
  constructor(username) {
    this.username = username;
  }
}

let modalPreencher = document.getElementById("modalPreencher");
modalPreencher.onclick = function (event) {
  if (event.target == modalPreencher) {
    modalPreencher.classList.remove("show");
  }
};

let modalUserExiste = document.getElementById("modalUserExiste");
modalUserExiste.onclick = function (event) {
  if (event.target == modalUserExiste) {
    modalUserExiste.classList.remove("show");
  }
};

let modalPassDif = document.getElementById("modalPassDif");
modalPassDif.onclick = function (event) {
  if (event.target == modalPassDif) {
    modalPassDif.classList.remove("show");
  }
};

let modalPassCurta = document.getElementById("modalPassCurta");
modalPassCurta.onclick = function (event) {
  if (event.target == modalPassCurta) {
    modalPassCurta.classList.remove("show");
  }
};

function login() {
  let iniciarUtilizador = document.getElementById("iniciarUtilizador").value;
  let iniciarPassword = document.getElementById("iniciarPassword").value;

  for (var i = 0; i < utilizadores.length; i++) {
    if (
      utilizadores[i].username == iniciarUtilizador &&
      utilizadores[i].password == iniciarPassword
    ) {
      contaRegistada = true;
      break;
    }
  }
  if (iniciarUtilizador == "") {
    return false;
  }
  if (iniciarPassword == "") {
    return false;
  }
  if (contaRegistada == true || iniciarUtilizador == "admin") {
    if (iniciarUtilizador == "admin") {
      document.getElementById("formis").onsubmit = function () {
        window.location.replace("admin.html");
        return false;
      };
    } else {
      let usernameIniciou = document.getElementById("iniciarUtilizador").value;
      usersNames.push(usernameIniciou);
      localStorage.setItem("usernameList", JSON.stringify(usersNames));
      document.getElementById("formis").onsubmit = function () {
        window.location.replace("utilizador.html");
        return false;
      };
    }
  } else {
    alert("Dados errados");
  }
  if (iniciarUtilizador == "admin" && iniciarPassword == "admin") {
    localStorage.setItem("usernameList", JSON.stringify(usersNames));
    document.getElementById("formis").onsubmit = function () {
      window.location.replace("admin.html");
      return false;
    };
  }
}

class User {
  constructor(
    username,
    name,
    email,
    data,
    genero,
    password,
    passwordConf,
    fotoperfil
  ) {
    this.username = username;
    this.name = name;
    this.email = email;
    this.data = data;
    this.genero = genero;
    this.password = password;
    this.passwordConf = passwordConf;
    this.fotoperfil = fotoperfil;
  }
}

function registar() {
  // Obtém os valores dos campos de entrada do formulário
  let registarUtilizador = document.getElementById("registarUtilizador").value;
  let registarNome = document.getElementById("registarNome").value;
  let registarEmail = document.getElementById("registarEmail").value;
  let registarData = document.getElementById("registarData").value;
  let registarGenero = "";

  // Verifica se o botão de gênero masculino está selecionado
  if (document.getElementById("registarMasculino").checked == true) {
    registarGenero = "Masculino"; // Gênero masculino
  } else {
    registarGenero = "Feminino"; // Gênero feminino
  }

  // Obtém os valores das senhas do utilizador
  let registarPassword = document.getElementById("registarPassword").value;
  let registarPasswordConf = document.getElementById(
    "registarPasswordConf"
  ).value;
  let registarPerfil = document.getElementById("registarFoto").src;

  // Verifica se o nome de utilizador já existe na lista de utilizadores
  for (var i = 0; i < utilizadores.length; i++) {
    if (utilizadores[i].username == registarUtilizador) {
      contaRegistada = true; // Nome de utilizador já registrado
      break; // Sai do loop, pois já encontramos um utilizador com o mesmo nome
    }
  }

  // Valida se os campos obrigatórios estão preenchidos
  if (
    registarUtilizador == "" ||
    registarNome == "" ||
    registarEmail == "" ||
    registarPassword == "" ||
    registarPasswordConf == ""
  ) {
    modalPreencher.classList.add("show"); // Mostra o modal se algum campo obrigatório estiver vazio
    return false; // Interrompe a execução da função
  }

  // Valida se o nome de utilizador já existe
  if (contaRegistada) {
    modalUserExiste.classList.add("show"); // Mostra o modal informando que o nome de utilizador já está em uso
    return false; // Interrompe a execução da função
  }

  // Valida se as senhas são diferentes
  if (registarPassword != registarPasswordConf) {
    modalPassDif.classList.add("show"); // Mostra o modal se as senhas não coincidirem
    return false; // Interrompe a execução da função
  }

  // Valida se as senhas são muito curtas
  if (registarPassword.length < 4 && registarPasswordConf.length < 4) {
    modalPassCurta.classList.add("show"); // Mostra o modal se a senha for muito curta
    return false; // Interrompe a execução da função
  }

  // Se o nome de utilizador não estiver registrado, cria um novo utilizador
  const utilizador = new User(
    registarUtilizador,
    registarNome,
    registarEmail,
    registarData,
    registarGenero,
    registarPassword,
    registarPasswordConf,
    registarPerfil
  );

  // Adiciona o novo utilizador à lista de utilizadors
  utilizadores.push(utilizador);

  // Armazena a lista atualizada de utilizadors no localStorage
  localStorage.setItem("userList", JSON.stringify(utilizadores));

  // Atualiza a página para refletir o registro
  window.location.reload();

  // Redireciona para a página inicial após o registro bem-sucedido
  document.getElementById("registarForm").onsubmit = function () {
    window.location.replace("index.html");
    return false; // Impede o envio padrão do formulário
  };
}
