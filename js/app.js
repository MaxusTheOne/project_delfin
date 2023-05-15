"use strict";

import { getUsers, createUser, deleteUser, updateUser } from "./rest.js";
let users;
let sortType = "normal";

window.addEventListener("load", initApp);

function initApp() {
  console.log("js is working");
  updateUsersGrid();

  document
    .querySelector("#create-user-btn")
    .addEventListener("click", showCreateUserDialog);
  document
    .querySelector("#form-create-user")
    .addEventListener("submit", createUserClicked);
}

async function updateUsersGrid() {
  users = await getUsers();

  showUsers(users);
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
  const coachId = form.coachId.value;
  const image = form.image.value;
  const debt = form.debt.value;
  form.reset();
  const response = await createUser(
    role,
    subscription,
    discipline,
    age,
    coachId,
    firstName,
    lastName,
    debt,
    gender,
    image
  );
  if (response.ok) {
    console.log("created");
    updateUsersGrid();
  }
}

function showUsers(listOfUsers) {
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

function showUser(userObject) {
  //dom manipulation
  const html = /*html*/ `
<article class="grid-item-user">
<img src="${userObject.image}">
<h3>${userObject.firstName} ${userObject.lastName} </h3>
<h3>${userObject.age}</h3>
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
}
async function deleteUserClicked(event) {
  event.preventDefault();
  const form = event.target;
  const id = form.getAttribute("data-id");
  const response = await deleteUser(id);
  if (response.ok) {
    updateUsersGrid();
  } else {
    console.log(response.status, response.statusText);
  }
  form.reset();
  document.querySelector("#dialog-delete-user").close();
}

function updateClicked() {
  console.log("knappen virker");
}

function showUserModal(user) {
  console.log(user);
  document.querySelector("#dialog-age").textContent = user.age + " years old";
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
