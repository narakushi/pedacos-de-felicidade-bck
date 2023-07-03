const toggleBtn = document.querySelector('.toggle-btn')
const toggleBtnIcon = document.querySelector('.toggle-btn img');
const dropDownMenu = document.querySelector('.dropdown-menu');
const toggleCart = document.querySelector('.car');
const dropDownCart = document.querySelector('.cart');
let isOpenMenu;
let isOpenCart;

toggleBtn.onclick = function () {

    dropDownMenu.classList.toggle('open');
    dropDownMenu.classList.contains('open'); 
};

toggleCart.onclick = function () {

    isOpenCart = dropDownCart.classList.toggle('abrir');
    //dropDownCart.classList.contains('abrir');
};

let addItem = 0;

function addToCart() {

    let nCar = document.querySelector('#nCar');
    addItem += 1;
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
    for(let i = 0; i < btnAddQtd.length; i++)
    {
        let btn = btnAddQtd[i]
    }
}

function delItemCart(event) {
    let btnClicked = event.target;
    btnClicked.parentElement.remove();

    //atualização do total do carrinho
    updatePriceCart();

}

function updatePriceCart() {
    let cartContainer = document.getElementsByClassName('cart')[0];
    let cartItems = cartContainer.getElementsByClassName('cart-item');
    let total = 0;

    for(let i = 0; i < cartItems.length; i++)
    {
        let item = cartItems[i];
        let priceElement = item.getElementsByClassName('cart-item-price')[0];
        let price = parseFloat(priceElement.innerText.replace('R$', '').replace('.',''));
        //console.log(price);

        let qtdItem = item.getElementsByClassName('cart-item-qtd')[0];

        let qtd = qtdItem.value;

        total = total + (price * qtd);
    }

    let totalPriceElement = document.querySelector('.cart-price-total');
    total = total/100;
    totalPriceElement.innerText = 'R$'+total.toFixed(2);
}



ready();