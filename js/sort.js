"use strict";

// import { showUser } from "./rest.js";

function getAllRole(list, role) {
  console.log(list);
  console.log(`filtering for role: ${role}`);
  return list.filter(x => x.role === role);
}

export { getAllRole };
