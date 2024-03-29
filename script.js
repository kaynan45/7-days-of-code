updateTable();

//MODAL [
const addFriendButton = document.getElementById("insert-friends-button");
const closeModal = document.querySelector(".close-modal");
const modalTittle = document.querySelector(".modal-tittle");

function openModal() {
  //✅
  document.querySelector(".modal").classList.add("active");
}

addFriendButton.addEventListener("click", () => {
  //✅
  openModal();
});

function modalClose() {
  //✅
  document.querySelector(".modal").classList.remove("active");
  clearFields();
  modalTittle.innerHTML = "Add Friend";
}

closeModal.addEventListener("click", () => {
  //✅
  modalClose();
});

function clearFields() {
  //✅
  nameInput.value = "";
  birthdayInput.value = "";
}
//MODAL ]

//Html synchronous
const friendsList = document.getElementById("tbody");
const nameInput = document.getElementById("js-friend-name");
const birthdayInput = document.getElementById("js-friend-birthday");

function createFriendRow(friends_db) {
  //✅
  const newRow = document.createElement("tr");
  const newThead = document.createElement("th");
  newRow.innerHTML = `
        <td>${friends_db.name}</td>
        <td>${friends_db.birthday}</td>
        <td class="action-td">
        <button id="delete-button" class="button red">
        <i class="fas fa-trash icon"></i>Delete
        </button>
        <button id="edit-button" class="button yellow">
        <i class="fas fa-edit icon"></i>Edit
        </button>
        </td>

`;
  document.querySelector("#js-friends-table>tbody").appendChild(newRow);
}

const isValidFields = () => {
  //✅
  return document.getElementById("form").reportValidity();
};

function clearTable() {
  //✅
  const rows = document.querySelectorAll("#js-friends-table>tbody tr");
  rows.forEach((row) => row.parentNode.removeChild(row));
}

function updateTable() {
  //✅
  const friends_db = readFriends();
  clearTable();
  friends_db.forEach(createFriendRow);
}

updateTable();

let editStatus = false; //✅

const saveFriend = () => {
  //✅
  const nameValue = nameInput.value.trim(); //✅

  const lettersRegex = /^[a-zA-Z]+$/; //✅

  if (!lettersRegex.test(nameValue)) {
    //✅
    alert("Name with numbers? Leave it to the games man...");
    return;
  }

  if (nameValue.length < 3) {
    //✅
    alert("C'on man, who has a name with 2 letters or less?");
    return;
  }

  if (isValidFields()) {
    //✅
    const friends_db = readFriends();
    if (!editStatus) {
      //✅
      const newFriend = {
        name: nameInput.value,
        birthday: birthdayInput.value,
      };
      createFriend(newFriend);
      console.log(readFriends());
      clearFields();
      modalClose();
      updateTable();
    }
    if (editStatus) {
      //✅
      editFriend(friends_db, friendIndexToEdit);
      editStatus = false;
    }
    clearFields();
  }
};

function fillFields(friends_db, index) {
  //✅
  nameInput.value = friends_db[index].name;
  birthdayInput.value = friends_db[index].birthday;
  openModal();
}

function editFriend(friends_db, index) {
  //✅
  const updatedFriend = (friends_db[index] = {
    name: nameInput.value,
    birthday: birthdayInput.value,
  });
  setItem(friends_db);
  updateTable();
  modalClose();
}

let friendIndexToEdit = null; //✅

friendsList.addEventListener("click", (event) => {
  //✅
  const index = getIndexFromButton(event.target);
  const friend_db = readFriends();
  if (event.target.id === "delete-button") {
    //✅
    const response = confirm(
      `Are you sure you want to delete ${friend_db[index].name}`
    );
    if (response) {
      deleteFriend(index);
      updateTable();
    }
  }
  if (event.target.id === "edit-button") {
    //✅
    editStatus = true;
    if (editStatus) {
      fillFields(friend_db, index);
      friendIndexToEdit = index;
      modalTittle.innerHTML = "Editing Friend";
    }
  }
});

// Function to get the index of the friend to delete
/**
 * Finds the index of the row containing the clicked button.
 * @param {HTMLElement} button - The button element clicked.
 * @returns {number} - The index of the row in the table.
 */
function getIndexFromButton(button) {
  // Get the closest table row (tr) to the clicked button
  const row = button.closest("tr");

  // Convert the table body's children to an array and find the index of the row
  return Array.from(row.parentNode.children).indexOf(row);
}

//LocalStorage functions
function setItem(friend) {
  //✅
  localStorage.setItem("friends_db", JSON.stringify(friend));
}

function getItem() {
  //✅
  return JSON.parse(localStorage.getItem("friends_db")) ?? [];
}

//[CREATE-CRUD]
function createFriend(friend) {
  //✅
  const friends_db = getItem();
  friends_db.push(friend);
  setItem(friends_db);
}

//[READ-CRUD]
function readFriends() {
  //✅
  return getItem();
}

//[UPDATE-CRUD]
function updateFriends(index, newFriend) {
  //✅
  const friends_db = readFriends();
  friends_db[index] = newFriend;
  setItem(friends_db);
  console.log(readFriends());
}

//[DELETE-CRUD]
function deleteFriend(index) {
  //✅
  friends_db = readFriends();
  friends_db.splice(index, 1);
  setItem(friends_db);
  console.log(readFriends());
}

document.getElementById("js-add-friend").addEventListener("click", saveFriend); //✅

document
  .getElementById("js-cancel-friend")
  .addEventListener("click", modalClose); //✅
