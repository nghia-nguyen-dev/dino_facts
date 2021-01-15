
// IIFE
(async function() {
    const res = await fetch('../dino.json');
    const data = await res.json();
    let { dinos } = data
    console.log(dinos);

    // Example method
    const dinoMethods = {
        roar: function() {
            console.log(`ROARRRRRR`)
        }
    }

    // Attaching methods to the prototype
    dinos = dinos.map(dino => {
        const target = Object.create(dinoMethods)
        return Object.assign(target, dino)
    });

    console.log(dinos);

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
    this.where = data.where
    this.when = data.when
    this.funFact = data.fact
}

// Prototypes

Dinosaur.prototype.compareWeight = function (human) {
    const weightDiff = Math.round(this.weight / human.weight)
    return `Weighs about ${weightDiff} times more than you`
}

Dinosaur.prototype.compareHeight = function (human) {
    const heightDiff = Math.round(this.height / human.height)
    return `Is about ${heightDiff} times taller than you`
}

Dinosaur.prototype.compareDiet = function (human) {
    if (this.diet === human.diet) {
        return `You are both ${this.diet + `s`}`
    } else {
        return `Unlike you, the ${this.species} is a ${this.diet}`
    }
}

Dinosaur.prototype.location = function () {
    return `Lived in ${this.where}`
}

Dinosaur.prototype.timePeriod = function () {
    return `Lived during ${this.when}`
}

Dinosaur.prototype.funFact = function () {
    return this.funFact
}

Dinosaur.prototype.randomFact = function () {
    
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