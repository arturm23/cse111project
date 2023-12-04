
const selfURL = "http://127.0.0.1:5500"
const apiURL = "http://127.0.0.1:5000"

var teamStatsData = null

var arrowDirections = []

arrowDirections.push({name: 't_name', direction: 'up'})
arrowDirections.push({name: 'ts_wins', direction: 'up'})
arrowDirections.push({name: 'ts_losses', direction: 'up'})
arrowDirections.push({name: 'tr_rank', direction: 'up'})

var divToColumn = []
divToColumn.push({column: 't_name', div: 'teamNameButton'})
divToColumn.push({column: 'ts_wins', div: 'teamWinsButton'})
divToColumn.push({column: 'ts_losses', div: 'teamLossesButton'})
divToColumn.push({column: 'tr_rank', div: 'teamRankingButton'})



const getData = async () => {
    const response = await fetch(`${apiURL}/teamStats`);
    const myJson = await response.json();

    teamStatsData = myJson

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
    const response = await fetch(`${apiURL}/teamStats/${column}/${dir}`);
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

    teamStatsData = myJson

    displayData()
}

function displayData() {
    if (teamStatsData == null) {
        return
    }
    var teamStatsTable = document.getElementById('teamStatsBody')
    $("#teamStatsTable tbody").empty()
    var index = 0
    teamStatsData.forEach(teamStat => {
        var row = teamStatsTable.insertRow(index)
        //console.log(stadium.st_stadiumName)
        var teamName = row.insertCell(0)
        var wins = row.insertCell(1)
        var losses = row.insertCell(2)
        var rank = row.insertCell(3)
        teamName.innerHTML = teamStat.t_name
        wins.innerHTML = teamStat.ts_wins
        losses.innerHTML = teamStat.ts_losses
        rank.innerHTML = teamStat.tr_rank
        index++;
    });
    updateButtons()
}

function updateButtons() {
    var teamNameDiv = document.getElementById('teamNameDiv')
    var teamWinsDiv = document.getElementById('teamWinsDiv')
    var teamLossesDiv = document.getElementById('teamLossesDiv')
    var teamRankDiv = document.getElementById('teamRankingDiv')

    var teamNameButton = document.getElementById('teamNameButton')
    var teamWinsButton = document.getElementById('teamWinsButton')
    var teamLossesButton = document.getElementById('teamLossesButton')
    var teamRankButton = document.getElementById('teamRankingButton')

    let arr = [];
    arr.push(teamNameButton)
    arr.push(teamWinsButton)
    arr.push(teamLossesButton)
    arr.push(teamRankButton)
 

    let divArr = []
    divArr.push(teamNameDiv)
    divArr.push(teamWinsDiv)
    divArr.push(teamLossesDiv)
    divArr.push(teamRankDiv)



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