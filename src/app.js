// Global
const submitBtn = document.getElementById('btn');
const grid = document.getElementById('grid');

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

    x.forEach(dino => {
        const dinoTile = dino.generateTile()
        grid.appendChild(dinoTile)
    })
    console.log(x);
}());

// Listener
submitBtn.addEventListener('click', () => {
    
    const data = userInput();
    const human = new CreateHuman(data)
    const humanTile = human.generateTile()
    grid.appendChild(humanTile)

    // Generate Tiles
  

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
    
    location: function() {
        return `Lived in ${this.where}`
    },
    
    timePeriod: function() {
        return `Lived during ${this.when}`
    },
    
    funFact: function() {
        return this.fact
    },

    generateTile: function() {
        const div = document.createElement('div')

        if (this.name) { // Check if obj is human
            div.innerHTML = `<h3>${this.name}</h3>`;
            return div;
        } else {
            div.innerHTML = 
            `<h3>${this.species}</h3>
            <img src="./images/${this.species.toLowerCase()}.png">
            <p>${this.fact}</p>`

            return div;
        }
    },
    
    // randomFact: function () {
        
    // },
}



// Create Human Object
function CreateHuman(input) {
    this.name = input.name
    this.height = input.height
    this.weight = input.weight
    this.diet = input.diet
}

CreateHuman.prototype.generateTile = function() {
    const div = document.createElement('div')
    
    div.innerHTML = `<h3>${this.name}</h3> <img src="./images/human.png">`;
    return div;
}

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

function userInput() {
    const name = document.getElementById('name').value
    const feet = parseInt(document.getElementById('feet').value)
    const inches = parseInt(document.getElementById('inches').value)
    const weight = parseInt(document.getElementById('weight').value)
    const diet = document.getElementById('diet').value

    const height = getHeight(feet, inches);

    return {
        name,
        height,
        weight,
        diet,
    }
}

