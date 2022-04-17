let x = document.getElementById("mytext1");
x.onkeypress = (e) => {
    alert("char code is :" + e.charCode);
    alert("key code is :" + e.keyCode);
    alert("key is:" + e.key);
};
let y = document.getElementById("mytext2");
y.onkeydown = (e) => {
    alert("char code is :" + e.charCode);
    alert("key code is :" + e.keyCode);
    alert("key is:" + e.key);
};