document.addEventListener("DOMContentLoaded", () => {
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const signInButton = document.getElementById("loginButton");
    const rememberMeCheckbox = document.getElementById("exampleCheck1");
    const forgotPasswordLink = document.querySelector(".forgot-password");
    const socialIcons = document.querySelectorAll(".icons a");

    
    signInButton.addEventListener("click", (event) => {
        event.preventDefault(); 

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        const rememberMe = rememberMeCheckbox.checked;

        let hasError = false;


        clearError(emailInput);
        clearError(passwordInput);


        if (!validateEmail(email)) {
            showError(emailInput, "Please enter a valid email address.");
            hasError = true;
        }

        const passwordValidation = validatePassword(password);
        if (!passwordValidation.isValid) {
            showError(passwordInput, passwordValidation.errors);
            hasError = true;
        }

        
        if (hasError) {
            return; 
        }

        
        if (rememberMe) {
            alert("You have chosen to be remembered.");
        }

        sessionStorage.setItem("loginSuccess", "Login successful!"); 
        window.location.href = "homepage.html"; 

        alert("Sign-In Successful!");
    });

    
    forgotPasswordLink.addEventListener("click", (event) => {
        event.preventDefault(); 
        alert("Redirecting to Forgot Password page...");
    });


    socialIcons.forEach((icon) => {
        icon.addEventListener("mouseover", () => {
            icon.style.transform = "scale(1.2)";
        });

        icon.addEventListener("mouseout", () => {
            icon.style.transform = "scale(1)";
        });

        icon.addEventListener("click", (event) => {
            event.preventDefault();
            alert(
                `Social sign-in with ${icon.children[0].className.split("-")[2]} is not yet available.`
            );
        });
    });

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function validatePassword(password) {
        const errors = [];
        if (password.length < 8) {
            errors.push("At least 8 characters long");
        }
        if (!/[A-Z]/.test(password)) {
            errors.push("At least 1 uppercase letter (A-Z)");
        }
        if (!/[a-z]/.test(password)) {
            errors.push("At least 1 lowercase letter (a-z)");
        }
        if (!/[0-9]/.test(password)) {
            errors.push("At least 1 number (0-9)");
        }
        return {
            isValid: errors.length === 0,
            errors: errors.join(", "),
        };
    }

    function showError(input, message) {
        const errorElement = document.createElement("div");
        errorElement.className = "error-message";
        errorElement.textContent = message;
        input.parentElement.appendChild(errorElement);
    }

    function clearError(input) {
        const errorElement = input.parentElement.querySelector(".error-message");
        if (errorElement) {
            errorElement.remove();
        }
    }
});

function redirectToSignUp() {
    window.location.href = 'sign_up_region.html'; 
}

function handleSignUpSteps() {
    const currentPage = window.location.pathname;

    switch (currentPage) {
        case '/sign_up_region.html':
            setTimeout(() => {
                window.location.href = 'sign_up_name.html';
            }, 3000); 
            break;
        
        case '/sign_up_name.html':
            setTimeout(() => {
                window.location.href = 'sign_up_password.html';
            }, 3000);
            break;

        case '/sign_up_password.html':
            setTimeout(() => {
                window.location.href = 'sign_up_address.html';
            }, 3000);
            break;

        case '/sign_up_address.html':
            setTimeout(() => {
                window.location.href = 'homepage.html';
            }, 3000);
            break;

        default:
            window.location.href = 'landingpage.html';
            break;
    }
}

