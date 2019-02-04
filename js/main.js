var __main = function() {
    var score = 0

    var game = Game(30)

    var paddle = Paddle()

    var ball = Ball()

    var bricks = loadLevel(2)

    game.registerAction('a', function() {
        paddle.moveLeft()
    })
    game.registerAction('d', function() {
        paddle.moveRight()
    })
    game.registerAction('f', function() {
        ball.fire()
    })

    if (global_isInDebugMode) {
        window.addEventListener('keyup', function(event) {
            var k = event.key
            if (k == '1') {
                bricks = loadLevel(1)
            } else if (k == '2') {
                bricks = loadLevel(2)
            }
        })

        var fpsSlider = document.querySelector('#input-range-fps')
        fpsSlider.hidden = false
        fpsSlider.addEventListener('input', function(event) {
            window.fps = Number(event.target.value)
        })
    }

    game.update = function() {
        if (game.paused) {
            return
        }

        ball.move()

        if (ball.next().y >= 300) {
            log('game over')
            return
        }

        if (ball.next().x <= 0 || ball.next().x >= 400) {
            ball.speedX *= -1
        }
        if (ball.next().y <= 0 || ball.next().y >= 300) {
            ball.speedY *= -1
        }

        if (paddle.collide(ball.next())) {
            if (ball.x + ball.image.width <= paddle.x || ball.x >= paddle.x + paddle.image.width) {
                ball.speedX *= -1
            } else {
                ball.speedY *= -1
            }
        }

        for (var i = bricks.length - 1; i >= 0; i--) {
            var b = bricks[i]
            if (b.alive && b.collide(ball.next())) {
                b.kill()
                ball.speedY *= -1
                score += 10
            }
        }
    }

    game.draw = function() {
        game.drawImage(paddle)
        game.drawImage(ball)

        for (var i = bricks.length - 1; i >= 0; i--) {
            var b = bricks[i]
            if (b.alive) {
                game.drawImage(b)
            }
        }

        game.context.font = '15px serif'
        game.context.fillText('score: ' + score, 10, 250)
    }
}

__main()
