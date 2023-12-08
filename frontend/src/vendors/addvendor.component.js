import React, { Component } from 'react';
import AppBar from '../_components/appbar';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Nav from '../_components/nav';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { vendorAction } from '../_actions';
import { withRouter } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const drawerWidth = 240;

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const styles = theme => ({

    root: {
        flexGrow: 1,
    },

    contentRoot: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },

    appFrame: {
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        width: '100%',
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
    },
    'appBar-left': {
        marginLeft: drawerWidth,
    },
    'appBar-right': {
        marginRight: drawerWidth,
    },
    drawerPaper: {
        position: 'relative',
        width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
    },
});

class AddVendor extends Component {

    handleChange = prop => event => {
        const { dispatch } = this.props;
        dispatch(vendorAction.onChangeProps(prop, event));
    };

    componentDidMount() {
        const { match: { params } } = this.props;

        if (params.id) {
            const { dispatch } = this.props;
            dispatch(vendorAction.getVendorById(params.id));
        }
    }

    handleClick(event) {
        const { match: { params } } = this.props;
        const { dispatch } = this.props;

        if (
            !this.props.vendor.brand ||
            !this.props.vendor.model ||
            !this.props.vendor.year ||
            !this.props.vendor.price ||
            !this.props.vendor.color
        ) {
            dispatch(vendorAction.formValidationError());
            return false;
        }

        let payload = {
            id: params.id,
            brand: this.props.vendor.brand,
            model: this.props.vendor.model,
            year: this.props.vendor.year,
            price: this.props.vendor.price,
            color: this.props.vendor.color,
        }

        if (params.id) {
            dispatch(vendorAction.editVendorInfo(params.id, payload));
        } else {
            dispatch(vendorAction.createVehicle(payload));
        }
    }

    render() {
        const { classes } = this.props;
        const { match: { params } } = this.props;
        const { error, success, message } = this.props.vendor;

        function InsertText(props) {
            return <Typography>{'Novo veículo'}</Typography>;
        }

        function EditText(props) {
            return <Typography>{'Editar veículo'}</Typography>;
        }


        function SegHeader() {
            if (params.id) {
                return <EditText />;
            }
            return <InsertText />;
        }

        return (

            <div className={classes.root}>
                <div className={classes.appFrame}>
                    <AppBar />
                    <Nav />
                    <main className={classes.content}>
                        <div className={classes.toolbar} />
                        <Grid container spacing={3}>
                            <Grid item xs={3}>
                                <SegHeader />
                            </Grid>
                            <Grid item xs={6}>
                            </Grid>
                            <Grid item xs={3} container style={{ justifyContent: 'flex-end' }}>
                            </Grid>
                        </Grid>
                        <br />
                        <br />
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <div>
                                    <Paper className={classes.contentRoot} elevation={1}>
                                        <form className={classes.container}>
                                            <Grid container spacing={3}>
                                                <Grid item xs={4}>
                                                    <TextField
                                                        id="brand"
                                                        label="Marca"
                                                        required
                                                        className={classes.textField}
                                                        value={this.props.vendor.brand}
                                                        onChange={this.handleChange('brand')}
                                                        margin="normal"
                                                    />
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <TextField
                                                        id="model"
                                                        label="Modelo"
                                                        required
                                                        className={classes.textField}
                                                        value={this.props.vendor.model}
                                                        onChange={this.handleChange('model')}
                                                        margin="normal"
                                                    />
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <TextField
                                                        id="year"
                                                        label="Ano"
                                                        type="number"
                                                        required
                                                        className={classes.textField}
                                                        value={this.props.vendor.year}
                                                        onChange={this.handleChange('year')}
                                                        margin="normal"
                                                    />
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <TextField
                                                        id="price"
                                                        label="Preço"
                                                        required
                                                        className={classes.textField}
                                                        value={this.props.vendor.price}
                                                        onChange={this.handleChange('price')}
                                                        margin="normal"
                                                    />
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <TextField
                                                        id="color"
                                                        label="Cor"
                                                        required
                                                        className={classes.textField}
                                                        value={this.props.vendor.color}
                                                        onChange={this.handleChange('color')}
                                                        margin="normal"
                                                    />
                                                </Grid>
                                            </Grid>
                                            <br />
                                            <Grid container spacing={3}>
                                                <Grid item xs={3}>
                                                </Grid>
                                                <Grid item xs={6}>
                                                </Grid>
                                                <Grid item xs={3} container style={{ justifyContent: 'center' }}>
                                                    <Grid container spacing={3}>
                                                        <Grid item xs={6} container style={{ justifyContent: 'center' }}>
                                                            <Button variant="outlined" color="secondary" className={classes.button} component='a' href="/vendor">
                                                                Cancelar
                                                            </Button>
                                                        </Grid>
                                                        <Grid item xs={6} container style={{ justifyContent: 'flex-start' }}>
                                                            <Button variant="contained" color="primary" className={classes.button} onClick={(event) => this.handleClick(event)}>
                                                                Salvar
                                                            </Button>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>

                                        </form>
                                    </Paper>
                                </div>
                            </Grid>
                        </Grid>
                        {/* SNACKBAR */}
                        <Snackbar open={error || success} autoHideDuration={1500}>
                            <Alert severity={ error ? "error" : "success" }>
                                { message }
                            </Alert>
                        </Snackbar>
                    </main>
                </div>
            </div>
        );
    }
}

//export default Home;

AddVendor.propTypes = {
    classes: PropTypes.object.isRequired,
};


//export default BoxCon
const mapStateToProps = (state) => {
    return state;
}


const connectedAddVendorPage = withRouter(connect(mapStateToProps, null, null, {
    pure: false
})(withStyles(styles)(AddVendor)));

export { connectedAddVendorPage as AddVendor };