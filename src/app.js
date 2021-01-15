// Get input data from form
const submitBtn = document.getElementById('btn')

// Listener
submitBtn.addEventListener('click', function() {
    const name = document.getElementById('name').value
    const feet = parseInt(document.getElementById('feet').value)
    const inches = parseInt(document.getElementById('inches').value)
    const weight = document.getElementById('weight').value
    const diet = document.getElementById('diet').value

    const height = getHeight(feet, inches);

    logInput(name,height,weight,diet)
})

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

// Create Dino Constructor
// Create Dino Objects
// Create Human Object
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




