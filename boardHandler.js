const cellObject = require('./cellObject')

buildMap = (x,y) => {
    let board = [x];
    for (let i = 0; i < x; i++) {
        board[i] = new Array(y);
    }

    for (let i = 0; i < x; i++) {
        for (let j = 0; j < y; j++) {
            board[i][j] = new cellObject.constructor('', false, '?');
        }
    }
    return board;
}

setBombs = (board, bombsAmount) => {
    while (bombsAmount > 0) {
        let randX = Math.floor(Math.random() * board.length);
        let randY = Math.floor(Math.random() * board.length);
        if (!(board[randX][randY] === "*")) {
            board[randX][randY].setValue('*');
            bombsAmount--;
        }
    }
    return board;
}

printMap = (board) => {
    let res = '';
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            res += board[i][j].getOutput();
        }
        res += '\n';
    }
    console.log(res);

    //console.table(map);
}

exports.buildMap = buildMap;
exports.setBombs = setBombs;
exports.printMap = printMap;
