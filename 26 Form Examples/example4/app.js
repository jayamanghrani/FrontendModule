const myform = document.frmlogin;
const txtusername = myform.txtuser;
const txtpassword = myform.txtpwd;
const spnunameerror = document.getElementById("unameerror");
const spnpwderror = document.getElementById("pwderror");
spnunameerror.innerText = spnpwderror.innerText = "";
myform.addEventListener("submit", (e) => {
    const user = txtusername.value;
    const pwd = txtpassword.value;
    let isvalid = true;
    if (user.length == 0) {
        spnunameerror.innerText = "Username cannot be blank!";
        spnunameerror.style.color = "crimson";
        txtusername.setAttribute("class", "error");
        isvalid = false;
    } else {
        spnunameerror.innerText = "";
        txtusername.removeAttribute("class");
    }
    if (pwd.length == 0) {
        spnpwderror.innerText = "Password cannot be blank!";
        spnpwderror.style.color = "crimson";
        txtpassword.setAttribute("class", "error");
        isvalid = false;
    } else {
        spnpwderror.innerText = "";
        txtpassword.removeAttribute("class");
    }
    if (!isvalid) e.preventDefault();
});