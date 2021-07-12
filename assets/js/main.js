const canvas = document.querySelector('#game');
const context = canvas.getContext('2d');

const aster = [];
let fireball = [];
let timer = 0;
const starShip = { x: 300, y: 300 };

const asteroideImg = new Image();
asteroideImg.src = "./assets/img/asteroide.png";

fireballImg = new Image();
fireballImg.src = "./assets/img/fireball.png";

const starShipImg = new Image();
starShipImg.src = "./assets/img/starship.png";

const backgroundImg = new Image();
backgroundImg.src = "./assets/img/space_bg.jpg";


canvas.addEventListener("mousemove", (e) => {
    starShip.x = e.offsetX - 25;
    starShip.y = e.offsetY - 13;
})


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

    //bullets
    if (timer % 30 == 0) {
        fireball.push({
            x: starShip.x + 10,
            y: starShip.y,
            dx: 0,
            dy: -5.2,
        });
        fireball.push({
            x: starShip.x + 60,
            y: starShip.y,
            dx: 0,
            dy: -5.2,
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

    for (i in fireball) {
        fireball[i].x = fireball[i].x + fireball[i].dx;
        fireball[i].y = fireball[i].y + fireball[i].dy;

        //limits
        if (fireball[i].y < -30) fireball.splice(i, 1);
    }

}

function render() {
    context.drawImage(backgroundImg, 0, 0, 600, 600);
    context.drawImage(starShipImg, starShip.x, starShip.y, 100, 100);

    for (i in fireball) {
        context.drawImage(fireballImg, fireball[i].x, fireball[i].y, 30, 50);
    }

    for (i in aster) {
        context.drawImage(asteroideImg, aster[i].x, aster[i].y, 50, 50);
    }
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