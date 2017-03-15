import isEmpty from 'lodash/isEmpty';
import isEmail from 'validator/lib/isEmail';
import isEquals from 'validator/lib/equals';
import isContentEmpty from 'validator/lib/isEmpty';

export default function validateInput(data) {
    console.log(data);
    let errors = {};
    if (isContentEmpty(data.username)) {
        errors.username = 'Username is required';
    }
    if (!isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }
    if (isContentEmpty(data.email)) {
        errors.email = 'Email is required';
    }
    if (isContentEmpty(data.password)) {
        errors.password = 'password is required';
    }
    if (isContentEmpty(data.passwordConfirmation)) {
        errors.passwordConfirmation = 'passwordConfirmation is required';
    }
    if (!isEquals(data.password, data.passwordConfirmation)) {
        errors.passwordConfirmation = 'Password does not match';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}
