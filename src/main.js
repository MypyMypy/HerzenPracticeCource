import 'babel-polyfill';

import './styles/common.scss';
import './styles/accordion.scss'

import Navigo from 'navigo';

import { RenderApp } from './scripts/main-page.js'
// import { data as appData } from './public/data.js'

const router = new Navigo('/');
const dataUrl = 'https://mypymypy.github.io/herzen-project/public/data.json';
async function loadResourse(url) {
    return await fetch(url).then(res => res.json()).then(dataTest=> {return dataTest})
}

const app = new RenderApp(router);

router.on('/', async () => {
    app.renderMainPage(Object.values(await loadResourse(dataUrl)));
})
.on('/page', async (match) => {
    if (!match.params.lesson) app.renderModulePage(match.params.moduleName, await loadResourse(dataUrl))
    else app.renderModuleLessonPage(match.params.lesson, match.params.moduleName, await loadResourse(dataUrl))
    
})
.resolve();