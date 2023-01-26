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
if (!!visitsDisplay) {
    let numVisits = Number(window.localStorage.getItem("visits"));

    if (numVisits !== 0) {
        visitsDisplay.textContent = numVisits;
    } else {
        visitsDisplay.textContent = `This is your first visit!`;
    }
    
    numVisits++;
    
    localStorage.setItem("visits", numVisits);
}



const userName = document.querySelector('[name="username"]');
const reUserName = document.querySelector('[name="re-username"]');
const passw =  /(?=.*[!@#$%^&*])(?=.*[a-zA-Z0-9]).{5,12}$/;

if (!!reUserName && !!userName) {
    reUserName.addEventListener('keyup', (e) => {
        console.log(userName.value);
        console.log(reUserName.value);
        console.log(!userName.value.match(passw));
        console.log(!!reUserName.value.match(passw));
        
        if (userName.value == reUserName.value && !!userName.value.match(passw)) {
            reUserName.classList.add('match');
            userName.classList.add('match');
            reUserName.classList.remove('wrong');
            userName.classList.remove('wrong');
        } else {
            reUserName.classList.add('wrong');
            userName.classList.add('wrong');
            reUserName.classList.remove('match');
            userName.classList.remove('match');
        }
    });
    userName.addEventListener('keyup', (e) => {
        if (userName.value == reUserName.value && !!userName.value.match(passw)) {
            reUserName.classList.add('match');
            userName.classList.add('match');
            reUserName.classList.remove('wrong');
            userName.classList.remove('wrong');
        } else {
            reUserName.classList.add('wrong');
            userName.classList.add('wrong');
            reUserName.classList.remove('match');
            userName.classList.remove('match');
        }
    });
}



const jsFormName = document.querySelector('.js-form-name');
const jsFormEmail = document.querySelector('.js-form-email');
const jsFormRating = document.querySelector('.js-form-rating');
const jsFormUsername = document.querySelector('.js-form-username');

let arrGET = window.location.search.replace( '?', '').split('&'); 

if (!!arrGET) {
    for (let i in arrGET) {
        let arrFormData = arrGET[i].split('=');

        if (arrFormData[0] == 'fname') {
            jsFormName.textContent = arrFormData[1];
        }
        if (arrFormData[0] == 'email') {
            jsFormEmail.textContent = arrFormData[1];
        }
        if (arrFormData[0] == 'range') {
            jsFormRating.textContent = arrFormData[1];
        }
        if (arrFormData[0] == 'username') {
            jsFormUsername.textContent = arrFormData[1];
        }
    }
}
