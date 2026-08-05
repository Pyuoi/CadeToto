const bagGame = document.getElementById('bagGame')
const infoDiv = document.getElementById('info') 
const startBtn = document.getElementById('startGame') 

const itens = document.querySelectorAll('.item')

const animations = {
    batom: 'batom-found',
    pente: 'pente-found',
    espelho: 'espelho-found',
    chiclete: 'chiclete-found',
    carteira: 'carteira-found'
}

const PosInHotbar = {
    batom: {
        PosX: '64%',
        PosY: '66.5%',
        Rotate: '0'
    },
    pente: {
        PosX: '43%',
        PosY: '67%',
        Rotate: '-15deg'
    },
    espelho: {
        PosX: '22%',
        PosY: '66%',
        Rotate: '-15deg',
    },
    chiclete: {
        PosX: '53.5%',
        PosY: '66%',
        Rotate: 'none',
    },
    carteira: {
        PosX: '32.5%',
        PosY: '66%',
        Rotate: 'none',
    }
}




function BagGame(){
    dialogDivbaloon.style.display = 'none';
    bagGame.style.display = 'flex';
    fade.classList.remove('active')
    
    let found_itens = 0;

    startBtn.addEventListener('click', () =>{
        infoDiv.style.display = 'none';
        

        itens.forEach(item =>{

            item.addEventListener('click', () =>{


                console.log(item.classList[1])

                item.style.animation = `${animations[item.classList[1]]} 1s linear`

                const intervalo = setTimeout(() =>{

                    item.style.right = `${PosInHotbar[item.classList[1]]['PosX']}`;
                    item.style.top = `${PosInHotbar[item.classList[1]]['PosY']}`;
                    item.style.rotate = `${PosInHotbar[item.classList[1]]['Rotate']}`;
                    found_itens++;
                    console.log(found_itens);
                    item.style.pointerEvents = 'none';

                    if(found_itens == 5){
                        console.log('você encontrou todos os itens');
                        bagGame.style.display = 'none';
                        dialogDivbaloon.style.display = 'flex'
                        dog.classList.remove('lvl1')
                        dog.classList.add('lvl2')
                        nextbutton.src = '../imgs/nextButton.png';
                        textBallon('Muito obrigado cachorrinho! Com sua ajuda eu consegui ver o fundo da minha bolsa', dialogText1)
                        
                        let dialogo = 1

                        nextbutton.addEventListener('click', () =>{

                            if(dialogo == 1){
                                dialogo++;
                                textBallon('inclusive, seu dono estava te proucurando, ele acabou de passar aqui', dialogText1)
                            }else if( dialogo == 2){
                                dialogo++;
                                textBallon('Ele foi reto e virou a próxima direita', dialogText1)
                            }else if(dialogo == 3){
                                dialogDivbaloon.style.display = 'none';
                                fade.classList.add('active')
                                dog.classList.add('WalkTrue')
                                dog.style.width = '20%';
                                dog.style.bottom = '15%';
                                girlbag.style.opacity = 1;
                                background.src = './imgs/scane1.png'
                                window.location.href = '../FinalLevel/final.html'



                            }


                        })

                    }

                }, 999)
                
            })
        })        

    })
}