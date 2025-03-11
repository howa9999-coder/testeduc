//Nav 
const navLinks = document.querySelector('.nav-links')
function onToggleMenu(e) {
    if (e.name === 'menu') {
        e.name = 'close';
    } else {
        e.name = 'menu';
    }
    navLinks.classList.toggle('top-[95%]')
}  