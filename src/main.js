// import { data as appData } from './public/data.js'
import 'babel-polyfill';

import './styles/main.scss';

import Navigo from 'navigo';

import { RenderApp } from './scripts/main-page.js';

// const router = new Navigo('/');
const router = new Navigo('/herzen-project/index.html/');

const dataUrl = 'https://mypymypy.github.io/herzen-project/public/data.json';
async function loadResourse(url) {
    return await fetch(url).then(res => res.json()).then(dataTest=> {return dataTest})
}

const app = new RenderApp(router);

router.on('/', async () => {
    app.appLoading();
    app.renderMainPage(Object.values(await loadResourse(dataUrl)));
})
.on('/page', async (match) => {
    app.appLoading();
    if (!match.params.lesson) app.renderModulePage(match.params.moduleName, await loadResourse(dataUrl))
    else app.renderModuleLessonPage(match.params.lesson, match.params.moduleName, await loadResourse(dataUrl))
})
.on('/about', () => {
    app.renderAboutPage()
})
.on('/contacts', () => {
    app.renderContactsPage()
})
.resolve();