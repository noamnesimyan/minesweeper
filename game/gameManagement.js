const cellsOutput = require('../cell/cellsOutputs');
const actionType = require('../cell/actionTypes');

startGame = (board) => {
    let gameEnded = false
    while (!gameEnded) {
        gameEnded = executeAction(board, 0, 0, -1);
        if (gameEnded === false)  {
            console.log("The new board is: ")
            board.printBoard(board);
        }
        gameEnded = isGameOver(board);
    }
}

const isGameOver = (board) => {
    for(let i = 0; i < board.board.width; i++) {
        for (let j = 0; j < board.board.length; j++) {
            if(!board.board.isExposed) {
                return false;
            }
        }
    }
    return true;
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
        console.log("You can't press this cell, you already did!");
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
            cell.isExposed = true;
        }
    }
    return false;
}

const exposeCellAround = (board, x, y) => {
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
            }
        }
    }
}

exports.executeAction = executeAction;
exports.startGame = startGame;