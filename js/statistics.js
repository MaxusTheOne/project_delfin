"use strict";

import { getResults, createResults, getUsers } from "./rest.js";
import { showRole } from "./sort.js";

let result;
let users;
let genderOption = "alle";
let ageOption = "alle";

window.addEventListener("load", initApp);

async function initApp() {
  users = await getUsers();
  updateResultsGrid();

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
  document
    .querySelector("#sortByGender")
    .addEventListener("change", selectedGender);
  document.querySelector("#sortByAge").addEventListener("change", selectedAge);
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
  let filteredResults = filterByGender(genderOption, results);
  filteredResults = filterInactive(filteredResults);

  filteredResults = filterByAge(ageOption, filteredResults);

  filteredResults.sort((a, b) => a.time - b.time);

  filteredResults = filterByDiscipline(discipline, filteredResults);
  filteredResults = filteredResults.slice(0, 5);
  for (const result of filteredResults) {
    const participant = findParticipantByID(result.participantId);
    const html = /*HTML*/ `
        <li> ${result.place}. plads, ${convertTime(result.time)}, ${
      participant.firstName
    } ${participant.lastName}
    </li>
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
function filterInactive(list) {
  return list.filter(x => findParticipantByID(x.id) != undefined);
}

function filterByDiscipline(discipline, results) {
  return results.filter(result => result.discipline === discipline);
}

function findParticipantByID(participantId) {
  const participant = users.find(
    participants => participants.id == participantId
  );
  return participant;
}

function convertTime(timeInSeconds) {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;
  return `${minutes} min og ${seconds} sekunder`;
}

function selectedGender(event) {
  genderOption = event.target.value;
  updateResultsGrid();
  console.log(genderOption);
}

function selectedAge(event) {
  ageOption = event.target.value;
  updateResultsGrid();
  console.log(ageOption);
}

function filterByGender(genderOption, results) {
  if (genderOption === "alle") return results;
  return results.filter(
    result => findParticipantByID(result.participantId).gender === genderOption
  );
}

function filterByAge(ageOption, results) {
  if (ageOption === "alle") return results;
  return results.filter(
    result =>
      findParticipantByID(result.participantId).subscription === ageOption
  );
}
