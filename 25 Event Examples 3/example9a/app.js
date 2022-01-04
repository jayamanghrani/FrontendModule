const ul = document.querySelector("ul");
ul.addEventListener("click", (e) => {
    console.log(e.target);
    e.target.style.color = "crimson";
});
const btn = document.querySelector("#additem");
btn.addEventListener("click", () => {
    let task = prompt("What you want to do next ?");
    ul.innerHTML += "<li>" + task + "</li>";
});