function buildMap(x,y) {
    let map = [];
    for (let i = 0; i < x; i++) {
        map[i] = [y];
    }

    for (let i = 0; i < x; i++) {
        for (let j = 0; j < y; j++) {
            map[i][j] = "?";
        }
    }
    return map;
}

function setBombs(map, bombsAmount) {
    while (bombsAmount > 0) {
        let randX = Math.floor(Math.random() * map.length);
        let randY = Math.floor(Math.random() * map[0].length);
        if (!(map[randX][randY] === "?")) {
            map[randX][randY] = "*";
            bombsAmount--;
        }
    }
    return map;
}

function printMap(map) {
    console.table(map);

    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[0].length; j++) {
        }
        console.log(map);
    }
}
exports.buildMap = buildMap;
exports.setBombs = setBombs;
exports.printMap = printMap;