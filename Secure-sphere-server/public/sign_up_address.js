/*
document.addEventListener('DOMContentLoaded', function () {
    // Form elements
    const stateInput = document.getElementById('inputState');
    const addressInput = document.getElementById('inputAddress');
    const address2Input = document.getElementById('inputAddress2');
    const cityInput = document.getElementById('inputCity');
    const zipInput = document.getElementById('inputZip');
    const createAccountButton = document.getElementById('button-create-account');
    const warningMessage = document.getElementById('warning-message'); // Warning message element

    // Helper function to check if all fields are valid
    function validateForm() {
        const state = stateInput.value.trim();
        const address = addressInput.value.trim();
        const city = cityInput.value.trim();
        const zip = zipInput.value.trim();

        // Simple validation checks
        const isValidState = state.length > 0;
        const isValidAddress = address.length > 0;
        const isValidCity = city.length > 0;
        const isValidZip = zip.length > 0;

        // Enable/Disable create account button based on validation
        createAccountButton.disabled = !(isValidState && isValidAddress && isValidCity && isValidZip);

        // Show/hide the warning message based on validation
        if (createAccountButton.disabled) {
            warningMessage.classList.add('show'); // Show warning message
        } else {
            warningMessage.classList.remove('show'); // Hide warning message
        }
    }

    // Add input event listeners to trigger validation on user input
    stateInput.addEventListener('input', validateForm);
    addressInput.addEventListener('input', validateForm);
    address2Input.addEventListener('input', validateForm);
    cityInput.addEventListener('input', validateForm);
    zipInput.addEventListener('input', validateForm);

    // Initial validation check on page load
    validateForm();

    // Create Account button functionality
    createAccountButton.addEventListener('click', function () {
        if (createAccountButton.disabled) {
            alert('Please fill in all fields correctly.');
        } else {
            // Proceed to the next page (for now, simulating account creation)
            window.location.href = 'homepage.html';
        }
    });

    document.getElementById('button-cancel').addEventListener('click', function() {
        window.location.href = 'sign_up_password.html'; // Redirect to sign_up_password.html


    // Home button redirects to landing page
    document.getElementById('homeLink').addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default link behavior
        window.location.href = 'landingpage.html'; // Redirect to landing-page.html
    });

    // SignIn button redirects to sign-in page
    document.getElementById('signInButton').addEventListener('click', function () {
        window.location.href = 'sign_in.html';
    });
});
*/
document.addEventListener('DOMContentLoaded', function () {
    // Form elements
    const stateInput = document.getElementById('inputState');
    const addressInput = document.getElementById('inputAddress');
    const address2Input = document.getElementById('inputAddress2'); // Optional field
    const cityInput = document.getElementById('inputCity');
    const zipInput = document.getElementById('inputZip');
    const createAccountButton = document.getElementById('button-create-account');
    const cancelButton = document.getElementById('button-cancel');
    const warningMessage = document.getElementById('warning-message'); // Use the existing warning message

    // Function to validate the form
    function validateForm() {
        const state = stateInput.value.trim();
        const address = addressInput.value.trim();
        const city = cityInput.value.trim();
        const zip = zipInput.value.trim();

        // Validate required fields
        const isValidState = state.length > 0;
        const isValidAddress = address.length > 0;
        const isValidCity = city.length > 0;
        const isValidZip = zip.length > 0;

        // Enable or disable the Create Account button
        createAccountButton.disabled = !(isValidState && isValidAddress && isValidCity && isValidZip);

        // Show or hide the warning message
        warningMessage.style.display = createAccountButton.disabled ? 'block' : 'none';
    }

    // Add event listeners for input validation
    [stateInput, addressInput, cityInput, zipInput].forEach(input =>
        input.addEventListener('input', validateForm)
    );

    // Perform validation on page load
    validateForm();

    // Create Account button action
    createAccountButton.addEventListener('click', function () {
        if (createAccountButton.disabled) {
            alert('Please fill in all fields correctly.');
        } else {
            // Redirect to the homepage
            window.location.href = 'homepage.html';
        }
    });

    // Cancel button action
    cancelButton.addEventListener('click', function () {
        // Redirect to the password setup page
        window.location.href = 'sign_up_password.html';
    });

    // Home link action
    const homeLink = document.getElementById('homeLink');
    if (homeLink) {
        homeLink.addEventListener('click', function (event) {
            event.preventDefault();
            window.location.href = 'landingpage.html';
        });
    }

    // Sign-In button action
    const signInButton = document.getElementById('signInButton');
    if (signInButton) {
        signInButton.addEventListener('click', function () {
            window.location.href = 'sign_in.html';
        });
    }
});
