import { el, setChildren } from 'redom';

export class About {
    constructor(root) {
        this.root = root
        this.aboutSection = el('section.about');
        setChildren(this.root, this.aboutSection) ;
        this.createComponent()
    }

    createComponent() {
        setChildren(this.aboutSection, [
            el('.container.about__container', [
                el('h1.main-header.about__header', 'О курсе'),
                el('p.about__desc', 'Изучение технологий веб-программирования является ключевым навыком для создания современных веб-сайтов и веб-приложений, которые привлекают внимание пользователей и эффективны в использовании. На данном ресурсе вы сможете изучить такие технологии, как HTML, CSS и JavaScript, что поможет вам создавать красивые и функциональные веб-сайты.'),
                el('p.about__desc', 'Кроме того, знание технологий веб-программирования позволит вам создавать интерактивные элементы на веб-сайтах, такие как анимации, формы обратной связи, слайдеры, выпадающие меню и многое другое. Вы сможете создавать адаптивные веб-сайты, которые будут выглядеть и работать хорошо на разных устройствах, таких как компьютеры, планшеты и мобильные телефоны.'),
                el('p.about__desc', 'HTML (HyperText Markup Language) является основным языком разметки для создания веб-страниц. Он используется для определения структуры веб-страницы и для разметки содержимого, такого как заголовки, абзацы, изображения, ссылки и другие элементы.'),
                el('p.about__desc', 'CSS (Cascading Style Sheets) используется для описания внешнего вида веб-страницы. Он позволяет определять цвета, шрифты, размеры, расположение элементов на странице и другие аспекты визуального оформления.'),
                el('p.about__desc', 'JavaScript - это язык программирования, который позволяет создавать интерактивные веб-сайты. Он используется для создания динамических элементов на веб-страницах, таких как анимации, выпадающие меню, слайдеры, формы обратной связи и многое другое. Он также позволяет создавать веб-приложения, которые могут работать без перезагрузки страницы и общаться с сервером.'),
                el('p.about__desc', 'Изучение этих технологий веб-программирования открывает перед вами множество возможностей для создания красивых, функциональных и интерактивных веб-сайтов и веб-приложений.'),
            ])
        ])
    }
}