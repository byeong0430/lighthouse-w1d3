const findIndices = function (string) {
  // Create a function that filters out only unique values, except spacing (' ')
  // Reference: https://www.w3schools.com/jsref/jsref_filter.asp
  const getUnique = (value, index, arr) => (arr.indexOf(value) === index) && (value !== ' ');

  // Convert all letters to lower case.
  let allLowerCase = string.toLowerCase();
  // Create an array consisting of unique letters in the given phrase
  let uniqueLetter = allLowerCase.split('').filter(getUnique);
  let result = {}; let objKey; let objValue;
  
  /* 
  Loop through unique letters and compare them to each letter of the phrase.
  If each character matches the unique letter, push its index into objValue Array
  */
  for (objKey of uniqueLetter){
    objValue = [];
    allLowerCase.split('').forEach((letter, index) => {
      if (letter === objKey) objValue.push(index);
    })
    result[objKey] = objValue; // Save the object key-value pairs
  }

  // result = {l: [0], i: [1, 11] ...};
  return result;
};

console.log(findIndices('lighthouse in the house'));
