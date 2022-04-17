function init() {
    let x = document.querySelector("div");
    x.onclick = changeColor;
}

function changeColor() {
    this.style.color = "red";
}
window.onload = init;