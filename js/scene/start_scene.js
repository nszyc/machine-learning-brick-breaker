class StartScene extends Scene {
    constructor(game) {
        super(game)

        this.game.registerAction('k', () => {
            var playScene = new PlayScene(this.game)
            this.game.loadScene(playScene)
        })
    }
    draw() {
        this.game.context.font = '15px serif'
        this.game.context.fillText('按 k 开始游戏', 150, 150)
    }
    update() {

    }
}
