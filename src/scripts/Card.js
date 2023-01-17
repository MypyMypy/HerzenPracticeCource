import VanillaTilt from 'vanilla-tilt';
import {el, setChildren} from 'redom';
import visa from '../assets/img/visa.png';
import mir from '../assets/img/mir.png';
import mastercard from '../assets/img/mastercard.png';
const cardValidator = require('card-validator')


export class Card {

    constructor(elementRootClass) {
        this.rootElement = document.querySelector(elementRootClass);
        this.inputStatus = [false, false, false, false];
    }

    checkNumber(char) {
        return !!Number(char) || char == 0
    }

    checkInputNumber(event, value) {
        if (!this.checkNumber(event.data)) {
            value = value.slice(0,-1);
            return value;
        };
        
        value.trim(' ');
        if ((value.length+1) % 5 == 0) value += ' ';
        return value
    }

    checkInputOwner(event, value) {
        if (event.data == ' ') {
            return value    
        } else if (this.checkNumber(event.data)) {
            value = value.slice(0,-1);
            return value;
        }
        return value
    }

    checkInputTime(event, value) {
        if (!this.checkNumber(event.data) || value.length > 7) {
            value = value.slice(0,-1);
            return value;
        }

        value.trim(' ');
        if (value.length == 2) value += ' / ';
        if (value.length == 4) {
            value = value.slice(0,2)
        }
        return value
    }

    checkInputCvv(event, value) {
        if (!this.checkNumber(event.data) || value.length>3) {
            return value = value.slice(0,-1);
        }
        return value;
    }

    checkInputStatus() {
        let check = 0;
        this.cardBtn.classList.remove('card__btn--active');
        this.inputStatus.forEach(element => {
            if (element) check++
            else {
                return
            }
        });
        if (check == this.inputStatus.length) {
            this.cardBtn.classList.add('card__btn--active');
        }
    }

    createElements() {
        this.card = el(".card");
        this.cardName = el("span.card__name", 'Rocket');
        this.cardForm = el("form.card__form");
        this.cardTop = el(".card__top");
        this.cardBottom = el(".card__bottom")
        this.cardCvvBlock = el(".card__cvv-block")
        this.cardInputNumber = el("input.card__input.card__number", {
            placeholder: '1234 1234 1234 1234',
            type: 'text'
        })
        this.cardInputOwner = el("input.card__input.card__owner", {
            placeholder: 'NAME SURNAME',
            type: 'text'
        })
        this.cardInputTime = el("input.card__input.card__time", {
            placeholder: 'MM / YY',
            type: 'text'
        })
        this.cardInputCvv = el("input.card__input.card__cvv", {
            placeholder: 'CVV',
            type: 'text'
        })

        this.cardBtn = el("button.card__btn", "Send")

        VanillaTilt.init(this.card, {
            max: 5,
            speed: 200,
            glare: true,
        }); 

        const cardInputs = [
            this.cardInputNumber,
            this.cardInputOwner,
            this.cardInputTime,
            this.cardInputCvv
        ];

        const cardValidatorMethods = [
            cardValidator.number,
            cardValidator.cardholderName,
            cardValidator.expirationDate,
            cardValidator.cvv,
        ]

        for (let i=0; i<cardInputs.length; i++) {
            cardInputs[i].addEventListener('input', (event)=> {
                let value = cardInputs[i].value;
                
                if (i==0) {
                    cardInputs[i].value = this.checkInputNumber(event, value);
                    if (cardValidatorMethods[i](value).card != null && 
                        cardValidatorMethods[i](value).card.type != null && 
                        cardValidatorMethods[i](value).card.type != 'discover'){
                        switch(cardValidatorMethods[i](value).card.type) {
                            case 'visa':
                                cardInputs[i].style.backgroundImage = `url(${visa})`
                                break;
                            case 'mastercard':
                                cardInputs[i].style.backgroundImage = `url(${mastercard})`
                                break;
                            case 'mir':
                                cardInputs[i].style.backgroundImage = `url(${mir})`
                                break;
                        }
                    } else {
                        cardInputs[i].style.backgroundImage = '';
                    }
                }                        
                if (i==1) cardInputs[i].value = this.checkInputOwner(event, value);                       
                if (i==2) cardInputs[i].value = this.checkInputTime(event, value);                        
                if (i==3) cardInputs[i].value = this.checkInputCvv(event, value); 
                
                if (cardValidatorMethods[i](value).isValid) {
                    this.inputStatus[i] = true;
                } else this.inputStatus[i] = false;
                this.checkInputStatus()
            })
        }
    }

    init() {  
        this.createElements();

        setChildren(this.cardTop, [
            this.cardInputNumber,
        ]),
        
        setChildren(this.cardBottom, [
            this.cardInputOwner,
            this.cardInputTime,
        ]),

        setChildren(this.cardCvvBlock, [
            this.cardBtn,
            this.cardInputCvv,
        ])

        setChildren(this.cardForm, [
            this.cardTop,
            this.cardBottom,
            this.cardCvvBlock
        ])

        setChildren(this.card, [
            this.cardName,
            this.cardForm
        ])
        
        setChildren(this.rootElement, this.card)
    }
}