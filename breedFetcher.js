const request = require('request');

const fetchBreedDescription = (breed, callback) => {
  const URL = 'https://api.thecatapi.com/v1/breeds';
  request(URL, (error, response, body) => {
    if (error) {
      callback(error, null);
    }
    const data = JSON.parse(body);
    //find name in object
    let breedData = data.find(catBreed => titleCase(catBreed.name) === titleCase(breed));
    if (!breedData) {
      //look for name in alt_names
      breedData = data.find(catBreed => catBreed['alt_names'] === titleCase(breed));
    }
    // if (!breedData) {
    //   throw new Error (`Could not find ${breed}.\nPlease enter another breed name.`);
    // } else {
    // }
    if (breedData) {
      callback(null, breedData.description);
    } else {
      callback(error, null);
    }
  });
};

const titleCase = (str) => {
  let result = "";
  for (let i = 0; i < str.length; i++) {
    if (str[i - 1] === ' ' || i === 0) {
      result += str[i].toUpperCase();
    } else {
      result += str[i].toLowerCase();
    }
  }
  return result;
};

module.exports = { fetchBreedDescription };