class EndScene extends Scene {
    constructor(game) {
        super(game)
    }
    draw() {
        this.game.context.font = '15px serif'
        this.game.context.fillText('Game Over', 150, 150)
    }
    update() {

    }
}
