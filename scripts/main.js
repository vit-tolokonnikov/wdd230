const makeDarkButton = document.querySelector(".js-make-dark-btn");
const body = document.querySelector("body");

makeDarkButton.addEventListener("click", () => {
	if (body.classList.contains('make-dark')) {
        body.classList.remove('make-dark')
    } else {
        body.classList.add('make-dark')
    }
});

const visitsDisplay = document.querySelector(".visits");
let numVisits = Number(window.localStorage.getItem("visits"));

if (numVisits !== 0) {
	visitsDisplay.textContent = numVisits;
} else {
	visitsDisplay.textContent = `This is your first visit!`;
}

numVisits++;

localStorage.setItem("visits", numVisits);
