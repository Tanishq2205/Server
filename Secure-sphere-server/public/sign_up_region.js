
document.getElementById('button-continue').addEventListener('click', function() {
    var regionSelect = document.getElementById('region');
    var termsCheckbox = document.getElementById('exampleCheck1');
    var warningMessage = document.getElementById('warning-message');

    
    if (regionSelect.value === "Choose..." || !termsCheckbox.checked) {
        
        warningMessage.style.display = "block";
    } else {
        
        warningMessage.style.display = "none";
        window.location.href = 'sign_up_name.html';
    }
});


function redirectToLogin() {
    window.location.href = 'sign_in.html';
}
