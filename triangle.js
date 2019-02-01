var cT = document.getElementById("canvaTriangle");
var ctxT = cT.getContext("2d");



/* Le crayon */
/* L'objet crayon permettra de tracer le triangle
Ses paramètres sont : les coordonnées de sa position, la direction dans laquelle il se dirige,
                      et s'il est en train d'écrire ou non */
let crayonT = {posX: 0.0, posY: 0.0, angle: 0.0, isWriting: true};

/* Fonctions permettant de changer la direction du crayon et de le faire avancer */
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


/* Fonctions permettant d'effacer ce qu'il y a dans le canevas et de remettre le crayon à sa position initiale */
/* Position initiale : au milieu en haut */
let originTX = Math.round(cT.width / 2);
let originTY = 0;

/* Couleur du fond et couleur du tracé*/
let couleurTraceT = "red";

/* Fonction permettant d'effacer ce qu'il y a dans le canevas et de remettre le crayon à sa position initiale */
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

videEcranT();

/* Triforce */
function triangle(long, it) {
  if (it == 1) {
    crayonT['angle'] = 0.0;
    turnAngleT(240.0);
    avancerT(long);

    avancerT(long);
    turnAngleT(120);
    avancerT(long);
    turnAngleT(120);
    avancerT(long);

    turnAngleT(240.0);
    avancerT(long);

    turnAngleT(240);
    avancerT(long);
    turnAngleT(120);
    avancerT(long);
    turnAngleT(120);
    avancerT(long);

    avancerT(long);

    ctxT.fillStyle = "red";
    ctxT.fill();
  }

  else {
    triangle(long/2, it-1);

    crayonT['isWriting'] = false;
    crayonT['angle'] = 0.0;
    turnAngleT(240.0);
    avancerT(long);

    crayonT['isWriting'] = true;
    triangle(long/2, it-1);
    crayonT['isWriting'] = false;
    crayonT['angle'] = 0.0;
    avancerT(long);

    crayonT['isWriting'] = true;
    triangle(long/2, it-1);
    crayonT['isWriting'] = false;
    crayonT['angle'] = 0.0;
    turnAngleT(120);
    avancerT(long);
  }

}

function UltimateTriforce() {
  var newLength = parseFloat($('#inputLengthTri')[0].value);
  var newIt = parseInt($('#inputItTri')[0].value, 10);

  if (newLength > 0 && newIt > 0) {
    videEcranT();
    triangle(newLength, newIt)
  }
}