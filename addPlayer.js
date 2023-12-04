const selfURL = "http://127.0.0.1:5500"
const apiURL = "http://127.0.0.1:5000"

// Event listener for form submission
document.addEventListener("DOMContentLoaded", function() {
document.getElementById("addPlayer").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the form from submitting

    // Get form values
    var name = document.getElementById("addName").value;
    var teamName = document.getElementById("addTeamName").value;
    var year = document.getElementById("addYear").value;
    var number = document.getElementById("addNumber").value;
    var height = document.getElementById("addHeight").value;
    var weight = document.getElementById("addWeight").value;
    var position = document.getElementById("addPosition").value;

    // Validate form data
    if (!name || !teamName || !year || !number || !height || !weight || !position) {
        alert("All fields must be filled");
        return;
    }

    // Validate numeric fields
    if (isNaN(parseInt(year)) || isNaN(parseInt(number)) || isNaN(parseFloat(height)) || isNaN(parseFloat(weight))) {
        alert("Year, Number, Height, and Weight must be valid numbers");
        return;
    }

    // If all validations pass, you can proceed with further actions (e.g., sending data to a server)
    // For now, let's just log the data to the console
    console.log("Name:", name);
    console.log("Team Name:", teamName);
    console.log("Year:", year);
    console.log("Number:", number);
    console.log("Height:", height);
    console.log("Weight:", weight);
    console.log("Position:", position);

    addPlayer(name, teamName, year, number, height, weight, position)

   

    // Clear the form after submission
    document.getElementById("addPlayer").reset();
    });
});

const addPlayer = async (name, teamName, year, number, height, weight, position) => {
    const response = await fetch(`${apiURL}/addPlayer`, {
        method: 'POST',
        body: JSON.stringify({
            name: name,
            teamName: teamName,
            year: year,
            number: number,
            height: height,
            weight: weight, 
            position: position
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const myJson = await response.json()
}

