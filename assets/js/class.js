
/*  On créé une classe "Crayon" qui représente le crayon avec lequel on va dessiner nos fractales
    Ses attributs sont :
        Les coordonnées (x,y) de sa position, 
        La direction (angle) dans laquelle il est tourné, 
        L'identifiant du canvas sur lequel on va dessiner (idCanvas)
        L'élément sur lequel on dessine (ctx)
*/

class Crayon {
    x = 0;
    y = 0;
    angle = 0;
    idCanvas;
    ctx;

    /**
     * @param {string} idCanvas L'identifiant du canvas sur lequel on va dessiner
     * @param {object} parametresDeDemarrage Objet contenant les données d'initialisation : coordonnées (x,y) de départ, angle de départ, couleur de tracé
     */
    constructor (idCanvas, parametresDeDemarrage) {
        this.idCanvas = idCanvas;
        this.ctx = document.getElementById(idCanvas).getContext("2d");
        this.reinitialiseLeCanvas(parametresDeDemarrage);
    }

    /**
     * Déplace le crayon au point de coordonnées (x,y), sans tracer de ligne
     * @param {number} x 
     * @param {number} y 
     */
    deplaceAuPoint(x, y) {
        this.x = x; this.y = y;
        this.ctx.moveTo(x,y);
    }

    /**
     * Trace une ligne jusqu'au point de coordonnées (x,y)
     * @param {number} x 
     * @param {number} y 
     */
    traceAuPoint(x,y) {
        this.x = x; this.y = y;
        this.ctx.lineTo(x,y);
        this.ctx.stroke();
    }

    /**
     * Tourne le crayon selon l'angle donné (en degrés)
     * @param {number} angleDeRotation 
     */
    tourne(angleDeRotation) {
        this.angle += this.degresVersRadians(angleDeRotation);
    }

    /**
     * Convertit un angle en radians
     * @param {number} angleEnDegres Un angle, exprimé en degrés 
     * @returns Le même angle converti en radians
     */
    degresVersRadians(angleEnDegres) {
        return Math.PI * angleEnDegres / 180.0;
    }

    /**
     * Déplace le crayon dans la direction dans laquelle il est tourné
     * @param {number} longueur Distance que parcourt le crayon
     */
    deplaceEnLigne(longueur) {
        let x1 = this.x + longueur * Math.cos(this.angle),
            y1 = this.y + longueur * Math.sin(this.angle);
        this.deplaceAuPoint(x1,y1);
    }
    /**
     * Déplace le crayon dans la direction dans laquelle il est tourné en traçant une ligne
     * @param {number} longueur Longueur de la ligne tracée
     */
    traceEnLigne(longueur) {
        let x1 = this.x + longueur * Math.cos(this.angle),
            y1 = this.y + longueur * Math.sin(this.angle);
        this.traceAuPoint(x1,y1);
    }

    /**
     * Réinitialise le canvas, place le crayon au point de coordonnées (origineX, origineY)
     * @param {object} parametresDeDemarrage 
     */
    reinitialiseLeCanvas(parametresDeDemarrage) {
        let canvas = document.getElementById(this.idCanvas);
        this.ctx.clearRect(0, 0, canvas.width, canvas.height); 
        this.ctx.beginPath(); 
        this.ctx.strokeStyle = parametresDeDemarrage.couleur;
        this.deplaceAuPoint(parametresDeDemarrage.x, parametresDeDemarrage.y);
        this.angle = this.degresVersRadians(parametresDeDemarrage.angle);
    }
}
