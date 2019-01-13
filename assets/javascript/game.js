
let characters = [
    {
        id: 0,
        name: "Obi-Wan Kenobi",
        hp: 120,
        ap: 6,
        cAP: 8,
        pic: "obi.png"
    },
    {
        id: 1,
        name: "Luke Skywalker",
        hp: 100,
        ap: 8,
        cAP: 10,
        pic: "luke.png"
    },
    {
        id: 2,
        name: "Darth Sidious",
        hp: 150,
        ap: 2,
        cAP: 16,
        pic: "sidious.png"
    },
    {
        id: 3,
        name: "Darth Maul",
        hp: 180,
        ap: 4,
        cAP: 6,
        pic: "maul.png"
    }
]

var player;
var defender;

var playerAP;
var playerHP;
var defenderHP;

var winCounter; //counter for each round

var wins = 0;
var losses = 0;

var gameState = "notPlaying";
var charState = "none";



function clear () {
    gameState = "playing";
    winCounter = 0;
    playerAP = 0; // doing this so I dont lose original value for New Game
    playerHP = 1000; // doing this so I dont lose original value for New Game
    defenderHP = 1000; // doing this so I dont lose original value for New Game
    
    for (i = 0; i < characters.length; i++) {
        $("#" + i).remove();
    }
    
    $("#characterAttack").html("");
    $("#defenderAttack").html("");

    $("#gameStart").css('display', 'none');
    $("#gameWon").css('display', 'none');
    $("#gameLost").css('display', 'none');
    $("#rpgAttack").css('display', 'none');
    $("#rpgTop").css('display', 'block');
    $("#rpgMiddle").css('display', 'block');
    $("#rpgBottom").css('display', 'block');
    $("#showCharacters").css('display', 'block');
    $("#cMessage").css('display', 'inline');
    $("#cMessage").html("<h3>Select a character!<br>This will be your character.</h3>");
}

function showCharacters(){

    for (var i = 0; i < characters.length; i++) {
        var char = $('<td>');
        var pic = '<img src = "./assets/images/' + characters[i].pic + '" height="174" width="100">';
        var name = "<h3>" + characters[i].name + "</h3>";
        var hp = '<h3 class="hp' + i + '">' + characters[i].hp + ' HP</h3>';
        char.attr('id', i);
        char.addClass("char");
        char.html(name);
        char.append(pic);
        char.append(hp);
        $("#showCharacters").append(char);
    }
}

function characterSelect(char){
    if (charState == "characterSelected"){
        player = char.id;
        $("#" + char.id).remove();
        $("#selectedCharacter").append(char);
        $("#" + char.id).removeClass('char').addClass('selectedChar'); // changing class name to avoid clicking Player's character
        $("#cMessage").html("<h3>Select a Defender to attack!<br>Choose wisely " + characters[player].name + ".</h3>");
    } else if (charState == "defenderSelected"){
        defender = char.id;
        $("#" + char.id).remove();
        $("#selectedDefender").append(char);
    }
}

function won() {
    winCounter ++;
    $("#rpgAttack").css('display', 'none');
    $("#defeatedDefender").append($("#" + defender));
    charState = "characterSelected";
    defenderHP = 1000; // to reset and get next selected defender HP

    if (winCounter == 3) {
        charState = "none";
        gameState = "notPlaying";
        wins++;
        $("#wins").html(wins);
        $("#gameWon").css('display', 'block');
        $("#rpgTop").css('display', 'none');
        $("#rpgMiddle").css('display', 'none');
    } else {
        $("#cMessage").css('display', 'inline');
        $("#cMessage").html("<h3>Defender Defeated! Select another defender.<br>Choose wisely " + characters[player].name + ".</h3>");
    }
}

function attack(){
    if (playerAP == 0) {
        playerAP = characters[player].ap;  // doing this so I dont lose original value for New Game
    }
    if (playerHP == 1000) {
        playerHP = characters[player].hp; // doing this so I dont lose original value for New Game
    }
    if (defenderHP == 1000) {
        defenderHP = characters[defender].hp; // doing this so I dont lose original value for New Game
    }

    playerHP -= characters[defender].cAP;
    defenderHP -= playerAP;

    $(".hp" + player).html(playerHP + " HP");
    $(".hp" + defender).html(defenderHP + " HP");

    $("#characterAttack").html("You attacked " + characters[defender].name + " for " + playerAP + " damage!");
    $("#defenderAttack").html(characters[defender].name + " attacked you for " + characters[defender].cAP + " damage!");

    if (playerHP <= 0) {
        $("#rpgAttack").css('display', 'none');
        $("#gameLost").css('display', 'block');
        $("#rpgTop").css('display', 'none');
        $("#rpgMiddle").css('display', 'none');
        charState = "none";
        gameState = "notPlaying";
        losses++;
        $("#losses").html(losses);
    }
    else if (defenderHP <= 0){
        won();
    }

    playerAP += characters[player].ap;
}


document.onkeyup = function(event) {
    // Start Game By Pressing Enter
    var x = event.charCode || event.keyCode; // depending on browser - for compatibility
    if (x === 13) {
        if (gameState == "notPlaying") { // If Enter is pressed while playing game, avoid reset
            clear();
            showCharacters();
        }
    }
}

$(document).on('click','.char',function() {
    if (gameState == "playing" && charState != "defenderSelected") {
        if (charState == "characterSelected") {
            charState = "defenderSelected";
            $("#cMessage").css('display', 'none');
            $("#rpgAttack").css('display', 'inline');
        } else if (charState == "none") {
            charState = "characterSelected";
        }         
        characterSelect(this);
    }
});

$(document).on('click','#attack',function() {
    attack();
});

window.onload = function() {
    $("#rpgTop").css('display', 'none');
    $("#rpgMiddle").css('display', 'none');
    $("#rpgBottom").css('display', 'none');
    $("#gameWon").css('display', 'none');
    $("#gameLost").css('display', 'none');
    $("#rpgAttack").css('display', 'none');
    $("#cMessage").css('display', 'none');
}
