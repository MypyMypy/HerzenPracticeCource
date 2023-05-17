import { el, setChildren } from 'redom';

export class Contacts {
    constructor(root) {
        this.root = root
        this.contactsSection = el('section.contacts');
        setChildren(this.root, this.contactsSection) ;
        this.createComponent()
    }

    createComponent() {
        setChildren(this.contactsSection, [
            el('.container.contacts__container', [
                el('h1.main-header.contacts__header', 'Контакты'),
                el('p.contacts__desc', [
                    el('span.contacts__span', 'Организация: '),
                    el('span.contacts__span', 'Российский государственный педагогический университет им. А. И. Герцена'),
                ]),
                el('p.contacts__desc', [
                    el('span.contacts__span', 'Адрес: '),
                    el('a.contacts__link', 'наб. реки Мойки, 48', {
                        href: 'https://yandex.ru/profile/1548201285'
                    })
                ]),
                el('p.contacts__desc', [
                    el('span.contacts__span', 'Электронная почта: '),
                    el('a.contacts__link', 'danich282@gmail.com', {
                        href: 'mailto:danich282@gmail.com'
                    }),
                ])
            ])
        ])
    }
}