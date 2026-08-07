const credit = document.getElementById('texts')

const btn = document.getElementById('btn')
const input = document.getElementById('input')
const respost = document.getElementById('respost')
const form = document.getElementById('form')

const DivNotas = document.querySelectorAll(".nota")

const intervalo = setTimeout(() =>{
    credit.style.display = 'none';
    form.style.display = 'flex'
}, 2)

DivNotas.forEach((item) => {
    item.addEventListener('click', () =>{

        DivNotas.forEach((div) => {
            div.style.border = 'solid 2px #6b593f';
        })
        item.style.border = 'solid 2px #E5C37A';
        btn.classList.add('active')

        btn.addEventListener('click', () => {

            if (item.textContent < 60) {
                respost.textContent = 'Poxa professor! Merecemos mais hein 😭';

            } else if (item.textContent <= 69) {
                respost.textContent = 'Nota nem fede nem cheira né professor! Vamos aumentar isso aí!? 😅';

            } else if (item.textContent <= 75) {
                respost.textContent = 'Tá melhorando... mas ainda cabe uns pontinhos extras, né professor? 👀';

            } else if (item.textContent <= 85) {
                respost.textContent = 'Agora sim estamos conversando! Mas arredondar pra 100 nunca machucou ninguém. 😂';

            } else if (item.textContent <= 95) {
                respost.textContent = 'Professor, essa nota tá bonita... mas um 100 ficaria muito mais elegante. 😎';

            } else if (item.textContent <= 99) {
                respost.textContent = 'Faltou só aquele 1 pontinho de consideração, professor. 😭';

            } else if (item.textContent == 100) {
                respost.textContent = 'Aí sim! Professor, você é uma máquina de dar nota! 🏆';

            } else {
                respost.textContent = 'Professor, inventou nota nova foi? 🤨';
            }
        })
    })
})





