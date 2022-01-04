const myform = document.frmlogin;
const txtusername = myform.txtuser;
const txtpassword = myform.txtpwd;
const spnunameerror = document.getElementById("unameerror");
const spnpwderror = document.getElementById("pwderror");
let user = txtusername.value;
let pwd = txtpassword.value;

function setErrorMessage(textbox, span) {
    span.style.color = "crimson";
    textbox.setAttribute("class", "error");
}
txtusername.addEventListener("focus", () => {
    txtusername.removeAttribute("class");
    spnunameerror.innerText = "";
});
txtpassword.addEventListener("focus", () => {
    txtpassword.removeAttribute("class");
    spnpwderror.innerText = "";
});
txtusername.addEventListener("blur", () => {
    if (user.length == 0) {
        spnunameerror.innerText = "Username cannot be blank!";
        setErrorMessage(txtusername, spnunameerror);
    }
});
txtpassword.addEventListener("blur", () => {
    if (pwd.length == 0) {
        spnpwderror.innerText = "Password cannot be blank!";
        setErrorMessage(txtpassword, spnpwderror);
    }
});

myform.addEventListener("submit", (e) => {


    let isvalid = true;

    if (user.length == 0) {
        spnunameerror.innerText = "Username cannot be blank!";
        setErrorMessage(txtusername, spnunameerror);
        isvalid = false;
    }
    if (pwd.length == 0) {
        spnpwderror.innerText = "Password cannot be blank!";
        setErrorMessage(txtpassword, spnpwderror);
        isvalid = false;
    }

    if (!isvalid)
        e.preventDefault();


});