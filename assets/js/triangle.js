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

const parametresDeDemarrageTriangle = {
	x: origineXTriangle, 
	y: origineYTriangle, 
	angle: origineAngleTriangle, 
	couleur: couleurTriangle
};
const crayonTriangle = new Crayon (idCanvasTriangle, parametresDeDemarrageTriangle);

crayonTriangle.ctx.fillStyle = couleurTriangle; // Permet de remplir l'intérieur des triangles





/* Fonction pour faire le triangle de Sierpinski */
/* Pour éviter de le confondre avec un triangle simple, le triangle de Sierpinski sera par la suite appelé 'Triforce' */
/* Les paramètres de la fonction sont : la longueur d'un côté de la Triforce et le nombre d'itérations */
function triangle(longueurCote, nombreDIterations) {
  // S'il n'y a qu'une itération, on trace les trois triangles et on les colorie
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

  // S'il y a plusieurs itérations, on fait pareil mais en traçant des triforces au lieu de simples triangles
  else {
    // Tracer la triforce du haut
    triangle(longueurCote/2, nombreDIterations-1); // Toujours diminuer le nombre d'itérations quand on réappelle la fonction !

    // Se déplacer jusqu'au sommet de la triforce qui sera en bas à gauche
    crayonTriangle.angle = 0;
    crayonTriangle.tourne(120);
    crayonTriangle.deplaceEnLigne(longueurCote);
    // La tracer
    triangle(longueurCote/2, nombreDIterations-1);

    // Se déplacer jusqu'au sommet de la triforce qui sera en bas à droite
    crayonTriangle.angle = 0;
    crayonTriangle.deplaceEnLigne(longueurCote);
    // La tracer
    triangle(longueurCote/2, nombreDIterations-1);

    // Revenir au point de départ
    crayonTriangle.angle = 0;
    crayonTriangle.tourne(-120);
    crayonTriangle.deplaceEnLigne(longueurCote);
  }

}

/* Enfin, la fonction appelée sur la page HTML */
function tracerLeTriangle() {
  // On récupère la longueur et le nombre d'itérations
  var longueurCote = parseFloat(inputLongueurTriangle.value);
  var nombreDIterations = parseInt(inputNombreDIterationsTriangle.value);

  // On vérifie que les valeurs données sont correctes, et si c'est la cas on efface le dessin précédent et on fait le tracé
  if (longueurCote > 0 && nombreDIterations > 0) {
    crayonTriangle.reinitialiseLeCanvas(parametresDeDemarrageTriangle);
    triangle(longueurCote, nombreDIterations);
    crayonTriangle.ctx.fill();
  }
}