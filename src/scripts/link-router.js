export function linkRouter(e, router) {
    e.preventDefault();
    const href = e.target.getAttribute('href')
    router.navigate(href);
}