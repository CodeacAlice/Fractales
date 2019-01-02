var c = $("#myCanvas")[0];
var ctx = c.getContext("2d");
ctx.moveTo(0, 0);
ctx.lineTo(200, 100);
ctx.stroke(); 
ctx.lineTo(0,50);
ctx.lineTo(200,50);
ctx.stroke();


/* L'objet crayon permettra de tracer l'arbre
Ses paramètres sont : les coordonnées de sa position, la direction dans laquelle il se dirige,
						et s'il est en train d'écrire ou non */
let crayon = {posX: 0.0, posY: 0.0, angle: 0.0, isWriting: true};

function convertToRadian (degre) {
	return degre * Math.PI / 180.0;
}

/* Fonctions permettant de changer la direction du crayon et de le faire avancer */
function turnAngle (newAngle) {
	crayon['angle'] += convertToRadian(newAngle);
}


function avancer(distance) {
	var dx = distance * Math.cos(crayon['angle']);
	var dy = distance * Math.sin(crayon['angle']);
	crayon['posX'] += dx;
	crayon['posY'] -= dy;

	if (crayon['isWriting']) {
		ctx.lineTo(Math.round(crayon['posX']), Math.round(crayon['posY']));
		ctx.stroke();
	}
	else {ctx.moveTo(Math.round(crayon['posX']), Math.round(crayon['posY']));}
}


/* Fonctions permettant d'effacer ce qu'il y a dans le canevas et de remettre le crayon à sa position initiale */
/* Position initiale : en bas au milieu */
let originX = Math.round(c.width / 2);
let originY = c.height;

/* Couleur du fond et couleur du tracé*/
let couleurTrace = "green";

/* Fonction permettant d'effacer ce qu'il y a dans le canevas et de remettre le crayon à sa position initiale */
function videEcran() {
	ctx.clearRect(0, 0, c.width, c.height);
	ctx.beginPath();
	ctx.strokeStyle = couleurTrace;
	crayon['posX'] = originX;
	crayon['posY'] = originY;
	crayon['angle'] = 0.0;
	crayon['isWriting'] = true;

	ctx.moveTo(crayon['posX'], crayon['posY']);
}

videEcran();



// On va pouvoir faire l'arbre !
// D'abord, le tronc :
function tronc(long) {
	crayon['angle'] = convertToRadian(90.0);
	crayon['isWriting'] = true;
	avancer(long);
}

/* Ensuite, les branches */
/* "long" est la longueur de la branche mère,
	rapp est le rapport de longueur entre la branche mère et la branche fille
	angleBr est l'angle est l'angle entre deux branches
	nbBr est le nombre de branches filles poussant sur chanque branche mère
	n est le nombre d'itérations*/
function branches (long, rapp, angleBr, nbBr, n) {
	if (n == 1) {
		turnAngle (- angleBr * (nbBr-1) /2);
		for (var k = 1; k <= nbBr; k++) {
			crayon['isWriting'] = true;
			avancer(long * rapp);

			crayon['isWriting'] = false;
			turnAngle(180);
			avancer(long * rapp);
			turnAngle(180 + angleBr);
		}
	}
	else {
		var x = crayon['posX'];
		var y = crayon['posY'];

		turnAngle(- angleBr * (nbBr-1) /2);
		for (var k = 1; k <= nbBr; k++) {
			var a = crayon['angle'];

			crayon['isWriting'] = true;
			avancer(long * rapp);

			branches(long*rapp, rapp, angleBr, nbBr, n-1);
			crayon['posX'] = x;
			crayon['posY'] = y;
			crayon['angle'] = a;
			ctx.moveTo(Math.round(crayon['posX']), Math.round(crayon['posY']));
			turnAngle(angleBr);
		}
	}
}


function fractalTree (long, rapp, angle, nbBr, nbIt) {
	videEcran();
	tronc(long);
	branches(long, rapp, angle, nbBr, nbIt);
}
// Tester fractalTree(200, 0.5, 120, 3, 7)



/* Changer les paramètres de l'arbre avec le HTML */
function newTree () {
	var newLength = parseFloat($('#inputLengthTree')[0].value);
	var newRatio = parseFloat($('#inputRatioTree')[0].value);
	var newAngle = parseFloat($('#inputAngleTree')[0].value);
	var newNb = parseInt($('#inputNbTree')[0].value, 10);
	var newIt = parseInt($('#inputItTree')[0].value, 10);

	if (newLength > 0 && newRatio > 0 && newAngle > 0 && newNb > 0 && newIt > 0)
		{fractalTree(newLength, newRatio, newAngle, newNb, newIt)}
}