const credit = document.getElementById('texts')

const btn = document.getElementById('btn')
const input = document.getElementById('input')
const respost = document.getElementById('respost')
const form = document.getElementById('form')

const intervalo = setTimeout(() =>{
    credit.style.display = 'none';
    form.style.display = 'flex'
}, 20000)

btn.addEventListener('click', () => {

    if (input.value < 60) {
        respost.textContent = 'Poxa professor! Merecemos mais hein 😭';

    } else if (input.value <= 69) {
        respost.textContent = 'Nota nem fede nem cheira né professor! Vamos aumentar isso aí!? 😅';

    } else if (input.value <= 75) {
        respost.textContent = 'Tá melhorando... mas ainda cabe uns pontinhos extras, né professor? 👀';

    } else if (input.value <= 85) {
        respost.textContent = 'Agora sim estamos conversando! Mas arredondar pra 100 nunca machucou ninguém. 😂';

    } else if (input.value <= 95) {
        respost.textContent = 'Professor, essa nota tá bonita... mas um 100 ficaria muito mais elegante. 😎';

    } else if (input.value <= 99) {
        respost.textContent = 'Faltou só aquele 1 pontinho de consideração, professor. 😭';

    } else if (input.value == 100) {
        respost.textContent = 'Aí sim! Professor, você é uma máquina de dar nota! 🏆';

    } else {
        respost.textContent = 'Professor, inventou nota nova foi? 🤨';
    }
})

