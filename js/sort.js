"use strict";

function showRole(roleSelector, role, name, defaultText, userList) {
  const allRoles = getAllRole(userList, role);
  const roleConst = role;
  // console.log(allCoaches);
  const roleList = document.createElement("select");
  roleList.name = name;

  const defaultRole = document.createElement("option");
  defaultRole.textContent = defaultText;
  roleList.appendChild(defaultRole);

  for (const role of allRoles) {
    // console.log(`creating: ${coach}`);
    const roleOption = document.createElement("option");
    roleOption.textContent = `${role.firstName} ${role.lastName}`;
    roleOption.value = `${role.id}`;
    roleOption.classList.add(`${roleConst}${role.id}`);
    roleList.appendChild(roleOption);
  }

  roleSelector.insertAdjacentElement("afterend", roleList);
}

function getAllRole(list, role) {
  console.log(`filtering for role: ${role}`);
  if (role === "alle") {
    return list;
  }
  return list.filter(x => x.role === role);
}

export { getAllRole, showRole };
