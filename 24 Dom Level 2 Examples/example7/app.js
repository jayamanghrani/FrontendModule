let x = document.getElementById("mytext");
x.onkeydown = (e) => {
    alert("you pressed the key " + e.keyCode);
};