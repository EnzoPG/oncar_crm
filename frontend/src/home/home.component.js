import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import AppBar from '../_components/appbar';
import Nav from '../_components/nav';
import { userActions } from '../_actions';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import DoneIcon from '@material-ui/icons/Done';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const drawerWidth = 240;

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
    justifyContent: 'space-between'
  },
});

class Home extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(userActions.getUserScore(localStorage.getItem('_id')));
  }

  generateNewScore = () => {

    const _id = localStorage.getItem('_id');

    const { dispatch } = this.props;

    dispatch(userActions.generateNewScore(_id));
};

  render() {

    const { classes } = this.props;
    const { score, error, success, message } = this.props.authentication;

    return (

      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar />
          <Nav />
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Typography>{'Home'}</Typography>
            <Chip
              avatar={<Avatar>SC</Avatar>}
              label={`Score atual: ${score || 0}`}
              clickable
              color="primary"
              deleteIcon={<DoneIcon />}
              onClick={(event) => { this.generateNewScore() }}
            />
            {/* SNACKBAR */}
            <Snackbar open={error || success} autoHideDuration={500}>
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

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};


function mapStateToProps(state) {
  return state;
}


const connectedHomePage = withRouter(connect(mapStateToProps, null, null, {
  pure: false
})(withStyles(styles)(Home)));

export { connectedHomePage as Home };
