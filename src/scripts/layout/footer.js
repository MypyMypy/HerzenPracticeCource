import {el, setChildren} from 'redom';

export default class Footer {
    constructor(root, router) {
        this.root = root;
        this.router = router;
        this.footer = el('footer.footer');
        this.root.append(this.footer);
        this.renderComponent();
    }

    renderComponent() {
        setChildren(this.footer, [
            el('.container.footer__container', [
                el('.footer__left', [
                    el('.footer__author-block.author-block', [
                        el('div.author-block__image'),
                        el('.author-block__right', [
                            el('p.author-block__author-description', 'Автором материалов и цифрогового образовтельного ресурса является:'),
                            el('h3.author-block__author-surname', 'Богданчиков Данил')
                        ])
                    ]),
                ]),
                el('.footer__right', [
                    el('p.footer__page-description', 'Веб-ресурс был разработан в поддержку выпускной квалификационной работы: "Разработка учебно-методических материалов в поддержку самостоятельной работы бакалавров педагогического образования при освоении технологий веб-программирования", СПб, 2023 г.')
                ])
            ]
            ),
        ])
    }
}