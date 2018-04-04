main() {
    game = new Game;
    game.init();
    game.start();
    onkeydown(e) {
        game.move(e.keyCode);
        game.next();
        game.draw();
        game.win();
    }
}