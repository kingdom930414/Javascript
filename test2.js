const fs = require('fs');
const path = require('path');
const readline = require('readline');
const playerLetters = ['X', 'O', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'Y', 'Z'];
const rl = readline.createInterface(process.stdin, process.stdout);

var config = {
    playerNum: 2,
    boardSize: 3,
    row: 3,
    col: 3,
    winSequence: 3,
    curPlayer: 0,
    double: false
};
var curMove = {
    curPlayer: 0,
    col: 0,
    row: 0
}



function Init() {
    rl.question('Resume a saved game? (Y/N)\n', saved_game => {
        saved_game = saved_game.toUpperCase();
        switch(saved_game){
            case 'Y':
                console.log('\nYou picked a saved game.\n');
                Load(rl);
                break;
            case 'N':
                console.log('You start a new game.');
                config.double = false;
                rl.question('How many players? (Maximum 26): ', players => {
                    if (players <= 26 && players >= 2) {
                        config.playerNum = parseInt(players);
                        console.log(players);
                        rl.question('How is the board size? (Maximum:999): ', board_size => {
                            let row = parseInt(board_size.split(" ")[0]);
                            let col = parseInt(board_size.split(" ")[1]);
                            if (board_size <= 999 || row * col <= 999) {
                                if (board_size >= 3 || (row * col >= 9)) {
                                    config.boardSize = parseInt(board_size);
                                    config.row = row;
                                    config.col = col;
                                    rl.question('Win sequence count? ', winSequence => {
                                        if (parseInt(winSequence) > 0 && parseInt(winSequence) <= (row * col ? row * col : parseInt(board_size))) {
                                            if (((row * col) ? (row * col) : (board_size * board_size)) / winSequence >= players - 1) {
                                                console.log(winSequence);
                                                config.winSequence = parseInt(winSequence);
                                                begin(config);
                                            } else {
                                                console.log('Nobody can win.');
                                                Init();
                                            }
    
                                        }
                                        else {
                                            console.log('You input argument is wrong, no one can win');
                                            Init();
                                        }
                                    })
                                } else {
                                    console.log('BoardSize is too small, please input a number from 0 to 999.');
                                    Init();
                                }
                            }
                            else {
                                console.log(board_size+' need to be a number or small than 999');
                                Init();
                            }
                        })
                    }
                    else {
                        console.log(players+' is not enough or too much, players input another number');
                        Init();
                    }
                })
                break;
        default:
            console.log('Not valid.');
            Init();
        }
    })
}

const drawBoard = (board_size, data) => {
    var drawboard = '';
	var head = "   ";
    var tail = "   ";
    var barrier = "   ";
    for(var i=0;i<board_size-1;i++){
        tail += "|   "; 
        barrier += "---+";
    }
    barrier += "---";
    for(var i=1;i<=board_size;i++){
        if(i<10)
        {
            head += " "+i+"  ";
        }else if(i>9&&i<100){
            head += " "+i+" ";
        }else if(i>99&&i<1000){      
            head += ""+i+" ";
        }
    }
    drawboard = drawboard + head;
    console.log(head);
    for(var i=1;i<=board_size;i++){
        if(i<10)
        {
            drawboard = drawboard +" "+i+" "+tail;
            console.log(" "+i+" "+tail);
        }else if(i>9&&i<100){
            drawboard = drawboard + ""+i+" "+tail;
            console.log(""+i+" "+tail);
        }else if(i>99&&i<1000){
            drawboard = drawboard + i+tail;
            console.log(i+tail);
        }
        if(i<board_size){
            drawboard = drawboard + barrier;
            console.log(barrier);
        }
    }

    return drawboard;
};


var loadTxt = function (rl, dir, file) {
    fs.readFile(path.join(dir, file + ".txt"), 'utf-8', (e, data) => {
        if (e) {
            console.eor("Error, file doesn't exist!", e);
        }
        else {
            console.log('----------Game loading----------');
            let gamedata = JSON.parse(data);
            let { playerNum, boardSize, winSequence, curPlayer } = gamedata;
            console.log("Player number: "+playerNum);
            console.log("Boardsize: "+boardSize);
            console.log("WinSequence"+winSequence);
            console.log("curPlayer: "+curPlayer); 
            begin(gamedata, 1, gamedata);
            
        }
    })

}


const saveGameTxt = (file, data) => {
    fs.writeFile(path.join(__dirname, file + ".txt"), data, { encoding: 'utf8', mode: 438 /*=0666*/, flag: 'w' }, (e, data) => {
        if (e) {
            console.log('Exception occured, please try again');
        } else {
            console.log('-----------Game Saved----------.');
        }
    })
}

function Load(rl) {
    rl.question("Input your saved file name without the extension of the file,just file name.(such as test.txt,just input test) \n" +
        "\nor type exit or e ,return to the menu. \n", resp => {
            if (resp.toLowerCase() == 'exit' || resp == 'e') {
                console.log('-------------Menu-------------');
                Init();
            } else {
                loadTxt(rl, __dirname, resp);
            }
        })
}


var validBoard = [];

function begin(settings, resume, resumedata) {
    if (resume) {
        console.log('---------Game Started---------');
        validBoard = settings.size;
        console.log(validBoard);
        drawMove(validBoard);
        ReadLine(validBoard, resumedata);
    } else {
        console.log('---------Game Started---------');
        validBoard = chessboard(config.boardSize, config);
        board = drawBoard(config.boardSize, config);
        ReadLine(validBoard);
    }
}

const chessboard = (board_size,data) => {
    let chessboard = [];
    if(data.double==true){
        for (let i = 0; i < data.row; i++) {
            let row = [];
            for (let j = 0; j < data.col; j++) {
                row.push(' ');
            }
            chessboard.push(row);
        }
    }else{
        for (let i = 0; i < board_size; i++) {
            let row = [];
            for (let j = 0; j < board_size; j++) {
                row.push(' ');
            }
            chessboard.push(row);
        }
    }
    console.log(chessboard);
    return chessboard;
};

const drawMove = (board) =>{
    var drawMove = '';
	var head = "   ";
    var barrier = "   ";
    for(var i=0;i<board.length-1;i++){
        barrier += "---+";
    }
    barrier += "---";
    for(var i=1;i<=board.length;i++){
        if(i<10)
        {
            head += " "+i+"  ";
        }else if(i>9&&i<100){
            head += " "+i+" ";
        }else if(i>99&&i<1000){      
            head += ""+i+" ";
        }
    }
    drawMove = drawMove + head;
    console.log(head);
    for(var i=1;i<=board.length;i++){
        var tail = '';
        for(var j=0;j<board.length;j++){
            if(j==board.length-1){
                tail += " "+board[i-1][j]+" ";
            }else{
                tail += " "+board[i-1][j]+" |";
            }
        } 
        if(i<10)
        {                     
            drawMove = drawMove +" "+i+" "+tail;
            console.log(" "+i+" "+tail);
        }else if(i>9&&i<100){
            drawMove = drawMove + ""+i+" "+tail;
            console.log(""+i+" "+tail);
        }else if(i>99&&i<1000){
            drawMove = drawMove + i+tail;
            console.log(i+tail);
        }
        if(i<board.length){
            drawMove = drawMove + barrier;
            console.log(barrier);
        }                
    }                

    return drawMove;
}
const move = (row, column, value, curMove) => {
    console.log(row, column, value);
    if (validBoard[row][column] === ' ') {
        console.log('Player has moved');
        validBoard[row][column] = value;
        console.log(validBoard);
        drawMove(validBoard);
    } else {
        console.log('Chess already exists, choose another place');
    }
    checkWinner(validBoard, value, curMove);
    checkTie(validBoard);

}

const ReadLine = (board, saveData) => {
    if (saveData) {
        config.curPlayer = saveData.curPlayer;
        config.playerNum = saveData.playerNum;
        config.winSequence = saveData.winSequence;
        if (config.curPlayer >= config.playerNum) {
            config.curPlayer = 0;
        }
    } else {
        if (config.curPlayer >= config.playerNum) {
            config.curPlayer = 0;
        }
    }
    const row = board.length;
    const col = board[0].length;
    // console.log(row,col);
    rl.question('Enter a row column format 3 2 (split by space)\nType save to save the game \nInput end or quit to end the game \n', function (answer) {
        if (answer.toLowerCase() == 'save' || answer.toLowerCase() == 's') {
            rl.question('input the name of the file\n', (name) => {
                if (name) {
                    let gameData = { size: board, curPlayer: config.curPlayer, winSequence: config.winSequence, playerNum: config.playerNum, boardSize: config.boardSize }
                    saveGameTxt(name, JSON.stringify(gameData));
                    return rl.close();
                } else {
                    console.log('Please input your filename');
                    return rl.close();
                }
            })
        }
        if (answer == 'end' || answer == 'e' || answer == 'quit' || answer == 'q') {
            console.log('---------Game end---------');
            return rl.close();
        }
        let coord = answer.split(' ');
        if (parseInt(coord[0]) && parseInt(coord[1]) && parseInt(coord[0]) <= row && parseInt(coord[1]) <= col) {
            console.log('Your answer was:  ' + answer + '  "', playerLetters[config.curPlayer], '"');
            curMove.col = parseInt(coord[0]) - 1;
            curMove.row = parseInt(coord[1]) - 1;
            curMove.curPlayer = playerLetters[config.curPlayer];
            move((parseInt(coord[0]) - 1), parseInt((coord[1]) - 1), playerLetters[config.curPlayer], curMove);
            config.curPlayer++;
            ReadLine(board);
        } else {
            console.log('Input is not valid, try again');
            ReadLine(board);
        }
    });
};

const checkWinner = (board, player, curMove) => {
    if (checkRows(board, player) || checkCols(board, player)||checkDiag(board, player)||checkReverseDiag(board, player)) {
        console.log(player+' user has won');
        rl.question('Y to start game & N to exit? (Y/N)\n', (data) => {
            if (data.toLowerCase() == 'y' || data.toLowerCase() == 'yes') {
                Init();
            } else {
                console.log('---------Game end---------');
                rl.close();
            }
        })

    } else {
        console.log('Not a winner');
    }
}


function checkCols(board, player) {
    var win = false;
    for(var r = 0; r < board.length; r++){
        var sum = 1;
        var preVal = '---';
        for(var t = 0; t < board[r].length; t++) {
            if (board[t][r] === player) {
                ++sum;
                 //console.log("x:"+r+"y:"+t+" p:"+sum);
                if (preVal !== board[t][r] && sum > 2) {
                    sum = 2;
                }
            }
            preVal = board[t][r];
            if(sum > config.winSequence){
                win = true;
                break;
            }
        }
    }
    return win;
}
function checkRows(board, player){
    var win = false;
    for(var r = 0; r < board.length; r++){
        var sum = 1;
        var preVal = '---';
        for(var t = 0; t < board[r].length; t++) {
            if (board[r][t] === player) {
                //console.log("x:"+r+"y:"+t+" p:"+sum);
                ++sum;
                if (preVal !== board[r][t] && sum > 2) {
                    sum = 2;
                }
            }
            preVal = board[r][t];
            if(sum > config.winSequence){
                win = true;
                break;
            }
        }
    }
    return win;
}
function checkDiag(board, player) {
    var win = false;
    try{
        for(var r = 0; r < board.length; r++){
            for(var t = 0; t < board.length; t++) {
                var sum = 1;
                var preVal = '---';
                if(board[r][t]===player){
                    for(var i=r,j=t;i<board.length&&j<board.length;i++,j++){
                        // console.log(board.length);
                        // console.log("------"+i+" "+j+" "+sum);
                        var curPlayer = board[i][j];  
                        if (player===curPlayer) {
                            ++sum;
                            //console.log("player--"+player);
                            if ((preVal !== curPlayer && sum > 2)||curPlayer===' ') {
                            sum = 1;
                            }  
                        }
                        preVal = curPlayer;
                        if(sum > config.winSequence){
                            win = true;
                            return win;
                        }
                        
                    }
                }
            }
        }
    }catch(e){
        console.log(e);
    }
}

function checkReverseDiag(board, player) {
    var win = false;
    try{
        for(var r = 0; r < board.length; r++){
            for(var t = 0; t < board.length; t++) {
                var sum = 1;
                var preVal = '---';
                if(board[r][t]===player){
                    for(var i=r,j=t;j>=0&&i<board.length;i++,j--){
                        // console.log(board.length);
                        //console.log("------"+i+" "+j+" "+sum);
                        var curPlayer = board[i][j];  
                        if (player===curPlayer) {
                            ++sum;
                            //console.log("player--"+player);
                            if ((preVal !== curPlayer && sum > 2)||curPlayer===' ') {
                            sum = 1;
                            }  
                        }
                        preVal = curPlayer;
                        if(sum > config.winSequence){
                            win = true;
                            return win;
                        }
                        
                    }
                }
            }
        }
    }catch(e){
        console.log(e);
    }
}
function checkTie(board){
    try{
        let tie = true;
        let playerTie = [];
        for(let i=0;i<config.playerNum;i++){
            //check if player can not win,only if player can not win in rows cols and diags that playerTie is true
            playerTie[i]=checkRowsTie(board, playerLetters[i]) && checkColsTie(board, playerLetters[i])&&checkDiagTie(board, playerLetters[i])&&checkReverseDiagTie(board, playerLetters[i]);
            //if all the players can not win ,it's a tie game.
            tie = tie&&playerTie[i];    
            if(playerTie[i]==true){
                console.log("player "+playerLetters[i]+" can not win.");
            }
        }
        if(tie){
            console.log('---------Tie game!----------');
            rl.question('Y to start game & N to exit? (Y/N)\n', (data) => {
                if (data.toLowerCase() == 'y' || data.toLowerCase() == 'yes') {
                    Init();
                } else {
                    console.log('---------Game end---------');
                    rl.close();
                }
            })
        }
    }catch(e){
        console.log(e);
    }
}
function checkColsTie(board, player) {
    var tie = true;
    for(var r = 0; r < board.length; r++){
        var sum = 1;
        var preVal = '---';
        for(var t = 0; t < board[r].length; t++) {
            if (board[t][r] === player||board[t][r] === ' ') {
                ++sum;
                //console.log("col >>x: "+t+" y: "+r+" sum: "+sum);
                if (preVal !== board[t][r] &&board[t][r]!==' '&&preVal!==' '&& sum > 2) {
                    sum = 2;
                }
            }
            preVal = board[t][r];
            if(sum > config.winSequence){
                tie = false;
                return tie;
            }
        }
    }
    return tie;
}
function checkRowsTie(board, player){
    var tie = true;
    for(var r = 0; r < board.length; r++){
        var sum = 1;
        var preVal = '---';
        for(var t = 0; t < board[r].length; t++) {
            if (board[r][t] === player||board[r][t] === ' ') {
                ++sum;
                //console.log("row >>x: "+r+" y: "+t+" sum: "+sum);
                if (preVal !== board[r][t] &&board[r][t]!==' '&&preVal!==' '&& sum > 2) {
                    sum = 2;
                }
            }
            preVal = board[r][t];
            if(sum > config.winSequence){
                tie = false;
                return tie;
            }
        }
    }
    return tie;
}
function checkDiagTie(board, player) {
    try{
        var tie = true;
        for(var r = 0; r < board.length; r++){
            for(var t = 0; t < board.length; t++) {
                var sum = 1;
                var preVal = '---';
                if(board[r][t]===player){
                    for(var i=r,j=t;i<board.length&&j<board.length;i++,j++){
                        // console.log(board.length);
                        // console.log("------"+i+" "+j+" "+sum);
                        var curPlayer = board[i][j];  
                        if (player === curPlayer||curPlayer == ' ') {
                            ++sum;
                           // console.log("diag >>x:"+i+" y: "+j+" sum: "+sum);
                            //console.log("player--"+player);
                            if (preVal !== curPlayer &&curPlayer !== ' '&&preVal!==' '&& sum > 2) {
                            sum = 2;
                            }  
                        }
                        preVal = curPlayer;
                        if(sum > config.winSequence){
                            tie = false;
                            return tie;
                        }
                        
                    }
                }
            }
        }
        return tie;
    }catch(e){
        console.log(e);
    }
}

function checkReverseDiagTie(board, player) {
    try{
        var tie = true;
        for(var r = 0; r < board.length; r++){
            for(var t = 0; t < board.length; t++) {
                var sum = 1;
                var preVal = '---';
                if(board[r][t]===player){
                    for(var i=r,j=t;j>=0&&i<board.length;i++,j--){
                        // console.log(board.length);
                        //console.log("------"+i+" "+j+" "+sum);
                        var curPlayer = board[i][j];  
                        if (curPlayer === player||curPlayer === ' ') {
                            ++sum;
                            //console.log("rediag >>x: "+i+" y: "+j+" sum: "+sum);
                            //console.log("player--"+player);
                            if (preVal !== curPlayer &&curPlayer!==' '&&preVal!==' '&& sum > 2) {
                            sum = 2;
                            }  
                        }
                        preVal = curPlayer;
                        if(sum > config.winSequence){
                            tie = false;
                            return tie;
                        }
                        
                    }
                }
            }
        }
        return tie;
    }catch(e){
        console.log(e);
    }
}



Init();
