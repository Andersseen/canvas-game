const canvas = document.querySelector('#game');

const context = canvas.getContext('2d');


const asteroide = new Image();
asteroide.src = "./assets/img/asteroide.png";

const backgroundImg = new Image();
backgroundImg.src = "./assets/img/background.jpg";

let aster = { x: 0, y: 300, dx: 1, dy: 2 };



backgroundImg.onload = () => {
    game()
}

//game loop
function game() {

    update();
    render();
    requestAnimFrame(game);
}

function update() {
    //fisics
    aster.x = aster.x + aster.dx;
    aster.y = aster.y + aster.dy;

    //limits
    if (aster.x >= 550 || aster.x < 0) aster.dx = -aster.dx;
    if (aster.y >= 550 || aster.y < 0) aster.dy = -aster.dy;
}

function render() {
    context.drawImage(backgroundImg, 0, 0, 600, 600);
    context.drawImage(asteroide, aster.x, aster.y, 50, 50);
}

const requestAnimFrame = (function () {

    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 20);
        };
})();