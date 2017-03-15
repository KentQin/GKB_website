import isEmpty from 'lodash/isEmpty';


export default function validateInput(data) {
    let errors = {};

    if(data.identifier == ''){
        errors.identifier = 'The field is requried';
    }

    if(data.password == ''){
        errors.password = 'The field is requried';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}