var loadLevel = function(n) {
    n = n - 1
    var brickProperties = levels[n]
    var bricks = []
    for (var i = brickProperties.length - 1; i >= 0; i--) {
        var property = brickProperties[i]
        var brick = Brick(property)
        bricks.push(brick)
    }
    return bricks
}

var __main = function() {
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

    window.addEventListener('keyup', function(event) {
        var k = event.key
        if (k == '1') {
            bricks = loadLevel(1)
        } else if (k == '2') {
            bricks = loadLevel(2)
        }
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
