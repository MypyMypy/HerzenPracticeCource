import { el, setChildren } from 'redom';

export default class Hero {
    constructor(root) {
        this.root = root
        this.heroSection = el('section.hero');
        this.root.append(this.heroSection);
        this.createComponent()
    }

    createComponent() {
        setChildren(this.heroSection, [
            el('.container.hero__container', [
                el('h1.main-header.hero__header', 'Цифровой образовательный ресурс в поддержку изучения технологий веб-программирования'),
                el('p.hero__desc', 'Изучение технологий веб-программирования является ключевым навыком для создания современных веб-сайтов и веб-приложений, которые привлекают внимание пользователей и эффективны в использовании. На данном ресурсе вы сможете изучить такие технологии, как HTML, CSS и JavaScript, что поможет вам создавать красивые и функциональные веб-сайты.')
            ])
        ])
    }
}