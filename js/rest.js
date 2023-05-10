"use strict";

//all the rest are belong to this
const exampleUserStructure = {
  role: "", //trainer,administrative,swimmer,proSwimmer
  subscription: "senior", //junior, senior, retired, passive
  discipline: "butterfly", //butterfly, crawl, backCrawl and breastStroke
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

const endpoint =
  "https://delfindaba-16acc-default-rtdb.europe-west1.firebasedatabase.app/";

async function getUsers() {
  const response = await fetch(`${endpoint}/participant.json`);
  const data = await response.json();
  const users = prepareData(data);
  return users;
}

export { getUsers };

function prepareData(dataObject) {
  console.log(dataObject);
  const array = []; // define empty array
  // loop through every key in dataObject
  // the value of every key is an object
  for (const key in dataObject) {
    const object = dataObject[key]; // define object
    object.id = key; // add the key in the prop id
    array.push(object); // add the object to array
  }
  return array; // return array back to "the caller"
}
