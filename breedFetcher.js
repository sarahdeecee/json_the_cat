const request = require('request');

const args = (process.argv).slice(2);
const argString = args.toString();
let searchedBreed = '';
// if more than one word, adjust searchedBreed string
if (argString.includes(',')) {
  searchedBreed = argString.replace(/,/g,' ');
} else {
  searchedBreed = argString;
}

const breedFetcher = (url, breed) => {
  request(url, (error, response, body) => {
    // if error, error message and exit
    if (error) {
      console.log('Please enter a valid URL');
      process.exit();
    }
    const data = JSON.parse(body);
    //find name in object
    let breedData = data.find(catBreed => titleCase(catBreed.name) === titleCase(breed));
    if (!breedData) {
      //look for name in alt_names
      breedData = data.find(catBreed => catBreed['alt_names'] === titleCase(breed));
      if (!breedData) {
        //if not found
        console.log(`Could not find ${breed}.\nPlease enter another breed name.`);
        process.exit();
      }
    }
    console.log(breedData.description);
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

const URL = 'https://api.thecatapi.com/v1/breeds';
breedFetcher(URL,searchedBreed);