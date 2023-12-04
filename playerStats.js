
const selfURL = "http://127.0.0.1:5500"
const apiURL = "http://127.0.0.1:5000"

var playerStatsData = null

var arrowDirections = []

arrowDirections.push({name: 'p_name', direction: 'up'})
arrowDirections.push({name: 'p_teamName', direction: 'up'})
arrowDirections.push({name: 'p_year', direction: 'up'})
arrowDirections.push({name: 'p_number', direction: 'up'})
arrowDirections.push({name: 'ps_height', direction: 'up'})
arrowDirections.push({name: 'ps_weight', direction: 'up'})
arrowDirections.push({name: 'ps_position', direction: 'up'})

var divToColumn = []
divToColumn.push({column: 'p_name', div: 'playerNameButton'})
divToColumn.push({column: 'p_teamName', div: 'teamNameButton'})
divToColumn.push({column: 'p_year', div: 'yearButton'})
divToColumn.push({column: 'p_number', div: 'playerNumberButton'})
divToColumn.push({column: 'ps_height', div: 'playerHeightButton'})
divToColumn.push({column: 'ps_weight', div: 'playerWeightButton'})
divToColumn.push({column: 'ps_position', div: 'playerPositionButton'})

const getData = async () => {
    const response = await fetch(`${apiURL}/playerStats`);
    const myJson = await response.json();

    playerStatsData = myJson
    console.log(playerStatsData)
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
    const response = await fetch(`${apiURL}/playerStats/${column}/${dir}`);
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

    playerStatsData = myJson

    displayData()
}

function displayData() {
    if (playerStatsData == null) {
        return
    }
    var playerStatsTable = document.getElementById('playerStatsBody')
    $("#playerStatsTable tbody").empty()
    var index = 0
    playerStatsData.forEach(playerStat => {
        var row = playerStatsTable.insertRow(index)
        //console.log(stadium.st_stadiumName)
        var playerName = row.insertCell(0)
        var teamName = row.insertCell(1)
        var year = row.insertCell(2)
        var number = row.insertCell(3)
        var height = row.insertCell(4)
        var weight = row.insertCell(5)
        var position = row.insertCell(6)
        playerName.innerHTML = playerStat.p_name
        teamName.innerHTML = playerStat.p_teamName
        year.innerHTML = playerStat.p_year
        number.innerHTML = playerStat.p_number
        height.innerHTML = playerStat.ps_height
        weight.innerHTML = playerStat.ps_weight
        position.innerHTML = playerStat.ps_position
        
        index++;
    });
    updateButtons()
}

function updateButtons() {
    var playerNameDiv = document.getElementById('playerNameDiv')
    var teamNameDiv = document.getElementById('teamNameDiv')
    var yearDiv = document.getElementById('yearDiv')
    var playerNumberDiv = document.getElementById('playerNumberDiv')
    var playerHeightDiv = document.getElementById('playerHeightDiv')
    var playerWeightDiv = document.getElementById('playerWeightDiv')
    var playerPositionDiv = document.getElementById('playerPositionDiv')

    var playerNameButton = document.getElementById('playerNameButton')
    var teamNameButton = document.getElementById('teamNameButton')
    var yearButton = document.getElementById('yearButton')
    var playerNumberButton = document.getElementById('playerNumberButton')
    var playerHeightButton = document.getElementById('playerHeightButton')
    var playerWeightButton = document.getElementById('playerWeightButton')
    var playerPositionButton = document.getElementById('playerPositionButton')

    let arr = [];
    arr.push(playerNameButton)
    arr.push(teamNameButton)
    arr.push(yearButton)
    arr.push(playerNumberButton)
    arr.push(playerHeightButton)
    arr.push(playerWeightButton)
    arr.push(playerPositionButton)
 
    let divArr = [];
    divArr.push(playerNameDiv)
    divArr.push(teamNameDiv)
    divArr.push(yearDiv)
    divArr.push(playerNumberDiv)
    divArr.push(playerHeightDiv)
    divArr.push(playerWeightDiv)
    divArr.push(playerPositionDiv)

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