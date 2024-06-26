/* Ici se trouve le code pour tracer l'arbre fractal */

/* Le début étant similaire au code du flocon, je ne m'y attarderai pas ici */
var c = document.getElementById("myCanvas");
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
	la longueur de la branche mère
	le rapport de longueur entre la branche mère et la branche fille
	l'angle entre deux branches
	le nombre de branches filles poussant sur chaque branche mère
	le nombre d'itérations */
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
	// S'il y a plusieurs itérations, il faudra rappeler la fonction afin de tracer des branches filles après avoir tracé chaque branche mère
	else {
		turnAngle(- angleBr * (nbBr-1) /2);
		for (var k = 1; k <= nbBr; k++) {
			var a = crayon['angle']; // On garde en mémoire l'angle selon lequel le crayon était tourné

			// On trace une branche mère, puis on y ajoute ses branches filles
			crayon['isWriting'] = true;
			avancer(long * rapp);
			branches(long*rapp, rapp, angleBr, nbBr, n-1); // Ne pas oublier de diminuer le nombre d'itérations !

			// Retour au point de départ
			crayon['angle'] = a;
			crayon['isWriting'] = false;
			turnAngle(180);
			avancer(long * rapp);
			turnAngle(angleBr + 180);
		}
	}
}



/* On combine à présent les fonctioncs précédentes dans une fonction qui va récupérer les paramètres sur la page HTML  */
function newTree () {
	// On récupère les paramètres
	var newLength = parseFloat(document.getElementById('inputLengthTree').value);
	var newRatio = parseFloat(document.getElementById('inputRatioTree').value);
	var newAngle = parseFloat(document.getElementById('inputAngleTree').value);
	var newNb = parseInt(document.getElementById('inputNbTree').value, 10);
	var newIt = parseInt(document.getElementById('inputItTree').value, 10);

	if (newLength > 0 && newRatio > 0 && newAngle > 0 && newNb > 0 && newIt > 0) // On vérifie que les paramètres donnés sont corrects
		{
			videEcran();
			tronc(newLength);
			branches(newLength, newRatio, newAngle, newNb, newIt);
		}
}
// Sachez qu'avec un rapport de 0.5, un angle de 120 et 3 branches filles, vous obtiendrez un triangle de Sierpinski. Essayez donc !