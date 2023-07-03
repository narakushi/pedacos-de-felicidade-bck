const toggleBtn = document.querySelector('.toggle-btn')
const toggleBtnIcon = document.querySelector('.toggle-btn img');
const dropDownMenu = document.querySelector('.dropdown-menu');
const toggleCart = document.querySelector('.carrinho');
const dropDownCart = document.querySelector('.cart');
let isOpenMenu;
let isOpenCart;
let addItem = 0;
let totalAmount = "0,00";

toggleBtn.onclick = function () {

    dropDownMenu.classList.toggle('open');
    dropDownMenu.classList.contains('open');
};

toggleCart.onclick = function () {

    isOpenCart = dropDownCart.classList.toggle('abrir');
    //dropDownCart.classList.contains('abrir');
};



function addToCart() {

    let nCar = document.querySelector('#nCar');
    addItem += 1;
    nCar.innerHTML = addItem;
}

function removeToCart() {
    let nCar = document.querySelector('#nCar');
    if (addItem >= 1) {
        addItem--;
    }

    nCar.innerHTML = addItem;
}

function ready() {

    let btnDelItem = document.getElementsByClassName('btn-delete');
    for (let i = 0; i < btnDelItem.length; i++) {
        let btn = btnDelItem[i];
        btn.addEventListener('click', delItemCart);
    }

    //add função ao botão para somar quantidade

    let btnAddQtd = document.getElementsByClassName('add-qtd');
    for (let i = 0; i < btnAddQtd.length; i++) {
        let btn = btnAddQtd[i];
        btn.addEventListener('click', sumQtd);
    }


    //add função ao botão para subtrair quantidade
    let btnDeductQtd = document.getElementsByClassName('deduct-qtd');
    for (let i = 0; i < btnDeductQtd.length; i++) {
        let btn = btnDeductQtd[i];
        btn.addEventListener('click', deductQtd);
    }

    //Adicionando função aos botões de comprar

    let btnBuy = document.getElementsByClassName('btn-buy');
    for (let i = 0; i < btnBuy.length; i++) {
        let btn = btnBuy[i];
        btn.addEventListener('click', addToCartClicked);
    }

    //função de pagamento
    let btnPay = document.getElementsByClassName('botoes')[0];
    btnPay.addEventListener('click', makePurchase);
}

function delItemCart(event) {
    let btnClicked = event.target;
    btnClicked.parentElement.remove();

    //atualização do total do carrinho
    updatePriceCart();
    removeToCart();

}

function updatePriceCart() {
    let cartContainer = document.getElementsByClassName('dados-carrinho')[0];
    let cartItems = cartContainer.getElementsByClassName('dados');
    
    let total = 0;

    for (let i = 0; i < cartItems.length; i++) {
        let item = cartItems[i];
        let priceElement = item.getElementsByClassName('preco-bolo')[0];
        let price = parseFloat(priceElement.innerText.replace('R$', '').replace('.', ''));
    

        let qtdItem = item.getElementsByClassName('cart-item-qtd')[0];

        let qtd = qtdItem.value;

        total = total + (price * qtd);
        console.log(total);
    
    }
    let totalPriceElement = document.querySelector('.preco-total');
    
    total = total / 100;
    totalAmount = total;
    totalPriceElement.innerText = 'R$' + total.toFixed(2);
}

updatePriceCart()

//aumentando em um a quantidade do elemento selecionado

function sumQtd(event) {
    let btnClicked = event.target;
    let selector = btnClicked.parentElement; //pego o pai do botão de somar
    let qtdCurrent = selector.getElementsByClassName('cart-item-qtd')[0].value;

    qtdCurrent = Number(qtdCurrent);
    qtdCurrent++;
    addToCart()

    let cartItemQtd = selector.getElementsByClassName('cart-item-qtd')[0];

    cartItemQtd.value = qtdCurrent;
    //atualizamos o total no carrinho
    updatePriceCart();
}

function deductQtd(event) {
    let btnClicked = event.target;
    let selector = btnClicked.parentElement; //pego o pai do botão de subtrair

    let qtdCurrent = selector.getElementsByClassName('cart-item-qtd')[0].value;

    let cartItemQtd = selector.getElementsByClassName('cart-item-qtd')[0];

    let dados = selector.parentElement;
    console.log(dados);

    qtdCurrent = Number(qtdCurrent);
    qtdCurrent--;
    removeToCart();

    if (qtdCurrent > 0) {
        cartItemQtd.value = qtdCurrent;
        //atualizamos o total no carrinho
        updatePriceCart();
    }
    else {
        dados.remove();
        updatePriceCart();
    }

}

function addToCartClicked(event) {
    let btn = event.target;
    let item = btn.parentElement;
    let title = item.getElementsByClassName('product-title')[0].innerText;
    let price = item.getElementsByClassName('product-price')[0].innerText;
    let img = item.getElementsByClassName('product-img')[0].src;

    //função para adicionar o item ao carrinho
    const bolo = {
        title: title,
        price: price,
        img: img
    }
    addItemToCart(bolo);
}

function addItemToCart(bolo) {
    let item = document.createElement('div');
    item.classList.add = 'item';
    let itemsCart = document.getElementsByClassName('cart-items')[0];


    //controle dos itens para que não se repitam

    let itemsNameCart = itemsCart.getElementsByClassName('title-item-cart');
    for (let i = 0; i < itemsNameCart.length; i++) {
        itemName = itemsNameCart[i];
        if (bolo.title == itemName.innerText) {
            alert('O bolo já se encontra no carrinho!');
            return;
        }
    }
    addToCart();


    let itemCartContainer = `
    <div class="cart-item">
        <img class="item-i" src="${bolo.img}" alt="bolo-de-morango">
        <div class="cart-details">
            <span class="title-item-cart">${bolo.title}</span>
            <div class="selector-qtd">
                <i class="fa-solid fa-minus deduct-qtd"></i>
                <input type="text" value="1" class="cart-item-qtd">
                <i class="fa-solid fa-plus add-qtd"></i>
                <span class="cart-item-price">${bolo.price}</span>
            </div>
        </div>
        <span class="btn-delete">
            <i class="fa-solid fa-trash"></i>
        </span>
    </div>
    `

    item.innerHTML = itemCartContainer;
    itemsCart.append(item);

    item.getElementsByClassName('btn-delete')[0].addEventListener('click', delItemCart);
    item.getElementsByClassName('add-qtd')[0].addEventListener('click', sumQtd);
    item.getElementsByClassName('deduct-qtd')[0].addEventListener('click', deductQtd);
    updatePriceCart();
}

function makePurchase(event) {
    let itemsCart = document.getElementsByClassName('dados-carrinho')[0];
    while(itemsCart.hasChildNodes()){
        itemsCart.removeChild(itemsCart.firstChild);
    }
    alert(
        `
     Obrigado pela sua compra!
     Valor do pedido: R$${totalAmount}
     Volte sempre!
     
     `
    )
    updatePriceCart();

}

ready();