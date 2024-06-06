/* On va ici tracer le triangle de Sierpinski */

// On définit nos variables principales

const idCanvasTriangle = "canvasTriangle"; 

const canvasTriangle = document.getElementById(idCanvasTriangle);
const inputLongueurTriangle = document.getElementById('inputLongueurTriangle');
const inputNombreDIterationsTriangle = document.getElementById('inputNombreDIterationsTriangle');

// On calcule la position initiale : au milieu en haut
const origineXTriangle = Math.round(canvasTriangle.width/2);
const origineYTriangle = 0;
const origineAngleTriangle = 0;
const couleurTriangle = "red";

// On créé notre objet Crayon
const parametresDeDemarrageTriangle = {
	x: origineXTriangle, 
	y: origineYTriangle, 
	angle: origineAngleTriangle, 
	couleur: couleurTriangle
};
const crayonTriangle = new Crayon (idCanvasTriangle, parametresDeDemarrageTriangle);

crayonTriangle.ctx.fillStyle = couleurTriangle; // Permet de remplir l'intérieur des triangles





/**
* Permet de dessiner un triangle
* @param {number} longueurCote Longueur d'un côté du triangle
* @param {number} nombreDIterations Nombre d'itérations
*/
function triangle(longueurCote, nombreDIterations) {
	// S'il n'y a qu'une itération, on trace trois triangles simples 
	if (nombreDIterations == 1) {
		// On part du haut, on trace le premier côté du triangle du haut (vers le bas et la gauche)
		crayonTriangle.angle = 0;
		crayonTriangle.tourne(120);
		crayonTriangle.traceEnLigne(longueurCote);
		
		// On trace le triangle en bas à gauche
		crayonTriangle.traceEnLigne(longueurCote);
		crayonTriangle.tourne(-120);
		crayonTriangle.traceEnLigne(longueurCote);
		crayonTriangle.tourne(-120);
		crayonTriangle.traceEnLigne(longueurCote);
		
		// On trace le deuxième côté du triangle du haut (vers la droite)
		crayonTriangle.tourne(120);
		crayonTriangle.traceEnLigne(longueurCote);
		
		// On trace le triangle en bas à droite
		crayonTriangle.tourne(120);
		crayonTriangle.traceEnLigne(longueurCote);
		crayonTriangle.tourne(-120);
		crayonTriangle.traceEnLigne(longueurCote);
		crayonTriangle.tourne(-120);
		crayonTriangle.traceEnLigne(longueurCote);
		
		// On trace le dernier côté du triangle du haut
		crayonTriangle.traceEnLigne(longueurCote);
	}
	
	// S'il y a plusieurs itérations, on fait pareil mais en réappelant la fonction au lieu de dessiner de simples triangles
	else {
		// Tracer le triangle du haut
		triangle(longueurCote/2, nombreDIterations-1); // Toujours diminuer le nombre d'itérations quand on réappelle la fonction !
		
		// Se déplacer jusqu'au sommet du deuxième triangle (en bas à gauche) et le tracer
		crayonTriangle.angle = 0;
		crayonTriangle.tourne(120);
		crayonTriangle.deplaceEnLigne(longueurCote);
		triangle(longueurCote/2, nombreDIterations-1);
		
		// Se déplacer jusqu'au sommet du dernier triangle (en bas à droite) et le tracer
		crayonTriangle.angle = 0;
		crayonTriangle.deplaceEnLigne(longueurCote);
		triangle(longueurCote/2, nombreDIterations-1);
		
		// Revenir au point de départ
		crayonTriangle.angle = 0;
		crayonTriangle.tourne(-120);
		crayonTriangle.deplaceEnLigne(longueurCote);
	}
	
}

/**
* Trace le triangle à l'aide de la fonction triangle et des données entrées par l'utilisateur·rice
*/
function tracerLeTriangle() {
	// On récupère la longueur et le nombre d'itérations
	let longueurCote = parseFloat(inputLongueurTriangle.value);
	let nombreDIterations = parseInt(inputNombreDIterationsTriangle.value);
	
	
	if (longueurCote > 0 && nombreDIterations > 0) // On vérifie que les valeurs données sont correctes
	{
		if (nombreDIterations >= 10) alert("N'y pense même pas");
		else {
			crayonTriangle.reinitialiseLeCanvas(parametresDeDemarrageTriangle); // On vide le canvas
			triangle(longueurCote, nombreDIterations); // On trace les triangles
			crayonTriangle.ctx.fill(); // On remplit l'intérieur des triangles dessinés
		}
	}
}

/* Plus qu'à le lancer ! */