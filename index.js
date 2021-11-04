const { fetchBreedDescription } = require('./breedFetcher');

const args = (process.argv).slice(2);
const argString = args.toString();
let breedName = '';
// if more than one word, adjust breedName string
if (argString.includes(',')) {
  breedName = argString.replace(/,/g,' ');
} else {
  breedName = argString;
}

fetchBreedDescription(breedName, (error, desc) => {
  if (error) {
    console.log('Error fetch details:', error);
  } else {
    console.log(desc);
  }
});