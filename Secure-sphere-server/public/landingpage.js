/*
function handleSearch() {
    const searchQuery = document.getElementById('search-bar').value;
    if (searchQuery) {
        
        window.location.href = `/search?q=${searchQuery}`;
    }
}


function handleSignIn() {
    
    window.location.href = '/sign-in';
}

function toggleNavbar() {
    const navbarItems = document.getElementById('myNavbar-items');
    navbarItems.classList.toggle('active');
}


document.querySelector('.search-bar .btn').addEventListener('click', handleSearch);


document.querySelector('#sign-in-button').addEventListener('click', handleSignIn);


document.querySelector('#hamburger-menu').addEventListener('click', toggleNavbar);


window.addEventListener('click', function(event) {
    const navbarItems = document.getElementById('myNavbar-items');
    const hamburgerMenu = document.getElementById('hamburger-menu');
    if (!navbarItems.contains(event.target) && !hamburgerMenu.contains(event.target)) {
        navbarItems.classList.remove('active');
    }
});


const faqQuestions = document.querySelectorAll('.faqs-question');
faqQuestions.forEach(question => {
    question.addEventListener('click', function() {
        this.nextElementSibling.classList.toggle('active'); 
    });
});


const internalLinks = document.querySelectorAll('a[href^="#"]');
internalLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        window.scrollTo({
            top: targetElement.offsetTop - 50, 
            behavior: 'smooth'
        });
    });
});
*/
// home tag
document.addEventListener("DOMContentLoaded", function() {
    let homeLink = document.getElementById("homeLink");
    homeLink.href = "landingpage.html";
});

document.addEventListener("DOMContentLoaded", function() {
    let categories = document.getElementById("categoriesLink");
    categories.href = "category_landing_page.html";
});


document.addEventListener("DOMContentLoaded", function() {
    let signInButton = document.getElementById("signInButton");
    signInButton.addEventListener("click", function() {
        window.location.href = "sign_in.html";
    });
});


document.addEventListener("DOMContentLoaded", function() {
    window.navigateToLogin = function() {
        window.location.href = "sign_in.html";
    };




    window.navigateToSignUp = function() {
        window.location.href = "sign_up_region.html";
    };
});