/**
* This program is a boilerplate code for the standard tic tac toe game
* Here the “box” represents one placeholder for either a “X” or a “0”
* We have a 2D array to represent the arrangement of X or O is a grid
* 0 -> empty box
* 1 -> box with X
* 2 -> box with O
*
* Below are the tasks which needs to be completed:
* Imagine you are playing with the computer so every alternate move should be done by the computer
* X -> player
* O -> Computer
*
* Winner needs to be decided and has to be flashed
*
* Extra points will be given for approaching the problem more creatively
* 
*/

const grid = [];
const GRID_LENGTH = 3;
let turn = 'X';
let result=null;

function initializeGrid() {
    for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++) {
        const tempArray = [];
        for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
            tempArray.push(0);
        }
        grid.push(tempArray);
    }
}

function getRowBoxes(colIdx) {
    let rowDivs = '';
    
    for(let rowIdx=0; rowIdx < GRID_LENGTH ; rowIdx++ ) {
        let additionalClass = 'darkBackground';
        let content = '';
        const sum = colIdx + rowIdx;
        if (sum%2 === 0) {
            additionalClass = 'lightBackground'
        }
        const gridValue = grid[colIdx][rowIdx];
        if(gridValue === 1) {
            content = '<span class="cross">X</span>';
        }
        else if (gridValue === 2) {
            content = '<span class="cross">O</span>';
        }
        rowDivs = rowDivs + '<div colIdx="'+ colIdx +'" rowIdx="' + rowIdx + '" class="box ' +
            additionalClass + '">' + content + '</div>';
    }
    return rowDivs;
}

function getColumns() {
    let columnDivs = '';
    for(let colIdx=0; colIdx < GRID_LENGTH; colIdx++) {
        let coldiv = getRowBoxes(colIdx);
        coldiv = '<div class="rowStyle">' + coldiv + '</div>';
        columnDivs = columnDivs + coldiv;
    }
    return columnDivs;
}

function renderMainGrid() {
    result=decideWinner();  // decide Winner on every move
    if(result){
        if(result=="tie"){
            const parent = document.getElementById("gameResult");
            parent.innerHTML = '<div class="gameResult"><p>' + "Game Tied"+'</p>'+'<button id="refreshButton" onclick="restartGame()">Start Again</button>'+'</div>';
           
        }
        else{
        const parent = document.getElementById("gameResult");
        parent.innerHTML = '<div class="gameResult"><p >' + "Winner Found : "+result+'</p>'+'<button id="refreshButton" onclick="restartGame()">Start Again</button>'+ '</div>';
        }
    }
    
    const parent = document.getElementById("grid");
    const columnDivs = getColumns();
    parent.innerHTML = '<div class="columnsStyle">' + columnDivs + '</div>';
}


function decideWinner() {  
  for(var i=0;i<GRID_LENGTH;i++){
    if(grid[i][0]==grid[i][1]&&grid[i][1]==grid[i][2] && grid[i][0]!=" "){
        return grid[i][0]==1?"X":"O";
    }
    if(grid[0][i]==grid[1][i]&&grid[1][i]==grid[2][i]&& grid[0][i]!=" "){
        return grid[0][i]==1?"X":"O";
    }
  }
  if(grid[0][0]==grid[1][1]&&grid[1][1]==grid[2][2] && grid[0][0]!=" "){
    return grid[0][0]==1?"X":"O";
  }
  
if(grid[2][0]==grid[1][1]&&grid[1][1]==grid[0][2]&& grid[2][0]!=" "){
    return grid[2][0]==1?"X":"O";
}

let filledBoxes=0;
for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++) {

    for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
       if(grid[colIdx][rowidx]!=" "){
           filledBoxes++;
       }
    }
}

  if(filledBoxes==9){
      return "tie";
  }
}

function restartGame(){
    location.reload();
}

function onBoxClick() {

    // box clicking will not fill any new value after game results are announced
    if(result){
        return;
    }

    var rowIdx = this.getAttribute("rowIdx");
    var colIdx = this.getAttribute("colIdx");
    if( grid[colIdx][rowIdx]==" "&& turn=="X"){
        grid[colIdx][rowIdx]=1;
        turn="O";
    }
    if( grid[colIdx][rowIdx]==" "&& turn=="O"){
        grid[colIdx][rowIdx]=2;
        turn="X";
    }
    renderMainGrid();
    addClickHandlers();
  
}

function addClickHandlers() {
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].addEventListener('click', onBoxClick, false);
    }
}

initializeGrid();
renderMainGrid();
addClickHandlers();
