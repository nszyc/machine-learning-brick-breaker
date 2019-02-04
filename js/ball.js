var Ball = function() {
    var image = imageByName('ball')
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
            o.x += o.speedX
            o.y += o.speedY
        }
    }
    o.next = function() {
        var n = Ball()
        n.x = o.x + o.speedX * 1.5
        n.y = o.y + o.speedY * 1.5
        n.image = o.image
        return n
    }
    o.fire = function() {
        o.fired = true
    }
    return o
}
