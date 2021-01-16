// Global variables
const submitBtn = document.getElementById('btn');
const grid = document.getElementById('grid');

// Fetch
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

// Listener
submitBtn.addEventListener('click', async () => {

    const data = getUserInput();
    const human = new CreateHuman(data)
    const humanTile = human.generateTile()

    let dinos = await fetchDinoData();
    dinos = createPrototypeBond(dinos);

    shuffleArray(dinos)

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

    generateTile: function (fact) {
        const div = document.createElement('div')

        div.innerHTML =
            `<h3>${this.species}</h3>
        <img src="./images/${this.species.toLowerCase()}.png">
        <p>${fact}</p>`

        return div;
    },

    getRandomFact: function () {

    }

}

// Human constructor
function CreateHuman(input) {
    this.name = input.name
    this.height = input.height
    this.weight = input.weight
    this.diet = input.diet
}

CreateHuman.prototype.generateTile = function () {
    const div = document.createElement('div')

    div.innerHTML = `<h3>${this.name}</h3> <img src="./images/human.png">`;
    return div;
}

// Helper functions
function feetToInches(ft) {
    return ft * 12;
}

function getHeight(feet, inches) {
    feet = feetToInches(feet);
    return (feet + inches);
}

function getUserInput() {
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

function shuffleArray(array) {
    for (let i = (array.length - 1); i > 0; i--) {
        const j = Math.floor(Math.random() * i)
        const temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
}
