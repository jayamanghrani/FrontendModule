const myform = document.myfrm;
const btnadd = myform.btnadd;
const btnclear = myform.btnclear;
const txtfno = myform.txtfno;
const txtsno = myform.txtsno;
const txtresult = myform.txtresult;

btnadd.addEventListener("click", () => {
    let fnum = txtfno.value;
    let snum = txtsno.value;
    let total = Number(fnum) + Number(snum);
    txtresult.value = total;
});

btnclear.addEventListener("click", () => {
    txtfno.value = txtsno.value = txtresult.value = "";
});