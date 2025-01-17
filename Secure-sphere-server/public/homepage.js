document.addEventListener("DOMContentLoaded", function () {
    const navbarItems = document.querySelectorAll('#myNavbar-items ul li');
    const searchBar = document.querySelector('.search-bar');
    const box = document.querySelector('.box');
    const categories = document.querySelector('.categories');
    const footerContent = document.querySelector('.footer-content');

    

    function handleResponsiveDesign() {
        const screenWidth = window.innerWidth;

        if (screenWidth <= 768) {

            navbarItems.forEach(item => {
                item.style.fontSize = "1rem";
                item.style.margin = "0 0.3rem";
            });

            searchBar.style.left = "2rem"; 

        } else {

            navbarItems.forEach(item => {
                item.style.fontSize = "1.2rem";
                item.style.margin = "0 0.5rem";
            });

            searchBar.style.left = "10rem"; 
            searchBar.style.width = "450px"; 
        }

        
        if (screenWidth <= 768) {
            box.style.width = "100%";
            box.style.height = "auto"; 
        } else {
            box.style.width = "1475px";
            box.style.height = "700px"; 
        }

        
        if (screenWidth <= 768) {
            categories.style.width = "100%";
            categories.style.height = "auto"; 
        } else {
            categories.style.width = "90%";
            categories.style.height = "90rem"; 
        }

        // Footer content responsiveness
        if (screenWidth <= 768) {
            footerContent.style.flexDirection = "column"; 
        } else {
            footerContent.style.flexDirection = "row"; 
        }

        
        const cardInfos = document.querySelectorAll('.card-info');
        cardInfos.forEach(card => {
            if (screenWidth <= 768) {
                card.style.width = "100%"; 
                card.style.height = "auto"; 
            } else {
                card.style.width = "32rem"; 
                card.style.height = "32rem"; 
            }
        });
    }

    
    window.addEventListener('resize', handleResponsiveDesign);

    
    handleResponsiveDesign();
});
