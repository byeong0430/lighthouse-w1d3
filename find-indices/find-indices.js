const findIndices = function (string) {
  // Convert all letters to lower case.
  let allLowerCase = string.toLowerCase();

  // Create an array consisting of unique letters in the given phrase
  let uniqueLetter = []; // ['l', 'i', 'g', ...]

  // Empty object
  let result = {};

  for (let i = 0; i < allLowerCase.length; i++) {
    if (uniqueLetter.indexOf(allLowerCase[i]) === -1 && allLowerCase[i] !== ' ') {
      uniqueLetter.push(allLowerCase[i]);
    }
  }

  /* 
  Outcome
  result = {
    l: [0],
    i: [1, 11]
    ...
  };
  */

  for (let j = 0; j < uniqueLetter.length; j++) {
    // Keys
    let key = uniqueLetter[j];

    // Values
    let value = [];

    for (let k = 0; k < allLowerCase.length; k++) {
      if (allLowerCase[k] === key) {
        value.push(k);
      }
    }

    // Add the outcomes to result Object
    result[key] = value;
  }

  return result;
};

console.log(findIndices('lighthouse in the house'));
