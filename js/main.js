var __main = function() {
    var game = Game(30)
    var paddle = Paddle()
    var ball = Ball()

    var bricks = []
    for (var i = 2; i >= 0; i--) {
        var b = Brick()
        b.x = 20 + 120 * i
        b.y = 100
        bricks.push(b)
    }

    game.registerAction('a', function() {
        paddle.moveLeft()
    })
    game.registerAction('d', function() {
        paddle.moveRight()
    })
    game.registerAction('f', function() {
        ball.fire()
    })

    game.update = function() {
        if (game.paused) {
            return
        }

        ball.move()
        if (paddle.collide(ball)) {
            ball.bounce()
        }

        for (var i = bricks.length - 1; i >= 0; i--) {
            var b = bricks[i]
            if (b.alive && b.collide(ball)) {
                b.kill()
                ball.bounce()
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
    }
}

__main()
