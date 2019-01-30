const fs = require('fs');
const path = require('path');
const readline = require('readline');
const enableSave = 1;//
const gameover = false;//gameend  
const playerNumber = ['X', 'O', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'Y', 'Z'];
const rl = readline.createInterface(process.stdin, process.stdout);

let settings = {
    playerSize: 2,
    boardSize: 3,
    winSequence: 3,
    currentPlayer: 0
};

main();

function StartGameQuestions() {
    rl.question('Resume a saved game? (Y/N)\n', saved_game => {
        saved_game = saved_game.toUpperCase();
        if (saved_game === 'YES' || saved_game === 'Y') {
            console.log('\nYou picked a saved game.\n');

            LoadGame(rl);
        }
        else if (saved_game === 'NO' || saved_game === 'N') {
            console.log('You picked a new game.');
            rl.question('How many players? (Maximum 26): ', players => {
                if (players <= 26) {
                    settings.playerSize = parseInt(players);
                    console.log(players);
                    rl.question('How large is the board? (Maximum:999): ', board_size => {
                        if (board_size <= 999) {
                            settings.boardSize = parseInt(board_size);
                            console.log(board_size);
                            rl.question('Win sequence count? ', win_sequence => {
                                if (win_sequence) {
                                    console.log(win_sequence);
                                    settings.winSequence = parseInt(win_sequence);
                                    beginGame(settings);
                                }
                                else {
                                    console.log('Not valid ');
                                    rl.close();
                                }
                            })
                        }
                        else {
                            console.log('Not valid');
                            StartGameQuestions();
                        }
                    })
                }
                else {
                    console.log('Not valid');
                    StartGameQuestions();
                }
            })
        } else if (saved_game === "save") {
            //game save
            saveGame();
        } else if (saved_game === "quit") {
            //game quit;
            quitGame();
        }
        else {
            console.log('Not valid.');
            StartGameQuestions();
        }

    })
}


var drawBoard = function (board_size) {
    var board = '';

    for (var row0 = 1; row0 <= board_size; row0++) {
        if (row0 === 1) {
            board += '    ' + row0;
        }
        else {
            board += '   ' + row0;
        }
    }

    for (var row = 1; row <= board_size; row++) {
        board += '\n' + row + '     ';

        for (var column = 1; column < board_size; column++) {
            board += '|   ';
        }
        board += '\n   ';

        if (row < board_size) {
            for (var row_col = 0; row_col < (board_size * 2 - 1); row_col++) {
                if (row_col % 2 !== 0) {
                    board += '+';
                }
                else {
                    board += '---';
                }
            }
        }
    }
    return board;
};

// take turn 
function cgTurn() {
    var sum = 0;
    for (var i = 0; i < 10; i++)if (jin[i] != 0) sum++;

    if (checkWin() == true) {
        gameover = true;
        if (XorO == 0) {
            document.getElementById("info").value = "O win!";
            player_won++; balance();
        }
        else {
            document.getElementById("info").value = "X win!";
            AI_won++; balance();
        }
        return;
    }
    if (sum == 9) {
        document.getElementById("info").value = "draw!";
        draw++; balance();
        return;
    }
    XorO = (XorO + 1) % 2;
    if (XorO == 0) document.getElementById("info").value = "turn O";
    else {
        document.getElementById("info").value = "turn X";
        if (enableAI == 1) AI(-1, 1);
    }
}

var LoadSavedGame = function (rl, dir, file) {


    fs.readFile(path.join(dir, file + ".xml"), (err, data) => {
        if (err) {
            console.error("Error, choose a different save", err);
        }
        else {
            MyCrumbyXmlParser(data.toString());
        }
    })

}

var MyCrumbyXmlParser = function (xmlString) {
    var aSave = [];
    aSave["players"] = xmlString.substring(xmlString.indexOf("<players>") + 9, xmlString.indexOf("</players>"));
    aSave["boardSize"] = xmlString.substring(xmlString.indexOf("<boardSize>") + 11, xmlString.indexOf("</boardSize>"));//-xmlString.indexOf("<boardSize>")-1);
    aSave["winSequence"] = xmlString.substring(xmlString.indexOf("<winSequence>") + 13, xmlString.indexOf("</winSequence>"));//-xmlString.indexOf("<winSequence>")-1);

    beginGame(aSave);
}

function LoadGame(rl) {

    rl.question("Enter your save file name " +
        "\nor press Return to see the list of saved games" +
        "\nor type Exit to return to the menu... \n", resp => {

            LoadSavedGame(rl, __dirname, resp);
        })
}


var activeBoard = [];

function beginGame(settings) {

    console.log('-----Game Started-----');
    activeBoard = createMatrix(settings.boardSize);
    board = drawBoard(settings.boardSize);
    console.log(board);
    recursiveAsyncReadLine();

}

var createMatrix = function (board_size) {
    let matrix = [];
    for (var i = 0; i < board_size; i++) {
        let row = [];
        for (var i1 = 0; i1 < board_size; i1++) {
            row.push(' ');
        }
        matrix.push(row);
    }

    console.log(matrix);
    return matrix;
};

function playerMoved(row, column, value) {
    console.log(row, column, value);
    if (activeBoard[row][column] === ' ') {
        console.log('player has moved');
        activeBoard[row][column] = value;
        console.log(activeBoard);
    } else {
        console.log('a player exists in that space, move invalid');
    }
    checkForWinner(activeBoard, value);
}

var recursiveAsyncReadLine = function () {

    if (settings.currentPlayer >= settings.playerSize) {
        settings.currentPlayer = 0;
    }
    rl.question('Enter a row,column (type save to save the game): ', function (answer) {
        if (answer == 'save')
            return rl.close();
        console.log('Your answer was:  ' + answer + '  "', playerNumber[settings.currentPlayer], '"');

        var grid = answer.split(',');
        playerMoved((parseInt(grid[0]) - 1), parseInt((grid[1]) - 1), playerNumber[settings.currentPlayer]);

        settings.currentPlayer++;
        recursiveAsyncReadLine();
    });
};

function checkForWinner(board, player) {
    if (checkRows(board, player) || checkDiagonals(board, player) || checkColumns(board, player) || win(board, player)) {
        console.log('user has won');
    } else {
        console.log('not a winner');
    }
}

function checkRows(board, player) {
    var win = false;
    for (var r = 0; r < board.length; r++) {
        var rowSum = 1;
        var previousVal = 'start';
        for (var t = 0; t < board[r].length; t++) {
            if (board[r][t] === player) {
                ++rowSum;
                if (previousVal !== board[r][t] && rowSum > 2) {
                    rowSum = 0;
                }
            }
            previousVal = board[r][t];
            if (rowSum > settings.winSequence) {
                win = true;
                break;
            }
        }
    }
    return win;
}

function update(x, y) {
    var v = matrix[x][y];
    if (v > 0) {
        chessLayer.graphics.drawArc(10, "green", [x * 130 + 65, y * 130 + 65, 40, 0, 2 * Math.PI]);
    } else if (v < 0) {
        chessLayer.graphics.drawLine(20, "#CC0000", [130 * x + 30, 130 * y + 30, 130 * (x + 1) - 30, 130 * (y + 1) - 30]);
        chessLayer.graphics.drawLine(20, "#CC0000", [130 * (x + 1) - 30, 130 * y + 30, 130 * x + 30, 130 * (y + 1) - 30]);
    }
}



function checkDiagonals(board, player) {
    //best(board, player);
    return false;
}

//add function 
function best(board, player) {
    var bestx;
    var besty;
    var bestv = 0;
    for (var x = 0; x < player.length; x++) {
        for (var y = 0; y < player.length; y++) {
            if (matrix[x][y] == 0) {
                matrix[x][y] = 1;
                step++;
                if (win(x, y)) {
                    step--;
                    matrix[x][y] = 0;
                    return { 'x': x, 'y': y, 'v': 1000 };
                } else if (isEnd()) {
                    step--;
                    matrix[x][y] = 0;
                    return { 'x': x, 'y': y, 'v': 0 };
                } else {
                    var v = worst().v;
                    step--;
                    matrix[x][y] = 0;
                    if (bestx == null || v >= bestv) {
                        bestx = x;
                        besty = y;
                        bestv = v;
                    }
                }
            }
        }
    }
    return { 'x': bestx, 'y': besty, 'v': bestv };
}

function checkColumns(board, player) {
    function transpose(a) {
        return Object.keys(a[0]).map(
            function (c) { return a.map(function (r) { return r[c]; }); }
        );
    }

    return checkRows(transpose(board), player);
}


function saveGame() {
    rl.question('want to saved game? (Y/N)\n', saved_game => {
        saved_game = saved_game.toUpperCase();
        if (saved_game === 'YES' || saved_game === 'Y') {
            console.log('\nYou picked a saved game.\n');
            LoadGame(rl);
            fs.writeFile(path.join(dir, "test.xml"), MyCrumbyXmlParser(data.toString()), (err, data) => {
                if (err) {
                    console.error("Error, choose a different save", err);
                }
                else {
                    StartGameQuestions();
                }
            })
        } else {
            return;
        }

    })
}

function quitGame() {
    rl.question('want to quit game? (Y/N)\n', quit_game => {
        saved_game = saved_game.toUpperCase();
        if (quit_game === 'YES' || quit_game === 'Y') {
            console.log('\nYou quit a game.\n');
            StartGameQuestions();

        } else {
            return;
        }

    })
}
//is win
function win(x, y) {
    if (Math.abs(matrix[x][0] + matrix[x][1] + matrix[x][2]) == 3) {
        return true;
    }
    if (Math.abs(matrix[0][y] + matrix[1][y] + matrix[2][y]) == 3) {
        return true;
    }
    if (Math.abs(matrix[0][0] + matrix[1][1] + matrix[2][2]) == 3) {
        return true;
    }
    if (Math.abs(matrix[2][0] + matrix[1][1] + matrix[0][2]) == 3) {
        return true;
    }
    return false;
}

function main() {
    console.log('Tic-Tac-Toe');
    console.log(
        '                  |   |   \n' +
        '               ---+---+--- \n' +
        '                  |   |   \n' +
        '               ---+---+--- \n' +
        '                  |   |   \n');

    StartGameQuestions();
}