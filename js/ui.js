export class UI {
    constructor(canvas) {
        this.canvas = canvas;
        this.score = 0;
    }

    updateScore(ctx) {
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.fillText(`Puntos: ${this.score}`, 20, 30);
    }
}
