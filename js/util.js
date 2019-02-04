var log = console.log.bind(console)

var abs = Math.abs.bind(Math)

var imageFromPath = function(path) {
    var img = new Image()
    img.src = path
    return img
}

var rectCollide = function(a, b) {
    var x1 = a.x
    var y1 = a.y
    var w1 = a.image.width
    var h1 = a.image.height

    var x2 = b.x
    var y2 = b.y
    var w2 = b.image.width
    var h2 = b.image.height

    if (abs((x1 + w1 * 0.5) - (x2 + w2 * 0.5)) <= (w1 * 0.5 + w2 * 0.5)) {
        if (abs((y1 + h1 * 0.5) - (y2 + h2 * 0.5)) <= (h1 * 0.5 + h2 * 0.5)) {
            return true
        }
    }
    return false
}