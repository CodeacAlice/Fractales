
// On définit nos variables principales

const idCanvasFlocon = "canvasFlocon"; 
const couleurFlocon = "blue";
const longueurSegmentFlocon = 100; // ici la taille du flocon est fixe

const canvasFlocon = document.getElementById(idCanvasFlocon);
const inputNombreDiterationsFlocon = document.getElementById('inputNombreDiterationsFlocon');

// On calcule la position initiale de façon à ce que le flocon soit centré
const origineFloconX = Math.round(canvasFlocon.width/2 - longueurSegmentFlocon*(3/2));
const origineFloconY = Math.round(canvasFlocon.height/2 - longueurSegmentFlocon * Math.sqrt(3)/2)

const parametresDeDemarrageFlocon = {
	x: origineFloconX, 
	y: origineFloconY, 
	angle: 0, 
	couleur: couleurFlocon
};
const crayonFlocon = new Crayon (idCanvasFlocon, parametresDeDemarrageFlocon);





/**
 * Trace une courbe de Koch
 * @param {number} longueurSegment Longueur d'un segment
 * @param {number} nombreDIterations Nombre d'itérations
 */
function courbeDeKoch (longueurSegment, nombreDIterations) {
	// S'il n'y a qu'une itération, on trace les quatre segments en tournant entre chaque
	if (nombreDIterations == 1) {
		crayonFlocon.traceEnLigne(longueurSegment);

		crayonFlocon.tourne(-60);
		crayonFlocon.traceEnLigne(longueurSegment);

		crayonFlocon.tourne(120);
		crayonFlocon.traceEnLigne(longueurSegment);

		crayonFlocon.tourne(-60);
		crayonFlocon.traceEnLigne(longueurSegment);
	}
	// Sinon, on fait la même chose mais en traçant une courbe de Koch au lieu d'un segment
	else {
		courbeDeKoch(longueurSegment /3, nombreDIterations-1); // Ne pas oublier de diminuer le nombre d'itérations, sinon on lance une boucle infinie

		crayonFlocon.tourne(-60);
		courbeDeKoch(longueurSegment /3, nombreDIterations-1);

		crayonFlocon.tourne( 120);
		courbeDeKoch(longueurSegment /3, nombreDIterations-1);

		crayonFlocon.tourne(-60);
		courbeDeKoch(longueurSegment /3, nombreDIterations-1);
	}
}


/**
 * Trace le flocon à l'aide de la fonction courbeDeKoch et des données entrées par l'utilisateur·rice
 */
function tracerLeFloconDeKoch() {
	let nombreDIterations = inputNombreDiterationsFlocon.value; // On récupère le nombre d'itérations

	if (nombreDIterations > 0) // Vérifier que la valeur entrée est cohérente avant de tracer le flocon
		{
            crayonFlocon.reinitialiseLeCanvas(parametresDeDemarrageFlocon); // Effacer le dessin précédent avant de tracer

			// Chaque courbe dessinée ne fait qu'un tiers du flocon qu'on veut obtenir, on en trace donc trois en tournant entre chaque
			courbeDeKoch(longueurSegmentFlocon, nombreDIterations);
			crayonFlocon.tourne(120); 
			courbeDeKoch(longueurSegmentFlocon, nombreDIterations);
			crayonFlocon.tourne(120); 
			courbeDeKoch(longueurSegmentFlocon, nombreDIterations);
		}
}

/* Plus qu'à le lancer ! */