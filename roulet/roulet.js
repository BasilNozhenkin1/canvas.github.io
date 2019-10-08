let amountOfBoxes = 100;
let order = [];


let colors= ['#FA5858', '#FA8258', '#FAAC58', '#F7D358', '#58FA82', '#5858FA', '#A4A4A4'];
let width = 80;
let bets = [];

let amountOfPlayers = 0;


function initDefaultBets() {
  let roulette = document.querySelector("#roulette");
  roulette.innerHTML = "";
  let tempBets = [
    ["Игрок1", "red"],
    ["Игрок2", "yellow"]
  ];
  for(let i = 0; i < amountOfBoxes; i++){
      let randomPlayer = rand(0, tempBets.length)
      let node = document.createElement("div");
      let h3 = document.createElement("h3");
      h3.innerHTML = tempBets[randomPlayer][0];
      h3.style.backgroundColor = tempBets[randomPlayer][1];
      node.appendChild(h3);
      roulette.appendChild(node);
    }
}

function rand (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function play () {
  //add sound if you want
  //var audio = new Audio('spin.mp3');
  //audio.play();
  var offset = rand(0, amountOfBoxes*140-180)+180;
  document.querySelector("#roulette").style.left = -(offset-180) + "px";

  let chosenPlayer = document.createElement("div");
  chosenPlayer.style.backgroundColor = bets[order[parseInt(offset/140)]][1];
  chosenPlayer.innerHTML = bets[order[parseInt(offset/140)]][0];
  setTimeout(function(){
    document.querySelector("#winners").appendChild(chosenPlayer);
    document.querySelector("#roulette").style.transitionDuration = "0s";
    document.querySelector("#roulette").style.left = "0px";
    setTimeout(function(){
      document.querySelector("#roulette").style.transitionDuration = "5s";
    }, 50)
    }, 5500)
}


function removeName(playerToRemove){
    bets[playerToRemove] = 0;
    document.querySelector("#n"+playerToRemove).remove();
    amountOfPlayers--;
    refreshRoulette();
}


function initActualBets() {
  let node = document.createElement("LI");
  let name = document.getElementById("inputName").value
  document.getElementById("inputName").value = ""
  if(name != "") {
    let textnode = document.createTextNode(name);
    let color = colors[rand(0,colors.length-1)];
    let index = colors.indexOf(color);
    colors.splice(index, 1);

    node.style.backgroundColor = color;
    node.className = "playerName";
    node.id = "n" + bets.length;
    (function(value){
    node.addEventListener("click", function() {
       removeName(value);
    }, false);})(bets.length);

    node.appendChild(textnode);
    document.querySelector("#names").appendChild(node);
    bets.push([name, color]);

    amountOfPlayers++;
    refreshRoulette();
  }
}



function refreshRoulette() {
  let roulette = document.querySelector("#roulette");
  roulette.innerHTML = "";
  order = [];

  if(amountOfPlayers <= 0) { return 0; }

  for(let i = 0; i < amountOfBoxes; i++) {
      let randomPlayer = rand(0, bets.length);
      while(bets[randomPlayer] == 0){
        randomPlayer = rand(0, bets.length);
      }
      order.push(randomPlayer);
      let node = document.createElement("div");
      let h3 = document.createElement("h3");
      h3.innerHTML = bets[randomPlayer][0];
      node.style.backgroundColor = bets[randomPlayer][1];
      node.appendChild(h3);
      roulette.appendChild(node);
    }
}
initDefaultBets();
