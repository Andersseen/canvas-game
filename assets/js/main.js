const canvas = document.querySelector('#game');
const context = canvas.getContext('2d');

const aster = [];
let fireball = [];
let expl = [];
let timer = 0;
const starShip = { x: 300, y: 300 };

const asteroideImg = new Image();
asteroideImg.src = "./assets/img/asteroide.png";

const fireballImg = new Image();
fireballImg.src = "./assets/img/fireball.png";

const explImg = new Image();
explImg.src = "./assets/img/explosion.png";

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
            del: 0,
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

        for (j in fireball) {

            if (Math.abs(aster[i].x + 25 - fireball[j].x - 15) < 50 && Math.abs(aster[i].y - fireball[j].y) < 25) {
                //crash
                //explosion
                expl.push({
                    x: aster[i].x - 25,
                    y: aster[i].y - 25,
                    animx: 0,
                    animy: 0,
                })
                //delete aster
                aster[i].del = 1;
                fireball.splice(j, 1);
                break;
            }
        }
        //delete asteroide
        if (aster[i].del == 1) {
            aster.splice(i, 1);
        }

    }

    for (i in fireball) {
        fireball[i].x = fireball[i].x + fireball[i].dx;
        fireball[i].y = fireball[i].y + fireball[i].dy;

        //limits
        if (fireball[i].y < -30) fireball.splice(i, 1);
    }

    for (i in expl) {
        expl[i].animx = expl[i].animx + 0.3;
        if (expl[i].animx > 7) {
            expl[i].animy++;
            expl[i].animx = 0;
        }
        if (expl[i].animy > 7) {
            expl.splice(i, 1);
        }
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
    for (i in expl) {
        context.drawImage(explImg, 128 * Math.floor(expl[i].animx), 128 * Math.floor(expl[i].animy), 128, 128, expl[i].x, expl[i].y, 100, 100);
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