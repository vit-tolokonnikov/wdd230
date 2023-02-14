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

const userTimeForm = document.querySelector('.js-put-user-time');
if (!!userTimeForm) {
    userTimeForm.value = date;
}

const visitsDisplay = document.querySelector(".visits");

if (!!visitsDisplay) {
    let numVisits = Number(window.localStorage.getItem("visits"));

    if (!numVisits) {
        numVisits = 0;
    }

    if (numVisits !== 0) {
        visitsDisplay.textContent = numVisits;
    } else {
        visitsDisplay.textContent = `This is your first visit!`;
    }
    
    numVisits++;

    localStorage.setItem("visits", numVisits);
}



const membersUrl = './data/members.json';
const membersContainer = document.querySelector('#put-members');

async function apiFetchMembers() {
    try {
        const response = await fetch(membersUrl);
        if (response.ok) {
            const data = await response.json();
            // console.log(data);
            putMembersGrid(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}
if (!!membersContainer) {
    apiFetchMembers();
}


function putMembersGrid(data) {
    data.companies.forEach((member) => {
        const card = document.createElement("div");
        card.setAttribute("class", "card");

        const name = document.createElement("p");
        name.textContent = member.name;
        name.setAttribute("class", 'show-in-list');

        const image = document.createElement("img");
        image.setAttribute("src", member.image);
        if (member.name === "Myasoroob") {
            image.setAttribute("class", "black-background");
        }
            
        const address = document.createElement("p");
        address.textContent = member.address;

        const description = document.createElement("p");
        description.textContent = member.description;

        const membershipLevel = document.createElement("p");
        membershipLevel.textContent = member.membershipLevel;
        membershipLevel.setAttribute("class", 'show-in-list');

        const url = document.createElement("p");
        url.innerHTML = `<a href="${member.url}" target="_blank">Detail</a>`;
        url.setAttribute("class", 'show-in-list');

        const phoneNumber = document.createElement("p");
        phoneNumber.textContent = member.phoneNumber;

        card.appendChild(name)
        card.appendChild(image)
        card.appendChild(description)
        card.appendChild(address)
        card.appendChild(phoneNumber)
        card.appendChild(url)
        card.appendChild(membershipLevel)


        membersContainer.append(card);
    });
}

const grid = document.querySelector("#grid");
const list = document.querySelector("#list");

if (!!list) {
    list.addEventListener('click', () => {
        membersContainer.classList.add('list-members');
    });
}
if (!!grid) {
    grid.addEventListener('click', () => {
        membersContainer.classList.remove('list-members');
    });
}



// Weather
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');
const wearherList = document.querySelector('.weather-list');

const url = 'https://api.openweathermap.org/data/2.5/weather?q=Novosibirsk,Russia&units=imperial&appid=644b39f3a1c1d7010399f066c552cc88';

async function apiFetchCurWeather() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            // console.log(data);
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

async function apiFetchCurWeatherForecast() {
    try {
        const curUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=55.01&lon=82.93&units=metric&appid=c88ee2f23eea27ec7bd4ae3ea41477b4'
        const response = await fetch(curUrl);
        if (response.ok) {
            const data = await response.json();
            // console.log(data);
            displayForecast(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

function displayResults(data) {
    currentTemp.innerHTML = `${data.main.temp}&deg;F`;
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    let desc = data.weather[0].description;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', data.weather[0].main);
    captionDesc.textContent = `${desc}`;
}

function displayForecast(data) {
    const firstDay = `${data.list[10].dt_txt.substring(0, 10)} temperature is ${data.list[10].main.temp}&deg;F`;
    const secondDay = `${data.list[18].dt_txt.substring(0, 10)} temperature is ${data.list[18].main.temp}&deg;F`;
    const thirdDay = `${data.list[24].dt_txt.substring(0, 10)} temperature is ${data.list[24].main.temp}&deg;F`;
    
    const ul = document.createElement('ul');

    ul.innerHTML = `
        <li>${firstDay}</li>
        <li>${secondDay}</li>
        <li>${thirdDay}</li>
    `;

    wearherList.append(ul);
}
if (!!currentTemp) {
    apiFetchCurWeather();
    apiFetchCurWeatherForecast();
}

// spotlights
const spotlightsList = document.querySelector('.spotlights-list');

async function apiFetchMembersSpotlights() {
    try {
        const response = await fetch(membersUrl);
        if (response.ok) {
            const data = await response.json();
            // console.log(data);
            putSpotlightsList(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

function putSpotlightsList(data) {
    shuffle(data.companies)
    let count = 0;
    data.companies.forEach((member) => {
        if (member.membershipLevel == 'Gold' || member.membershipLevel == 'Silver') {
            
            if (count >= 3) {
                
            } else {
                const card = document.createElement("div");
                card.setAttribute("class", "card");
    
                const name = document.createElement("p");
                name.textContent = member.name;
                name.setAttribute("class", 'show-in-list');
    
                const image = document.createElement("img");
                image.setAttribute("src", member.image);
                if (member.name === "Myasoroob") {
                    image.setAttribute("class", "black-background");
                }
                    
                const address = document.createElement("p");
                address.textContent = member.address;
    
                const description = document.createElement("p");
                description.textContent = member.description;
    
                const membershipLevel = document.createElement("p");
                membershipLevel.textContent = member.membershipLevel;
                membershipLevel.setAttribute("class", 'show-in-list');
    
                const url = document.createElement("p");
                url.innerHTML = `<a href="${member.url}" target="_blank">Detail</a>`;
                url.setAttribute("class", 'show-in-list');
    
                const phoneNumber = document.createElement("p");
                phoneNumber.textContent = member.phoneNumber;
    
                card.appendChild(name)
                card.appendChild(image)
                card.appendChild(description)
                card.appendChild(address)
                card.appendChild(phoneNumber)
                card.appendChild(url)
                card.appendChild(membershipLevel)
    
                spotlightsList.append(card)
            }
            count++;
        }
    });
}

if (!!spotlightsList) {
    apiFetchMembersSpotlights();
}

// Banner on main
const currentDate = new Date();
const currentDay = currentDate.getDay();

if (currentDay === 1 || currentDay === 2 || currentDay === 3) {
  // Показываем баннер
  const banner = document.querySelector('.banner-main');
  banner.classList.add('show-banner');
}