const cardsDiv = document.getElementById('gallery');
const searchBar = document.querySelector('.search-container');

const searchPersons = document.getElementsByClassName('name');

const scriptTag = document.querySelector('script');

let users;

let selectedUserIndex;


searchBar.innerHTML = `<form action="#" method="get">
                            <input type="search" id="search-input" class="search-input" placeholder="Search...">
                            <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
                        </form>`; //appending search Bar
///////////////
//// FETCH ////
///////////////

fetch('https://randomuser.me/api/?results=12&nat=us') //fetching data
    .then(res => res.json()) //parsing data to json
    .then(data => { //processing data
        users = (Object.values(data));  //getting users
        creatingUser(Object.values(data)); //creating users
    });

////////////////////////////
//// CREATING USER DIVs ////
////////////////////////////

function creatingUser(data) {
    data[0].map((person, index) => { //iterating through persons
        const userDiv = document.createElement('div');
        cardsDiv.appendChild(userDiv); //appending person to the page
        userDiv.innerHTML = `

        <div class="${index} photo card-img-container">
        <img class ="${index} card-img" src=${person.picture.large} alt="profile picture">
        </div>

        <div class="${index} info card-info-container">
        <h3 id="name" class="${index} name card-name cap">${person.name.first} ${person.name.last}</h3>
        <p class="${index} email card-text">${person.email}</p>
        <p class="${index} city card-text cap">${person.location.city}</p>
        </div>
        `; //setting inner html of the person card
        userDiv.className = index + ' user'+' card'; //adding class to the user card

    });
}

////////////////////////
//// CREATING MODAL ////
////////////////////////

function creatingModal(data) {
const modalWindow = document.createElement('div');
const body = document.querySelector('body');
body.insertBefore(modalWindow,scriptTag);//appending modal
modalWindow.className = 'modal-container';  //adding class to the modal
modalWindow.setAttribute('id', 'modal-container'); //adding id to the modal
    modalWindow.innerHTML = `
    <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
            <img class = "modal-img" src=${users[0][selectedUserIndex].picture.large} alt="profile picture">
            <h3 id="name" class="modal-name cap">${users[0][selectedUserIndex].name.first} ${users[0][selectedUserIndex].name.last}</h3>
            <p class="modal-email modal-text">${users[0][selectedUserIndex].email}</p>
            <p class="modal-city modal-text cap">${users[0][selectedUserIndex].location.city}</p>
            <hr>
            <p class="modal-phone modal-text">${users[0][selectedUserIndex].cell}</p>
            <p class="modal-adress modal-text">${users[0][selectedUserIndex].location.street.number} ${users[0][selectedUserIndex].location.street.name}, ${users[0][selectedUserIndex].location.state} ${users[0][selectedUserIndex].location.postcode}</p>
            <p class="modal-birthday modal-text">Birthday: ${users[0][selectedUserIndex].dob.date.substr(8, 2)}/${users[0][selectedUserIndex].dob.date.substr(5, 2)}/${users[0][selectedUserIndex].dob.date.substr(0, 4)}</p>
        </div>
    </div>
    <div class="modal-btn-container">
        <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
        <button type="button" id="modal-next" class="modal-next btn">Next</button>
    </div>
        `; //setting inner html of the modal
    switchingUsers(); //calling switching users function
}



// //////////////////////////////
// //// SEARCH FUNCTIONALITY ////
// //////////////////////////////

const searchInput = document.getElementById('search-input');

//OPTIONAL KEYUP SEARCH

// searchInput.addEventListener('keyup', () => { //adding event listener to the input
//     const searchVal = searchInput.value.toLowerCase(); //getting search window value to lower case
//     for (let i = 0; i < searchPersons.length; i++) { //looping through the persons
//         const persons = searchPersons[i].textContent.toLowerCase(); //getting person name
//         if (persons.includes(searchVal) !== true) { //checking if the name does not include search value
//             searchPersons[i].parentNode.parentNode.style.display = 'none'; //hiding persons
//         } else {
//             searchPersons[i].parentNode.parentNode.style.display = ''; //showing person that includes search value
//         }
//     }
// });

const searchButton = document.getElementById('search-submit');
searchButton.addEventListener('click', () => { //adding event listener to the search button
    const searchVal = searchInput.value.toLowerCase(); //getting search window value to lower case
    for (let i = 0; i < searchPersons.length; i++) { //looping through the persons
        const persons = searchPersons[i].textContent.toLowerCase(); //getting person name
        if (persons.includes(searchVal) !== true) { //checking if the name does not include search value
            searchPersons[i].parentNode.parentNode.style.display = 'none'; //hiding persons
        } else {
            searchPersons[i].parentNode.parentNode.style.display = ''; //showing person that includes search value
        }
    }
});

// //////////////////////////////
// //// MODAL FUNCTIONALITY /////
// //////////////////////////////


//EVENT LISTENER FOR LAUNCHING MODAL
cardsDiv.addEventListener('click', (e) => {
    const selected = e.target;
    selectedUserIndex = parseInt(selected.getAttribute('class').substr(0,2)); //getting index of user for modal user data
    creatingModal(); //calling creating modal
    closingModal(); //calling closingModal function with event listener for closing modal
    backgroundClosing(); //calling backgroundClosing function with event listener for closing modal with background click
});

//FUNCTION FOR CLOSING MODAL
function closingModal() {
    let modalClosingX = document.getElementById('modal-close-btn');
    modalClosingX.addEventListener('click', () => { //event listener for x button
    removingOldModal();  //calling removingOldModal function
    selectedUserIndex = ""; //resetting selectedUserIndex
    });
}

//FUNCTION FOR CLOSING MODAL WITH THE BACKGROUND CLICK
function backgroundClosing() {
    const modalBackground = document.getElementById('modal-container');
    modalBackground.addEventListener('click', (e) => { //event listener for click
        const closingTarget = e.target; //getting click target
        const closingClick = closingTarget.getAttribute('class'); //getting target class name
        if (closingClick !== 'modal-info-container' && closingClick === 'modal-container') {
            //checking if the target class name is equal modal-container and it isn't modal-info-container
            removingOldModal(); //calling removingOldModal function
            selectedUserIndex = ""; //resetting selectedUserIndex
        }
    });
}

//FUNCTION FOR REMOVING OLD MODAL DATA
function removingOldModal() {
    const openedModal = document.getElementById('modal-container');
    const body = document.querySelector('body');
    body.removeChild(openedModal); //removing modal
}

//FUNCTION FOR SWITCHING USERS
function switchingUsers() {
    const modalArrowRight = document.getElementById('modal-next');
    const modalArrowLeft = document.getElementById('modal-prev');
//SWITCHING FORWARD
    modalArrowRight.addEventListener('click', () => { //event listener for right arrow
        if (selectedUserIndex < users[0].length - 1) { //checking is less than users length -1
            selectedUserIndex++; //switching to the next user
        } else {
            selectedUserIndex = 0; //if it's the last person, switching to the first
        }
        // console.log(selectedUserIndex);
        removingOldModal(); //removing old modal
        creatingModal(); //creating new modal
        closingModal(); //calling closingModal function with event listener for closing modal
        backgroundClosing(); //calling backgroundClosing function with event listener for closing modal with background click
    });
//SWITCHING BACK
    modalArrowLeft.addEventListener('click', () => {
        if (selectedUserIndex !== 0) { //checking if index si not equal 0
            selectedUserIndex--; //substracting 1 from index
        } else {
            selectedUserIndex = 11; //if index is 0 switching to the last user
        }
        // console.log(selectedUserIndex);
        removingOldModal(); //removing old modal
        creatingModal(); //creating new modal
        closingModal(); //calling closingModal function with event listener for closing modal
        backgroundClosing(); //calling backgroundClosing function with event listener for closing modal with background click
    });
}