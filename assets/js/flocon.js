// On récupère l'identifiant du canvas sur lequel on veut dessiner
const cS = document.getElementById("canvaSnowflake");

// On créé notre objet crayon
const crayonS = new Crayon ('canvaSnowflake', 'blue');



// Position initiale : de façon à ce que le flocon soit centré, avec un côté de longueur 100
const longueurSegmentFlocon = 100;

const originFloconX = Math.round((cS.width - (3*longueurSegmentFlocon)) / 2);
//const originFloconY = Math.round((cS.height - 2*Math.sqrt(3)*100) / 2 + Math.sqrt(3)*100/2);
const originFloconY = Math.round(cS.height/2 - longueurSegmentFlocon * Math.sqrt(3)/2)

/**
 * Trace une courbe de Koch
 * @param {number} long Longueur d'un segment
 * @param {number} nbIt Nombre d'itérations
 */
function courbeDeKoch (long, nbIt) {
	// S'il n'y a qu'une itération, on trace les quatre segments en tournant entre chaque
	if (nbIt == 1) {
		crayonS.traceEnLigne(long);

		crayonS.tourne(-60);
		crayonS.traceEnLigne(long);

		crayonS.tourne(120);
		crayonS.traceEnLigne(long);

		crayonS.tourne(-60);
		crayonS.traceEnLigne(long);
	}
	// Sinon, on fait la même chose mais en traçant une courbe de Koch au lieu d'un segment
	else {
		courbeDeKoch(long /3, nbIt-1); // Ne pas oublier de diminuer le nombre d'itérations, sinon on lance une boucle infinie

		crayonS.tourne(-60);
		courbeDeKoch(long /3, nbIt-1);

		crayonS.tourne( 120);
		courbeDeKoch(long /3, nbIt-1);

		crayonS.tourne(-60);
		courbeDeKoch(long /3, nbIt-1);
	}
}


/**
 * Trace le flocon à l'aide de la fonction précédente et des données entrées sur la page web
 */
function tracerLeFloconDeKoch() {
	let nombreDIterations = document.getElementById('inputItSF').value; // On récupère le nombre d'itérations

	if (nombreDIterations > 0) // Vérifier que les valeurs entrées sont cohérentes avant de tracer le flocon
		{
            crayonS.reinitialiseLeCanvas(originFloconX, originFloconY); // Effacer le dessin précédent avant de tracer

			// Chaque courbe dessinée ne fait d'un tiers du flocon qu'on veut obtenir, on en trace donc trois en tournant entre chaque
			courbeDeKoch(longueurSegmentFlocon, nombreDIterations);
			crayonS.tourne(120); 
			courbeDeKoch(longueurSegmentFlocon, nombreDIterations);
			crayonS.tourne(120); 
			courbeDeKoch(longueurSegmentFlocon, nombreDIterations);
		}
}

/* Plus qu'à le lancer ! */