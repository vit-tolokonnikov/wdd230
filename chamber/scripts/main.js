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

apiFetchMembers();

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

list.addEventListener('click', () => {
    membersContainer.classList.add('list-members');
});

grid.addEventListener('click', () => {
    membersContainer.classList.remove('list-members');
});