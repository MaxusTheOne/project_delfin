"use strict";

//all the rest are belong to this
const exampleUserStructure = {
  role: "", //træner,svømmer,elitesvømmer
  subscription: "senior", //junior, senior, pensionist, passiv
  discipline: "butterfly", //butterfly, crawl, rygcrawl and brystsvømning
  age: 33,
  coachId: "",
  firstName: "Taylor",
  lastName: "Swift",
  debt: 900,
  gender: "female",
  image: "https://pbs.twimg.com/media/FTDgrd9X0AMLEuQ?format=jpg&name=medium",
};

const exampleResultStructure = {
  meetName: "The swifties swim",
  date: "2015-03-25",
  place: 1,
  participantId: "",
  discipline: "butterfly", //butterfly, crawl, backCrawl and breastStroke
  time: 125, //formatted in seconds'
};
let lastTime = 0;
let swimmers = [];

const endpoint =
  "https://delfindaba-16acc-default-rtdb.europe-west1.firebasedatabase.app/";

async function getUsers() {
  const now = Date.now();
  if (now - lastTime > 10000 || swimmers.length === 0) {
    await refetchUserData();
  }
  const after = Date.now();
  console.log("Time to fetch " + (after - now) + " milliseconds");
  return swimmers;
}

async function refetchUserData() {
  console.log("Refetch data");
  const response = await fetch(`${endpoint}/participant.json`);
  const data = await response.json();
  swimmers = prepareData(data);
  lastTime = Date.now();
  // console.log(swimmers);
  return swimmers;
}

async function createUser(
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
) {
  const jsObject = {
    role,
    subscription,
    discipline,
    age,
    coachId,
    firstName,
    lastName,
    debt,
    gender,
    image,
  };
  const postAsJson = JSON.stringify(jsObject);
  // console.log(`postAsJson: ${postAsJson}`);
  const response = await fetch(`${endpoint}/participant.json`, {
    method: "POST",
    body: postAsJson,
  });
  // console.log(`response: ${response}`);
  if (response.ok) {
    console.log("created");
    await refetchUserData();
  }
  return response;
}

async function deleteUser(id) {
  const response = await fetch(`${endpoint}/participant/${id}.json`, {
    method: "DELETE",
  });
  if (response.ok) {
    console.log("Deleted");
    await refetchUserData();
  }
  return response;
}

async function updateUser(
  id,
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
) {
  const userToUpdate = {
    id,
    role,
    subscription,
    discipline,
    age,
    coachId,
    firstName,
    lastName,
    debt,
    gender,
    image,
  };
  const postAsJson = JSON.stringify(userToUpdate);
  const url = `${endpoint}/participant/${id}.json`;
  const response = await fetch(url, { method: "PUT", body: postAsJson });
  if (response.ok) {
    console.log("updated");
    await refetchUserData();
  }
  return response;
}

async function getResults() {
  const response = await fetch(`${endpoint}/results.json`);
  const data = await response.json();
  const results = prepareData(data);
  // console.log(results);
  return results;
}

async function createResults(
  date,
  discipline,
  id,
  meetName,
  participantId,
  place,
  time
) {
  const jsObject = {
    date,
    discipline,
    id,
    meetName,
    participantId,
    place,
    time,
  };
  const postAsJson = JSON.stringify(jsObject);
  // console.log(`postAsJson: ${postAsJson}`);
  const response = await fetch(`${endpoint}/results.json`, {
    method: "POST",
    body: postAsJson,
  });
  // console.log(`response: ${response}`);
  if (response.ok) {
    console.log("created");
  }
  return response;
}

function prepareData(dataObject) {
  // console.log(dataObject);
  const array = [];
  for (const key in dataObject) {
    const object = dataObject[key];
    object.id = key;
    array.push(object);
  }
  return array;
}

export {
  getUsers,
  createUser,
  deleteUser,
  updateUser,
  getResults,
  createResults,
  endpoint,
  refetchUserData,
};
