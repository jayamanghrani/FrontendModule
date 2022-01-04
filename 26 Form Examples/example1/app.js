const myform = document.loginform;
const username = myform.txtusername;
const pwd = myform.txtpassword;
const btn = myform.btnlogin;

btn.addEventListener("click", () => {
    let uname = username.value;
    let pass = pwd.value;
    alert(`LoginId:${uname},Password:${pass}`);
});