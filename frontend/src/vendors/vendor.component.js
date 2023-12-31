import { connect } from 'react-redux';
import { vendorAction } from '../_actions';
import React, { Component } from 'react';
import AppBar from '../_components/appbar';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Nav from '../_components/nav';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
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

  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

class Vendor extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(vendorAction.getVehicles());
  }

  handleChange = event => {
    this.setState({
      anchor: event.target.value,
    });
  };

  handleClick = (event, id) => {
    const { dispatch } = this.props;
    dispatch(vendorAction.deleteVendorById(id, { id }));
  };

  render() {
    const { classes } = this.props;
    const { vehicles, error, success, message } = this.props.vehicles;

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar />
          <Nav />
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Grid container spacing={24}>
              <Grid item xs={3}>
                <Typography>{'Veículos'}</Typography>
              </Grid>
              <Grid item xs={6}>
              </Grid>
              <Grid item xs={3} container style={{ justifyContent: 'flex-end' }}>

              </Grid>
            </Grid>
            <Grid container spacing={24}>
              <Grid item xs={3}>
              </Grid>
              <Grid item xs={6}>
              </Grid>
              <Grid item xs={3} container style={{ justifyContent: 'flex-end' }}>
                <Button variant="contained" color="primary" className={classes.button} component='a' href="/add-vendor">
                  Cadastrar novo veículo
                </Button>
              </Grid>
            </Grid>
            <br />
            <br />
            <Grid container spacing={24}>
              <Paper className={classes.root}>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Marca</TableCell>
                      <TableCell>Modelo</TableCell>
                      <TableCell numeric>Ano</TableCell>
                      <TableCell numeric>Preço</TableCell>
                      <TableCell>Cor</TableCell>
                      <TableCell>Ações</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      vehicles.map(n => {
                        return (
                          <TableRow key={n._id}>
                            <TableCell component="th" scope="row">
                              {n.brand}
                            </TableCell>
                            <TableCell>{n.model}</TableCell>
                            <TableCell numeric>{n.year}</TableCell>
                            <TableCell numeric>{n.price}</TableCell>
                            <TableCell>{n.color}</TableCell>
                            <TableCell>
                              <IconButton className={classes.button} aria-label="Edit" component='a' href={`/edit-vendor/${n._id}`}>
                                <EditIcon />
                              </IconButton>
                              <IconButton className={classes.button} aria-label="Delete" onClick={(event) => this.handleClick(event, n._id)}>
                                <DeleteIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    }
                  </TableBody>
                </Table>
              </Paper>
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


Vendor.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    vehicles: state.vendor
  };
}

const connectedVendorPage = withRouter(connect(mapStateToProps, null, null, {
  pure: false
})(withStyles(styles)(Vendor)));

export { connectedVendorPage as Vendor };