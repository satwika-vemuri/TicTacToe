var socket;
var connected;
var player;
var numOpenRooms;
var isTurn = false;
var room;

// This socket instance is for room number updates in menu
// NOT for gameplay
// socket =  io(":3000/multiplayer");

// socket.on("update_count", (numRooms) => {
//     numOpenRooms = numRooms;
//     const roomsTracker = document.getElementById("numRooms");
//     roomsTracker.textContent = `Open Rooms: ${numRooms}`;
// });

// socket.emit("get_count");

socket.on("update_room", (roomid) => {
    console.log(roomid);
    room = roomid;
});

socket.on("HELLO", () => {
    console.log("HELLO");
});

function makeChoice(choice){
    // if (!(numOpenRooms == 0 && choice == "join")) {
        // socket.disconnect();
        console.log(choice);
        if (!connected) {
            connected = true;
            socket =  io(":3000/multiplayer");
        }
    
        if (choice == "create") {
            player = "X";
            room = socket.id;
        } else {
            player = "O";
        }
        socket.emit(choice);
        setupGame();
    // }
}


function setupGame(){
    // get board hbs file from server and set to variable
    var boardHbs;
    $.get("/../views/board.hbs",function( boardHbsFile){
        boardHbs = boardHbsFile;

        // convert hbs file to function
        var boardHbsFunction = Handlebars.compile(boardHbs);

        // data to insert into hbs3
        var scripts  = 
            {tictactoe: "/js/tictactoe.js",
            multiplayer: "/js/multiplayer.js"};
        
            boardArray = board_set_up();

        var context = { title: 'Multiplayer', 
        styles: ["board"], 
        board: toLetters(boardArray),
        score: [0, 0]
        };

        // insert data into hbs 
        var board =  boardHbsFunction(context);

        // replace multiplayerChoose content in main with board content
        $(".card").html(board);

        // Once O joins room, player X can make a move
        if (player == "O") {
            socket.emit("xturn");
        }
    });
}

// Since multi and single both have this, perhaps we can move it to tictactoe.js
function toLetters(boardArray){
    new_board = board_set_up();
    for(let r = 0; r < boardArray.length; r++){
        for(let c = 0; c < boardArray[0].length; c++){
            if(boardArray[r][c] == 0){
                new_board[r][c] = " ";
            }
            else if(boardArray[r][c] == 1){
                new_board[r][c] = "X";
            }
            else{
                new_board[r][c] == "O";
            }
        }
    }
    return new_board;
}

function tileClick(clickedTile){


}