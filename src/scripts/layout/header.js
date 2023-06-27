import { el, setChildren } from 'redom';
import { linkRouter } from '../link-router';

export default class Header {
    constructor(root, router) {
        this.root = root;
        this.router = router;
        this.header = el('header.header');
        this.root.append(this.header);

        this.renderComponent()

        this.header.querySelectorAll('.nav__link').forEach(link => {
            link.addEventListener('click', e => {
                linkRouter(e, this.router);
                this.header.querySelectorAll('.nav__link').forEach(link => {
                    link.classList.remove('nav__link--active')
                })
                e.target.classList.add('nav__link--active');
            })
        })
        this.header.querySelector('.logo-link').addEventListener('click', e=> {
            linkRouter(e, this.router);
            this.header.querySelectorAll('.nav__link').forEach(link => {
                link.classList.remove('nav__link--active');
                this.header.querySelectorAll('.nav__link')[0].classList.add('nav__link--active');
            })
        })
    }

    renderComponent() {
        setChildren(this.header, [
            el('.container.header__container',
                el('a.logo-link.header__logo-link', '', {
                    href: "/"
                }),
                el('nav.nav.header__nav',
                    this.navList = el('ul.nav__list', [
                        el('li.nav__item',
                            this.headerMainLink = el('a.nav__link.nav__link--active', 'Главная страница', {
                                href: "/"
                            })
                        ),
                        el('li.nav__item',
                            this.headerAboutLink = el('a.nav__link', 'О курсе', {
                                href: "/about"
                            })
                        ),
                        el('li.nav__item',
                            this.headerContactsLink = el('a.nav__link', 'Контакты', {
                                href: "/contacts"
                            })
                        )
                    ]),
                )
            )
        ])
    }
}