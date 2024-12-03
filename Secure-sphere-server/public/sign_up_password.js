document.addEventListener("DOMContentLoaded", function () {
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("cpassword");
    const togglePassword = document.getElementById("togglePassword");
    const eyeIcon = document.getElementById("eyeIcon");
    const passwordError = document.getElementById("passwordError");
    const confirmPasswordError = document.getElementById("confirmPasswordError");
    const continueButton = document.getElementById("button-continue");
    const cancelButton = document.getElementById("button-cancel");

    
    togglePassword.addEventListener("click", function () {
        const type = passwordInput.type === "password" ? "text" : "password";
        passwordInput.type = type;
        eyeIcon.classList.toggle("bi-eye-slash");
        eyeIcon.classList.toggle("bi-eye");
    });


    function checkPasswordsMatch() {
        if (passwordInput.value !== confirmPasswordInput.value) {
            confirmPasswordError.textContent = "Passwords do not match!";
            continueButton.disabled = true;
        } else {
            confirmPasswordError.textContent = "";
            continueButton.disabled = false;
        }
    }


    passwordInput.addEventListener("input", checkPasswordsMatch);
    confirmPasswordInput.addEventListener("input", checkPasswordsMatch);

    
    passwordInput.addEventListener("input", function () {
        const password = passwordInput.value;
        const passwordCriteria = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[$%^&!@])[A-Za-z\d$%^&!@]{8,}$/;
        if (!password.match(passwordCriteria)) {
            passwordError.textContent = "Password must be at least 8 characters, include an uppercase letter, a lowercase letter, a digit, and a special symbol like @,$,%,^,&, etc.";
        } else {
            passwordError.textContent = "";
        }
    });

    
    continueButton.addEventListener("click", function () {
        
        window.location.href = "sign_up_address.html";
    });

    cancelButton.addEventListener("click", function () {
        window.location.href = "sign_up_name.html";
    });
});
