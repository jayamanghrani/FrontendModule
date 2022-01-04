const x = document.getElementById("mytext");
x.onkeypress = (e) => {
    if (e.charCode < 48 || e.charCode > 57) {
        alert("Please input digits only");
        return false;
    }
};