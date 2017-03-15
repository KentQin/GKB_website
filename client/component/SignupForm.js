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
                (err) => this.setState({ errors: err.response.data })
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

                {/*<div className={classnames("form-group", {'has-error': errors.username})}>*/}
                    {/*<label htmlFor="" className="control-label">Username</label>*/}
                    {/*<input*/}
                        {/*value={this.state.username}*/}
                        {/*onChange={this.onChange.bind(this)}*/}
                        {/*type="text"*/}
                        {/*name="username"*/}
                        {/*className="form-control"*/}
                    {/*/>*/}
                    {/*{errors.username && <span className="help-block">{errors.username}</span>}*/}
                {/*</div>*/}

                <TextFieldGroup
                    error={errors.username}
                    label="Username"
                    onChange={this.onChange}
                    value={this.state.username}
                    field="username"
                />

                {/*<div className={classnames("form-group", {'has-error': errors.email})}>*/}
                    {/*<label htmlFor="" className="control-label">email</label>*/}
                    {/*<input*/}
                        {/*value={this.state.email}*/}
                        {/*onChange={this.onChange.bind(this)}*/}
                        {/*type="text"*/}
                        {/*name="email"*/}
                        {/*className="form-control"*/}
                    {/*/>*/}
                    {/*{errors.email && <span className="help-block">{errors.email}</span>}*/}
                {/*</div>*/}

                <TextFieldGroup
                    error={errors.email}
                    label="Email"
                    onChange={this.onChange}
                    value={this.state.email}
                    field="email"
                />

                {/*<div className={classnames("form-group", {'has-error': errors.password})}>*/}
                    {/*<label htmlFor="" className="control-label">password</label>*/}
                    {/*<input*/}
                        {/*value={this.state.password}*/}
                        {/*onChange={this.onChange.bind(this)}*/}
                        {/*type="password"*/}
                        {/*name="password"*/}
                        {/*className="form-control"*/}
                    {/*/>*/}
                    {/*{errors.password && <span className="help-block">{errors.password}</span>}*/}
                {/*</div>*/}

                <TextFieldGroup
                    error={errors.password}
                    label="Password"
                    onChange={this.onChange}
                    value={this.state.password}
                    field="password"
                    type="password"
                />

                {/*<div className={classnames("form-group", {'has-error': errors.passwordConfirmation})}>*/}
                    {/*<label htmlFor="" className="control-label">passwordConfirmation</label>*/}
                    {/*<input*/}
                        {/*value={this.state.passwordConfirmation}*/}
                        {/*onChange={this.onChange.bind(this)}*/}
                        {/*type="password"*/}
                        {/*name="passwordConfirmation"*/}
                        {/*className="form-control"*/}
                    {/*/>*/}
                    {/*{errors.passwordConfirmation && <span className="help-block">{errors.passwordConfirmation}</span>}*/}
                {/*</div>*/}

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