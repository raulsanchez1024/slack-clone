import React from "react";
import { Link } from "react-router-dom";
import firebase from "../../firebase";

import { Grid, Form, Segment, Button, Header, Message, Icon } from "semantic-ui-react";

class Login extends React.Component {
    state = {
        email: "",
        password: "",
        errors: [],
        loading: false,
    };

    handleInputError = (errors, inputName) => {
        return errors.some(error => error.message.toLowerCase().includes(inputName)
        )
            ? "error" : ""
    }

    displayErrors = errors => errors.map((error, i) => <p key={i}>{error.message}</p>);

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    };

    handleSubmit = event => {
        event.preventDefault();
        if (this.isFormValid(this.state)) {
            const { email, password, errors } = this.state;
            this.setState({ errors: [], loading: true });
            firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then(singnedInUser => {
                   console.log(singnedInUser);
                })
                .catch(err => {
                    console.error(err);
                    this.setState({
                        errors: errors.concat(err),
                        loading: false
                    });
                });
        }
    };

    isFormValid = ({email, password}) => email && password;

    render() {
        const {
            email,
            password,
            errors,
            loading
        } = this.state;
        return (
            <Grid textAlign="center" verticalAlign="middle" className="app">
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as="h2" icon color="violet" textAlign="center">
                        <Icon name="code branch" color="violet" />
                        Login to DevChat
                    </Header>
                    <p>Email: raul@gmail.com <br /> Password: 123456</p>
                    <Form size="large" onSubmit={this.handleSubmit}>
                        <Segment stacked>
                            <Form.Input
                                fluid
                                name="email"
                                icon="mail"
                                iconPosition="left"
                                placeholder="Email Address"
                                onChange={this.handleChange}
                                type="email"
                                className={this.handleInputError(errors, "email")}
                                value={email}
                            />
                            <Form.Input
                                fluid
                                name="password"
                                icon="lock"
                                iconPosition="left"
                                placeholder="Password"
                                onChange={this.handleChange}
                                type="password"
                                className={this.handleInputError(errors, "password")}
                                value={password}
                            />
                            <Button
                                disabled={loading}
                                className={loading ? 'loading' : ''}
                                color="violet"
                                fluid
                                size="large"
                            >Submit</Button>
                        </Segment>
                    </Form>
                    {errors.length > 0 && (
                        <Message error>
                            <h3>Error</h3>
                            {this.displayErrors(errors)}
                        </Message>
                    )}
                    <Message>Don't have an account? <Link to="/register">Register</Link></Message>
                </Grid.Column>
            </Grid>
        )
    }
}

export default Login;
