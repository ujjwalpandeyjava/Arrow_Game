//Declaring Initial Player's Health
var player1Health = player2Health = 100;
let player1Score = player2Score = 0;
let roundCounter = changePlayer1WinScore = changePlayer2WinScore = 0;

//Ungli
let lastname;
console.log(localStorage.getItem("lastname"));

//Shooting function
function shootBtn() {
	document.getElementById("resetHealths").innerHTML = ``

	//Getting Random Power for each player
	//Change 50 to 5
	var player1Fire = Math.floor(Math.random() * 50);
	var player2Fire = Math.floor(Math.random() * 50);
	console.log("Player 1 Fire : " + player1Fire + "\n" + "Player 2 Fire : " + player2Fire);

	localStorage.setItem("player1Score", "p1FireScore");

	//Players Health after hitting by power
	console.log(player1Health, player2Health);
	player1Health = player1Health - player2Fire;
	player2Health = player2Health - player1Fire;
	console.log("Player 1 remaining Health : " + player1Health + "\nPlayer 2 remaining Health : " + player2Health);
	document.getElementById("p1FireScore").innerHTML = `Fired:<b> ${player1Fire} </b> points<br/>Player 1 remaining Health : <b>  ${player1Health} </b>`;
	document.getElementById("p2FireScore").innerHTML = `Fired:<b> ${player2Fire} </b> points<br/>Player 1 remaining Health : <b>  ${player2Health} </b>`;

	// The Player whose health reaches 0, dies and the game ends.
	/* 	// Some problem here
		if (player1Health === 0)
			document.getElementById("grid-item-9").innerHTML = "Player 2 Won! 🎉 -";
	
		if (player2Health === 0)
			document.getElementById("grid-item-9").innerHTML = "Player 1 Won! 🎉 -";
	 */
	//Restricting Shoot Button after 5 Rounds are Completed
	if (roundCounter === 5) {
		let shootBtn = document.getElementById("ShootBtn");
		shootBtn.disabled = true;
		shootBtn.innerHTML = "Game Over";
		shootBtn.style.backgroundColor = "grey";
	}

	//Finding the Winner of individual rounds and incrementing their score by 1
	if (player2Health < 1) {
		//Counting which Rounds we are on.
		roundCounter++;
		console.log('round ' + roundCounter + ' ends');
		player1Score++;
	}
	else if (player1Health < 1) {
		//Counting which Rounds we are on.
		roundCounter++;
		console.log('round ' + roundCounter + ' ends');
		player2Score++;
	}

	localStorage.setItem("lastname", player1Score);
	if (changePlayer1WinScore !== player1Score || changePlayer2WinScore !== player2Score) {
		document.getElementById("grid-item-4").innerHTML = player1Score
		document.getElementById("grid-item-8").innerHTML = player2Score
		changePlayer1WinScore = player1Score
		changePlayer2WinScore = player2Score
		player1Health = player2Health = 100
		if (player1Score < 3 && player2Score < 3)
			document.getElementById("resetHealths").innerHTML = `Next round starts, Healths restored to 100`
	}

	//Checking which player has won 3 rounds, and terminating game instantly
	if (player1Score === 3)
		gameOver(`<span style="color: rgb(40, 224, 40);"> Player 1 Won!</span> 🎉`);
	else if (player2Score === 3)
		gameOver(`<span style="color: rgb(40, 224, 40);"> Player 2 Won!</span> 🎉`);
}

function gameOver(playercomment) {
	document.getElementById("grid-item-9").innerHTML = playercomment;
	let shootBtn = document.getElementById("ShootBtn");
	shootBtn.disabled = true;
	shootBtn.innerHTML = "Game Over";
	shootBtn.style.backgroundColor = "grey";
	player1Health = player2Health = 100;
}

function resetBtn() {
	location.reload();
	localStorage.clear();
	player1Health = player2Health = 100;
}