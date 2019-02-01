/* Ici se trouve le code pour tracer l'arbre fractal */
/* Le début étant similaire au code du flocon, je ne m'y attarderai pas ici */
var c = $("#myCanvas")[0];
var ctx = c.getContext("2d");


let crayon = {posX: 0.0, posY: 0.0, angle: 0.0, isWriting: true};

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


// Position initiale : au milieu en bas
let originX = Math.round(c.width / 2);
let originY = c.height;

let couleurTrace = "green";

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



/* Fonctions pour faire l'arbre */

/* La première fonction sert à faire le tronc de l'arbre */
/* Son unique paramètre est la longueur du tronc */
function tronc(long) {
	crayon['angle'] = convertToRadian(90.0);
	crayon['isWriting'] = true;
	avancer(long);
}

/* La fonction suivante sert à tracer les branches */
/* Ses paramètres sont :
	la longueur de la branche mère "long"
	le rapport de longueur entre la branche mère et la branche fille "rapp"
	l'angle entre deux branches "angleBr"
	le nombre de branches filles poussant sur chaque branche mère "nbBr"
	le nombre d'itérations "n" */
function branches (long, rapp, angleBr, nbBr, n) {
	// S'il n'y a qu'une itération, on se contente de tracer les branches filles
	if (n == 1) {
		// On commence par se tourner dans la direction de la première branche fille
		turnAngle (- angleBr * (nbBr-1) /2);
		// On fait une boucle for afin que la fonction s'adapte au nombre de branches filles donné
		for (var k = 1; k <= nbBr; k++) {
			// On trace la branche
			crayon['isWriting'] = true;
			avancer(long * rapp);

			// On fait demi-tour, on retourne au point de départ, et on se tourne en direction de la branche suivante
			crayon['isWriting'] = false;
			turnAngle(180);
			avancer(long * rapp);
			turnAngle(180 + angleBr);
		}
	}
	// S'il y a plusieurs itérations, il faudra rappeler la fonction afin de tracer des branches filles après avoir tracé chaque branche
	else {
		// Afin de pouvoir retourner au point de départ après avoir rappelé la fonction, on garde en mémoire les coordonées de ce point de départ
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
// Notez qu'avec un rapport de 0.5, un angle de 120 et 3 branches filles, vous aurez un triangle de Sierpinski