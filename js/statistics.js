"use strict";

import { getResults, createResults } from "./rest.js";

let result;

window.addEventListener("load", initApp);

function initApp() {
  updateResultsGrid();

  document.querySelector("#create-statistics-btn").addEventListener("click", showResultsDialog);
  document.querySelector("#form-create-statistics").addEventListener("submit", createResultsClicked);
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
  console.log(results);
  //dom manipulation
  const html = /*HTML*/ `
        <li>${results.place},${results.time}, ${results.participantId}</li>
        <li>${results.place},${results.time}, ${results.participantId}</li>
        <li>${results.place},${results.time}, ${results.participantId}</li>
        <li>${results.place},${results.time}, ${results.participantId}</li>
        <li>${results.place},${results.time}, ${results.participantId}</li>

`;
  document.querySelector(`#${discipline}List`).insertAdjacentHTML("beforeend", html);
}

async function createResultsClicked(event) {
  const form = event.target;
  const date = event.date.value;
  const discipline = event.discipline.value;
  const id = event.id.value;
  const meetName = event.meetName.value;
  const participantId = event.participantId.value;
  const place = event.place.value;
  const time = event.time.value;
  form.reset();
  const response = await createResult(date, discipline, id, meetName, participantId, place, time);
  if (response.ok) {
    updateResultsGrid();
  }
}

/*async function createResult(meetName, date, place, participantId, discipline, time) {
  const jsObject = {
    meetName,
    date,
    place,
    participantId,
    discipline,
    time,
  };
  const postAsJson = JSON.stringify(jsObject);
  const response = await fetch(`${endpoint}/results.json`, {
    method: "POST",
    body: postAsJson,
  });
  console.log(`response: ${response}`);
  if (response.ok) {
    console.log("Result created");
  }
  return response;
}*/
