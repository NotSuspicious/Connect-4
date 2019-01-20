class greedybot {
	constructor(turn){
		this.turn = turn;
	}
	move(){
		var myTurn = 2;
		if(turn === myTurn){
			var column = Math.floor(Math.random() * 8);
			var row = Math.floor(Math.random() * 7);
		}
	}
	update(){
		move();
	}
};