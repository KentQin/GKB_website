import React from 'react';
import validateInput from '../../server/shared/validations/signup';
import { browserHistory } from 'react-router';
import TextFieldGroup from './common/TextFieldGroup';

export default class SignupForm extends React.Component {

    constructor(props) {
        super();
        this.state = {
            username: '',
            email: '',
            password: '',
            passwordConfirmation: '',
            errors: {},
        }

        this.onChange = this.onChange.bind(this);
    }


    onChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }

    isValid() {
        const { errors, isValid } = validateInput(this.state);

        if (!isValid) {
            this.setState({ errors });
        }

        return isValid;
    }

    onSubmit(evt) {
        if (true) {
            this.setState({ errors:{} });
            evt.preventDefault();
            this.props.userSignupRequest(this.state).then(
                () => {

                    //this.context.router.push('/')
                },
                (err) => {
                  this.setState({ errors: err.response.data })
                  console.log("error here");
                }
            );
        }
    }

    // onSubmit(evt){
    //     evt.preventDefault();
    //     if(this.isValid()){
    //         this.setState({ errors: {}}).then(
    //             (res) => this.context.router.push('/'),
    //             (err) => this.setState({ errors: err.response.data.errors})
    //         );
    //     }
    // }

    render() {
        const { errors } = this.state;
        return (
            <form onSubmit={this.onSubmit.bind(this)}>
                <h1>Sign up</h1>



                <TextFieldGroup
                    error={errors.username}
                    label="Username"
                    onChange={this.onChange}
                    value={this.state.username}
                    field="username"
                />

                <TextFieldGroup
                    error={errors.email}
                    label="Email"
                    onChange={this.onChange}
                    value={this.state.email}
                    field="email"
                />

                <TextFieldGroup
                    error={errors.password}
                    label="Password"
                    onChange={this.onChange}
                    value={this.state.password}
                    field="password"
                    type="password"
                />

                <TextFieldGroup
                    error={errors.passwordConfirmation}
                    label="Password Confirmation"
                    onChange={this.onChange}
                    value={this.state.passwordConfirmation}
                    field="passwordConfirmation"
                    type="password"
                />

                <div className="form-group">
                    <button className="btn btn-primary btn-lg">
                        Sign up
                    </button>
                </div>
            </form>
        )
    }
}


SignupForm.propTypes = {
    userSignupRequest: React.PropTypes.func.isRequired,
    //addFlashMessage: React.PropTypes.func.isRequired
}

SignupForm.contextTypes = {
    router: React.PropTypes.object.isRequired
}
