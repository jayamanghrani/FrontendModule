const myform = document.myfrm;
const select = myform.lngnames;
select.addEventListener("change", (e) => {
    alert("You selected:" + e.target.value);
});