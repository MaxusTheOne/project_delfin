"use strict";
//all the rest are belong to this
const exampleUserStructure = {
  subscription: "senior", //young, senior, retired, passive
  discipline: "butterfly", //butterfly, crawl, backCrawl and breastStroke
  age: 33,
  results: [],
  coach: "",
  firstName: "Taylor",
  lastName: "Swift",
  debt: 900,
  gender: "female",
  picture: "https://pbs.twimg.com/media/FTDgrd9X0AMLEuQ?format=jpg&name=medium",
};

const exampleResultStructure = {
  meetName: "The swifties swim",
  date: new Date("2015-03-25"),
  place: 1,
  participant: "",
  discipline: "butterfly", //butterfly, crawl, backCrawl and breastStroke
  time: 125, //formatted in seconds
};

const url = "https://delfindaba-16acc-default-rtdb.europe-west1.firebasedatabase.app/";
