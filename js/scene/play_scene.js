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
            window.addEventListener('keyup', (event) => {
                var k = event.key
                if (k == '1') {
                    this.bricks = loadLevel(1)
                } else if (k == '2') {
                    this.bricks = loadLevel(2)
                }
            })

            var fpsSlider = document.querySelector('#input-range-fps')
            fpsSlider.hidden = false
            fpsSlider.addEventListener('input', (event) => {
                window.fps = Number(event.target.value)
            })

            var enableDrag = false
            this.game.canvas.addEventListener('mousedown', (event) => {
                var x = event.offsetX
                var y = event.offsetY
                if (this.ball.hasPoint(x, y)) {
                    enableDrag = true
                }
            })
            this.game.canvas.addEventListener('mousemove', (event) => {
                if (enableDrag) {
                    var x = event.offsetX
                    var y = event.offsetY
                    this.ball.x = x
                    this.ball.y = y
                }
            })
            this.game.canvas.addEventListener('mouseup', (event) => {
                enableDrag = false
            })
        }

        if (global_isInAIMode) {
            this.GA = new GeneticAlgorithm()
            this.GA.reset()
            this.GA.createPopulation()
            this.setupAllPaddleStatus()
            this.setupPaddleNewStatus()
            this.ball.fire()
        }
    }
    draw() {
        this.game.context.fillStyle = 'rgb(255, 255, 225)'
        this.game.context.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height)

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
            if (global_isInAIMode) {
                this.paddleStatus[this.paddle.index].live = false

                log('index' + ' ' + this.paddle.index)
                log('collideTimes' + ' ' + this.collideTimes)
                log('')

                this.GA.Population[this.paddle.index].fitness = this.collideTimes

                this.paddle = Paddle()
                this.ball = Ball()
                this.ball.fire()

                if (this.AllStatusDeath()) {
                    this.setupAllPaddleStatus()
                    this.GA.evolvePopulation();
                    this.GA.iteration++;
                    log('evolve info')
                    log('iteration' + ' ' + this.GA.iteration)
                    log('')
                }
                this.setupPaddleNewStatus()
            } else {
                var endScene = new EndScene(this.game)
                this.game.loadScene(endScene)
            }
            return
        }

        if (global_isInAIMode) {
            if (this.paddleStatus[this.paddle.index].live) {
                this.GA.activateBrain(this.paddle, this.ball)
            }
        }

        if (this.ball.next().x <= 0 || this.ball.next().x >= 400) {
            this.ball.speedX *= -1
        }
        if (this.ball.next().y <= 0 || this.ball.next().y >= 300) {
            this.ball.speedY *= -1
        }

        if (this.paddle.collide(this.ball.next())) {
            if (this.ball.x + this.ball.imageDrawWidth <= this.paddle.x || this.ball.x >= this.paddle.x + this.paddle.imageDrawWidth) {
                this.ball.speedX *= -1
            } else {
                this.ball.speedY *= -1
            }

            this.collideTimes++
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
    setupAllPaddleStatus() {
        this.paddleStatus = []
        for (var i = 0; i < 10; i++) {
            var s = {
                index: i,
                live: true,
            }
            this.paddleStatus.push(s)
        }
    }
    pickOneLiveStatus() {
        for (var i = 0; i < 10; i++) {
            var s = this.paddleStatus[i]
            if (s.live) {
                return s
            }
        }
        return null
    }
    AllStatusDeath() {
        for (var i = 0; i < 10; i++) {
            var s = this.paddleStatus[i]
            if (s.live) {
                return false
            }
        }
        return true
    }
    setupPaddleNewStatus() {
        var status = this.pickOneLiveStatus()
        this.paddle.index = status.index
        this.collideTimes = 0
    }
}
