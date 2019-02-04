var global_images = {}

var imageByName = function(name) {
    return global_images[name]
}

var Game = function() {
    var canvas = document.querySelector('#id-canvas')
    var context = canvas.getContext('2d')
    var o = {
        context: context,
        actions: {},
        keydowns: {},
        paused: false,
    }

    o.drawImage = function(objectWithImage) {
        o.context.drawImage(objectWithImage.image, objectWithImage.x, objectWithImage.y)
    }

    window.addEventListener('keydown', function(event) {
        o.keydowns[event.key] = true
    })
    window.addEventListener('keyup', function(event) {
        o.keydowns[event.key] = false
    })
    o.registerAction = function(key, callback) {
        o.actions[key] = callback
    }

    if (global_isInDebugMode) {
        window.addEventListener('keyup', function(event) {
            var k = event.key
            if (k == 'p') {
                o.paused = !o.paused
            }
        })
    }

    o.update = function() {
        
    }

    o.draw = function() {
        
    }

    window.fps = 60
    
    var runloop = function() {
        var keys = Object.keys(o.actions)
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i]
            if (o.keydowns[key]) {
                o.actions[key]()
            }
        }

        o.update()

        // clear
        o.context.clearRect(0, 0, canvas.width, canvas.height)

        o.draw()

        setTimeout(runloop, 1000 / window.fps)    
    }

    runloop()

    return o
}
