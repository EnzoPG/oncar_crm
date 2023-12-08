import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Alert } from '@material-ui/lab';
import { connect, useSelector } from 'react-redux';
import { userActions } from '../_actions';
import { history } from '../_helpers';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom';
import './login.component.css';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '50%',
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    mainContainer: {
        boxShadow: '15px 20px 25px lightgray',
        borderRadius: 10,
        border: 'hidden',
        padding: '1em',
    },
    button: {
        margin: theme.spacing.unit,
        width: '50%',
    },
    input: {
        display: 'none',
    },
});

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            alertMessage: '',
            loggingIn: false,
            showAlert: false,
            showPassword: false,
        };
    };

    componentDidMount() {
        if (localStorage.getItem('_id')) {
            history.push('/home');
        }
    };

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    login = () => {

        const { email, password } = this.state;

        if (!email || !password) {
            this.setState({
                showAlert: true,
                alertMessage: 'Preencha corretamente todos os campos!'
            });
            return false;
        }

        this.setState({ submitted: true });

        const { dispatch } = this.props;

        dispatch(userActions.login(email, password));
    };

    render() {
        const { classes, loggingIn } = this.props;

        return (
            <div className="login-margin">
                <Grid container spacing={24}>
                    <Grid item xs={3}>
                    </Grid>
                    <Grid item xs={6} className={classes.mainContainer}>
                        <Paper className={classes.paper}>
                            <Typography><h1>{'Bem vindo ao CRM!'}</h1></Typography>
                        </Paper>
                        <Paper className={classes.paper}>
                            <div>
                                <TextField
                                    required
                                    label="E-mail"
                                    value={this.state.email}
                                    className={classes.textField}
                                    onChange={this.handleChange('email')}
                                />
                                <br />
                                <br />
                                <TextField
                                    required
                                    label="Senha"
                                    autoComplete="current-password"
                                    type={this.state.showPassword ? 'text' : 'password'}
                                    className={classes.textField}
                                    value={this.state.password}
                                    onChange={this.handleChange('password')}
                                />
                                <br />
                                <br />
                                <Button variant="contained" color="primary" className={classes.button} onClick={(event) => { this.login() }}>
                                    Login
                                </Button>
                            </div>
                        </Paper>
                        {
                            (this.state.showAlert) && (
                                <Alert
                                    severity="error"
                                    className={classes.alert}
                                    onClose={() => {
                                        this.setState({ showAlert: false })
                                    }}
                                >
                                    {this.state.alertMessage}
                                </Alert>
                            )
                        }
                        {
                            (loggingIn === false && !this.state.showAlert) && (
                                <Alert
                                    severity="error"
                                    className={classes.alert}
                                >
                                    Credenciais inválidas! Tente novamente.
                                </Alert>
                            )
                        }
                    </Grid>
                    <Grid item xs={3}>
                    </Grid>
                </Grid>
            </div>
        );
    };
};

Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    const { loggingIn } = state.authentication;

    return { loggingIn };
}

const connectedLoginPage = withRouter(connect(mapStateToProps, null, null, {
    pure: false
})(withStyles(styles)(Login)));

export { connectedLoginPage as Login };