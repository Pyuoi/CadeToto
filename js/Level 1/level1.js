const fade = document.getElementById('fade')
const girlbag = document.getElementById('girlbag')

const dialogDivbaloon = document.getElementById('girl-div-baloon')
const dialogText1 = document.getElementById('dialogtext-1')
const nextbutton = document.getElementById('nextbutton')

const background = document.getElementById('background')

let canPass = true

function textBallon(text, div){
    div.textContent = '';

    let letraAtual = 0;
    nextbutton.style.display = 'none';

    const intervalo = setInterval(() =>{
        
        div.textContent += text[letraAtual]

        letraAtual++;

        if(letraAtual >= text.length){
            clearInterval(intervalo)
            setTimeout(() =>{
                nextbutton.style.display = '';
            }, 50);
            
        }

    },50)
    
    
}

let join = false

function dialogos(){

    textBallon('Olá, cachorrinho!', dialogText1)
    let dialogo = 1

    nextbutton.addEventListener('click', ()=>{
        if(dialogo == 1){
            textBallon('Você pode me ajudar? Estou procurando alguns objetos que caíram na minha bolsa.', dialogText1)
            dialogo++
        }else if(dialogo == 2){
            textBallon('Será que consegue encontrá-los para mim?', dialogText1)
            dialogo++
            nextbutton.src = './imgs/BagGame/startbutton.png'
         }else if(dialogo == 3 && dog.classList.contains('lvl1')){
            BagGame()
         }

    })
}


function zoom(){
    fade.classList.add('active')
    dog.classList.remove('WalkTrue')

    setTimeout(() => {
        dog.style.width = '40%';
        dog.style.bottom = '5%';
        dog.style.left = '12%';

        background.src = './imgs/bag-girl-zoom.png'
        dialogText1.style.opacity = 1;
        dialogDivbaloon.style.opacity = 1;


        girlbag.style.opacity = 0;
        dialogos()
    }, 500)
}

function JoinArea(){

    const posX = dog.offsetLeft;
    

    if(posX > 420 && posX < 760 && dog.classList.contains('lvl1') && !join){
        console.log('ok')
        join = true;
        zoom()
        
    }

    requestAnimationFrame(JoinArea)
}

JoinArea()