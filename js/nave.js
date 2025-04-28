export class Nave {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.width = 50;
        this.height = 30;
        this.x = (canvas.width - this.width) / 2;
        this.y = canvas.height - this.height - 10;
        this.speed = 12; // AUMENTÉ la velocidad de la nave de 5 a 8

        this.image = new Image();
        this.image.src = "./img/Nave.png";
    }

    move(left, right, up, down) {
        if (left) this.x -= this.speed;
        if (right) this.x += this.speed;
        if (up) this.y -= this.speed;
        if (down) this.y += this.speed;

        if (this.x < 0) this.x = 0;
        if (this.x + this.width > this.canvas.width) this.x = this.canvas.width - this.width;
        if (this.y < 0) this.y = 0;
        if (this.y + this.height > this.canvas.height) this.y = this.canvas.height - this.height;
    }

    draw() {
        if (this.image.complete) {
            this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
    }
}




