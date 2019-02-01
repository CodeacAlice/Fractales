var cS = $("#canvaSnowflake")[0];
var ctxS = cS.getContext("2d");

/* L'objet crayon */
/* Ses paramètres sont : ses coordonnées, sa direction, et s'il écrit ou non*/
let crayonS = {
	posX: 0.0,
	posY: 0.0,
	angle: 0.0,
	isWriting: true
};

/* Fonctions permettant de changer la direction du crayon et de le faire avancer */
function convertToRadian (degre) {
	return degre * Math.PI / 180.0;
}
function turnAngleS (newAngle) {
	crayonS['angle'] += convertToRadian(newAngle);
}

function avancerS(distance) {
	var dx = distance * Math.cos(crayonS['angle']);
	var dy = distance * Math.sin(crayonS['angle']);
	crayonS['posX'] += dx;
	crayonS['posY'] -= dy;

	if (crayonS['isWriting']) {
		ctxS.lineTo(Math.round(crayonS['posX']), Math.round(crayonS['posY']));
		ctxS.stroke();
	}
	else {ctxS.moveTo(Math.round(crayonS['posX']), Math.round(crayonS['posY']));}
}


/* Fonctions permettant d'effacer ce qu'il y a dans le canevas et de remettre le crayon à sa position initiale */
/* Position initiale : de façon à ce que le flocon soit centré */
let originSX = Math.round((cS.width -300) / 2);
let originSY = Math.round((cS.height - 2*Math.sqrt(3)*100) / 2 + Math.sqrt(3)*100/2);

/* Couleur du fond et couleur du tracé*/
let couleurTraceS = "blue";

/* Fonction permettant d'effacer ce qu'il y a dans le canevas et de remettre le crayon à sa position initiale */
function videEcranS() {
	ctxS.clearRect(0, 0, cS.width, cS.height);
	ctxS.beginPath();
	ctxS.strokeStyle = couleurTraceS;
	crayonS['posX'] = originSX;
	crayonS['posY'] = originSY;
	crayonS['angle'] = 0.0;
	crayonS['isWriting'] = true;

	ctxS.moveTo(crayonS['posX'], crayonS['posY']);
}

videEcranS();


/* SnowFlake */
function KochCurve (long, nbIt) {
	if (nbIt == 1) {
		avancerS(long);

		turnAngleS(60);
		avancerS(long);

		turnAngleS(- 120);
		avancerS(long);

		turnAngleS(60);
		avancerS(long);
	}
	else {
		KochCurve(long /3, nbIt-1);

		turnAngleS(60);
		KochCurve(long /3, nbIt-1);

		turnAngleS(- 120);
		KochCurve(long /3, nbIt-1);

		turnAngleS(60);
		KochCurve(long /3, nbIt-1);
	}
}


/* Créer un flocon avec le HTML */
function newSnowflake() {
	var newLength = parseFloat($('#inputLengthSF')[0].value);
	var newIt = parseInt($('#inputItSF')[0].value, 10);

	if (newLength > 0 && newIt > 0)
		{
			videEcranS();

			KochCurve(newLength, newIt);

			turnAngleS(- 120);
			KochCurve(newLength, newIt);

			turnAngleS(- 120);
			KochCurve(newLength, newIt);
		}
}