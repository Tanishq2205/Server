document.addEventListener("DOMContentLoaded", () => {
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const signInButton = document.querySelector(".btn[type='submit']");
    const rememberMeCheckbox = document.getElementById("exampleCheck1");
    const forgotPasswordLink = document.querySelector("a[href='#']");
    const socialIcons = document.querySelectorAll(".icons a");

    // Sign-in button event listener
    signInButton.addEventListener("click", (event) => {
        event.preventDefault(); 

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        const rememberMe = rememberMeCheckbox.checked;

        let hasError = false;

        // Clear previous errors
        clearError(emailInput);
        clearError(passwordInput);

        // Form validation
        if (!validateEmail(email)) {
            showError(emailInput, "Please enter a valid email address.");
            hasError = true;
        }

        if (!validatePassword(password)) {
            showError(passwordInput, "Password must be at least 6 characters long.");
            hasError = true;
        }

        if (hasError) {
            return;
        }

        if (rememberMe) {
            alert("You have chosen to be remembered.");
        }

        alert("Sign-In Successful!");
    });

    // Forgot password link handler
    forgotPasswordLink.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent default action
        alert("Redirecting to Forgot Password page...");
    });

    // Social media icons hover effects
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

    // Email validation function
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Password validation function
    function validatePassword(password) {
        return password.length >= 6;
    }

    // Show error dynamically
    function showError(inputElement, message) {
        inputElement.classList.add("input-error");

        let errorElement = inputElement.nextElementSibling;
        if (!errorElement || !errorElement.classList.contains("error-message")) {
            errorElement = document.createElement("div");
            errorElement.className = "error-message";
            inputElement.after(errorElement);
        }
        errorElement.textContent = message;
    }

    // Clear error dynamically
    function clearError(inputElement) {
        inputElement.classList.remove("input-error");
        const errorElement = inputElement.nextElementSibling;
        if (errorElement && errorElement.classList.contains("error-message")) {
            errorElement.remove();
        }
    }
});
