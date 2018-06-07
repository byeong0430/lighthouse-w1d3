var data = {
  f01: {
    name: "Alice",
    age: 15,
    follows: ["f02", "f03", "f04"]
  },
  f02: {
    name: "Bob",
    age: 20,
    follows: ["f05", "f06"]
  },
  f03: {
    name: "Charlie",
    age: 35,
    follows: ["f01", "f04", "f06"]
  },
  f04: {
    name: "Debbie",
    age: 40,
    follows: ["f01", "f02", "f03", "f05", "f06"]
  },
  f05: {
    name: "Elizabeth",
    age: 45,
    follows: ["f04"]
  },
  f06: {
    name: "Finn",
    age: 25,
    follows: ["f05"]
  }
};


// Construct an object paring id, name, and age
const createDict = smData => {
  let dict = {}; 
  for (let id in smData) {
    dict[id] = {name: smData[id].name, age: smData[id].age};
  }

  return dict;
};

// idArray: array of ids to convert
// idNameDict: object where key-value is id-person's name
// convertTo: 'name' or 'age
function idConverter (idArray, idNameDict, convertTo) {
  let result = [];
  idArray.forEach(id => {
    result.push(idNameDict[id][convertTo]);
  })

  return result;
}

// countWhat is either 
// 1. 'follows' to get the number of people one followers
// 2. 'followedBy' to get the number of followers
// overAge: age limit for counting
const maxCount = (smData, countWhat, overAge) => {
  let count = 0; // Default number of followers
  console.log(smData);
  for (let smId in smData) {
    console.log((count < smData[smId][countWhat].length && smData[smId].age > overAge));
    // Find the max number of people each person follows
    if (count < smData[smId][countWhat].length && smData[smId].age > overAge)
      count = smData[smId][countWhat].length;
  }
  
  return count;
};
//console.log(maxCount(data, 'follows', 0));

// List everyone and for each of them, list the names of who they follow and who follows them
const findWhoFollows = smData => {
  let result = {};
  let idName = createDict(smData);

  //console.log(idName);
  let followedBy = [];
  for (let id in idName) {
    result[idName[id].name] = {name: idName[id].name}; // Create a sub-object with an each name as a key
    
    // Loop through the social medai object and check if an individual person's id exists in follows.
    // This means the person is followed!
    for (let smId in smData){
      if (smData[smId].follows.indexOf(id) !== -1) followedBy.push(smId);
    }

    // Convert an array of follower and followedBy id to an array of the corresponding names and save it to each sub-object
    result[idName[id].name].follows =  idConverter(smData[id].follows, idName, 'name');
    result[idName[id].name].followedBy = idConverter(followedBy, idName, 'name');
    followedBy = []; // Refresh followedBy after each iteration
  }

  /* 
  result = {
    f03: {
      name: 'Charlie',
      follows: ['Alice', 'Debbie', 'Finn],
      followedBy: ['Alice', 'Debbie']
    },
    ...
  }
  */

  return result;
};
//console.log(findWhoFollows(data));

const mostFollowers = (smData, countWhat, overAge) => {
  let mostFollower = [];
  let followerCount = maxCount(smData, countWhat, overAge);
  let idName = createDict(smData);

  // Find sub-object where the number of follows array length is equal to followerCount.
  Object.values(smData).find(objItem => {
    // Convert follows to an array of corresponding ages and filter ages less than/equal to overAge
    followerAges = idConverter(objItem.follows, idName, 'age').filter(age => age > overAge);
    if (followerAges.length === followerCount) mostFollower.push(objItem.name);
  });  
  let result = (mostFollower.length === 1) ? mostFollower[0] : mostFollower;

  return result;
};
//console.log(mostFollowers(data, 'follows', 0));

const mostFollowedBy = (smData, countWhat, overAge) => {
  let mostFollowedBy = []; 
  let followedBy = [];
  let idName = createDict(smData);
  let test = smData;
  
  for (let id in idName) {
    // Loop through the social medai object and check if an individual person's id exists in follows.
    // This means the person is followed!
    for (let smId in smData){
      if (smData[smId].follows.indexOf(id) !== -1) followedBy.push(smId);
    }
    
    // Convert an array of follower and followedBy id to an array of the corresponding names and save it to each sub-object
    smData[id]['followedBy'] = followedBy;
    followedBy = []; // Refresh followedBy after each iteration
  }
  let followedByCount = maxCount(smData, 'followedBy', overAge); // Count of how many followers you have

  // Find sub-object where the number of followedBy array length is equal to followedByCount.
  Object.values(smData).find(objItem => {
    // Convert follows to an array of corresponding ages and filter ages less than/equal to overAge
    followedAges = idConverter(objItem.followedBy, idName, 'age').filter(age => age > overAge);
    //console.log(idConverter(objItem.followedBy, idName, 'age'));
    //console.log(followedAges);
    //console.log('========');
    if (followedAges.length === followedByCount) {mostFollowedBy.push(objItem.name);};
  });

  let result = (mostFollowedBy.length === 1) ? mostFollowedBy[0] : mostFollowedBy;
  
  return result;
};
console.log(mostFollowedBy(data, 'followedBy', 30));

let mostFollowerOver30 = mostFollowers(data, 'follows', 30);
//console.log(mostFollowerOver30);

//let mostFollowedOver30 = mostFollowedBy(data, 'followed', 30);
//console.log(mostFollowedOver30);