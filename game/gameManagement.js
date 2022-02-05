const cellsOutput = require('../cell/cellsOutputs');
const actionType = require('../cell/actionTypes');

const prompt = require('prompt-sync')();

startGame = (board) => {
    let gameEnded = false
    while (!gameEnded) {
        board.printBoard(board);
        const action = prompt('Enter your action in (X,Y,1/-1) format: \n(X- length location, Y- width location, 1- expose, -1- flag) ');
        //gameEnded = executeAction(board, 0,0,1);
        gameEnded = executeAction(board, parseInt(action.split(",")[0]), parseInt(action.split(",")[1]), parseInt(action.split(",")[2]));
        if (gameEnded === false) {
            console.log("The new board is: ")
        }
        if (isGameOver(board)) {
            gameEnded = true;
            console.log("Congratulations! You won!")
        }
    }
}

executeAction = (board, x, y, pressType) => {
    const cell = board.board[x][y];
    if (cell.value === cellsOutput.BOMB) {
        if (pressType === actionType.EXPOSE) {
            console.log("Game Over! you pressed a bomb!");
            cell.output = cell.value;
            return true;
        } else if (pressType === actionType.FLAG) {
            cell.output = cellsOutput.FLAG;
            cell.isExposed = true;
        }
    } else if (!(cell.output === cellsOutput.UNEXPOSED)) {
        console.log("You already exposed this cell, try again");
    } else {
        if (pressType === actionType.EXPOSE) {
            if (cell.value === 0) {
                exposeCellAround(board, x, y);
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

const exposeCellAround = (board, x, y) => { //in case user pressed on empty cell
    for (let i = x - 1; i <= x + 1; i++) {
        for (let j = y - 1; j <= y + 1; j++) {
            try {
                let cell = board.board[i][j];
                if (!(i === x && j === y)) { // checking it's not me
                    cell.output = cell.value;
                    if (cell.value === 0 && cell.isExposed === false) {
                        cell.isExposed = true;
                        exposeCellAround(board, i, j);
                    }
                }
            } catch (e) {
                //if I have array index out of bound exception (and I do) I skip it.
            }
        }
    }
}

const isGameOver = (board) => {
    let unExposedCells = 0;
    let bombsAmount = 0;
    for (let i = 0; i < board.width; i++) {
        for (let j = 0; j < board.length; j++) {
            if(board.board[i][j].value === cellsOutput.BOMB) {
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