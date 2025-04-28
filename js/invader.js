export class Invader {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.width = 40;
        this.height = 40;
        this.x = Math.random() * (canvas.width - this.width);
        this.y = -50;
        this.speed = 5; // AUMENTÉ la velocidad de caída de 2 a 3.5

        const randomType = Math.floor(Math.random() * 4) + 1;
        this.image = new Image();
        this.image.src = `./img/invader${randomType}.png`;

        this.tipo = `invader${randomType}`;

        this.isSpecial = false; // Lo ponemos en false por defecto
    }

    move() {
        this.y += this.speed;
    }

    draw() {
        if (this.image.complete) {
            if (this.isSpecial) {
                // Dibujar contorno dorado primero
                this.ctx.strokeStyle = "gold";
                this.ctx.lineWidth = 4;
                this.ctx.strokeRect(this.x - 2, this.y - 2, this.width + 4, this.height + 4);
            }

            this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
    }
}




