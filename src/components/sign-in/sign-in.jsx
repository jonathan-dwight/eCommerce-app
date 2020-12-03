import React from 'react';

import FormInput from '../form-input/form-input'
import './sign-in.scss';

class SignIn extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            email: "",
            password: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit = (e) => {
        e.preventDefault()

        this.setState({ email: "", password: ""})
    }

    handleChange = (field) => {
        return (e) => this.setState({ [field]: e.currentTarget.value })   
    }

    render() {
        return(
            <div className="sign-in">
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput 
                        type="email" 
                        name="email" 
                        value={this.state.email} 
                        handleChange={this.handleChange}
                        label='email'
                        required/>
                    
                    <FormInput
                        type="password" 
                        name="password" 
                        value={this.state.password}
                        handleChange={this.handleChange}
                        label="password"
                        required />

                    <input type="submit" value="Submit Form"/>
                </form>
            </div>
        )
    }
}

export default SignIn;