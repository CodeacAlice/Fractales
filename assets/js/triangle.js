/* On va ici tracer le triangle de Sierpinski */

/* Le début est identique au code pour le flocon, je ne m'y attarderai donc pas ici */
var cT = document.getElementById("canvaTriangle");
var ctxT = cT.getContext("2d");

let crayonT = {posX: 0.0, posY: 0.0, angle: 0.0, isWriting: true};

function turnAngleT (newAngle) {
  crayonT['angle'] += convertToRadian(newAngle);
}

function avancerT(distance) {
  var dx = distance * Math.cos(crayonT['angle']);
  var dy = distance * Math.sin(crayonT['angle']);
  crayonT['posX'] += dx;
  crayonT['posY'] -= dy;

  if (crayonT['isWriting']) {
    ctxT.lineTo(Math.round(crayonT['posX']), Math.round(crayonT['posY']));
    ctxT.stroke();
  }
  else {ctxT.moveTo(Math.round(crayonT['posX']), Math.round(crayonT['posY']));}
}

// Position initiale : au milieu en haut
let originTX = Math.round(cT.width / 2);
let originTY = 0;

let couleurTraceT = "red";

function videEcranT() {
  ctxT.clearRect(0, 0, cT.width, cT.height);
  ctxT.beginPath();
  ctxT.strokeStyle = couleurTraceT;
  crayonT['posX'] = originTX;
  crayonT['posY'] = originTY;
  crayonT['angle'] = 0.0;
  crayonT['isWriting'] = true;

  ctxT.moveTo(crayonT['posX'], crayonT['posY']);
}




/* Fonction pour faire le triangle de Sierpinski */
/* Pour éviter de le confondre avec un triangle simple, le triangle de Sierpinski sera par la suite appelé 'Triforce' */
/* Les paramètres de la fonction sont : la longueur d'un côté de la Triforce et le nombre d'itérations */
function triangle(long, it) {
  // S'il n'y a qu'une itération, on trace les trois triangles et on les colorie
  if (it == 1) {
    // On part du haut, on trace le premier côté du triangle du haut (vers le bas et la gauche)
    crayonT['angle'] = 0.0;
    turnAngleT(240.0);
    avancerT(long);

    // On trace le triangle en bas à gauche
    avancerT(long);
    turnAngleT(120);
    avancerT(long);
    turnAngleT(120);
    avancerT(long);

    // On trace le deuxième côté du triangle du haut (vers la droite)
    turnAngleT(240.0);
    avancerT(long);

    // On trace le triangle en bas à droite
    turnAngleT(240);
    avancerT(long);
    turnAngleT(120);
    avancerT(long);
    turnAngleT(120);
    avancerT(long);

    // On trace le dernier côté du triangle du haut
    avancerT(long);

    // On remplit les trois triangles
    ctxT.fillStyle = "red";
    ctxT.fill();
  }

  // S'il y a plusieurs itérations, on fait pareil mais en traçant des triforces au lieu de simples triangles
  else {
    // Tracer la triforce du haut
    triangle(long/2, it-1); // Toujours diminuer le nombre d'itérations quand on réappelle la fonction !

    // Se déplacer jusqu'au sommet de la triforce qui sera en bas à gauche
    crayonT['isWriting'] = false;
    crayonT['angle'] = 0.0;
    turnAngleT(240.0);
    avancerT(long);
    // La tracer
    crayonT['isWriting'] = true;
    triangle(long/2, it-1);

    // Se déplacer jusqu'au sommet de la triforce qui sera en bas à droite
    crayonT['isWriting'] = false;
    crayonT['angle'] = 0.0;
    avancerT(long);
    // La tracer
    crayonT['isWriting'] = true;
    triangle(long/2, it-1);

    // Revenir au point de départ
    crayonT['isWriting'] = false;
    crayonT['angle'] = 0.0;
    turnAngleT(120);
    avancerT(long);
  }

}

/* Enfin, la fonction appelée sur la page HTML */
function UltimateTriforce() {
  // On récupère la longueur et le nombre d'itérations
  var newLength = parseFloat(document.getElementById('inputLengthTri').value);
  var newIt = parseInt(document.getElementById('inputItTri').value, 10);

  // On vérifie que les valeurs données sont correctes, et si c'est la cas on efface le dessin précédent et on fait le tracé
  if (newLength > 0 && newIt > 0) {
    videEcranT();
    triangle(newLength, newIt)
  }
}