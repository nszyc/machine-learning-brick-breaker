var __main = function() {
    var score = 0

    var game = Game()

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

        var enableDrag = false
        game.canvas.addEventListener('mousedown', function(event) {
            var x = event.offsetX
            var y = event.offsetY
            if (ball.hasPoint(x, y)) {
                enableDrag = true
            }
        })
        game.canvas.addEventListener('mousemove', function(event) {
            if (enableDrag) {
                var x = event.offsetX
                var y = event.offsetY
                ball.x = x
                ball.y = y
            }
        })
        game.canvas.addEventListener('mouseup', function(event) {
            enableDrag = false
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

var imageNamesAndPaths = {
    'paddle': 'image/paddle.PNG',
    'ball': 'image/ball.PNG',
    'brick': 'image/brick.PNG',
}

var names = Object.keys(imageNamesAndPaths)
var loads = []
for (var i = names.length - 1; i >= 0; i--) {
    let name = names[i]
    var path = imageNamesAndPaths[name]
    let image = new Image()
    image.src = path
    image.onload = function() {
        global_images[name] = image
        loads.push(42)
        if (loads.length == names.length) {
            // 图片加载完成，开始执行
            __main()
        }
    }
}
