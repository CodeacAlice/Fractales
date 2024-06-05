
class Crayon {
    /**
     * @param {string} idCanvas 
     * @param {string} color 
     */
    constructor (idCanvas, color) {
        this.x = 0;
        this.y = 0;
        this.angle = 0;
        this.idCanvas = idCanvas;
        this.color = color;
        this.ctx = document.getElementById(this.idCanvas).getContext("2d");
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
     * Tourne le crayon
     * @param {number} degre 
     */
    tourne(degre) {
        this.angle += degre * Math.PI / 180.0;
    }

    /**
     * Déplace le crayon dans la direction dans laquelle il est tourné
     * @param {number} distance Distance que parcourt le crayon
     */
    deplaceEnLigne(distance) {
        let x1 = this.x + distance * Math.cos(this.angle),
            y1 = this.y + distance * Math.sin(this.angle);
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
     * Réinitialise le canvas
     * @param {number} origineX 
     * @param {number} origineY 
     */
    reinitialiseLeCanvas(origineX, origineY) {
        this.ctx.clearRect(0, 0, c.width, c.height); 
        this.ctx.beginPath(); 
        this.ctx.strokeStyle = this.color;
        this.deplaceAuPoint(origineX, origineY);
        this.angle = 0;
    }
}
