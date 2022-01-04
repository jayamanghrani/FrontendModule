const listItems = document.querySelectorAll("li");
listItems.forEach(item => {
    item.addEventListener('click', () => {
        item.style.color = "crimson";
    });

});
const btn = document.querySelector("#additem");
const ul = document.querySelector("ul");
btn.addEventListener('click', () => {
    let task = prompt("What you want to do next ?");
    ul.innerHTML += "<li>" + task + "</li>";

});