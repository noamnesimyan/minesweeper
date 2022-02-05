const cellObject = require('../cell/cellObject');
const cellOutput = require('../cell/cellsOutputs');

class GameBoard {

    constructor(size, bombsAmount) {
        this.size = size;
        this.buildBoard();
        this.setBombs(bombsAmount);
        this.setCellValues()
    }

    buildBoard = () => {

        //create the 2D array
        this.board = [this.size];
        for (let i = 0; i < this.size; i++) {
            this.board[i] = new Array(this.size);
        }

        // create every cell in the 2D array as a cellObject with initial values
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                this.board[i][j] = new cellObject.constructor('', false, cellOutput.UNEXPOSED);
            }
        }
        return this.board;
    }

    setBombs = (bombsAmount) => {
        while (bombsAmount > 0) {
            let randX = Math.floor(Math.random() * this.size);
            let randY = Math.floor(Math.random() * this.size);
            if (!(this.board[randX][randY] === cellOutput.BOMB)) {
                this.board[randX][randY].value = cellOutput.BOMB;
                bombsAmount--;
            }
        }
        return this.board;
    }

    setCellValues = () => {
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if (!(this.board[i][j].value === cellOutput.BOMB)) {
                    this.setCellValue(i, j);
                }
            }
        }
    }

    setCellValue = (x, y) => {
        let value = 0;
        //running on all cells around cell[x,y] and summing the amount of bombs
        for (let i = x - 1; i <= x + 1; i++) {
            for (let j = y - 1; j <= y + 1; j++) {
                try {
                    if (this.board[i][j].value === cellOutput.BOMB) {
                        value++;
                    }
                } catch (e) {
                    //if I have array index out of bound exception (and I do) I skip it.
                }
            }
        }
        this.board[x][y].value = value;
    }


    printBoard = () => {
        let res = '';
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                res += this.board[i][j].output + ' ';
            }
            res += '\n';
        }
        console.log(res);
    }
}

module.exports = new GameBoard();