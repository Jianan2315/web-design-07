$(document).ready(() => {
    // Function to check for special characters
    const hasSpecialCharacters = (str) => /[^a-zA-Z0-9]/.test(str);

    // Function to validate Northeastern email
    const isValidNortheasternEmail = (email) => /^[a-zA-Z0-9._%+-]+@northeastern\.edu$/.test(email);

    // Function to check string length
    const isValidLength = (str, min, max) => str.length >= min && str.length <= max;

    // Function to validate fields
    const validateField = (fieldId, value, validators) => {
        let errorMessage = '';
        for (const validator of validators) {
            const result = validator(value);
            if (result !== true) {
                errorMessage = result;
                break;
            }
        }
        $(`#${fieldId}-error`).text(errorMessage);
        return errorMessage === '';
    };

    // Individual field validators
    const validateEmail = () => {
        const value = $('#email').val();
        return validateField('email', value, [
            (v) => v !== '' ? true : 'Email cannot be empty.',
            (v) => isValidNortheasternEmail(v) ? true : 'Email must be a valid northeastern.edu email.',
            (v) => isValidLength(v, 5, 50) ? true : 'Email length must be between 5 and 50 characters.',
        ]);
    };

    const validateUsername = () => {
        const value = $('#username').val();
        return validateField('username', value, [
            (v) => v !== '' ? true : 'User Name cannot be empty.',
            (v) => !hasSpecialCharacters(v) ? true : 'User Name cannot contain special characters.',
            (v) => isValidLength(v, 3, 20) ? true : 'User Name length must be between 3 and 20 characters.',
        ]);
    };

    const validatePassword = () => {
        const value = $('#password').val();
        return validateField('password', value, [
            (v) => v !== '' ? true : 'Password cannot be empty.',
            (v) => !hasSpecialCharacters(v) ? true : 'Password cannot contain special characters.',
            (v) => isValidLength(v, 6, 20) ? true : 'Password length must be between 6 and 20 characters.',
        ]);
    };

    const validateConfirmPassword = () => {
        const value = $('#confirm-password').val();
        const passwordValue = $('#password').val();
        return validateField('confirm-password', value, [
            (v) => v !== '' ? true : 'Confirm Password cannot be empty.',
            (v) => v === passwordValue ? true : 'Passwords do not match.',
        ]);
    };

    const checkAllValid = () => {
        return validateEmail() && validateUsername() && validatePassword() && validateConfirmPassword();
    };

    // Event listeners
    $('#email').on('input', () => {
        validateEmail();
        $('#login-btn').prop('disabled', !checkAllValid());
    });
    $('#username').on('input', () => {
        validateUsername();
        $('#login-btn').prop('disabled', !checkAllValid());
    });
    $('#password').on('input', () => {
        validatePassword();
        validateConfirmPassword(); // Re-validate confirm password
        $('#login-btn').prop('disabled', !checkAllValid());
    });
    $('#confirm-password').on('input', () => {
        validateConfirmPassword();
        $('#login-btn').prop('disabled', !checkAllValid());
    });

    // Form submission
    $('#login-form').on('submit', (e) => {
        e.preventDefault();
        if (checkAllValid()) {
            const username = $('#username').val();
            localStorage.setItem('username', username);
            window.location.href = 'calculator.html';
        }
    });
});
