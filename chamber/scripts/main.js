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