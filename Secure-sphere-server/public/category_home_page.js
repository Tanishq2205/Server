// home
document.getElementById('homeLink').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default link behavior
    window.location.href = 'homepage.html'; // Redirect to landing-page.html
});

// category
document.addEventListener("DOMContentLoaded", function() {
    // Select the link element by its ID
    let categoriesLink = document.getElementById("categoriesLink");

    // Set the href attribute to the desired URL
    categoriesLink.href = "category_home_page.html";
});
