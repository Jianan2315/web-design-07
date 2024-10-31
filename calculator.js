$(document).ready(() => {
    const username = localStorage.getItem('username');
    if (username) {
        $('#username-display').text(username);
    } else {
        window.location.href = 'login.html';
    }

    const validateNumberField = (fieldId) => {
        const value = $(`#${fieldId}`).val();
        let errorMessage = '';

        if (value === '') {
            errorMessage = 'Field cannot be empty.';
        } else if (isNaN(value)) {
            errorMessage = 'Field must be a number.';
        } else if (!isFinite(value)) {
            errorMessage = 'Value must be finite.';
        } else if (/[^0-9.-]/.test(value)) {
            errorMessage = 'Special characters are not allowed.';
        }

        $(`#${fieldId}-error`).text(errorMessage);
        return errorMessage === '';
    };

    const validateFields = () => {
        return validateNumberField('number1') && validateNumberField('number2');
    };

    const calculate = (operation) => {
        if (validateFields()) {
            const num1 = parseFloat($('#number1').val());
            const num2 = parseFloat($('#number2').val());
            let result;
            switch (operation) {
                case 'add':
                    result = num1 + num2;
                    break;
                case 'subtract':
                    result = num1 - num2;
                    break;
                case 'multiply':
                    result = num1 * num2;
                    break;
                case 'divide':
                    if (num2 === 0) {
                        $('#result').val('Cannot divide by zero');
                        return;
                    }
                    result = num1 / num2;
                    break;
            }
            $('#result').val(result);
        } else {
            $('#result').val('');
        }
    };

    // Event listeners
    $('#number1').on('input', () => {
        validateNumberField('number1');
    });
    $('#number2').on('input', () => {
        validateNumberField('number2');
    });
    $('#add-btn').on('click', () => {
        calculate('add');
    });
    $('#subtract-btn').on('click', () => {
        calculate('subtract');
    });
    $('#multiply-btn').on('click', () => {
        calculate('multiply');
    });
    $('#divide-btn').on('click', () => {
        calculate('divide');
    });
});
