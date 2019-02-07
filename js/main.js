var __main = function() {
    var game = Game()

    var startScene = GameStartScene(game)
    game.loadScene(startScene)
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
