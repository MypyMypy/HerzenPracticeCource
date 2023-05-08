import {el, setChildren} from 'redom';

export class Header {
    constructor() {
        this.body = document.body;  
        this.header = el('header.header');
        this.body.append(this.header);      
    }

    renderComponent() {
        setChildren(this.header, [
            el('.container.header__container',
                el('h2.header__header', 'Header')),
        ])
    }
}