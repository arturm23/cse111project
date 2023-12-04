
const selfURL = "http://127.0.0.1:5500"
const apiURL = "http://127.0.0.1:5000"

var stadiumData = null

var arrowDirections = []

arrowDirections.push({name: 'st_teamName', direction: 'up'})
arrowDirections.push({name: 'st_stadiumName', direction: 'up'})
arrowDirections.push({name: 'st_capacity', direction: 'up'})
arrowDirections.push({name: 'st_surface', direction: 'up'})

var divToColumn = []
divToColumn.push({column: 'st_teamName', div: 'teamNameButton'})
divToColumn.push({column: 'st_stadiumName', div: 'stadiumNameButton'})
divToColumn.push({column: 'st_capacity', div: 'stadiumCapacityButton'})
divToColumn.push({column: 'st_surface', div: 'stadiumSurfaceButton'})


const getData = async () => {
    const response = await fetch(`${apiURL}/stadiums`);
    const myJson = await response.json();

    stadiumData = myJson

    displayData()
}

const getDataSorted = async (div, dir) => {
    let column = ""
    let updated = -1

    for(let i = 0; i < divToColumn.length; i++) {
        console.log(div, divToColumn[i].div)
        if (div == divToColumn[i].div) {
            column = divToColumn[i].column
        }
    }
    const response = await fetch(`${apiURL}/stadiums/${column}/${dir}`);
    const myJson = await response.json(); 

    for(let i = 0; i < arrowDirections.length; i++) { 
        if(arrowDirections[i].name == column) {
            updated = i
            if (arrowDirections[i].direction == 'up') {
                arrowDirections[i].direction = 'down'
            } else if (arrowDirections[i].direction == 'down') {
                arrowDirections[i].direction = 'up'
            } 
        }
    }

    for(let i = 0; i < arrowDirections.length; i++) {
        if (i != updated) {
            arrowDirections[i].direction = 'up'
        }
    }

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
    var teamNameDiv = document.getElementById('teamNameDiv')
    var stadiumNameDiv = document.getElementById('stadiumNameDiv')
    var stadiumCapacityDiv = document.getElementById('stadiumCapacityDiv')
    var stadiumSurfaceDiv = document.getElementById('stadiumSurfaceDiv')

    var teamNameButton = document.getElementById('teamNameButton')
    var stadiumNameButton = document.getElementById('stadiumNameButton')
    var stadiumCapacityButton = document.getElementById('stadiumCapacityButton')
    var stadiumSurfaceButton = document.getElementById('stadiumSurfaceButton')


    let arr = [];
    arr.push(teamNameButton)
    arr.push(stadiumNameButton)
    arr.push(stadiumCapacityButton)
    arr.push(stadiumSurfaceButton)

    let divArr = []
    divArr.push(teamNameDiv)
    divArr.push(stadiumNameDiv)
    divArr.push(stadiumCapacityDiv)
    divArr.push(stadiumSurfaceDiv)


    for (let i = 0; i < arr.length; i++) {
        // console.log(divArr[i])
        // console.log(arr[i])
        let button = document.createElement('button');
        button.id = arr[i].id;
    
        if (arrowDirections[i].direction == 'up') {
            button.innerText = '^';
            button.setAttribute('onClick', `getDataSorted(this.id, 'Desc')`)
        } else if (arrowDirections[i].direction == 'down') {
            button.innerText = 'v';
            button.setAttribute('onClick', `getDataSorted(this.id, 'Asc')`)
        }
    
        divArr[i].replaceChild(button, arr[i]);
    }

}


