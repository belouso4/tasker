const accordion = (selector) => {
    const accordion = document.querySelector(`#${selector}`),
        accordionItemsHeader = document.querySelectorAll(`.${selector}__header`)

        accordionItemsHeader.forEach((itemHeader) => {
            itemHeader.addEventListener('click', (e) => {
                const parentItem = e.target.closest('.faq__item')

                for (const item of accordion.children) {
                    item.classList.remove('active')
                }

                parentItem.classList.add('active')
            })
        })
}

export default accordion