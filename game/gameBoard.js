const cellObject = require('../cell/cellObject');
const cellType = require('../cell/cellsOutputs');

class GameBoard {

    constructor(width, length, bombsAmount) {
        this.width = width;
        this.length = length;
        this.buildBoard();
        this.setBombs(bombsAmount);
        this.setCellValues()
    }

    buildBoard = () => {

        //create the 2D array
        this.board = [this.width];
        for (let i = 0; i < this.width; i++) {
            this.board[i] = new Array(this.length);
        }

        // create every cell in the 2D array as a cellObject with initial values
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.length; j++) {
                this.board[i][j] = new cellObject.constructor('', false, '?'); //todo: no more magic strings
            }
        }
        return this.board;
    }

    setBombs = (bombsAmount) => {
        while (bombsAmount > 0) {
            let randX = Math.floor(Math.random() * this.width);
            let randY = Math.floor(Math.random() * this.length);
            if (!(this.board[randX][randY] === cellType.BOMB)) {
                this.board[randX][randY].value = cellType.BOMB;
                bombsAmount--;
            }
        }
        return this.board;
    }

    setCellValues = () => {
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.length; j++) {
                if(!(this.board[i][j].value === cellType.BOMB)) {
                    this.setCellValue(i,j);
                }
            }
        }
    }

    setCellValue = (x,y) => {
        let value = 0;
        //running on all cells around cell[x,y] and summing the amount of bombs
        for (let i = x - 1; i <= x + 1; i++) {
            for (let j = y - 1; j <= y + 1; j++) {
                try {
                    if (this.board[i][j].value === cellType.BOMB) {
                        value++;
                    }
                } catch (e) {
                  //  if(!(this.board[i][j] === undefined)) { //continue if the exception is index out of bound
                  //      console.log("something went wrong");
                  //      console.log(e.message);
                  //  }
                }
            }
        }
        this.board[x][y].value = value;
    }


    printBoard = () => {
        let res = '';
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.length; j++) {
                res += this.board[i][j].output + ' ';
            }
            res += '\n';
        }
        console.log(res);
    }
}

module.exports = new GameBoard();