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