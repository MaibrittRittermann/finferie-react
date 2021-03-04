import React from 'react';
import { toast } from 'react-toastify';
import Joi from 'joi-browser';
import Form from './common/form';
import { login } from '../services/authService';

class LoginForm extends Form {
    state = { data: {
        email: '',
        password: ''
        },
        errors: {}
    }

    schema = {
        email: Joi.string().email().required().label("Email adresse"),
        password: Joi.string().required().label("Adgangskode")
    }

    doSubmit = async () => {
        const {data} = this.state;
        try {
            await login(data.email, data.password);
            window.location = "/";
        } catch (ex) {
            if(ex.response && ex.response.status === 400) {
                const errors  = {...this.state.errors};
                errors.email = ex.response.data;
                this.setState({errors});
            } else if (ex.response) {
                toast.warning(ex.response.data);
            } else {
                toast.warning(ex);
            }
        }
    }

    render() { 
        return ( 
            <form onSubmit={this.handleSubmit}>
                {this.renderInput("email", "Email adresse:")}
                {this.renderInput("password", "Adgangskode:", "password")}                                              
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
         );
    }
}
 
export default LoginForm;