const heading = document.querySelector("h3");
heading.addEventListener("dblclick", () => {
    heading.style.fontStyle = "italic";
});

const img = document.querySelector("img");
// img.addEventListener("mouseover", () => {
//     img.src = "../../images/sachin2.jpg";
// });

// img.addEventListener("mouseover", () => {
//     img.style.width = "400px";
// });
img.onmouseover = () => {
    img.src = "../../images/sachin2.jpg";
};
img.onmouseover = () => {
    img.style.width = "400px";
};