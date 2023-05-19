const slider = document.querySelector(".slider");
const prevButton = document.querySelector(".prev-button");
const nextButton = document.querySelector(".next-button");

let translateXValue = 0;

prevButton.addEventListener("click", () => {
	translateXValue += 100;
	slider.style.transform = `translateX(${translateXValue}%)`;
});

nextButton.addEventListener("click", () => {
	translateXValue -= 100;
	slider.style.transform = `translateX(${translateXValue}%)`;
});
