let allitems = document.querySelectorAll("li");

allitems.forEach((item) => {
    item.addEventListener("click", () => {
        item.style.color = "crimson";
    });
});