const countLetters = function (string) {
  // Convert all letters to lower case and remove all spaces.
  let noSpacing = string.toLowerCase().split(' ').join('');
  // Create an empty object
  let result = new Object();

  // Loop through each letter
  noSpacing.split('').forEach(letter => {
    /* 
    If a letter doesn't exists in result as a key (-1),
    create the key and assign a value of 1. If it exists, add 1 to the value. 
    */
    (Object.keys(result).indexOf(letter) === -1) ? result[letter] = 1 : result[letter]++;  
  })
  
  return result;
};

console.log(countLetters('lighthouse in the house'));
