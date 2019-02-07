var GameStartScene = function(game) {
    var s = {}
    game.registerAction('k', function() {
        var scene = Scene(game)
        game.loadScene(scene)
    })
    s.draw = function() {
        game.context.font = '15px serif'
        game.context.fillText('按 k 开始游戏', 150, 150)
    }
    
    s.update = function() {

    }
    return s
}
