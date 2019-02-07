class PlayScene extends Scene {
    constructor(game) {
        super(game)

        this.score = 0

        this.paddle = Paddle()

        this.ball = Ball()

        this.bricks = loadLevel(2)

        this.game.registerAction('a', () => {
            this.paddle.moveLeft()
        })
        this.game.registerAction('d', () => {
            this.paddle.moveRight()
        })
        this.game.registerAction('f', () => {
            this.ball.fire()
        })

        if (global_isInDebugMode) {
            window.addEventListener('keyup', function(event) {
                var k = event.key
                if (k == '1') {
                    this.bricks = loadLevel(1)
                } else if (k == '2') {
                    this.bricks = loadLevel(2)
                }
            })

            var fpsSlider = document.querySelector('#input-range-fps')
            fpsSlider.hidden = false
            fpsSlider.addEventListener('input', function(event) {
                window.fps = Number(event.target.value)
            })

            var enableDrag = false
            this.game.canvas.addEventListener('mousedown', function(event) {
                var x = event.offsetX
                var y = event.offsetY
                if (this.ball.hasPoint(x, y)) {
                    enableDrag = true
                }
            })
            this.game.canvas.addEventListener('mousemove', function(event) {
                if (enableDrag) {
                    var x = event.offsetX
                    var y = event.offsetY
                    this.ball.x = x
                    this.ball.y = y
                }
            })
            this.game.canvas.addEventListener('mouseup', function(event) {
                enableDrag = false
            })
        }
    }
    draw() {
        this.game.drawImage(this.paddle)
        this.game.drawImage(this.ball)

        for (var i = this.bricks.length - 1; i >= 0; i--) {
            var b = this.bricks[i]
            if (b.alive) {
                this.game.drawImage(b)
            }
        }

        this.game.context.font = '15px serif'
        this.game.context.fillText('score: ' + this.score, 10, 250)
    }
    update() {
       if (this.game.paused) {
            return
        }

        this.ball.move()

        if (this.ball.next().y >= 300) {
            var endScene = new EndScene(this.game)
            this.game.loadScene(endScene)
            return
        }

        if (this.ball.next().x <= 0 || this.ball.next().x >= 400) {
            this.ball.speedX *= -1
        }
        if (this.ball.next().y <= 0 || this.ball.next().y >= 300) {
            this.ball.speedY *= -1
        }

        if (this.paddle.collide(this.ball.next())) {
            if (this.ball.x + this.ball.image.width <= this.paddle.x || this.ball.x >= this.paddle.x + this.paddle.image.width) {
                this.ball.speedX *= -1
            } else {
                this.ball.speedY *= -1
            }
        }

        for (var i = this.bricks.length - 1; i >= 0; i--) {
            var b = this.bricks[i]
            if (b.alive && b.collide(this.ball.next())) {
                b.kill()
                this.ball.speedY *= -1
                this.score += 10
            }
        }
    }
}
