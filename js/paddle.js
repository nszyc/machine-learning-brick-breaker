var Paddle = function() {
    var image = imageByName('paddle')
    var o = {
        image: image,
        x: 200 - 159 * 0.5,
        y: 300 - 19,
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
