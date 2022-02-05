const cellsOutput = require('../cell/cellsOutputs');
const actionType = require('../cell/actionTypes');

const prompt = require('prompt-sync')();

startGame = (board) => {
    let gameEnded = false
    while (!gameEnded) {
        board.printBoard(board);
        const input = prompt('Enter your action in (X,Y,1/-1) format: \n(X- length location, Y- width location, 1- expose, -1- flag) ');
        gameEnded = executeAction(board, parseInt(input.split(",")[0]), parseInt(input.split(",")[1]), parseInt(input.split(",")[2]));
        if (isGameOver(board)) {
            gameEnded = true;
            console.log("Congratulations! You won!")
        }
        if (gameEnded === false) {
            console.log("The new board is: ")
        }

    }
}

executeAction = (board, x, y, pressType) => {
    const cell = board.board[x][y];

    if (cell.value === cellsOutput.BOMB) { // if the user pressed on bomb
        if (pressType === actionType.EXPOSE) {
            console.log("Game Over! you pressed a bomb!");
            return true;
        } else if (pressType === actionType.FLAG) {
            cell.output = cellsOutput.FLAG;
        }
    }
    else if (cell.isExposed) { // if the user pressed on exposed cell
        console.log("You already exposed this cell, try again");
    }
    else { // if the user pressed regular cell
        if (pressType === actionType.EXPOSE) {
            if (cell.value === 0) {
                exposeCellsAround(board, x, y);
            } else {
                cell.output = (cell.value);
                cell.isExposed = true;
            }
        } else if (pressType === actionType.FLAG) {
            cell.output = cellsOutput.FLAG;
        }
    }
    return false;
}

const exposeCellsAround = (board, x, y) => { //in case user pressed on empty cell
    for (let i = x - 1; i <= x + 1; i++) {
        for (let j = y - 1; j <= y + 1; j++) {
            try {
                let cell = board.board[i][j];
                cell.output = cell.value;
                if (cell.value === 0 && cell.isExposed === false) {
                    cell.isExposed = true;
                    exposeCellsAround(board, i, j);
                }
                cell.isExposed = true;
            } catch (e) {
                //if I have array index out of bound exception (and I do) I skip it.
            }
        }
    }
}

const isGameOver = (board) => {
    let unExposedCells = 0;
    let bombsAmount = 0;
    for (let i = 0; i < board.size; i++) {
        for (let j = 0; j < board.size; j++) {
            if (board.board[i][j].value === cellsOutput.BOMB) {
                bombsAmount++
            }
            if (!(board.board[i][j].isExposed)) {
                unExposedCells++;
            }
        }
    }
    return (unExposedCells === bombsAmount);
}

exports.executeAction = executeAction;
exports.startGame = startGame;