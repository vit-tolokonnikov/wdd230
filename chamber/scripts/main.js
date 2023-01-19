const date = new Date();
const curYear = date.getFullYear();
document.querySelector('#curYear').innerHTML = curYear;
document.querySelector('#lastModified').innerHTML = `Last Modification: ${document.lastModified}`;

const hamMenu = document.querySelector('.hamburger-menu');
const nav = document.querySelector('nav');

hamMenu.addEventListener('click', () => {
    if (nav.classList.contains('active')) {
        nav.classList.remove('active')
        hamMenu.innerHTML = '≡';
    } else {
        nav.classList.add('active')
        hamMenu.innerHTML = 'x';
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