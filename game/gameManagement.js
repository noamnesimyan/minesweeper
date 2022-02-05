const cellValue = require('../cell/cellsValues');
const actionType = require('../cell/actionTypes');
const outputs = require('../game/contactPlayer');
const {setParams} = require("../game/setParams");

const prompt = require('prompt-sync')();

startGame = (board) => {
    let gameEnded = false
    while (!gameEnded) {
        board.printBoard(board);
        const input = prompt(outputs.CREATE_NEW_BOARD);
        gameEnded = executeAction(board, setParams(input,0), setParams(input,1), setParams(input,2));

        if (isGameOver(board)) {
            gameEnded = true;
            console.log(outputs.WON_GAME);
        }
        if (gameEnded === false) {
            console.log(outputs.CREATE_NEW_BOARD)
        }

    }
}
executeAction = (board, x, y, pressType) => {
    const cell = board.board[x][y];

    if (cell.value === cellValue.BOMB) { // if the user press on bomb
        if (pressType === actionType.EXPOSE) {
            console.log(outputs.GAME_OVER);
            return true;
        } else if (pressType === actionType.FLAG) {
            cell.output = cellValue.FLAG;
        }
    }
    else if (cell.isExposed) { // if the user press on exposed cell
        console.log(outputs.EXPOSED_CELL);
    }
    else { // if the user press regular cell
        if (pressType === actionType.EXPOSE) {
            if (cell.value === 0) {
                exposeCellsAround(board, x, y);
            } else {
                cell.output = (cell.value);
                cell.isExposed = true;
            }
        } else if (pressType === actionType.FLAG) {
            cell.output = cellValue.FLAG;
        }
    }
    return false;
}

const exposeCellsAround = (board, x, y) => { //in case user pressed on empty cell, expose all cells around it
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
    //check if number of bombs equal to number of unexposed cells
    let unExposedCells = 0;
    let bombsAmount = 0;
    for (let i = 0; i < board.size; i++) {
        for (let j = 0; j < board.size; j++) {
            if (board.board[i][j].value === cellValue.BOMB) {
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