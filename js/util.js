var log = console.log.bind(console)

var abs = Math.abs.bind(Math)

var rectCollide = function(a, b) {
    var x1 = a.x
    var y1 = a.y
    var w1 = a.imageDrawWidth
    var h1 = a.imageDrawHeight

    var x2 = b.x
    var y2 = b.y
    var w2 = b.imageDrawWidth
    var h2 = b.imageDrawHeight

    if (abs((x1 + w1 * 0.5) - (x2 + w2 * 0.5)) <= (w1 * 0.5 + w2 * 0.5)) {
        if (abs((y1 + h1 * 0.5) - (y2 + h2 * 0.5)) <= (h1 * 0.5 + h2 * 0.5)) {
            return true
        }
    }
    return false
}
