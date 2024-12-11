document.addEventListener("DOMContentLoaded", () => {
  const openModalButton = document.getElementById("openModalButton");
  const closeModalButton = document.getElementById("closeModalButton");
  const modal = document.getElementById("modal");

  openModalButton.addEventListener("click", () => {
    modal.setAttribute("aria-hidden", "false");
  });

  closeModalButton.addEventListener("click", () => {
    modal.setAttribute("aria-hidden", "true");
  });

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.setAttribute("aria-hidden", "true");
    }
  });
});

document.getElementById("registarUserName").addEventListener("input", function () {
    this.value = this.value.toLowerCase();
  });

document.getElementById("userNameLogin").addEventListener("input", function () {
  this.value = this.value.toLowerCase();
});

let fotoPerfilUpload = "";

function handleFotoPerfil(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      fotoPerfilUpload = e.target.result;
      document.getElementById("mostrarFoto").src = fotoPerfilUpload;
    };
    reader.readAsDataURL(file);
  }
}

class User {
  constructor(fotoPerfil, userName, nome, email, data, genero, password) {
    this.fotoPerfil = fotoPerfil;
    this.userName = userName;
    this.nome = nome;
    this.email = email;
    this.data = data;
    this.genero = genero;
    this.password = password;
  }
}

const utilizadores = JSON.parse(localStorage.getItem("userList")) || [];

function registar(event) {
  event.preventDefault();

  const registarUserName = document.getElementById("registarUserName").value;
  const registarNome = document.getElementById("registarNome").value;
  const registarEmail = document.getElementById("registarEmail").value;
  const registarData = document.getElementById("registarData").value;
  const genderInput = document.querySelector('input[name="gender"]:checked');
  const registarGenero = genderInput ? genderInput.value : "";
  const registarPassword = document.getElementById("registarPassword").value;
  const registarPasswordConf = document.getElementById("registarPasswordConf").value;

  if (registarPassword !== registarPasswordConf) {
    alert("As palavras-passe não coincidem!");
    return;
  }

  const userNames = utilizadores.map((user) => user.userName);

  if (userNames.includes(registarUserName)) {
    alert("Nome do utilizador já existe!");
    return;
  }

  const utilizador = new User(
    fotoPerfilUpload,
    registarUserName,
    registarNome,
    registarEmail,
    registarData,
    registarGenero,
    registarPassword
  );

  utilizadores.push(utilizador);
  localStorage.setItem("userList", JSON.stringify(utilizadores));

  document.getElementById("registarForm").reset();
  fotoPerfilUpload = "";
}

function login(event) {
  event.preventDefault();

  const userNameLogin = document.getElementById("userNameLogin").value;
  const passwordLogin = document.getElementById("passwordLogin").value;

  const utilizador = utilizadores.find((user) => user.userName === userNameLogin);

  if (!utilizador) {
    alert("Utilzador não encontrado!");
    return;
  } 

  if (utilizador.password !== passwordLogin) {
    alert("Palavra-passe incorreta!");
    return;
  }

  window.location.href = "utilizador.html";
}
