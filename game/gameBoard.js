const cellObject = require('../cell/cellObject');
const cellValue = require('../cell/cellsValues');

class GameBoard {

    constructor(size, bombsAmount) {
        this.size = size;
        this.buildBoard();
        this.setBombs(bombsAmount);
        this.setCellsValues()
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
                this.board[i][j] = new cellObject.constructor('', false, cellValue.UNEXPOSED);
            }
        }
        return this.board;
    }

    setBombs = (bombsAmount) => {
        while (bombsAmount > 0) {
            //set bombs in random placed on the board
            let randX = Math.floor(Math.random() * this.size);
            let randY = Math.floor(Math.random() * this.size);
            if (!(this.board[randX][randY] === cellValue.BOMB)) {
                this.board[randX][randY].value = cellValue.BOMB;
                bombsAmount--;
            }
        }
        return this.board;
    }

    setCellsValues = () => { //set all the values of the cells by number of bombs around each one
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if (!(this.board[i][j].value === cellValue.BOMB)) {
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
                    if (this.board[i][j].value === cellValue.BOMB) {
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