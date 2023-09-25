import Splide from '@splidejs/splide';

import mobileNav from "./modules/mobile-nav";
import accordion from "./modules/accordion";
import modal from "./modules/modals";
import scrollToTop from "./modules/scroll-to-top";

import '@splidejs/splide/css';
// import "animate.css";

window.addEventListener('DOMContentLoaded', () => {
    mobileNav()
    accordion('faq')
    modal()
    scrollToTop('#pagetop')
    
    var splide = new Splide( '.splide', {
        perPage: 2,
        type   : 'loop',
        // rewind : true,
        // perMove: 1,
        // focus  : 0,
        gap: '16px',
        drag   : 'free',
        omitEnd: true,
        breakpoints: {
            800: {
              perPage: 1,
            },
        },
    });
    splide.mount();

    
});