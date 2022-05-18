let food = {
    plainBurger: {
        name: 'Гамбургер простой',
        price: 10000,
        amount: 0,
        kcall: 600,
        get Summ(){
            return this.amount * this.price;
        },
        get Kcall(){
            return this.amount * this.kcall;
        }
    },
    freshBurger: {
        name: 'Гамбургер Fresh',
        price: 20500,
        amount: 0,
        kcall: 800,
        get Summ(){
            return this.amount * this.price;
        },
        get Kcall(){
            return this.amount * this.kcall;
        }
    },
    freshCombo: {
        name: 'freshCombo',
        price: 31900,
        amount: 0,
        kcall: 1000,
        get Summ(){
            return this.amount * this.price;
        },
        get Kcall(){
            return this.amount * this.kcall;
        }
    },
}

let extraProducts = {
    doubleMayonnaise: {
        name: 'Двойной майонез',
        price: 300,
        kcall: 200
    },
    lettuce: {
        name: 'Салатный лист',
        price: 100,
        kcall: 50
    },
    cheese: {
        name: 'Двойной сыр',
        price: 400,
        kcall: 150
    },
}


let links = document.querySelectorAll('.main__product-btn');
let checkbox = document.querySelectorAll('.main__product-checkbox');
// function asd(){

// }
// let asd = function (){

// }
// let asd = text => text;
// console.log(asd('asdasdasdasdasdasdasdasdas'));
// links.forEach(function(item){
//     item.addEventListener('click', plusOrMinus);
// })
links.forEach(item=>item.addEventListener('click', plusOrMinus));
function plusOrMinus(e){
   let parent = e.target.closest('.main__product'),
       parentId = parent.getAttribute('id'),
       symbol = this.getAttribute('data-symbol'),
       count = parent.querySelector('.main__product-num'),
       kcall = parent.querySelector('.main__product-kcall span'),
       price = parent.querySelector('.main__product-price span');
    if(symbol == '+' && food[parentId].amount < 10){
        food[parentId].amount++;
    }
    else if(symbol == '-' && food[parentId].amount > 0){
        food[parentId].amount--;
    }
    count.innerHTML = food[parentId].amount;
    kcall.innerHTML = food[parentId].Kcall;
    price.innerHTML = food[parentId].Summ;
}



for (const it of checkbox) {
    it.addEventListener('click', addExtraProducts);
}
function addExtraProducts(e){
    let parent = e.target.closest('.main__product'),
       parentId = parent.getAttribute('id'),
       extra = this.getAttribute('data-extra'),
       kcall = parent.querySelector('.main__product-kcall span'),
       price = parent.querySelector('.main__product-price span');
       food[parentId][extra] = this.checked;
       if(food[parentId][extra] == true){
            food[parentId].price += extraProducts[extra].price;
            food[parentId].kcall += extraProducts[extra].kcall;
       }
       else if(food[parentId][extra] == false){
            food[parentId].price -= extraProducts[extra].price;
            food[parentId].kcall -= extraProducts[extra].kcall;
       }
      kcall.innerHTML = food[parentId].Kcall;
      price.innerHTML = food[parentId].Summ;
}
let timer = document.querySelector('.header__timer-extra');
let interval;
function doSomeFuckingMagic(){
    if(timer.innerHTML < 100){
        timer.innerHTML++;
        interval = setTimeout(doSomeFuckingMagic, 50);
    }else clearTimeout(interval);
}
doSomeFuckingMagic();

let addCart = document.querySelector('.addCart'),
    receipt = document.querySelector('.receipt'),
    receiptWindow = document.querySelector('.receipt__window-out'),
    payBtn = document.querySelector('.receipt__window-btn');
let arr = [],
totalName = '',
totalPrice = 0,
totalKcall = 0;

addCart.addEventListener('click', function(e){
    e.preventDefault();
    receipt.classList.add('active');
    for (const key in food) {
        if(food[key].amount > 0){
            food[key].name += ` ${food[key].amount}шт\n`;
            arr.push(food[key]);
            for (const id in food[key]) {
                if(food[key][id] === true){
                    food[key].name += `\t${extraProducts[id].name}\n`;
                }
            }
        }
    }
    for (const burger of arr) {
        totalPrice += burger.Summ;
        totalKcall += burger.Kcall;
        totalName += `<div class="something">${burger.name}</div>`;
    }
    receiptWindow.innerHTML = `ваш заказ\n ${totalName}\n Общая стоимость: ${totalPrice}сум\n
    Общая калорийность: ${totalKcall}ккал`;
})


payBtn.addEventListener('click', function(e){
    e.preventDefault();
    window.location.reload();
})

let view = document.querySelector('.view'),
    viewImg = view.querySelector('img'),
    mainProductInfo = document.querySelectorAll('.main__product-info');
mainProductInfo.forEach(item=>item.addEventListener('click', function(){
    let thisImg = this.querySelector('img');
    view.classList.add('active');
    viewImg.src = thisImg.src;
}))
view.addEventListener('click', function(e){
    if(e.target.closest('.view__close') || !e.target.closest('img')){
        view.classList.remove('active');
    }
})

