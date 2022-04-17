// let listItems = document.querySelectorAll("li");
// listItems.forEach((item) => {
//     item.addEventListener("click", (e) => {
//         console.log("li clicked", e.type);
//         e.stopPropagation();
//     });
// });

let ul = document.querySelector("ul");
ul.addEventListener("click", (e) => {
    console.log("ul pressed", e.type);
});