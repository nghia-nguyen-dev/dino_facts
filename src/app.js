
// IIFE
(async function() {
    const res = await fetch('../dino.json');
    const data = await res.json();
    const { Dinos } = data
    console.log(Dinos);
}());

// Listener
const submitBtn = document.getElementById('btn')

submitBtn.addEventListener('click', () => {
    const name = document.getElementById('name').value
    const feet = parseInt(document.getElementById('feet').value)
    const inches = parseInt(document.getElementById('inches').value)
    const weight = parseInt(document.getElementById('weight').value)
    const diet = document.getElementById('diet').value

    const height = getHeight(feet, inches);

    const input = {
        name,
        height,
        weight,
        diet,
    }

    const human = new Human(input)
    console.log(human);
})

// Create Dino Constructor
function Dinosaur(data) {
    this.species = data.species
    this.height = data.height
    this.weight = data.weight
    this.diet = data.diet
}
// Create Dino Objects
// Create Human Object
function Human(input) {
    this.name = input.name
    this.height = input.height
    this.weight = input.weight
    this.diet = input.diet
}

// Use IIFE to get human data from form
// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches. 
// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.
// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.
// Generate Tiles for each Dino in Array
// Add tiles to DOM
// Remove form from screen
// On button click, prepare and display infographic




// Helper functions
function logInput(...rest) {
    console.log(rest);
}

function feetToInches(ft) {
    return ft * 12;
}

function getHeight(feet, inches) {
    feet = feetToInches(feet);
    return (feet + inches);
}