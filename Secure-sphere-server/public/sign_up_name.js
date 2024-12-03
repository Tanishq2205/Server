document.addEventListener('DOMContentLoaded', function () {
    const firstNameInput = document.getElementById('First name');
    const lastNameInput = document.getElementById('Last name');
    const emailInput = document.getElementById('inputEmail4');
    const continueButton = document.getElementById('button-continue-password');
    const warningMessage = document.createElement('div'); 
    warningMessage.classList.add('warning-message'); 
    document.querySelector('.login-box').appendChild(warningMessage); 

    function validateForm() {
        const firstName = firstNameInput.value.trim();
        const lastName = lastNameInput.value.trim();
        const email = emailInput.value.trim();
        const isValidFirstName = firstName.length > 0;
        const isValidLastName = lastName.length > 0;
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);


        continueButton.disabled = !(isValidFirstName && isValidLastName && isValidEmail);

        if (!isValidFirstName || !isValidLastName || !isValidEmail) {
            warningMessage.textContent = 'Please fill in all the required fields correctly.';
            warningMessage.classList.add('show'); 
        } else {
            warningMessage.classList.remove('show'); 
        }
    }

    firstNameInput.addEventListener('input', validateForm);
    lastNameInput.addEventListener('input', validateForm);
    emailInput.addEventListener('input', validateForm);

    validateForm();

    continueButton.addEventListener('click', function (event) {
        const firstName = firstNameInput.value.trim();
        const lastName = lastNameInput.value.trim();
        const email = emailInput.value.trim();
        const isValidFirstName = firstName.length > 0;
        const isValidLastName = lastName.length > 0;
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

        if (!isValidFirstName || !isValidLastName || !isValidEmail) {
            warningMessage.textContent = 'Please fill in all the required fields correctly.';
            warningMessage.classList.add('show');
            event.preventDefault();  
        } else {
            
            window.location.href = 'sign_up_password.html';
        }
    });

    document.getElementById('button-cancel').addEventListener('click', function() {
        window.location.href = 'sign_up_region.html';
    });

    document.getElementById('homeLink').addEventListener('click', function(event) {
        event.preventDefault();
        window.location.href = 'landingpage.html'; 
    });

    document.getElementById('signInButton').addEventListener('click', function () {
        window.location.href = 'sign_in.html';
    });
});
