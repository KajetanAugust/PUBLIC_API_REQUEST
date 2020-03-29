const cardsDiv = document.getElementById('gallery');
const searchBar = document.querySelector('.search-container');
const searchPersons = document.getElementsByClassName('name');
const userCards = document.getElementsByClassName('user');
let modalBackground = document.getElementById('modal-background');


let users;

let selectedUserIndex;


searchBar.innerHTML = `<form action="#" method="get">
                            <input type="search" id="search-input" class="search-input" placeholder="Search...">
                            <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
                        </form>`;
///////////////
//// FETCH ////
///////////////

fetch('https://randomuser.me/api/?results=12&nat=us')
    .then(res => res.json())
    .then(data => {
        users = (Object.values(data));
        creatingUser(Object.values(data));
    });

////////////////////////////
//// CREATING USER DIVs ////
////////////////////////////

function creatingUser(data) {
    data[0].map((person, index) => {
        const userDiv = document.createElement('div');
        cardsDiv.appendChild(userDiv);
        userDiv.innerHTML = `

        <div class="${index} photo card-img-container">
        <img class ="${index} card-img" src=${person.picture.large} alt="profile picture">
        </div>

        <div class="${index} info card-info-container">
        <h3 id="name" class="${index} name card-name cap">${person.name.first} ${person.name.last}</h3>
        <p class="${index} email card-text">${person.email}</p>
        <p class="${index} city card-text cap">${person.location.city}</p>
        </div>
        `;
        userDiv.className = index + ' user'+' card';

    });
}

////////////////////////
//// CREATING MODAL ////
////////////////////////

function creatingModal() {
const modalWindow = document.createElement('div');
modalWindow.className = 'modal-container';
    modalWindow.innerHTML = `
    <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
            <img class = "modal-img" src=${users[0][selectedUserIndex].picture.large} alt="profile picture">
            <h3 id="name" class="modal-name cap">${users[0][selectedUserIndex].name.first} ${users[0][selectedUserIndex].name.last}</h3>
            <p class="modal-email modal-text">${users[0][selectedUserIndex].email}</p>
            <p class="modal-city modal-text cap">${users[0][selectedUserIndex].location.city}</p>
            <p class="modal-phone modal-text">${users[0][selectedUserIndex].cell}</p>
            <p class="modal-adress modal-text">${users[0][selectedUserIndex].location.street.number} ${users[0][selectedUserIndex].location.street.name}, ${users[0][selectedUserIndex].location.state} ${users[0][selectedUserIndex].location.postcode}</p>
            <p class="modal-birthday modal-text">Birthday: ${users[0][selectedUserIndex].dob.date.substr(8, 2)}/${users[0][selectedUserIndex].dob.date.substr(5, 2)}/${users[0][selectedUserIndex].dob.date.substr(0, 4)}</p>
        </div>
    </div>
    <div class="modal-btn-container">
        <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
        <button type="button" id="modal-next" class="modal-next btn">Next</button>
    </div>
        `;

    // switchingUsers();
}


//
// //////////////////////////////
// //// SEARCH FUNCTIONALITY ////
// //////////////////////////////
//
// searchBar.addEventListener('keyup', () => {
//     const searchVal = searchBar.value.toLowerCase();
//
//     for (let i = 0; i < searchPersons.length; i++) {
//         const persons = searchPersons[i].textContent.toLowerCase();
//         if (persons.startsWith(searchVal) !== true) {
//             searchPersons[i].parentNode.parentNode.style.display = 'none';
//         } else {
//             searchPersons[i].parentNode.parentNode.style.display = '';
//         }
//     }
// });
//
// //////////////////////////////
// //// MODAL FUNCTIONALITY /////
// //////////////////////////////
//
// cardsDiv.addEventListener('click', (e) => {
//     modalWindow.style.display = 'flex';
//     modalWindow.classList.add('visible');
//     modalBackground.style.display = 'initial';
//     modalBackground.classList.add('visible');
//     const selected = e.target;
//     selectedUserIndex = parseInt(selected.getAttribute('class').substr(0,2));
//     creatingModal();
//     closingModal();
//     console.log(selectedUserIndex);
//
// });
//
// function closingModal() {
//     let modalClosingX = document.getElementById('closing-modal');
//     modalClosingX.addEventListener('click', () => {
//         modalWindow.style.display = 'none';
//         modalWindow.classList.remove('visible');
//         modalBackground.style.display = 'none';
//         modalBackground.classList.remove('visible');
//         selectedUserIndex = "";
//     });
//
//
//     modalBackground.addEventListener('click', (e) => {
//         const closingTarget = e.target;
//         const closingClick = closingTarget.getAttribute('id');
//         if(closingClick != 'modal'){
//             modalWindow.style.display = 'none';
//             modalWindow.classList.remove('visible');
//             modalBackground.style.display = 'none';
//             modalBackground.classList.remove('visible');
//             selectedUserIndex = "";
//         }
//     })
// }
//
// function switchingUsers() {
//     const modalArrowRight = document.getElementById('modal-arrow-right');
//     const modalArrowLeft = document.getElementById('modal-arrow-left');
//
//     modalArrowRight.addEventListener('click', () => {
//         if (selectedUserIndex < users[0].length - 1) {
//             selectedUserIndex++;
//         } else {
//             selectedUserIndex = 0;
//         }
//         console.log(selectedUserIndex);
//
//         creatingModal();
//         closingModal();
//     });
//
//     modalArrowLeft.addEventListener('click', () => {
//         if (selectedUserIndex != 0) {
//             selectedUserIndex--;
//         } else {
//             selectedUserIndex = 11;
//         }
//         console.log(selectedUserIndex);
//
//         creatingModal();
//         closingModal();
//     });
// }