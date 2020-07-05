/* Tout d'abord, récuperer le canva sur lequel on va dessiner */
var cS = document.getElementById("canvaSnowflake");
var ctxS = cS.getContext("2d");


/* Ensuite, l'objet crayon */
/* Ses paramètres sont : ses coordonnées, sa direction, et s'il écrit ou non*/
let crayonS = {
	posX: 0.0,
	posY: 0.0,
	angle: 0.0,
	isWriting: true
};


/* Les trois fonctions suivantes permettent de changer la direction du crayon et de le faire avancer */
/* Fonction permettant de convertir un angle en degrés (utilisable par un humain) en radians (utilisable par la machine) */
function convertToRadian (degre) {
	return degre * Math.PI / 180.0;
}
/* Fonction pour tourner l'angle selon un certain degré */
function turnAngleS (newAngle) {
	crayonS['angle'] += convertToRadian(newAngle);
}

/* Fonction pour faire avancer le crayon */
/* Son paramètre est une longueur selon laquelle on veut faire avancer le crayon */
function avancerS(distance) {
	// Pour tracer une ligne, il faut impérativement les coordonnées du point d'arrivée
	// On commence donc par les calculer et modifier les valeurs posXet posY du crayon
	var dx = distance * Math.cos(crayonS['angle']);
	var dy = distance * Math.sin(crayonS['angle']);
	crayonS['posX'] += dx;
	crayonS['posY'] -= dy;

	// On vérifie ensuite si le crayon doit écrire ou non, et on trace une ligne ou on le déplace en fonction
	if (crayonS['isWriting']) {
		ctxS.lineTo(Math.round(crayonS['posX']), Math.round(crayonS['posY']));
		ctxS.stroke();
	}
	else {ctxS.moveTo(Math.round(crayonS['posX']), Math.round(crayonS['posY']));}
}


/* On veut ensuite une fonction qui permette d'effacer le canva si on veut faire d'autres flocons */
/* Fixons d'abord le point de départ du crayon */
// Position initiale : de façon à ce que le flocon soit centré, avec un côté de longueur 100
let originSX = Math.round((cS.width -300) / 2);
let originSY = Math.round((cS.height - 2*Math.sqrt(3)*100) / 2 + Math.sqrt(3)*100/2);

/* On choisit également la couleur du tracé */
let couleurTraceS = "blue";

/* Fonction permettant d'effacer ce qu'il y a dans le canevas et de remettre le crayon à sa position initiale */
function videEcranS() {
	ctxS.clearRect(0, 0, cS.width, cS.height); // Créé un rectangle blanc faisant la taille du canva
	ctxS.beginPath(); // Réinitialise le chemin (s'il n'est pas réinitialisé, les chemins des dessins précédents seront retracés aussi)
	ctxS.strokeStyle = couleurTraceS;
	crayonS['posX'] = originSX;
	crayonS['posY'] = originSY;
	crayonS['angle'] = 0.0;
	crayonS['isWriting'] = true;

	ctxS.moveTo(crayonS['posX'], crayonS['posY']);
}




/* On va pouvoir tracer le flocon ! */

/* On commence par la fonction pricipale : celle qui trace une courbe de Koch */
/* C'est une fonction récursive dont les paramètres sont : la longueur d'un segment et le nombre d'itérations */
function KochCurve (long, nbIt) {
	// S'il n'y a qu'une itération, on trace les quatre segments en tournant entre chaque
	if (nbIt == 1) {
		avancerS(long);

		turnAngleS(60);
		avancerS(long);

		turnAngleS(- 120);
		avancerS(long);

		turnAngleS(60);
		avancerS(long);
	}
	// Sinon, on fait la même chose mais en traçant une courbe de Koch au lieu d'un segment
	else {
		KochCurve(long /3, nbIt-1); // Ne pas oublier de diminuer le nombre d'itérations, sinon on lance une boucle infinie

		turnAngleS(60);
		KochCurve(long /3, nbIt-1);

		turnAngleS(- 120);
		KochCurve(long /3, nbIt-1);

		turnAngleS(60);
		KochCurve(long /3, nbIt-1);
	}
}


/* On va à présent créer la fonction qui trace le flocon à l'aide de la fonction précédente et des données entrées sur la page web */
function newSnowflake() {
	var newLength = parseFloat(document.getElementById('inputLengthSF').value); // On récupère la longueur donnée
	var newIt = parseInt(document.getElementById('inputItSF').value, 10); // On récupère le nombre d'itérations
	// Notons que les valeurs récupérées sont de type string, il faut donc utiliser parseFloat et parseInt pour en faire des nombres

	if (newLength > 0 && newIt > 0) // Vérifier que les valeurs entrées sont cohérentes avant de tracer le flocon
		{
			videEcranS(); // Effacer le dessin précédent avant de tracer

			// Chaque courbe dessinée ne fait d'un tiers du flocon qu'on veut obtenir, on en trace donc trois en tournant entre chaque
			KochCurve(newLength, newIt);
			turnAngleS(- 120);
			KochCurve(newLength, newIt);
			turnAngleS(- 120);
			KochCurve(newLength, newIt);
		}
}

/* Plus qu'à le lancer ! */