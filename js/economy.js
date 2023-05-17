"use strict";
import { getUsers } from "./rest.js";

let users;
let total = 0;
let totalDebt = 0;

window.addEventListener("load", start);

async function start() {
  await loadEconomy();
  await loadDebt();
  showTotalIncome();
  calculateUserDebt();
  showTotalDebt();
}

async function loadEconomy() {
  console.log("Economy loaded");
  users = await getUsers();

  for (const user of users) {
    if (user.age > 60) {
      total += 1200;
      continue;
    }
    switch (user.subscription) {
      case "pensionist":
        total += 1200;
        break;
      case "senior":
        total += 1600;
        break;
      case "junior":
        total += 1000;
        break;
      case "passiv":
        total += 500;
        break;
      default:
        break;
    }
  }
  console.log("Total Indkomst: " + total);
  return total;
}

function showTotalIncome() {
  document.querySelector("#income-value").textContent = total + " kr";
}

async function loadDebt() {
  const users = await getUsers();
  const debtListElement = document.querySelector("#user-debt");
  let debtListHTML = "";

  for (const user of users) {
    if (user.debt > 0) {
      const listItemHTML = `<li>${user.firstName} ${user.lastName}: ${user.debt} kr</li>`;
      debtListHTML += listItemHTML;
      totalDebt += user.debt;
      //console.log(user.debt);
    }
  }
  debtListElement.innerHTML = debtListHTML;

  return totalDebt;
}
async function calculateUserDebt() {
  const totalDebt = await loadDebt();
  console.log("Samlet gæld:", totalDebt);
}

function showTotalDebt() {
  document.querySelector("#total-debt").textContent =
    "Total gæld: " + totalDebt + " kr";
}
