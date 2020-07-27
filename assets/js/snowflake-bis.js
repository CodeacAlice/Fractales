let cS = document.getElementById("canvaSnowflake");

let crayonS = new Crayon (0,0,0, 'canvaSnowflake', 'orange');



/* On veut ensuite une fonction qui permette d'effacer le canva si on veut faire d'autres flocons */
/* Fixons d'abord le point de départ du crayon */
// Position initiale : de façon à ce que le flocon soit centré, avec un côté de longueur 100
let originSX = Math.round((cS.width -300) / 2);
let originSY = Math.round((cS.height - 2*Math.sqrt(3)*100) / 2 + Math.sqrt(3)*100/2);


/* On commence par la fonction pricipale : celle qui trace une courbe de Koch */
/* C'est une fonction récursive dont les paramètres sont : la longueur d'un segment et le nombre d'itérations */
function KochCurve (long, nbIt) {
	// S'il n'y a qu'une itération, on trace les quatre segments en tournant entre chaque
	if (nbIt == 1) {
		crayonS.traceLine(long);

		crayonS.turn(60);
		crayonS.traceLine(long);

		crayonS.turn(- 120);
		crayonS.traceLine(long);

		crayonS.turn(60);
		crayonS.traceLine(long);
	}
	// Sinon, on fait la même chose mais en traçant une courbe de Koch au lieu d'un segment
	else {
		KochCurve(long /3, nbIt-1); // Ne pas oublier de diminuer le nombre d'itérations, sinon on lance une boucle infinie

		crayonS.turn(60);
		KochCurve(long /3, nbIt-1);

		crayonS.turn(- 120);
		KochCurve(long /3, nbIt-1);

		crayonS.turn(60);
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
            crayonS.reinit(originSX, originSY); // Effacer le dessin précédent avant de tracer
            console.log(crayonS.x, crayonS.y);

			// Chaque courbe dessinée ne fait d'un tiers du flocon qu'on veut obtenir, on en trace donc trois en tournant entre chaque
			KochCurve(newLength, newIt);console.log(crayonS.x, crayonS.y);
			/* crayonS.turn(-120); crayonS.changeColor('red');
			KochCurve(newLength, newIt);
			crayonS.turn(-120); crayonS.changeColor('blue');
			KochCurve(newLength, newIt); */
		}
}

/* Plus qu'à le lancer ! */