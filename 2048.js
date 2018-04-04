// function main () {
//     var game = {};
//     game.stop  = window.requestAnimationFrame(main);
    
// }
// window.onload = main;
function main() {
    var game = new Game();
    var keyCode = 0;
    game.init();
    game.start();
    window.onkeydown = (e) => {
        game.move.call(game, e.keyCode);
        game.draw.call(game);
        game.result.call(game);
    };
}

window.onload = main;