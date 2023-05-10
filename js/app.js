"use strict";

import { getUsers, createUser, deleteUser, updateUser } from "./rest.js";
let users;

window.addEventListener("load", initApp);

function initApp() {
  console.log("js is working");
  updateUsersGrid();
}

async function updateUsersGrid() {
  users = await getUsers();
  users.forEach(showUser);
}

function showUser(userObject) {
  console.log(userObject);
  //dom manipulation
  const html = /*HTML*/ `
<article class="grid-item">
<img src="${userObject.image}">
<h3>${userObject.firstName} ${userObject.lastName} </h3>
<h3>${userObject.age}</h3>
</article>`;
  document.querySelector("#users").insertAdjacentHTML("beforeend", html);
}
