document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.input-grid');
    const firstName = document.getElementById('first-name');
    const lastName = document.getElementById('last-name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');
    const submitBtn = document.getElementById('btn');

    const inputs = [firstName, lastName, email, phone, password, confirmPassword];
    
    inputs.forEach(input => {
        const errorSpan = document.createElement('span');
        errorSpan.className = 'error-message';
        errorSpan.style.color = 'red';
        errorSpan.style.fontSize = '0.8rem';
        errorSpan.style.display = 'none';
        input.parentNode.appendChild(errorSpan);
    });


    function showError(input, message) {
        const errorSpan = input.parentNode.querySelector('.error-message');
        errorSpan.textContent = message;
        errorSpan.style.display = 'block';
        input.style.borderColor = 'red';
    }

    function clearError(input) {
        const errorSpan = input.parentNode.querySelector('.error-message');
        errorSpan.textContent = '';
        errorSpan.style.display = 'none';
        input.style.borderColor = '';
    }

    function validateFirstName() {
        const value = firstName.value.trim();
        if (value === '') {
            showError(firstName, 'First name is required');
            return false;
        }
        if (value.length < 2) {
            showError(firstName, 'First name must be at least 2 characters');
            return false;
        }
        clearError(firstName);
        return true;
    }

    function validateLastName() {
        const value = lastName.value.trim();
        if (value === '') {
            showError(lastName, 'Last name is required');
            return false;
        }
        if (value.length < 2) {
            showError(lastName, 'Last name must be at least 2 characters');
            return false;
        }
        clearError(lastName);
        return true;
    }

    function validateEmail() {
        const value = email.value.trim();
        const emailPattern = /^[A-Za-z0-9][A-Za-z0-9._-]*[A-Za-z0-9]@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        
        if (value === '') {
            showError(email, 'Email is required');
            return false;
        }
        if (!emailPattern.test(value)) {
            showError(email, 'Please enter a valid email address');
            return false;
        }
        if (value.includes('..')) {
            showError(email, 'Email cannot contain consecutive dots');
            return false;
        }
        clearError(email);
        return true;
    }

    function validatePhone() {
        const value = phone.value.trim();
        const phonePattern = /^(\([0-9]{3}\)|[0-9]{3})[- ]?[0-9]{3}[- ]?[0-9]{4}$/;
        
        if (value === '') {
            clearError(phone);
            return true; // Phone is optional
        }
        if (!phonePattern.test(value)) {
            showError(phone, 'Please enter a valid phone number (e.g., 123-456-7890)');
            return false;
        }
        clearError(phone);
        return true;
    }

    function validatePassword() {
        const value = password.value;
        
        if (value === '') {
            showError(password, 'Password is required');
            return false;
        }
        if (value.length < 8) {
            showError(password, 'Password must be at least 8 characters');
            return false;
        }
        if (!/[A-Z]/.test(value)) {
            showError(password, 'Password must contain at least one uppercase letter');
            return false;
        }
        if (!/[a-z]/.test(value)) {
            showError(password, 'Password must contain at least one lowercase letter');
            return false;
        }
        if (!/[0-9]/.test(value)) {
            showError(password, 'Password must contain at least one number');
            return false;
        }
        clearError(password);
        return true;
    }

    function validateConfirmPassword() {
        const value = confirmPassword.value;
        const passwordValue = password.value;
        
        if (value === '') {
            showError(confirmPassword, 'Please confirm your password');
            return false;
        }
        if (value !== passwordValue) {
            showError(confirmPassword, 'Passwords do not match');
            return false;
        }
        clearError(confirmPassword);
        return true;
    }

    // Real-time validation on blur
    firstName.addEventListener('blur', validateFirstName);
    lastName.addEventListener('blur', validateLastName);
    email.addEventListener('blur', validateEmail);
    phone.addEventListener('blur', validatePhone);
    password.addEventListener('blur', () => {
        validatePassword();
        if (confirmPassword.value !== '') {
            validateConfirmPassword();
        }
    });
    confirmPassword.addEventListener('blur', validateConfirmPassword);

    // Clear errors on input
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            clearError(input);
        });
    });

    // Form submission
    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        const isFirstNameValid = validateFirstName();
        const isLastNameValid = validateLastName();
        const isEmailValid = validateEmail();
        const isPhoneValid = validatePhone();
        const isPasswordValid = validatePassword();
        const isConfirmPasswordValid = validateConfirmPassword();

        if (isFirstNameValid && isLastNameValid && isEmailValid && 
            isPhoneValid && isPasswordValid && isConfirmPasswordValid) {
            
            // Form is valid - submit the form
            alert('Account created successfully! 🎉\nWelcome to Backend Programming Lessons!');
            
            // You can uncomment the line below to actually submit the form
            // form.submit();
            
            // Or reset the form
            form.reset();
            inputs.forEach(input => clearError(input));
        } else {
            // Scroll to the first error
            const firstError = document.querySelector('.error-message[style*="display: block"]');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });

    // Prevent form submission on Enter key (optional)
    form.addEventListener('submit', (e) => {
        e.preventDefault();
    });
});