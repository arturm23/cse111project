
const selfURL = "http://127.0.0.1:5500"
const apiURL = "http://127.0.0.1:5000"

var seasonsData = null

var arrowDirections = []

arrowDirections.push({name: 's_year', direction: 'up'})
arrowDirections.push({name: 's_winner', direction: 'up'})

var divToColumn = []
divToColumn.push({column: 's_year', div: 'yearButton'})
divToColumn.push({column: 's_winner', div: 'winnerButton'})




const getData = async () => {
    const response = await fetch(`${apiURL}/seasons`);
    const myJson = await response.json();

    seasonsData = myJson

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
    const response = await fetch(`${apiURL}/seasons/${column}/${dir}`);
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

    seasonsData = myJson

    displayData()
}

function displayData() {
    if (seasonsData == null) {
        return
    }
    var seasonsTable = document.getElementById('seasonsBody')
    $("#seasonsTable tbody").empty()
    var index = 0
    seasonsData.forEach(season => {
        var row = seasonsTable.insertRow(index)
        //console.log(stadium.st_stadiumName)
        var year = row.insertCell(0)
        var winner = row.insertCell(1)
        year.innerHTML = season.s_year
        winner.innerHTML = season.s_winner
        index++;
    });
    updateButtons()
}

function updateButtons() {
    var yearDiv = document.getElementById('yearDiv')
    var winnerDiv = document.getElementById('winnerDiv')

    var yearButton = document.getElementById('yearButton')
    var winnerButton = document.getElementById('winnerButton')

    let arr = [];
    arr.push(yearButton)
    arr.push(winnerButton)
 

    let divArr = []
    divArr.push(yearDiv)
    divArr.push(winnerDiv)

    for (let i = 0; i < arr.length; i++) {
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