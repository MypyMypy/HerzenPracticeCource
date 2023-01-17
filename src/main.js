import 'babel-polyfill';
import './styles/main.css';
import {el, setChildren} from 'redom';




let body = document.body
let h3 = el('h3.header3', 'Test')
setChildren(body, h3)




