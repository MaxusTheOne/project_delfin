"use strict";

import { getUsers, createUser, deleteUser, updateUser } from "./rest.js";
import { showRole, getAllRole } from "./sort.js";

let users;
let sortType = "normal";
let filterOption = "alle";

window.addEventListener("load", initApp);

async function initApp() {
  console.log("js is working");
  await updateUsersGrid();
  document
    .querySelector("#searchbar")
    .addEventListener("keyup", inputSearchChanged);
  document
    .querySelector("#searchbar")
    .addEventListener("search", inputSearchChanged);
  showRole(
    document.querySelector("#coach-label"),
    "træner",
    "coach",
    "Vælg træner",
    users
  );
  showRole(
    document.querySelector("#coach-update-label"),
    "træner",
    "coach",
    "Vælg træner",
    users
  );

  document
    .querySelector("#create-user-btn")
    .addEventListener("click", showCreateUserDialog);
  document
    .querySelector("#form-create-user")
    .addEventListener("submit", createUserClicked);

  document
    .querySelector("#sort")
    .addEventListener("change", filterByMemberRoles);
}

// Search
function inputSearchChanged(event) {
  const input = event.target.value;
  const listOfUsers = searchUsers(input);
  showUsers(listOfUsers);
}

function searchUsers(search) {
  search = search.toLowerCase().trim();
  console.log(search);
  const results = users.filter(
    user =>
      user.firstName.toLowerCase().trim().includes(search) ||
      user.lastName.toLowerCase().trim().includes(search)
  );
  return results;
}

async function updateUsersGrid() {
  users = await getUsers();
  const filteredList = filterList();
  showUsers(filteredList);
}

function filterList() {
  const filteredList = getAllRole(users, filterOption);
  return filteredList;
}

function showCreateUserDialog() {
  document.querySelector("#dialog-create-user").showModal();
}

async function createUserClicked(event) {
  const form = event.target;
  const firstName = form.firstName.value;
  const lastName = form.lastName.value;
  const age = form.age.value;
  const gender = form.gender.value;
  const subscription = form.subscription.value;
  const role = form.role.value;
  const discipline = form.discipline.value;
  const coach = form.coach.value;
  const image = form.image.value;
  const debt = form.debt.value;
  form.reset();
  const response = await createUser(
    role,
    subscription,
    discipline,
    age,
    coach,
    firstName,
    lastName,
    debt,
    gender,
    image
  );
  if (response.ok) {
    showSnackbar("Bruger oprettet");
    updateUsersGrid();
  } else {
    console.log(response.status, response.statusText);
    showSnackbar("Noget gik galt. Prøv igen");
  }
}

function showUsers(listOfUsers) {
  document.querySelector("#users").innerHTML = "";
  listOfUsers.sort((a, b) => {
    if (a.firstName.toLowerCase() < b.firstName.toLowerCase()) return -1;
    else if (a.firstName.toLowerCase() > b.firstName.toLowerCase()) return 1;
    else return 0;
  });
  if (sortType == "reverse") {
    listOfUsers.reverse();
  }
  for (const users of listOfUsers) {
    showUser(users); // for every post object in listOfPosts, call showPost
  }
}

function filterByMemberRoles(event) {
  const role = event.target.value;
  filterOption = role;
  console.log(filterOption);
  updateUsersGrid();
}

function showUser(userObject) {
  //dom manipulation
  const html = /*html*/ `
<article class="grid-item-user">
  <img src="${userObject.image}">
  <h3>${userObject.firstName} ${userObject.lastName} </h3>
  <h3>${userObject.age} år</h3>
  <div class="btns">
  <button class="btn-update">Opdater</button>
  <button class="btn-delete">Slet</button>
  </div>
</article>
`;
  document.querySelector("#users").insertAdjacentHTML("beforeend", html);
  document
    .querySelector("#users article:last-child .btn-delete")
    .addEventListener("click", deleteClicked);
  document
    .querySelector("#users article:last-child .btn-update")
    .addEventListener("click", updateClicked);

  document
    .querySelector("#users article:last-child img")
    .addEventListener("click", () => showUserModal(userObject));

  function deleteClicked() {
    console.log("Knappen Virker");
    console.log(userObject);
    document.querySelector("#dialog-delete-user").showModal();
    document.querySelector("#dialog-delete-user-name").textContent =
      userObject.firstName;
    document
      .querySelector("#form-delete-user")
      .setAttribute("data-id", userObject.id);
    document.querySelector("#btn-no").addEventListener("click", function () {
      document.querySelector("#dialog-delete-user").close();
    });
    document
      .querySelector("#form-delete-user")
      .addEventListener("submit", deleteUserClicked);
  }

  function updateClicked() {
    document.querySelector("#dialog-update-user").showModal();
    document.querySelector("#update-firstName").value = userObject.firstName;
    document.querySelector("#update-lastName").value = userObject.lastName;
    document.querySelector("#update-age").value = userObject.age;
    document.querySelector("#update-gender").value = userObject.gender;
    document.querySelector("#update-subscription").value =
      userObject.subscription;
    document.querySelector("#update-role").value = userObject.role;
    document.querySelector("#update-discipline").value = userObject.discipline;
    // document.querySelector(`#${userObject.coachId}`);
    for (const coach of document.querySelectorAll(
      `.træner${userObject.coachId}`
    )) {
      coach.selected = true;
    }
    document.querySelector("#update-debt").value = userObject.debt;
    document.querySelector("#update-image").value = userObject.image;
    document
      .querySelector("#form-update-user")
      .setAttribute("data-id", userObject.id);
    document
      .querySelector("#form-update-user")
      .addEventListener("submit", updateUserClicked);
  }
}
async function deleteUserClicked(event) {
  event.preventDefault();
  const form = event.target;
  const id = form.getAttribute("data-id");
  const response = await deleteUser(id);
  if (response.ok) {
    updateUsersGrid();
    showSnackbar("Bruger slettet");
  } else {
    console.log(response.status, response.statusText);
    showSnackbar("Noget gik galt. Prøv igen");
  }
  form.reset();
  document.querySelector("#dialog-delete-user").close();
}

async function updateUserClicked(event) {
  const form = event.target;
  const id = form.getAttribute("data-id");
  const firstName = form.firstName.value;
  const lastName = form.lastName.value;
  const age = form.age.value;
  const gender = form.gender.value;
  const subscription = form.subscription.value;
  const role = form.role.value;
  const discipline = form.discipline.value;
  const coach = form.coach.value;
  const image = form.image.value;
  const debt = form.debt.value;
  form.reset();
  const response = await updateUser(
    id,
    role,
    subscription,
    discipline,
    age,
    coach,
    firstName,
    lastName,
    debt,
    gender,
    image
  );
  if (response.ok) {
    showSnackbar("Bruger opdateret");
    updateUsersGrid();
  } else {
    console.log(response.status, response.statusText);
    showSnackbar("Noget gik galt. Prøv igen");
  }
  console.log("knappen virker");
}

function showUserModal(user) {
  document.querySelector("#dialog-age").textContent = user.age + " år gammel";
  document.querySelector(
    "#dialog-name"
  ).textContent = `${user.firstName} ${user.lastName}`;
  document.querySelector("#dialog-subscription").textContent =
    user.subscription;
  document.querySelector("#dialog-role").textContent = user.role;
  document.querySelector("#dialog-discipline").textContent = user.discipline;
  document.querySelector("#dialog-gender").textContent = user.gender;
  document.querySelector("#dialog-image").src = user.image;

  console.log("");
  // show dialog
  document.querySelector("#dialog-member-info").showModal();
}

function showSnackbar(message) {
  const snackbarSelector = document.querySelector(`#snackbar`);
  snackbarSelector.textContent = `${message}`;
  snackbarSelector.classList.add("show");
  setTimeout(() => {
    snackbarSelector.classList.remove("show");
  }, 3000);
}
