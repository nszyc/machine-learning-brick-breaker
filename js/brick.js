var Brick = function(property) {
    var image = imageByName('brick')
    var o = {
        image: image,
        x: property[0],
        y: property[1],
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
