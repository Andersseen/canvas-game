const canvas = document.querySelector('#game');
const context = canvas.getContext('2d');

const aster = [];
let timer = 0;


const asteroideImg = new Image();
asteroideImg.src = "./assets/img/asteroide.png";

const backgroundImg = new Image();
backgroundImg.src = "./assets/img/background.jpg";


// aster.push({ x: 0, y: 300, dx: 10, dy: 20 });


backgroundImg.onload = function () {
    game();
}

//game loop
function game() {

    update();
    render();
    requestAnimFrame(game);
}

function update() {

    timer++;
    if (timer % 10 == 0) {
        aster.push({
            x: Math.random() * 600,
            y: -50,
            dx: Math.random() * 2 - 1,
            dy: Math.random() * 2 + 2,
        });
    }

    //fisics
    for (i in aster) {
        aster[i].x = aster[i].x + aster[i].dx;
        aster[i].y = aster[i].y + aster[i].dy;

        //limits
        if (aster[i].x >= 550 || aster[i].x < 0) aster[i].dx = -aster[i].dx;
        if (aster[i].y >= 600) aster.splice(i, 1);
    }

}

function render() {
    context.drawImage(backgroundImg, 0, 0, 600, 600);
    for (i in aster)
        context.drawImage(asteroideImg, aster[i].x, aster[i].y, 50, 50);
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