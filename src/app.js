// Global variables
const submitBtn = document.getElementById('btn');
const grid = document.getElementById('grid');

// Listener
submitBtn.addEventListener('click', async () => {
    const df = new DocumentFragment
    const dinoTiles = []
    const data = getUserInput();

    // Check that height and weight is not NaN
    if (isNaN(data.height) || isNaN(data.weight)) {
        alert('Your height and weight cannot be empty. Please enter again')
        return;
    }
  
    // 1. Create human object 2. Generate tile
    const human = new CreateHuman(data);
    const humanTile = generateTile(human);

    let dinos = await fetchDinoData();
    dinos = createPrototypeBond(dinos);

    // 1. Filter out pigeon 2. Generate tile 3. Push into tiles array
    const pigeon = dinos.pop()
    const fact = pigeon.defaultFact()
    const pigeonTile = generateTile(pigeon,fact)
    dinoTiles.push(pigeonTile)

    shuffleArray(dinos);

    // 1. Build out method list(strings) 2.Append 1 random method to the end
    const methodsNames = Object.keys(dinoMethods)
    const randomMethod = getRandomMethod(methodsNames)
    methodsNames.push(randomMethod)

    // 1. Generate tile for each method in the array 2. Push into tiles array 3. Remove from dinos array
    methodsNames.forEach(method => {
        const fact = dinos[0][method](human);
        const tile = generateTile(dinos[0], fact)

        dinoTiles.push(tile);
        dinos.shift()
    })

    shuffleArray(dinoTiles) // Else pigeon tile will always be the first
   
    // Insert human tile
    dinoTiles.splice(4, 0, humanTile)

    // Append to document fragment, then to DOM
    dinoTiles.forEach(tile => df.appendChild(tile))
    grid.appendChild(df)

    // Hide form
    document.querySelector('form').style.display = 'none'
})

// Add to prototype object via Object.create()
const dinoMethods = {

    compareWeight: function (human) {
        const weightDiff = Math.round(this.weight / human.weight)
        return `Weighs about ${weightDiff} times more than you`
    },

    compareHeight: function (human) {
        if (this.height < human.height) {
            return `You are ${(human.height / this.height).toFixed(1)} times taller than a ${this.species}`
        }
        return `Is about ${(this.height / human.height).toFixed(1)} times taller than you`
    },

    compareDiet: function (human) {
        if (this.diet === human.diet.toLowerCase()) {
            return `You are both ${this.diet + `s`}`
        } else {
            return `Unlike you, the ${this.species} is a ${this.diet}`
        }
    },

    location: function () {
        return `Lived in ${this.where}`
    },

    timePeriod: function () {
        return `Lived during ${this.when} time period`
    },

    defaultFact: function () {
        return this.fact
    },

}

// Human constructor
function CreateHuman(input) {
    this.name = input.name
    this.height = input.height
    this.weight = input.weight
    this.diet = input.diet
}

// Helper functions
function feetToInches(ft) {
    return ft * 12;
}

function getHeight(feet, inches) {
    isNaN(feet)? feet = 0: null
    isNaN(inches)? inches = 0: null
    feet = feetToInches(feet); 
    return (feet + inches);
}

function getUserInput() {
    let name = document.getElementById('name').value
    name === ''? name = 'You': null // Fallaback if name field is empty

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

function shuffleArray(array) {
    for (let i = (array.length - 1); i > 0; i--) {
        const j = Math.floor(Math.random() * i)
        const temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
}

async function fetchDinoData() {
    const res = await fetch('../dino.json');
    const data = await res.json();
    const { dinos } = data

    return dinos;
};

function createPrototypeBond(dinos) {
    return dinos.map(dino => {
        const temp = Object.create(dinoMethods) // return new object with link to dinoMethods' prototype
        return Object.assign(temp, dino) // copy properties from dino to temp
    })
}

function generateTile(obj, fact) {
    const div = document.createElement('div')
    div.classList.add('grid-item')

    if (obj.name) { // Check if object is human
        div.innerHTML =
        `<h3>${obj.name}</h3>
        <img src="./images/human.png">`;
    } else {
        div.innerHTML =
        `<h3>${obj.species}</h3>
        <img src="./images/${obj.species.toLowerCase()}.png">
        <p>${fact}</p>`;
    }

    return div;
}

function getRandomMethod(array) {
    const index = Math.floor(Math.random() * array.length);
    return array[index];
}
