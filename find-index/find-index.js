const findIndices = function (string) {
  // Convert all letters to lower case.
  let allLowerCase = string.toLowerCase();
  // Create an array consisting of unique letters in the given phrase
  let uniqueLetter = []; // ['l', 'i', 'g', ...]
  // Empty object
  let result = {};

  // Compile an array with unique letters found in the given phrase other than space
  allLowerCase.split('').forEach(char => {
    if (uniqueLetter.indexOf(char) === -1 && char !== ' ') uniqueLetter.push(char);
  })
  
  let key; // Object key
  let value; // Object value
  
  for (key of uniqueLetter){
    value = [];
    allLowerCase.split('').forEach((letter, index) => {
      if (letter === key) value.push(index);
    })
    result[key] = value;
  }

  // result = {l: [0], i: [1, 11] ...};
  return result;
};

console.log(findIndices('lighthouse in the house'));
