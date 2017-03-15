import React from 'react';
import TextFieldGroup from './common/TextFieldGroup';
import validateInput from '../../server/shared/validations/login';
import {loginAction} from '../actions/loginAction';
import {connect} from 'react-redux';

class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            identifier:'',
            password:'',
            errors: {}
    }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.isValid = this.isValid.bind(this);
    }

    isValid(){
        const {errors, isValid} = validateInput(this.state);
        console.log("start valid()");
        if (!isValid){
            this.setState({ errors });
            this.props.loginAction(this.state);
        }

        return isValid;
    }

    onSubmit(evt){
        evt.preventDefault();
        if(this.isValid()){
            this.setState({ errors: {}}).then(
                (res) => this.context.router.push('/'),
                (err) => this.setState({ errors: err.response.data.errors})
            );
        }
    }

    onChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }

    render() {
        const {errors, identifier, password} = this.state;
        return (
            <form onSubmit={this.onSubmit}>
                <h1>Login</h1>

                <TextFieldGroup
                    field="identifier"
                    label="Username/ Email"
                    value={identifier}
                    error={errors.identifier}
                    onChange={this.onChange}
                />

                <TextFieldGroup
                    field="password"
                    label="password"
                    value={password}
                    error={errors.password}
                    onChange={this.onChange}
                    type="password"
                />

                <div className="form-group">
                    <button className="btn btn-primary btn-lg">Login</button>
                </div>
            </form>
        )
    }
}

LoginForm.protoTypes = {
    loginAction: React.PropTypes.func
}

LoginForm.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default connect(null,{loginAction})(LoginForm);
