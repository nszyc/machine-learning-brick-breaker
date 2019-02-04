var levels = function() {
    var ls = [
        [
            [0, 100,],
        ],
        [
            [0, 100,],
            [200, 100,],
        ],
    ]
    return ls
}

var loadLevel = function(n) {
    n = n - 1
    var brickProperties = levels()[n]
    var bricks = []
    for (var i = brickProperties.length - 1; i >= 0; i--) {
        var property = brickProperties[i]
        var brick = Brick(property)
        bricks.push(brick)
    }
    return bricks
}
