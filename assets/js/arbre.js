/* Ici se trouve le code pour tracer l'arbre fractal */

// On définit nos variables principales

const idCanvasArbre = "canvasArbre"; 

const canvasArbre = document.getElementById(idCanvasArbre);
const inputLongueurArbre = document.getElementById('inputLongueurArbre');
const inputRatioArbre = document.getElementById('inputRatioArbre');
const inputAngleArbre = document.getElementById('inputAngleArbre');
const inputNombreBranchesArbre = document.getElementById('inputNombreBranchesArbre');
const inputNombreDIterationsArbre = document.getElementById('inputNombreDIterationsArbre');

// On calcule la position initiale de façon à ce que l'arbre soit au milieu en bas
const origineXArbre = Math.round(canvasArbre.width/2);
const origineYArbre = canvasArbre.height;
const origineAngleArbre = - 90;
const couleurArbre = "green";

// On créé notre objet Crayon
const parametresDeDemarrageArbre = {
	x: origineXArbre, 
	y: origineYArbre,
	angle: origineAngleArbre,
	couleur: couleurArbre
};
const crayonArbre = new Crayon (idCanvasArbre, parametresDeDemarrageArbre);




/* Fonctions pour faire l'arbre */


/**
 * Trace les branches de l'arbre
 * @param {number} longueur Longueur des branches à tracer
 * @param {number} ratio (longueur d'une branche fille) / (longueur de sa branche mère)
 * @param {number} angle Angle entre deux branches adjacentes (en degrés)
 * @param {number} nombreBranches Le nombre de branches filles sur une même branche mère
 * @param {number} nombreDIterations Le nombre d'itérations 
 */
function branches (longueur, ratio, angle, nombreBranches, nombreDIterations) {
	// S'il n'y a qu'une itération, on se contente de tracer les branches filles
	if (nombreDIterations == 1) {
		// On commence par se tourner dans la direction de la première branche fille
		crayonArbre.tourne(- angle * (nombreBranches-1) /2);
		// On fait une boucle for afin que la fonction s'adapte au nombre de branches filles donné
		for (let n = 1; n <= nombreBranches; n++) {
			// On trace la branche
			crayonArbre.traceEnLigne(longueur);
			// On fait demi-tour, on retourne au point de départ, et on se tourne en direction de la branche suivante
			crayonArbre.tourne(180); 
			crayonArbre.deplaceEnLigne(longueur); 
			crayonArbre.tourne(180 + angle); 
		}
	}
	// S'il y a plusieurs itérations, il faudra rappeler la fonction afin de tracer des branches filles après avoir tracé chaque branche mère
	else {
		crayonArbre.tourne(- angle * (nombreBranches-1) /2);
		for (let k = 1; k <= nombreBranches; k++) {
			let a = crayonArbre.angle; // On garde en mémoire l'angle selon lequel le crayon était tourné

			// On trace une branche mère, puis on y ajoute ses branches filles
			crayonArbre.traceEnLigne(longueur);
			branches(longueur*ratio, ratio, angle, nombreBranches, nombreDIterations-1); // Ne pas oublier de diminuer le nombre d'itérations !

			// Retour au point de départ
			crayonArbre.angle = a;
			crayonArbre.tourne(180);
			crayonArbre.deplaceEnLigne(longueur);
			crayonArbre.tourne(180 + angle);
		}
	}
}



/* On combine à présent les fonctioncs précédentes dans une fonction qui va récupérer les paramètres sur la page HTML  */
/**
 * Trace l'arbre à l'aide de la fonction branches et des données entrées par l'utilisateur·rice
 */
function tracerLArbre () {
	// On récupère les paramètres
	let longueurArbre = parseFloat(inputLongueurArbre.value);
	let ratioArbre = parseFloat(inputRatioArbre.value);
	let angleArbre = parseInt(inputAngleArbre.value);
	let nombreBranchesArbre = parseInt(inputNombreBranchesArbre.value);
	let nombreDIterationsArbre = parseInt(inputNombreDIterationsArbre.value);

	if (longueurArbre > 0 && ratioArbre > 0 && angleArbre > 0 && nombreBranchesArbre > 0 && nombreDIterationsArbre > 0) // On vérifie que les paramètres donnés sont corrects
		{
			crayonArbre.reinitialiseLeCanvas(parametresDeDemarrageArbre); // On vide le canvas avant de commencer
			crayonArbre.traceEnLigne(longueurArbre); // On trace le tronc de l'arbre
			branches(longueurArbre*ratioArbre, ratioArbre, angleArbre, nombreBranchesArbre, nombreDIterationsArbre);
		}
}
// Sachez qu'avec un rapport de 0.5, un angle de 120 et 3 branches filles, vous obtiendrez un triangle de Sierpinski. Essayez donc !