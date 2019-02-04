var Ball = function() {
    var image = imageFromPath('image/ball.PNG')
    var o = {
        image: image,
        x: 0,
        y: 0,
        speedX: 5,
        speedY: 5,
        fired: false,
    }
    o.move = function() {
        if (o.fired) {
            if (o.x < 0 || o.x > 400) {
                o.speedX *= -1
            }
            if (o.y < 0 || o.y > 300) {
                o.speedY *= -1
            }
            o.x += o.speedX
            o.y += o.speedY
        }
    }
    o.fire = function() {
        o.fired = true
    }
    o.bounce = function() {
        o.speedY *= -1
    }
    return o
}
