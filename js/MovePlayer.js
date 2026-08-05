let posX = 0;
const velocity = 0.2;

const dog = document.getElementById('dog-player')

const keys = {};

window.addEventListener('keydown', (k) => {
    keys[k.key] = true;

})

window.addEventListener('keyup', (k) =>{
    keys[k.key] = false;
    
})

let skindirection = 1; 

function move(){
    if(dog.classList.contains('WalkTrue')){
        if((keys['w'] || keys['ArrowRight'])  && posX < 85){posX += velocity; dog.style.transform = "scaleX(1)"}
        if((keys['s'] || keys['ArrowLeft']) && posX > -5){posX -= velocity; dog.style.transform = "scaleX(-1)"}
        dog.style.left = posX + '%';
    }

    requestAnimationFrame(move)
}



move()