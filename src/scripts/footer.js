import {el, setChildren} from 'redom';

export class Footer {
    constructor() {
        this.body = document.body;
        this.footer = el('footer.footer');
        this.body.append(this.footer);
    }
    renderComponent() {
        setChildren(this.footer, [
            el('.container.footer__container',
                el('h2.footer__header', 'Footer')),
        ])
    }
}