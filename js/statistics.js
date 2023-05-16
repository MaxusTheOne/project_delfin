"use strict";

import { getResults, createResults, getUsers } from "./rest.js";
import { showRole } from "./sort.js";

let result;
let users;

window.addEventListener("load", initApp);

async function initApp() {
  updateResultsGrid();
  users = await getUsers();

  showRole(
    document.querySelector("#participantId"),
    "elitesvømmer",
    "participantId",
    "vælg deltager",
    users
  );
  document
    .querySelector("#create-statistics-btn")
    .addEventListener("click", showResultsDialog);
  document
    .querySelector("#form-create-statistics")
    .addEventListener("submit", createResultsClicked);
}

function showResultsDialog() {
  document.querySelector("#dialog-create-statistics").showModal();
}

async function updateResultsGrid() {
  result = await getResults();

  showResults(result, "butterfly");
  showResults(result, "crawl");
  showResults(result, "rygcrawl");
  showResults(result, "brystsvømning");
}

function showResults(results, discipline) {
  document.querySelector(`#${discipline}List`).innerHTML = "";
  //dom manipulation

  const filteredResults = filterByDiscipline(discipline, results);
  for (const result of filteredResults) {
    const html = /*HTML*/ `
        <li>${result.place}, ${result.time}, ${findParticipantByID(
      result.participantId
    )}</li>
`;
    document
      .querySelector(`#${discipline}List`)
      .insertAdjacentHTML("beforeend", html);
  }
}

async function createResultsClicked(event) {
  const form = event.target;
  const date = form.date.value;
  const discipline = form.discipline.value;
  const id = form.id.value;
  const meetName = form.meetName.value;
  const participantId = form.participantId.value;
  const place = form.place.value;
  const time = form.time.value;

  form.reset();
  const response = await createResults(
    date,
    discipline,
    id,
    meetName,
    participantId,
    place,
    time
  );
  if (response.ok) {
    updateResultsGrid();
  }
}

function filterByDiscipline(discipline, results) {
  return results.filter(result => result.discipline === discipline);
}

function findParticipantByID() {}
