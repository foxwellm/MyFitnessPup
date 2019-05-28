import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 80
  },
  text: {
    fontSize: 20
  },
  progress: {
    margin: theme.spacing(2),
  },

}));

function CircularIndeterminate() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <CircularProgress className={classes.progress} />
      <div className={classes.text}>Fetching more dogs that match your criteria</div>
      <CircularProgress className={classes.progress} color="secondary" />
    </div>
  );
}

export default CircularIndeterminate;