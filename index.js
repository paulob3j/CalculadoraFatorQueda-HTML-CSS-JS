const btnProximo = document.getElementById('btn-proximo');
const btnNovoCalculo = document.getElementById('btn-novo-calculo');
const btnAnterior = document.getElementById('back');
const valor = document.getElementById('numero');
const img = document.getElementById('imgTipo');
const legenda = document.getElementById('legenda');
const main = document.getElementById('main');
const telaResultado = document.getElementById('resultado');
const loader = document.getElementById('loader');

let comprimentoTalabarte =0;
let alturaQueda = 0;
let resultado = 0;

const audio = new Audio();
audio.src = "click.mp3";

//card resultado

const divCardPrincipal = document.createElement('div');
divCardPrincipal.className = "principal-card-resultado";
telaResultado.appendChild(divCardPrincipal);
const cardImg = document.createElement('div');
cardImg.className = "cardImg";
const pInformacao = document.createElement('p');
pInformacao.className = "pInformacao";
pInformacao.textContent = "ATENÇÃO!";
const cardPInformacao = document.createElement('div');
cardPInformacao.className ="cardPInformacao";
cardPInformacao.appendChild(pInformacao);
divCardPrincipal.appendChild(cardImg);
telaResultado.appendChild(cardPInformacao);
const cardImagem = document.createElement('img');
cardImagem.src = "img/Menor que 1.png";
cardImagem.className = "cadrImagem";
cardImg.appendChild(cardImagem);
const cardInformacaoAbaixo = document.createElement('div');
cardInformacaoAbaixo.className = "cardInformacaoAbaixo";
cardImg.appendChild(cardInformacaoAbaixo);
const pInformacaoAbaixo = document.createElement('p');
pInformacaoAbaixo.className = "pInformacaoAbaixo";
pInformacaoAbaixo.textContent = "Fator de queda < 1";
cardInformacaoAbaixo.appendChild(pInformacaoAbaixo);


btnAnterior.addEventListener('click', function(){
    audio.play();
    if(comprimentoTalabarte>0){
        valor.value = comprimentoTalabarte;
        img.src = "img/talabarte.png";
        legenda.textContent = "Informe o comprimento do talabarte";
        btnProximo.textContent = "Próxima etapa";
        comprimentoTalabarte = 0;
    };
});




btnProximo.addEventListener('click', function(){
    audio.play();
    if(btnProximo.textContent !="Cálcular"){

        if(valor.value ==""){
            notificar("Informe o comprimento do talabarte!");
        }else{
            img.src = "img/imagem.png";
            legenda.textContent = "Informe a altura da queda";
            comprimentoTalabarte = valor.value;
            valor.value = "";
            btnProximo.textContent = "Cálcular";
        };

    }else{

        if(valor.value ==""){
            notificar("Informe a altura da queda!");

        }else{
            alturaQueda = valor.value;
            calculo();
            main.style.filter = "blur(35px)" /* Altere o valor para ajustar o nível de desfoque desejado */
            main.style.transition = "filter 0.5s" /* Efeito de transição suave */
            telaResultado.style.display ="flex";

        };
    };

});

function notificar(msg){
    let divNotifica = document.createElement('div');
    divNotifica.className = "divNotificacao";
    let pNotificacao = document.createElement('p');
    pNotificacao.className = "pNotificacao";
    pNotificacao.textContent = msg
    divNotifica.appendChild(pNotificacao);
    main.appendChild(divNotifica);

    setTimeout(function(){
        divNotifica.style.display = "none";
    }, 3000);
};


 btnNovoCalculo.addEventListener('click', function(){
    audio.play();
    valor.value = "";
    img.src = "img/talabarte.png";
    legenda.textContent = "Informe o comprimento do talabarte";
    btnProximo.textContent = "Próxima etapa";
    telaResultado.style.display = "none";
    main.style.filter ="none";
    comprimentoTalabarte = 0;
    alturaQueda = 0;

});


function calculo(){
    resultado = alturaQueda/comprimentoTalabarte;
    if(resultado < 1){
        cardPInformacao.style.display = "none";
        cardImagem.src = "img/Menor que 1.png";
        pInformacao.textContent = "ATENÇÃO!";
        pInformacaoAbaixo.textContent = "Fator de queda < 1";
        cardInformacaoAbaixo.style.backgroundColor = "#00821A";
        console.log("Resultado: "+ resultado.toFixed(2));
       
    } else if(resultado == 1){
        cardPInformacao.style.display = "flex";
        cardImagem.src = "img/Maior que 1 e menor 2.png";
        cardPInformacao.style.backgroundColor = "rgb(254, 152, 0)";
        pInformacaoAbaixo.textContent = "Fator de queda = 1";
        cardInformacaoAbaixo.style.backgroundColor = "rgb(254, 152, 0)";
        console.log("Resultado: "+ resultado.toFixed(2));
     
    }else if(resultado > 1){
        cardPInformacao.style.display = "flex";
        cardImagem.src = "img/maior ou igual 2.png";
        cardPInformacao.style.backgroundColor = "#FF0E17";
        cardInformacaoAbaixo.style.backgroundColor = "#FF0E17";
        pInformacao.textContent = "CUIDADO!!";
        pInformacaoAbaixo.textContent = "Fator de queda = 2";
        console.log("Resultado: "+ resultado.toFixed(2));
    };
};


window.onload= function(){
    setTimeout(function(){
        loader.style.display = "none";
        main.style.display = "flex";
    }, 1500)
};