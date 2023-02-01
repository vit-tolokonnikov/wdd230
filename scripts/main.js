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
const passw = /(?=.*[!@#$%^&*])(?=.*[a-zA-Z0-9]).{5,12}$/;

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

let arrGET = window.location.search.replace('?', '').split('&');

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


// Weather

const url = 'https://api.openweathermap.org/data/2.5/weather?q=Novosibirsk,Russia&units=imperial&appid=644b39f3a1c1d7010399f066c552cc88';
const weather = document.querySelector('.weather');

async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            // console.log(data);
            displayData(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}
apiFetch()

function displayData(data) {
    const curTemp = data.main.temp;
    const desc = data.weather[0].main;
    const imgUrl = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    weather.innerHTML = `Current temperature: ${curTemp}&deg;F, ${desc} <img src="${imgUrl}"/>`;
}


const learningActivityUrl = './learning-activity-lessons.json';
const learningLinksContainer = document.querySelector('.learning-links');

async function apiFetchLearningActivity() {
    try {
        const response = await fetch(learningActivityUrl);
        if (response.ok) {
            const data = await response.json();
            // console.log(data);
            putLinks(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}
apiFetchLearningActivity()

function putLinks(data) {
    let count = 1;
    console.log(data)
    for (let week in data) {
        const liElem = document.createElement("li");
        liElem.textContent = `${week}: `;

        data[week].forEach((link) => {    
            const aElem = document.createElement("a");
            const brElem = document.createElement("br");
            aElem.setAttribute('href', link);
            aElem.textContent = link;
            liElem.appendChild(aElem);
            liElem.appendChild(brElem);

            learningLinksContainer.append(liElem);
            
        });
        count++;
    }
}