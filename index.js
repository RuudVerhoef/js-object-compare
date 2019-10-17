function notSameValues(obj1, obj2) {
  for (key in obj1) {
    if (obj1[key] !== obj2[key] && typeof obj1[key] !== 'object') { return true }
    // Nested if to catch the recursion
    // If the recursive call return a true the calling function also needs to return true
    if (typeof obj1[key] === 'object') {
      if (notSameValues(obj1[key], obj2[key])) return true
    }
  }
}

// It seems to be a must to declare this function twice to prevent any errors coming
// from the module loader about not being able to find the function on its recursive call

function clearEmpties(obj) {
  for (var key in obj) {
    if (!obj[key] || typeof obj[key] !== 'object') {
      continue;
    }

    clearEmpties(obj[key]);
    if (Object.keys(obj[key]).length === 0) {
      delete obj[key];
    }
  }
  return obj;
}

function equalKeyValue(obj1, obj2) {
  let temp = {};
  for (key in obj1) {
    if (typeof obj2[key] !== 'object' && obj1[key] === obj2[key]) temp[key] = obj1[key];
    if (typeof obj2[key] === 'object') temp[key] = equalKeyValue(obj1[key], obj2[key])
  }
  return clearEmpties(temp);
}

function equalKey(obj1, obj2) {
  let temp = {};
  for (key in obj1) {
    if (typeof obj2[key] !== 'object' && obj2[key] !== undefined) temp[key] = undefined;
    if (typeof obj2[key] === 'object') temp[key] = equalKey(obj1[key], obj2[key])
  }
  return temp;
}

function in_A_ButNotIn_B(obj1, obj2) {
  let temp = {};
  for (key in obj1) {
    if (!obj2[key]) temp[key] = obj1[key];
    if (typeof obj2[key] === 'object') temp[key] = in_A_ButNotIn_B(obj1[key], obj2[key])
  }
  return clearEmpties(temp);
}

function sameContent(obj1, obj2) {
  // If any of the 2 objects has fields the other one does not have
  // they are not the same
  if (!(Object.keys(in_A_ButNotIn_B(obj1, obj2)).length === 0
    && Object.keys(in_A_ButNotIn_B(obj2, obj1)).length === 0)) {
    return false;
  }
  // If both have the same fields iterate over one of them to see
  // if one of the values is not the same
  if (notSameValues(obj1, obj2)) {
    return false;
  }

  // If no abnormailities were found return true
  return true;
}

module.exports = { clearEmpties, equalKey, equalKeyValue, in_A_ButNotIn_B, sameContent };
