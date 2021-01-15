
// IIFE
(async function() {
    const res = await fetch('../dino.json');
    const data = await res.json();
    const { dinos } = data
  
    // Create link to dinoMethods prototype
    const x = dinos.map(dino => {
        const temp = Object.create(dinoMethods) // return new object with link to dinoMethods' prototype
        return Object.assign(temp, dino) // copy properties from dino to temp
    })

    console.log(x);
    return x;
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

    // Generate Tiles
    function generateTile(obj) {
        const div = document.createElement('div')

        if (obj.name) { // Check if obj is human
            div.innerHTML = `<h3>${obj.name}</h3>`;
            return div;
        } else {
            div.innerHTML = 
            `<h3>${obj.species}</h3>
            <img src="./images/${obj.species.toLowerCase()}.png">
            <p>${obj.fact}</p>`

            return div;
        }
    }

    // Append tiles to DOM
})


const dinoMethods = {

    compareWeight: function (human) {
        const weightDiff = Math.round(this.weight / human.weight)
        return `Weighs about ${weightDiff} times more than you`
    },
    
    compareHeight: function (human) {
        const heightDiff = Math.round(this.height / human.height)
        return `Is about ${heightDiff} times taller than you`
    },
    
    compareDiet: function (human) {
        if (this.diet === human.diet) {
            return `You are both ${this.diet + `s`}`
        } else {
            return `Unlike you, the ${this.species} is a ${this.diet}`
        }
    },
    
    location: function () {
        return `Lived in ${this.where}`
    },
    
    timePeriod: function () {
        return `Lived during ${this.when}`
    },
    
    funFact: function () {
        return this.fact
    },
    
    // randomFact: function () {
        
    // },
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