var grid = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
];

/*
Key:

grid[row][column]
0 = no color
1 = red
2 = blue
3 = highlighted red
4 = highlighted blue
*/

var canvasX = 1000;
var canvasY = canvasX - canvasX / 7;
var spacing = 10;
var tileSize = canvasX / grid[0].length;
var tileSpacing = 15;
var turn = 1;
//var bot = new greedybot(2);



function setup() {
    createCanvas(canvasX, canvasY);
    background(100, 139, 255); //background color
    drawGrid();
}

function draw() {
    highlight();
	
}

function mouseMoved(){
	drawGrid();
}



function mouseClicked() {

    // i is column and checkColumn(i) is the height of the piece from the bottom of the board

    var loc = mouseLoc();

	if(loc.column != null && loc.row != null){
		if( loc.row != -1){
			grid[loc.row].splice(loc.column, 1, turn);
			console.log(winConditions(loc.column, loc.row, turn, grid));
			    if (turn === 1) {
					turn = 2;
				} else {
					turn = 1;
				}
		}
	}
	drawGrid();
};

var botMove = function(bot){
	
}



/*
highlight();
highlights where your piece is going to be placed
↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
*/
var highlight = function () {
    var loc = mouseLoc();
	if(loc.row != null && loc.row != null){
		if (turn === 1) {
			fill(255, 120, 120); //highlighted red piece
			ellipse(loc.column * tileSize + tileSize / 2, loc.row * tileSize + tileSize / 2, tileSize - tileSpacing, tileSize - tileSpacing);
		}
		if (turn === 2) {
			fill(255, 255, 150); //highlighted yellow piece
			ellipse(loc.column * tileSize + tileSize / 2, loc.row * tileSize + tileSize / 2, tileSize - tileSpacing, tileSize - tileSpacing);
		}
	} 
};

/*
mouseLoc();
Returns x & y in a object. The x & y are in terms of the 7/6 grid
The y position is where the next piece should go
↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
 */
var mouseLoc = function () {
    var row = null;
    var column = null;

    for (var i = 0; i < 7; i++) {
        if (mouseX > i * tileSize && mouseX < i * tileSize + tileSize) {
            column = i;
			if(row === null){row = 0;}
            for (var j = 0; j < grid.length; j++) {
				//if the selected part of the grid is a piece (1 or 2)
                if (grid[grid.length - j - 1][i] === 1 || grid[grid.length - j - 1][i] === 2) {
					row++;
                }
            }

        }
    }
	if(row === null && column === null){
		return {
			column: null,
			row: null
		};
	}else{
		return {
			column: column,
			row: grid.length - row - 1
		};
	}
};

/*
drawGrid();
Draws the connect 4 grid.
Depends on my 2D array "grid"
0 = no color
1 = red
2 = yellow
3 = highlighted red piece
4 = highlighted yellow piece
↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
*/
var drawGrid = function () {

    // Rows
    for (var i = 0; i < grid.length; i++) {
        //Columns
        for (var j = 0; j < grid[i].length; j++) {
            
            if (grid[i][j] === 0) {
                fill(255, 255, 255); //no piece
                ellipse(j * tileSize + tileSize / 2, i * tileSize + tileSize / 2, tileSize - tileSpacing, tileSize - tileSpacing);
            }
            if (grid[i][j] === 1) {
                fill(255, 0, 0); //red
                ellipse(j * tileSize + tileSize / 2, i * tileSize + tileSize / 2, tileSize - tileSpacing, tileSize - tileSpacing);
            }
            if (grid[i][j] === 2) {
                fill(255, 255, 0); //yellow
                ellipse(j * tileSize + tileSize / 2, i * tileSize + tileSize / 2, tileSize - tileSpacing, tileSize - tileSpacing);
            }
			/*
            if (grid[i][j] === 3) {
                if (mouseLoc().row == i && mouseLoc().column == j) {
                    grid[i][j] = 0;
                    fill(255, 120, 120); //highlighted red piece
                    ellipse(j * tileSize + tileSize / 2, i * tileSize + tileSize / 2, tileSize - tileSpacing, tileSize - tileSpacing);
                }
            }
            if (grid[i][j] === 4) {
                if (mouseLoc().row == i && mouseLoc().column == j) {
                    grid[i][j] = 0;
                    fill(255, 255, 150); //highlighted yellow piece
                    ellipse(j * tileSize + tileSize / 2, i * tileSize + tileSize / 2, tileSize - tileSpacing, tileSize - tileSpacing);
                }
				
            }  
			*/
        }
    }
}

// grid[row][column]
// y = column
// x = row
var winConditions = function (column, row, turn, thisGrid) {
    var countH = 1;
    var countV = 1;
    var countUL = 1;
    var countUR = 1;
    //use +1 to count the piece you just placed
    //console.log("x: " + column + " y: " + row);
    //console.log(thisGrid);

    for (i = 1; i < 4; i++) {
        // checks down
        if (row + i < 6 && thisGrid[row + i][column] === turn) {
            countV++;
        }
        // checks up
        if (row - i > 0 && thisGrid[row - i][column] === turn) {
            countV++;
        }
        //counts right
        if (column + i < 7 && thisGrid[row][column + i] === turn) {
            countH++;
        }
        //counts left
        if (column - i > 0 && thisGrid[row][column - i] === turn) {
            countH++;
        }
        //counts diagonally up-right
        if (column + i < 7 && row - i > 0 && thisGrid[row - i][column + i] === turn) {
            countUR++;
        }
        //counts diagonally up-left
        if (column - i > 0 && row - i > 0 && thisGrid[row - i][column - i] === turn) {
            countUL++;
        }
        //counts diagonally down-right
        if (column + i < 7 && row + i < 6 && thisGrid[row + i][column + i] === turn) {
            countUL++;
        }
        //counts diagonally down-left
        if (column - i > 0 && row + i < 6 && thisGrid[row + i][column - i] === turn) {
            countUR++;
        }


    }

    if (countH >= 4 || countV >= 4 || countUL >= 4 || countUR >= 4) {
        return true;
    }
    return false;
}

var winScreen = function (turn) {
    textSize(64);
    text("player " + turn + " wins!", canvasX / 2, canvasY / 2);
    textAlign(CENTER);
    fill(0, 102, 153);
}