document.addEventListener('DOMContentLoaded', () => {
    //referencias
    const dino = document.querySelector('.dino');
    const grid = document.querySelector('.grid');
    const body = document.querySelector('body');
    const alert = document.getElementById('alert');

    let jumping = false;
    let gravity = 0.9;
    let gameO = false;
    let dinoPy = 0;

    document.addEventListener('keyup', jumpControl);

    function jumpControl(e) {
        if (e.keyCode == 32) {
            if (!jumping) {
                jumping = true;
                jump();
            }
        }
    }

    function jump() {
        let count = 0;
        let timerId = setInterval(function () {
            //caindo
            if (count == 15) {
                clearInterval(timerId)
                let downTimerId = setInterval(function () {
                    if (count == 0) {
                        clearInterval(downTimerId);
                        jumping = false;
                    }
                    dinoPy -= 5;
                    count--;
                    dinoPy *= gravity;
                    dino.style.bottom = dinoPy + 'px';
                }, 20)
            }
            //subida
            dinoPy += 30;
            count++;
            dinoPy *= gravity;
            dino.style.bottom = dinoPy + 'px';
        }, 20)
    }
    function GerarObts() {
        let randomTime = Math.random() * 4000;
        let obstaclePx = 1000;
        const obstacle = document.createElement('div');

        // copy
        if (!gameO) obstacle.classList.add('obstacle')
        grid.appendChild(obstacle);
        obstacle.style.left = obstaclePx + 'px';


        let timerId = setInterval(function () {

            if (obstaclePx > 0 && obstaclePx < 60 && dinoPy < 60) {
                clearInterval(timerId);
                alert.innerHTML = 'fim de jogo';
                gameO = true;
                body.removeChild(body.firstChild);
                while (grid.firstChild) {
                    grid.removeChild(grid.lastChild);
                }
            }
            obstaclePx -= 10
            obstacle.style.left = obstaclePx + 'px';
        }, 20)

        if (!gameO) setTimeout(GerarObts, randomTime);

    }
    GerarObts();

})