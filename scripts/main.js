const makeDarkButton = document.querySelector(".js-make-dark-btn");
const body = document.querySelector("body");

makeDarkButton.addEventListener("click", () => {
	if (body.classList.contains('make-dark')) {
        body.classList.remove('make-dark')
    } else {
        body.classList.add('make-dark')
    }
});