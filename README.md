# minesweeper
### OverView
This exercise I wrote in JavaScript using NodeJS.
The project is the backend of minesweeper game.

At first, I build the game board as a 2D array by the players choise (size and number of bombs).
for example, 4X4 board will look like this:

? ? ? ?
? ? ? ?
? ? ? ?
? ? ? ?


Now, each turn the player insert an action (expose cell [1] or mark it as a flag[-1]) in a specific cell (using X,Y coordinates).
Input will look like this: 0,1,1 -? (expose cell in position[0,1].
Possible outpuc can be :

? 1 ? ?
? ? ? ?
? ? ? ?
? ? ? ?



Which means that there are 1 bomb1 around this cell.
The game countinues as so until the player lose (expose a bomb) or win (expose all the cells except the bombs).
