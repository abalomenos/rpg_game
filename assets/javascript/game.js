
let characters = [
    {
        id: 0,
        name: "Obi-Wan Kenobi",
        hp: 120,
        ap: 6,
        cap: 8,
        pic: "obi.png"
    },
    {
        id: 1,
        name: "Luke Skywalker",
        hp: 100,
        ap: 6,
        cap: 8,
        pic: "luke.png"
    },
    {
        id: 2,
        name: "Darth Sidious",
        hp: 150,
        ap: 6,
        cap: 8,
        pic: "sidious.png"
    },
    {
        id: 3,
        name: "Darth Maul",
        hp: 180,
        ap: 6,
        cap: 8,
        pic: "maul.png"
    }
]

var player;
var defender;

var playerAP;
var playerHP;
var defenderHP;

var winCounter;
var gameState = "notPlaying";
var charState = "none";

function clear () {
    gameState = "playing";
    winCounter = 0;
    playerAP = 0;
    playerHP = 1000; // doing this so I dont lose original value
    defenderHP = 1000; // doing this so I dont lose original value
    for (i = 0; i < characters.length; i++) {
        $("#" + i).remove();
    }
}

document.onkeyup = function(event) {

        
    // Start Game By Pressing Enter
    var x = event.charCode || event.keyCode; // depending on browser - for compatibility
    if (x === 13) {
        if (gameState == "notPlaying") { // If Enter is pressed while playing game, avoid reset
            clear();
            $("#gameStart").css('display', 'none');
            $("#gameWon").css('display', 'none');
            $("#gameLost").css('display', 'none');
            $("#rpgAttack").css('display', 'none');
            $("#rpgTop").css('display', 'block');
            $("#rpgMiddle").css('display', 'block');
            $("#rpgBottom").css('display', 'block');
            $("#showCharacters").css('display', 'block');
            showCharacters();
        }
    }
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


    // function currentRole(role){
    //     var roleTitle = $('<th>');
    //     roleTitle.html(role);
    //     return roleTitle;
    // }

    function characterSelect(char){
        if (charState == "characterSelected"){
            player = char.id;
            $("#" + char.id).remove();
        //    $("#characterRole").append(currentRole("Attacker"));
            $("#selectedCharacter").append(char);
        } else if (charState == "defenderSelected"){
            defender = char.id;
            $("#" + char.id).remove();
        //    $("#defenderRole").append(currentRole("Defender"));
            $("#selectedDefender").append(char);
        }
    }

    function won() {
        winCounter ++;
        $("#rpgAttack").css('display', 'none');
        $("#defeatedDefender").append($("#" + defender));
        charState = "characterSelected";
        if (winCounter == 3) {
            charState = "none";
            gameState = "notPlaying";
            console.log("Won");
        } 
    }

    function attack(){
        if (playerAP == 0) {
            playerAP = characters[player].ap;
        }
        if (playerHP == 1000) {
            playerHP = characters[player].hp;
        }
        if (defenderHP == 1000) {
            defenderHP = characters[defender].hp;
        }
        playerHP -= characters[defender].ap;
        defenderHP -= playerAP;
        //characters[player].hp -= characters[defender].ap;
        //characters[defender].hp -= playerAP;
        //console.log(characters[player].hp);
        if (playerHP > 0) {
            $(".hp" + player).html(playerHP + " HP");
            playerAP += characters[player].ap;
        } else {
            //lost();
        }
        if (defenderHP > 0) {
            $(".hp" + defender).html(defenderHP + " HP");
        } else {
            won();
        }
    }

    $(document).on('click','.char',function() {
        if (gameState == "playing" && charState != "defenderSelected") {
            if (charState == "characterSelected") {
                charState = "defenderSelected";
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
}
