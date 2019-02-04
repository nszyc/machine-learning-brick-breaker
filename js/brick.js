var Brick = function() {
    var image = imageFromPath('image/brick.PNG')
    var o = {
        image: image,
        x: 0,
        y: 0,
        alive: true,
    }
    o.kill = function() {
        o.alive = false
    }
    o.collide = function(ball) {
        return rectCollide(o, ball)
    }
    return o
}
