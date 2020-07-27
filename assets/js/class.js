class Crayon {
    constructor (x, y, angle, idcan, color) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.idcan = idcan;
        this.color = color
    }

    moveTo(x, y) {
        this.x = x; this.y = y;
        document.getElementById(this.idcan).getContext("2d").moveTo(x,y);
    }

    traceTo(x,y) {
        this.x = x; this.y = y;
        var ctx = document.getElementById(this.idcan).getContext("2d");
        ctx.lineTo(x,y);
        ctx.stroke();
    }

    turn(degre) {
        this.angle += degre * Math.PI / 180.0;
    }

    moveLine(long) {
        var x1 = this.x + long * Math.cos(this.angle),
            y1 = this.y + long * Math.sin(this.angle);
        this.moveTo(x1,y1);
    }
    traceLine(long) {
        var x1 = this.x + long * Math.cos(this.angle),
            y1 = this.y + long * Math.sin(this.angle);
        this.traceTo(x1,y1);
    }


    reinit(orX, orY) {
        var c = document.getElementById(this.idcan), ctx = c.getContext("2d");
        ctx.clearRect(0, 0, c.width, c.height); 
        ctx.beginPath(); 
        ctx.strokeStyle = this.color;
        this.moveTo(orX, orY);
        this.angle = 0;
    }

    changeColor(color) {
        this.color = color;
        var ctx = document.getElementById(this.idcan).getContext("2d");
        ctx.strokeStyle = this.color;
    }
}
