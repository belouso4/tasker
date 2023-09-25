const scrollToTop = (selector) => {
    const pageTop = document.querySelector(selector)


    function handleScroll() {
        var scrollTop = (window.pageYOffset !== undefined) 
        ? window.pageYOffset 
        : (document.documentElement || document.body.parentNode || document.body).scrollTop;

        if (scrollTop > 700) {
            pageTop.style.display = 'block';
        } else {
            pageTop.style.display = 'none';
        }
        console.log(scrollTop)
    }

    function toTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    function debounce(func, wait) {
        let timeout;
        return () => {
          if (timeout) {
            clearTimeout(timeout);
          }
          timeout = setTimeout(func, wait)
        }
    }

    pageTop.addEventListener('click', toTop)
    window.addEventListener('scroll', debounce(handleScroll, 400));
}

export default scrollToTop