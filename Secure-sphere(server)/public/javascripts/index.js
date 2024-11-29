document.addEventListener("DOMContentLoaded", function() {

    // Handle search bar input
    const searchButton = document.querySelector('button[type="button"]');
    const searchInput = document.getElementById('search-bar');

    searchButton.addEventListener('click', function() {
        const query = searchInput.value.trim();
        
        if (query) {
            alert(`Searching for: ${query}`); 
        } else {
            alert('Please enter a search term');
        }
    });

    // Handle category image hover effect (Optional for better visual feedback)
    const categoryLinks = document.querySelectorAll('.categories div a');
    
    categoryLinks.forEach(link => {
        link.addEventListener('mouseover', function() {
            link.style.transform = 'scale(1.05)'; 
        });

        link.addEventListener('mouseout', function() {
            link.style.transform = 'scale(1)'; 
        });
    });

    // Profile icon click handler (Optional for future functionality)
    const profileIcon = document.querySelector('.profile a');
    
    profileIcon.addEventListener('click', function(e) {
        e.preventDefault(); 

        alert('Profile clicked!'); 
    });

});
