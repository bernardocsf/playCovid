var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var btnclose = document.getElementById("close");


btn.onclick = function() {
    modal.style.display = "block";
}

btnclose.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}