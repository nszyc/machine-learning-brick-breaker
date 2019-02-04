var Paddle = function() {
    var image = imageFromPath('image/paddle.PNG')
    var o = {
        image: image,
        x: 100,
        y: 200,
        speed: 5,
    }
    o.move = function(x) {
        if (x < 0) {
            x = 0
        }
        if (x > 400 - o.image.width) {
            x = 400 - o.image.width
        }
        o.x = x
    }
    o.moveLeft = function() {
        o.move(o.x - o.speed)
    }
    o.moveRight = function() {
        o.move(o.x + o.speed)
    }
    o.collide = function(ball) {
        return rectCollide(o, ball)
    }
    return o
}
