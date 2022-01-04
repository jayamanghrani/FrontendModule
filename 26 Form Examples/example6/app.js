const myform = document.frmlogin;
const txtusername = myform.txtuser;
const txtpassword = myform.txtpwd;
const spnunameerror = document.getElementById("unameerror");
const spnpwderror = document.getElementById("pwderror");
spnunameerror.innerText = spnpwderror.innerText = "";
myform.addEventListener("submit", (e) => {
    let user = txtusername.value;
    let pwd = txtpassword.value;
    let isvalid = true;
    e.preventDefault();
    if (user.length == 0 || user.length < 5) {
        if (user.length == 0)
            spnunameerror.innerText = "Username cannot be blank!";
        else
            spnunameerror.innerText = "Username must be atleast 5 characters long!";
        spnunameerror.style.color = "crimson";
        txtusername.setAttribute("class", "error");
        isvalid = false;
    } else {
        spnunameerror.innerText = "";
        txtusername.removeAttribute("class");
    }
    if (pwd.length == 0 || pwd.length < 5) {
        if (pwd.length == 0)
            spnpwderror.innerText = "Password cannot be blank!";
        else
            spnpwderror.innerText = "Password must be atleast 5 characters long!";
        spnpwderror.style.color = "crimson";
        txtpassword.setAttribute("class", "error");
        isvalid = false;
    } else {
        spnpwderror.innerText = "";
        txtpassword.removeAttribute("class");
    }
    if (isvalid) {
        spnunameerror.innerText = "Username accepted!";
        spnpwderror.innerText = "Password accepted!";
        spnpwderror.style.color = unameerror.style.color = "limegreen";
        txtusername.setAttribute("class", "success");
        txtpassword.setAttribute("class", "success");
        setTimeout(() => {
            myform.submit();
        }, 3000);

    }


});