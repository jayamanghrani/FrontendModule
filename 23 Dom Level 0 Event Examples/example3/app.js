let x = document.getElementById("mydiv");
x.onmouseover = () => {
    x.style.color = "red";
    x.style.fontWeight = "bold";
}
x.onmouseout = () => {
    x.style.color = "black";
    x.style.fontWeight = "normal";
}