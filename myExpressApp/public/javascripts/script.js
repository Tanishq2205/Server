let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

window.onscroll = () => {
    menu.classList.remove('bx-x');
    navbar.classList.remove('avtive');
}

const typed = new Typed('.multiple-text', {
    strings: ['Trusted Company ', 'Expand Company','Rating Company', 'PichShop', 'Best PicShop'],
    typeSpeed: 80,
    backSpeed: 20,
    backDelay: 1200,
    loop: true,
  });
  