export default class Accordion {
    constructor(accordion) {
        this.accordion = accordion
        
        this.accordion.classList.add('accordion')
        this.accordionItems = accordion.children

        Array.from(this.accordionItems).forEach(accordionItem => {
            const accordionItemTitle = accordionItem.children[0];
            const accordionItemDescriptionBlock = accordionItem.children[1]

            accordionItem.classList.add('accordion__item')
            accordionItemTitle.classList.add('accordion__title');
            accordionItemDescriptionBlock.classList.add('accordion__block');

            accordionItem.addEventListener('click', () => {
                accordionItem.classList.toggle('accordion__item--active')
            })
        })

        this.accordion.addEventListener('click', e => {
            e._isClickWidthinModal = true;
        })

        document.addEventListener('click', event => {
            if (event._isClickWidthinModal) return;
            Array.from(this.accordionItems).forEach(accordionItem => {
                accordionItem.classList.remove('accordion__item--active')
            })
        })
    }
    
}