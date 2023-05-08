import {el, setChildren} from 'redom';
import { Header } from './header.js'
import { Footer } from './footer.js'
import { Accordion } from './accordion.js';

export class RenderApp {
    constructor(router) {
        this.router = router;
        this.body = document.body;
        new Header().renderComponent();
        this.createApp();
        new Footer().renderComponent();
    }

    createApp() {
        this.main = el('main.main');
        this.app = el('div.app');
        this.body.append(this.main);
        setChildren(this.main, this.app);
    }

    renderMainPage(dataPages) {
        this.appReload()

        setChildren(this.app, [
            el('section.hero', 
                el('.container.hero__container', [
                    el('h1.main-header', 'Ur Welcome'),
                    el('p.hero__desc', 'Lorem impsum')
                ])
            ),
            el('section.modules',
                el('.container.modules__container', [
                    el('h2.modules__header'),
                    this.modulesList = el('ul.modules__list')
                ])
            )
        ])
        for (const page of dataPages) {
            const modulesItem = el('li.modules__list-item.module', [
                el('h3.module__title', page.title),
                this.moduleLink = el('a.module__link', 'Link', {
                    href: `${page.moduleLinkHref}`,
                })
            ]);
            this.moduleLink.addEventListener('click', e => {
                e.preventDefault();
                const href = e.target.getAttribute('href')
                this.router.navigate(href);
            }) 
            this.modulesList.append(modulesItem)
        } 
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
            const lessonsItem = el('li.modulesSection__item lessonCard', [
                el('h2.lessonCard__header', lesson[1].lessonTitle),
                el('.lessonCard__description-block', [
                    this.lessonLink = el('a.lessonCard__link', 'Link', {
                        href: pageData.moduleLinkHref+'&lesson='+lesson[0]
                    }),
                    el('p.lessonCard__description', lesson[1].lessonDescription)
                ])
            ])
            this.lessonLink.addEventListener('click', e => {
                e.preventDefault();
                const href = e.target.getAttribute('href')
                this.router.navigate(href);
            })
            this.moduleSectionList.append(lessonsItem)
        }   

        this.moduleSectionList = new Accordion(this.moduleSectionList)
    }

    renderModuleLessonPage(lessonName, moduleName, data) {
        const pageData = data[moduleName];
        const lessonData = pageData.lessons[lessonName]
        const lessonElementsList = this.createElementsList(lessonData.lessonContent)
        setChildren(this.app, 
            el('section.section-lesson.lesson', 
                el('.container.lesson__container', [
                    el('h1.lesson__main-header', lessonData.lessonTitle),
                    lessonElementsList
                ])
            )    
        )
    }

    createElement(elementData) {
        if (!elementData.tag) return elementData;
        
        const elementClasses = elementData.classes? elementData.classes.reduce((total, item)=> total+='.'+item, '') : '';
        const elementattributes = elementData.attributes? elementData.attributes : {};
        elementData.attributes
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

    createElementsList(elementsData, lessonElementsList=[]) {
        for (const element of elementsData) {
            lessonElementsList.push(this.createElement(element))
        }
        return lessonElementsList
    }

    appReload() {
        this.app.textContent='Loading...'
    }
}