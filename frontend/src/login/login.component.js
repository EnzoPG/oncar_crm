import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Alert } from '@material-ui/lab';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import { history } from '../_helpers';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom';
import './login.component.css';
// Mobile or Desktop
import isMobile from '../utils/isMobile';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    mainGrid: {
        marginTop: (isMobile) ? 0 : '15%',
        height: (isMobile) ? '100vh' : '35vh',
        width: (isMobile) ? '108vw' : '',
    },
    textField: {
        marginBottom: 10,
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: (isMobile) ? '100%' : '50%',
    },
    paperTitle: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center'
    },
    paperBody: {
        padding: (isMobile) ? 50 : theme.spacing.unit * 2,
        textAlign: 'center',
        marginBottom: 15
    },
    mainContainer: {
        boxShadow: '15px 20px 25px lightgray',
        borderRadius: 10,
        border: 'hidden',
        padding: '1em',
    },
    button: {
        width: '50%',
        color: 'white',
        backgroundColor: '#4293f5'
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
            <Grid container spacing={3} className={classes.mainGrid}>
                <Grid item xs={3}>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper elevation={4} style={{ padding: 15 }}>
                        <Paper className={classes.paperTitle} elevation={0}>
                            <Typography><h1>{'Bem vindo ao CRM!'}</h1></Typography>
                        </Paper>
                        <Paper className={classes.paperBody} elevation={0}>
                            <div>
                                <TextField
                                    required
                                    label="E-mail"
                                    value={this.state.email}
                                    className={classes.textField}
                                    onChange={this.handleChange('email')}
                                />
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
                                <Button variant="contained" className={classes.button} onClick={(event) => { this.login() }}>
                                    Login
                                </Button>
                            </div>
                        </Paper>
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