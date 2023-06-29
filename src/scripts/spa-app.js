import favicon from '../assets/images/favicon.webp'

import { el, setChildren } from 'redom';
import { linkRouter } from './link-router.js';

import Accordion from './components/accordion.js';

import Header  from './layout/header.js';
import Footer from './layout/footer.js';

import Hero  from './layout/hero.js';
import About from './layout/about.js';
import Contacts from './layout/contacts.js';
 
export default class SPAApp {
    constructor(router) {
        if (SPAApp.instance) {
            return SPAApp.instance;
          }
      
        SPAApp.instance = this;

        this.router = router;
        this.body = document.body;
        
        new Header(this.body, this.router)
        this.createApp();
        new Footer(this.body, this.router)
    }

    createApp() {
        document.head.append(el('meta', {
            name: 'description',
            content: 'Цифровой образовательный ресурс в поддержку изучения технологий веб-программирования'
        }))
        document.head.append(el('link', {
            rel: 'icon',
            href: favicon
        }))

        this.main = el('main.main');
        this.app = el('div.app');
        this.body.append(this.main);
        setChildren(this.main, this.app);
    }

    renderMainPage(dataPages) {
        this.app.textContent = '';

        new Hero(this.app)
        this.app.append(
            el('section.modules#modules',
                el('.container.modules__container', [
                    el('h2.modules__header', 'Модули курса'),
                    this.modulesList = el('ul.modules__list')
                ])
            )
        )

        for (const page of dataPages) {
            const modulesItem = el('li.modules__list-item.module', [
                el('h3.module__title', page.title),
                this.moduleLink = el('a.module__link', '', {
                    href: `${page.moduleLinkHref}`,
                })
            ]);
            this.moduleLink.addEventListener('click', e => linkRouter(e, this.router))
            this.modulesList.append(modulesItem)
        };
    }
    renderModulePage(moduleName, data) {
        const pageData = data[moduleName];
        setChildren(this.app, [
            el('section.moduleSection',
                el('.container.moduleSection__container', [
                    el('h1.moduleSection__header', pageData.title),
                    this.moduleSectionList = el('ul.moduleSection__list'),
                ])
            )
        ])

        for (const lesson of Object.entries(pageData.lessons)) {
            const lessonsItem = el('li.modulesSection__item lesson-card', [
                el('h2.lesson-card__header', lesson[1].lessonTitle),
                el('.lesson-card__description-block', [
                    this.lessonLink = el('a.lesson-card__link', 'Перейти к изучению', {
                        href: pageData.moduleLinkHref + '&lesson=' + lesson[0]
                    }),
                    // el('p.lesson-card__description', lesson[1].lessonDescription)
                    el('p.lesson-card__description', '')
                ])
            ])
            this.lessonLink.addEventListener('click', e => linkRouter(e, this.router))
            this.moduleSectionList.append(lessonsItem)
        }

        this.moduleSectionList = new Accordion(this.moduleSectionList)
    }
    renderModuleLessonPage(lessonName, moduleName, data) {
        const pageData = data[moduleName];
        const lessonData = pageData.lessons[lessonName]
        const lessonElementsList = this.createElementsList(lessonData.lessonContent)

        const lessonLinkBack = el('a.lesson__link-back.lesson__link', {
            textContent: 'Назад',
            href: '#'
        })
        lessonLinkBack.addEventListener('click', e => {
            e.preventDefault();
            window.history.back();

        })
        setChildren(this.app,
            el('section.section-lesson.lesson',
                el('.container.lesson__container', [
                    lessonLinkBack,
                    el('h1.lesson__main-header', lessonData.lessonTitle),
                    lessonElementsList
                ])
            )
        )
    }
    renderAboutPage() {
        new About(this.app);
    }
    renderContactsPage() {
        new Contacts(this.app);
    }

    createElement(elementData) {
        if (!elementData.tag) return elementData;

        const elementClasses = elementData.classes ? elementData.classes.reduce((total, item) => total += '.' + item, '') : '';
        const elementattributes = elementData.attributes ? elementData.attributes : {};

        const element = el(`${elementData.tag}${elementClasses}`, elementattributes);
        if (typeof elementData.textContent === 'object') {
            elementData.textContent.forEach(el => {
                element.append(this.createElement(el))
            });
        } else {
            element.textContent = elementData.textContent
        }
        return element
    }
    createElementsList(elementsData, lessonElementsList = []) {
        for (const element of elementsData) {
            lessonElementsList.push(this.createElement(element))
        }
        return lessonElementsList
    }

    appLoading() {
        setChildren(this.app, el('.container.loading', [
            el('.loading__circle')
        ]))
    }
}