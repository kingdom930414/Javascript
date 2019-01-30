const fs = require('fs');
const path = require('path');
const readline = require('readline');
const playerLetters = ['X','O','A','B','C','D','E','F','G','H','I','J','K','L','M','N','P','Q','R','S','T','U','V','W','Y','Z'];
const rl = readline.createInterface(process.stdin, process.stdout);

var settings = {
    playerSize: 2,
    boardSize: 3,
    winSequence: 3,
    currentPlayer : 0
};

main();

function Start(){
  rl.question('Resume a saved game? (Y/N)\n', saved_game => {
    saved_game = saved_game.toUpperCase();
    if(saved_game === 'YES' || saved_game === 'Y'){
      console.log('\nYou picked a saved game.\n');
	  Load(rl);

    }
    else if (saved_game === 'NO' || saved_game === 'N'){
      console.log('You picked a new game.');
      rl.question('How many players? (Maximum 26): ', players => {
        if(players <= 26){
          settings.playerSize = parseInt(players);
		  console.log(players);
          rl.question('What is the board size? (Maximum:999): ', board_size => {
            if(board_size <= 999){
              settings.boardSize = parseInt(board_size);
			  console.log(board_size);
              rl.question('Win sequence count? ', win_sequence => {
                if(win_sequence){
                  console.log(win_sequence);
				  settings.winSequence = parseInt(win_sequence);
                  begin(settings);
                }
                else{
                  console.log('Not valid ');
                  rl.close();
                }
              })
            }
            else{
              console.log('Not valid');
              Start();
            }
          })
        }
        else{
          console.log('Not valid');
          Start();
        }
      })
    }
    else{
      console.log('Not valid.');
      Start();
    }
  })
}

var drawBoard = function(board_size){
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
    drawboardboard = drawboard + head;
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

var LoadSavedGame= function (rl, dir, file) {


    fs.readFile(path.join(dir, file + ".xml"), (err,data) => {
        if (err) {
            console.error("Error, choose a different save", err);
        }
        else {
            MyCrumbyXmlParser(data.toString());
        }
    })

}

var MyCrumbyXmlParser = function  (xmlString) {
    var aSave = [];
    aSave["players"] = xmlString.substring(xmlString.indexOf("<players>")+9,xmlString.indexOf("</players>"));
    aSave["boardSize"] = xmlString.substring(xmlString.indexOf("<boardSize>")+11,xmlString.indexOf("</boardSize>"));//-xmlString.indexOf("<boardSize>")-1);
    aSave["winSequence"] = xmlString.substring(xmlString.indexOf("<winSequence>")+13,xmlString.indexOf("</winSequence>"));//-xmlString.indexOf("<winSequence>")-1);

    begin(aSave);
}

function Load(rl) {

    rl.question("Enter your save file name " +
        "\nor press Return to see the list of saved games" +
        "\nor type Exit to return to the menu... \n", resp => {

        LoadSavedGame(rl, __dirname, resp);
})
}


var board = [];

function begin(settings) {
    
	console.log('----------GameStarted------------');
	board = createList(settings.boardSize);
	drawBoard = drawBoard(settings.boardSize);
    readRowCol();

}

var createList = function(board_size){
    let list = [];
    for (var i = 0; i < board_size; i++) {
        let row = [];
        for (var i1 = 0; i1 < board_size; i1++) {
            row.push(' ');
        }
        list.push(row);
    }

    console.log(list);
    return list;
};

function playerMoved(row, column, value){
    console.log(row,column, value);
    if (board[row][column] === ' '){
        console.log('player has moved');
        board[row][column] = value;
        console.log(board);
    } else {
        console.log('a player exists in that space, move invalid');
    }
    checkForWinner(board, value);
    checkForTie(board, value);
}

var readRowCol = function () {
    
    if (settings.currentPlayer >= settings.playerSize){
        settings.currentPlayer = 0; 
    }
    rl.question('Enter a row column (split by space)(type save to save the game): ', function (answer) {
        if (answer == 'save') 
            return rl.close(); 
        console.log('Your answer was:  ' + answer +  '  "', playerLetters[settings.currentPlayer], '"');

        var grid = answer.split(' ');
        playerMoved((parseInt(grid[0])-1), parseInt((grid[1])-1), playerLetters[settings.currentPlayer]);

        settings.currentPlayer++;
        readRowCol();
    });
};

function checkForWinner(board, player){
    if (checkRow(board, player) ||  checkCol(board, player)||checkDiag(board,player)) {
        console.log('user '+player+' has won');
    } else {
        console.log('not a winner');
    }
}

function checkForTie(board, player){
    if (checkRowTie(board, player) || checkDiagTie(board, player) || checkColTie(board, player)||checkReverseDiagTie(board, player)) {
        console.log('It is a tie!');
    } 
}

function checkRow(board, player){
        var win = false;
        for(var r = 0; r < board.length; r++){
            var rowSum = 1;
            var preVal = 'start';
            for(var t = 0; t < board[r].length; t++) {
                if (board[r][t] === player) {
                    ++rowSum;
                    if (preVal !== board[r][t] && rowSum > 2) {
                        rowSum = 0;
                    }
                }
                preVal = board[r][t];
                if(rowSum > settings.winSequence){
                    win = true;
                    break;
                }
            }
        }
        return win;
}

function checkDiag(board, player){
    var win = false;
    for(var r = 0; r < board.length; r++){
        for(var t = 0; t < board.length; t++) {
            var rowSum = 1;
            var preVal = 'start';
            if(board[r][t]===player){
            for(var i=0;i+r<board.length+2,i+t<board.length+2;i++){
                var curPlayer = board[r][t]; 
                ++r;
                ++t;
                console.log("------"+r+" "+t+" "+rowSum);
                if (player===curPlayer) {
                    ++rowSum;
                    //console.log("player--"+player);
                    if ((preVal !== curPlayer && rowSum > 2)||curPlayer===' ') {
                        rowSum = 1;
                    }
                    
                }
                preVal = curPlayer;
                if(rowSum > settings.winSequence){
                    win = true;
                    return win;
                }
            }
            }
        }
    }
    
}

function checkReverseDiag(board, player){
    var win = false;
    for(var i = 0; i < board.length; i++){
        for(var j = 0; j < board.length; j++) {
            var rowSum = 1;
            var preVal = 'start';
            var curPlayer = '';
            for(var k=0;i-k>0,k+j<board.length;k++){
                console.log("--?--"+board[i][j]);
                curPlayer = board[i][j]; 
                --i;
                ++j;
                if (player===curPlayer) {
                    ++rowSum;
                   // console.log("player--"+player);
                    if ((preVal !== curPlayer && rowSum > 2)||curPlayer===' ') {
                        rowSum = 1;
                    }
                    //console.log("------"+r+" "+t+" "+rowSum);
                }
                preVal = curPlayer;
                if(rowSum > settings.winSequence){
                    win = true;
                    return win;
                }
            }
        }
    }
}

function checkCol(board, player){
    function transpose(a) {
        return Object.keys(a[0]).map(
            function (c) { return a.map(function (r) { return r[c]; }); }
        );
    }

    return checkRow(transpose(board), player);
}

function checkColTie(board, player){

}

function checkRowTie(board, player){
    var tie = false;
    var tieArray = [];
    for(var r = 0; r < board.length; r++){
        var rowSum = 1;
        var preVal = 'start';
        for(var t = 0; t < board[r].length; t++) {
            if (board[r][t] === player||board[r][t]==='') {
                ++rowSum;
                if ((preVal !== board[r][t]&&preVal !=='') && rowSum > 2) {
                    rowSum = 0;
                }
            }
            preVal = board[r][t];
            if(rowSum > settings.winSequence){
                tieArray[t] = false;
            }else{
                tieArray[t]= true;
            }
        }
    }
    for(var i=0;i<tieArray.length;i++){
        tie = tie&&tieArray[i];
    }
    return tie;
}

function checkDiagTie(board, player){
    var tie = false;
    var tieArray = [];
        for(var r = 0; r < board.length; r++){
            var rowSum = 1;
            var preVal = 'start';
            for(var t = 0; t < board[r].length; t++) {
                for(var i=r,j=t;i<board.length,j<board[r].length;i++,j++){
                    if (board[r][t] === player) {
                        ++rowSum;
                        if ((preVal !== board[r][t]&&preVal !=='') && rowSum > 2) {
                            rowSum = 0;
                        }
                    }
                    preVal = board[r][t];
                    if(rowSum > settings.winSequence){
                        tieArray[j] = false;
                    }else{
                        tieArray[j] = true;
                    }
                }
                
            }
        }
        for(var i=0;i<tieArray.length;i++){
            tie = tie&&tieArray[i];
        }
    return tie;
}

function checkReverseDiagTie(board, player){
    var tie = false;
    var tieArray= [];
    for(var r = 0; r < board.length; r++){
        var rowSum = 1;
        var preVal = 'start';
        for(var t = 0; t < board[r].length; t++) {
            for(var i=r,j=t;i<board.length,j>0;i++,j--){
                if (board[r][t] === player||board[r][t] ==='') {
                    ++rowSum;
                    if (preVal !== board[r][t] &&preVal!==''&& rowSum > 2) {
                        rowSum = 0;
                    }
                }
                preVal = board[r][t];
                if(rowSum > settings.winSequence){
                    tieArray[t] = false;
                }else{
                    tieArray[t] = true;
                }
            }
            
        }
    }
    for(var i=0;i<tieArray.length;i++){
        tie = tie&&tieArray[i];
    }
return tie;
}

function saveGame() {
}



function main(){
  console.log('Tic-Tac-Toe');
  console.log(
    '                  |   |   \n' +
    '               ---+---+--- \n' +
    '                  |   |   \n' +
    '               ---+---+--- \n' +
    '                  |   |   \n');
	
	Start();
}