
const selfURL = "http://127.0.0.1:5500"
const apiURL = "http://127.0.0.1:5000"

var stadiumData = null

const getData = async () => {
    const response = await fetch(`${apiURL}/stadiums`);
    const myJson = await response.json();

    stadiumData = myJson

    displayData()
}

function displayData() {
    if (stadiumData == null) {
        return
    }
    var stadiumTable = document.getElementById('stadiumsBody')
    $("#stadiumsTable tbody").empty()
    var index = 0
    stadiumData.forEach(stadium => {
        var row = stadiumTable.insertRow(index)
        //console.log(stadium.st_stadiumName)
        var teamName = row.insertCell(0)
        var stadiumName = row.insertCell(1)
        var stadiumCapacity = row.insertCell(2)
        var stadiumSurface = row.insertCell(3)
        teamName.innerHTML = stadium.st_teamName
        stadiumName.innerHTML = stadium.st_stadiumName
        stadiumCapacity.innerHTML = stadium.st_capacity
        stadiumSurface.innerHTML = stadium.st_surface
        index++;
    });
    updateButtons()
}

function updateButtons() {
    var teamNameButton = document.getElementById('teamNameButton')
    var stadiumNameButton = document.getElementById('stadiumNameButton')
    var stadiumCapacityButton = document.getElementById('stadiumCapacityButton')
    var stadiumSurfaceButton = document.getElementById('stadiumSurfaceButton')

    teamNameButton.innerHTML = '^'
    stadiumNameButton.innerHTML = '^'
    stadiumCapacityButton.innerHTML = '^'
    stadiumSurfaceButton.innerHTML = '^'
}