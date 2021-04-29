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


function previewFile() {
    const preview = document.querySelector('img');
    const file = document.querySelector('input[type=file]').files[0];
    const reader = new FileReader();

    reader.addEventListener("load", function() {
        preview.src = reader.result;
    }, false);

    if (file) {
        reader.readAsDataURL(file);
    }
}