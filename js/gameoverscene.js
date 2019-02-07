var GameOverScene = function(game) {
    var s = {}
    s.draw = function() {
        game.context.font = '15px serif'
        game.context.fillText('Game Over', 150, 150)
    }
    
    s.update = function() {

    }
    return s
}
